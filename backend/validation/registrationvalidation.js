const Joi = require('joi');

const registrationValidation = Joi.object({
    nomprenom: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.base': `"nomprenom" should be a type of 'text'`,
            'string.empty': `"nomprenom" cannot be an empty field`,
            'string.min': `"nomprenom" should have a minimum length of {#limit}`,
            'any.required': `"nomprenom" is a required field`
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': `"email" must be a valid email`,
            'any.required': `"email" is a required field`
        }),

    phone: Joi.string()
        .pattern(/^[0-9]{8,15}$/)
        .required()
        .messages({
            'string.pattern.base': `"phone" must be a valid phone number`,
            'any.required': `"phone" is a required field`
        }),

    teamname: Joi.string()
        .max(100)
        .optional(),

    skills: Joi.string()
        .required()
        .messages({
            'string.base': `"skills" should be a type of 'text'`,
            'string.empty': `"skills" cannot be an empty field`,
            'any.required': `"skills" is a required field`
        }),

    message: Joi.string()
        .optional()
});

module.exports = registrationValidation;
