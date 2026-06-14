const router = require("express").Router();

const RatingController = require("./rating.controller");

const authMiddleware = require("../../middleware/auth.middleware");

router.post("/", authMiddleware, RatingController.submitRating);

router.put("/store/:id", authMiddleware, RatingController.updateRating);

module.exports = router;