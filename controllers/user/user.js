const _ = require('lodash')
const bcryptjs = require('bcryptjs')
const { User } = require('../../models/user/user')
const { userValidate } = require('../../validators/user')
const sendEmail = require('../../services/sendEmail/sendEmail')

// GET USERS
async function getusers(req, res) {
    const users = await User.find()
    if (users.length === 0) return res.status(400).send('No user found!')
    res.status(200).send(users)
}

// REGISTER USER
async function registerUser(req, res) {
    const { error } = userValidate.validate(req.body)
    if (error) {
        return res.send(error.details[0].message)
    }
    const userEmail = await User.findOne({ email: req.body.email })
    if (userEmail) return res.status(400).send('user already exists')

    // SET USER
    const user = new User(
        _.pick(req.body, ['firstname', 'lastname', 'email', 'role', 'password'])
    )

    // GENERATE SALT
    const salt = await bcryptjs.genSalt(10)
    // HASH PASSWORD
    user.password = await bcryptjs.hash(req.body.password, salt)

    // SAVE USER
    await user.save()

    // GENERATE TOKEN
    const token = user.generateToken()

    sendEmail(
        user,
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

    // SEND TOKEN
    res.header('x-auth-token', token).status(201).send(user)
}

// GET A USER
async function getUser(req, res) {
    const { id } = req.params.id
    const user = await User.findById(id)
    if (!user) return res.status(400).send('Invalid User ID')

    res.status(200).send(user)
}

module.exports = { registerUser, getusers, getUser }
