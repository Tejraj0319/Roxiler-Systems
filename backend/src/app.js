const express = require("express");
const cors = require("cors");
const authRoutes = require("./modules/auth/auth.routes");
const adminRoutes = require("./modules/admin/admin.routes");
const ratingRoutes = require("./modules/ratings/rating.routes");
const storeRoutes = require("./modules/stores/store.routes")
const ownerRoutes = require("./modules/owner/owner.routes")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/ratings", ratingRoutes);
app.use("/stores", storeRoutes);
app.use("/owner", ownerRoutes);


module.exports = app;
