const bcryptjs = require('bcryptjs')
const _ = require('lodash')
const { User } = require('../../models/user/user')
const { userValidate } = require('../../validators/user')

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
        return res.send('Issue somewhere!')
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
    const newUser = await user.save()

    res.status(201).send(newUser)
}

module.exports = { registerUser, getusers }
