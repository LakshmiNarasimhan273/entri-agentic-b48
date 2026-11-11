const express = require("express");
const router = express.Router();

const authSecurity = require("../security/userauth.security");

router.post("/register", authSecurity.registerApi);

router.post("/login", authSecurity.loginApi);

module.exports = router;