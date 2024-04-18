const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const vendorSchema = new Schema(
    {
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
            default: 'vendor',
        },
    },
    { timestamps: true }
)

// GENERATE TOKEN FUNC
vendorSchema.methods.generateToken = function () {
    return jwt.sign(
        { _id: this._id, role: this.role },
        process.env.JWT_PRIVATE_KEY,
        {
            expiresIn: '1d',
        }
    )
}

const Vendor = mongoose.model('Vendor', vendorSchema)

exports.vendorSchema = vendorSchema
exports.Vendor = Vendor
