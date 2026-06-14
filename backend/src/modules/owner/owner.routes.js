const router = require("express").Router();
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");
const OwnerController = require("./owner.controller");

router.get("/dashboard", authMiddleware, roleMiddleware("STORE_OWNER"), OwnerController.dashboard);

module.exports = router;