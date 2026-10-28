const express = require("express");
const router = express.Router();

const userAuth = require("../security/userauth.security");
const authValidation = require("../middlewares/userValidation");

// localhost:8081/api/users/register
router.post("/register", authValidation.validateRegister, userAuth.registerUser);

router.post("/login", authValidation.validateLogin, userAuth.loginUser);

module.exports = router;