const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    lastname: {
        type: String,
        minlength: 1,
        maxlength: 255,
        lowerCase: true,
        trim: true,
        required: true,
    },
    firstname: {
        type: String,
        minlength: 1,
        maxlength: 255,
        lowerCase: true,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('Client', userSchema)

exports.userSchema = userSchema
exports.User = User
