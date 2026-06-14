const RatingService = require("./rating.service");

const { ratingSchema, } = require("./rating.validator");

const submitRating = async (req, res) => {
    try {
        const { error } =
            ratingSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message:
                    error.details[0].message,
            });
        }

        const result =
            await RatingService.submitRating(
                req.user.id,
                req.body.storeId,
                req.body.rating
            );

        return res.status(201).json({
            success: true,
            message: "Rating submitted successfully",
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const updateRating = async (req, res) => {
    try {
        const result =
            await RatingService.updateRating(
                req.params.id,
                req.user.id,
                req.body.rating
            );

        return res.json({
            success: true,
            message: "Rating updated successfully",
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    submitRating,
    updateRating,
};