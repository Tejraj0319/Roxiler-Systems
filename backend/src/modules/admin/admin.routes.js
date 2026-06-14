const router = require("express").Router();
const AdminController = require("./admin.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

router.use(authMiddleware, roleMiddleware("ADMIN"));

router.get("/dashboard", AdminController.dashboard);

router.post("/users", AdminController.createUser);

router.get("/users", AdminController.getUsers);

router.get("/users/:id", AdminController.getUserById);

router.post("/stores", AdminController.createStore);

router.get("/stores", AdminController.getStores);

router.get("/stores/:id", AdminController.getStoreById);

module.exports = router;