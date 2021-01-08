const Joi = require("@hapi/joi")

const validation = {};
validation.registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(30)
            .required(),
        username: Joi.string()
            .min(2)
            .max(50)
            .required(),
        password: Joi.string()
            .min(5)
            .max(1024)
            .required()
    });
    return schema.validate(data);
}

validation.loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(2)
            .max(50)
            .required(),
        password: Joi.string()
            .min(5)
            .max(1024)
            .required()
    });
    return schema.validate(data);
}

module.exports = validation;