const { UserProfile } = require('../../models/user/profile')
const { User } = require('../../models/user/user')
const { userProfileValidate } = require('../../validators/user/profile')

// REGISTER USER
async function registerUserProfile(req, res) {
    const { error } = userProfileValidate.validate(req.body)
    if (error) {
        return res.send(error.details[0].message)
    }
    const user = await User.findById(req.body.userId)
    if (!user) return res.status(400).send('This is not a valid user')

    // SET USER
    const userInfo = new UserProfile({
        profile: {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            role: user.role,
        },
        phone: req.body.phone,
        address: req.body.address,
        location: req.body.location,
    })

    // SAVE USER
    const newUser = await userInfo.save()

    // SEND USER
    res.status(201).send(newUser)
}

// UPDATE USER PROFILE
async function updateUserProfile(req, res) {
    await UserProfile.findByIdAndUpdate(
        req.params.id,
        {
            phone: req.body.phone,
            address: req.body.address,
            location: req.body.location,
        },
        { new: true }
    )

    res.status(201).send('Profile updated successfully')
}

module.exports = {
    registerUserProfile,
    updateUserProfile,
}
