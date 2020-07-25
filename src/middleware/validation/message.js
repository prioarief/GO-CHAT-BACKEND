const joi = require('@hapi/joi');

const schema = {
    sendMessage : joi.object({
        message: joi.string().required(),
        receiver: joi.number().required(),
        sender: joi.number().required(),
    }),
    getMessage : joi.object({
        receiver: joi.number().required(),
        sender: joi.number().required(),
    }),
}

module.exports = schema