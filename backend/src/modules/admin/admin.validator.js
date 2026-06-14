const Joi = require("joi");

const createUserSchema = Joi.object({
    name: Joi.string().min(20).max(60).required(),
    email: Joi.string().email().required(),
    address: Joi.string().max(400).required(),
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/)
        .required(),
    role: Joi.string()
        .valid(
            "ADMIN",
            "USER",
            "STORE_OWNER"
        )
        .required(),
});


const createStoreSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    address: Joi.string().max(400).required(),
    ownerId: Joi.number().required(),
});


module.exports = {
    createUserSchema,
    createStoreSchema,
};