const router = require("express").Router();
const AuthController = require("./auth.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.put("/change-password", authMiddleware, AuthController.changePassword);

module.exports = router;