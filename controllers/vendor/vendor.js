const bcryptjs = require('bcryptjs')
const _ = require('lodash')
const { Vendor } = require('../../models/vendor/vendor')
const { vendorValidate } = require('../../validators/vendor')
const sendEmail = require('../../services/sendEmail/sendEmail')

async function registerVendor(req, res) {
    const { error } = vendorValidate.validate(req.body)
    if (error) {
        return res.send(error.details[0].message)
    }
    const userEmail = await Vendor.findOne({ email: req.body.email })
    if (!userEmail) return res.status(400).send('Vendor already exists')

    // SET USER
    const vendor = new Vendor(
        _.pick(req.body, ['firstname', 'lastname', 'email', 'role', 'password'])
    )

    // GENERATE SALT
    const salt = await bcryptjs.genSalt(10)
    // HASH PASSWORD
    vendor.password = await bcryptjs.hash(req.body.password, salt)

    // SAVE VENDOR
    await vendor.save()

    const token = vendor.generateToken()

    sendEmail(
        vendor,
        'Account Creation successful',
        '',
        'Welcome to our Blog - Your Account has been Created!',
        `
<p>Dear ${user.name},</p>
<p>Welcome to our Blog! We are thrilled to have you as a new member of our community. </p>
<p>Your account has been successfully created, and you are now ready to explore all the features and 
benefits our platform has to offer.</p>

<p> If you have any questions or need assistance, feel free to reach out to our support team at blogcustomercare101@gmail.com. We're here to help you make the most out of your experience with our Blog.

Once again, welcome aboard, and thank you for joining us! </p>

<p>Best regards,</p>
<span>Kenechukwu </span>
<p>CEO</p>
`
    )

    // SEND VENDOR
    res.header('x-auth-token', token).status(201).send(vendor)
}

module.exports = {
    registerVendor,
}
