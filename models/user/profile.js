const mongoose = require('mongoose')
const { userSchema } = require('./user')
const Schema = mongoose.Schema

const userProfileSchema = new Schema({
    profile: {
        type: userSchema,
        required: true,
    },
    phone: {
        type: String,
        minlength: 11,
        maxlength: 14,
        required: true,
    },
    address: {
        type: String,
        maxlength: 255,
        lowerCase: true,
        trim: true,
        required: true,
    },
    location: {
        type: String,
        maxlength: 255,
        lowerCase: true,
        trim: true,
        required: true,
    },
})

const UserProfile = mongoose.model('ClientProfile', userProfileSchema)

exports.userProfileSchema = userProfileSchema
exports.UserProfile = UserProfile
