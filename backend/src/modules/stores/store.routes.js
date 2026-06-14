const router = require("express").Router();
const authMiddleware = require("../../middleware/auth.middleware");
const StoreController = require("./store.controller");

router.get("/", authMiddleware, StoreController.getStores);

module.exports = router;