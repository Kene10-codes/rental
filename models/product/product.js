const { required } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
    },
    name: {
        type: String,
        minlength: 1,
        lowerCase: true,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        minlength: 1,
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
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    tag: {
        type: String,
        minlength: 1,
        maxlength: 6,
        lowerCase: true,
        trim: true,
        required: true,
    },
})

const Product = mongoose.model('Product', productSchema)

exports.productSchema = productSchema
exports.Product = Product
