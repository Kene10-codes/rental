const bcryptjs = require('bcryptjs')
const _ = require('lodash')
const { Vendor } = require('../../models/vendor/vendor')
const { vendorValidate } = require('../../validators/vendor')

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
    const newvendor = await vendor.save()

    // SEND VENDOR
    res.status(201).send(newvendor)
}

module.exports = {
    registerVendor,
}
