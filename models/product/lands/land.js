const mongoose = require('mongoose')
const { vendorSchema } = require('../../vendor/vendor')
const Schema = mongoose.Schema

const landSchema = new Schema({
    vendor: {
        type: vendorSchema,
        required: true,
    },
    landName: {
        type: String,
        minlength: 1,
        lowerCase: true,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        minlength: 1,
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
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    plot: {
        type: Number,
        min: 0,
        required: true,
    },
    landUseAct: {
        type: Boolean,
        required: true,
    },
    landUseActDescription: {
        type: String,
        minlength: 1,
        lowerCase: true,
        trim: true,
        required: true,
    },
})

const Land = mongoose.model('Land', landSchema)

exports.landSchema = landSchema
exports.Land = Land
