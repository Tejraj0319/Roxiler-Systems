const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().min(20).max(60).required(),
    email: Joi.string().email().required(),
    address: Joi.string().max(400).required(),
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/)
        .required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});


const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/)
        .required(),
});

module.exports = {
    registerSchema,
    loginSchema,
    changePasswordSchema
};