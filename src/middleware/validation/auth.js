const joi = require('@hapi/joi');

const schema = {
    registerValidation : joi.object({
        name: joi.string().max(30).required(),
        username: joi.string().min(6).max(30).required(),
        password: joi.string().min(6).required(),
    }),
    loginValidation : joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
    })
}

module.exports = schema