const express = require("express");
const { getProfile } = require("../controllers/user.controller.js");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware.js");

const userRouter = express.Router();

userRouter.get("/profile", authenticate, authorizeRoles("customer", "admin"), getProfile);

module.exports = userRouter;

