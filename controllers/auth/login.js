const bcryptjs = require('bcryptjs')
const { User } = require('../../models/user/user')
const { userAuthValidate } = require('../../validators/user')

async function authUser(req, res) {
    const { error } = userAuthValidate.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // VERIFY USER EMAIL
    const user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('Email does not exist')

    // VERIFY USER PASSWORD
    const isValid = await bcryptjs.compare(req.body.password, user.password)
    if (!isValid) return res.status(400).send('Password is incorrect')

    const token = user.generateToken()

    res.header('x-auth-token', token)
        .status(201)
        .send('User successfully logged in')
}

module.exports = {
    authUser,
}
