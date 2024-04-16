const Joi = require('joi')

const userProfileValidate = Joi.object({
    userId: Joi.string().required(),
    phone: Joi.string().min(11).max(14).required(),
    address: Joi.string().max(255).required(),
    location: Joi.string().max(255).required(),
})

module.exports = {
    userProfileValidate,
}
