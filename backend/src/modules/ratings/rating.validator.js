const Joi = require("joi");

const ratingSchema = Joi.object({
    storeId: Joi.number().required(),
    rating: Joi.number().min(1).max(5).required(),
});

module.exports = {
    ratingSchema,
};