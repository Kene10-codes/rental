const Joi = require('joi')

const vendorValidate = Joi.object({
    lastname: Joi.string().min(1).max(255).required(),
    firstname: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
    role: Joi.string().required(),
})

module.exports = {
    vendorValidate,
}
