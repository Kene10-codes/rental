const Joi = require('joi')

const productValidate = Joi.object({
    vendorId: Joi.string().require(),
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).max(255).required(),
    location: Joi.string().min(1).max(255).required(),
    price: Joi.number().min(1).max(255).required(),
    tag: Joi.string().max(6).required(),
})

module.exports = {
    productValidate,
}
