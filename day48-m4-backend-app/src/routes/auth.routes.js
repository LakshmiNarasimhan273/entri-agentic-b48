const express = require("express");
const { registerHandler, loginHandler } = require("../security/auth.security.js");
const { validateBody, patterns } = require("../middlewares/validation.middleware.js");

const authRouter = express.Router();

const registerSchema = {
  name: {
    required: true,
    pattern: patterns.name,
    message: "Name must be between 2 and 50 characters (letters and spaces only)"
  },
  email: {
    required: true,
    pattern: patterns.email,
    message: "Email must be a valid email address"
  },
  phone: {
    required: true,
    pattern: patterns.phone,
    message: "Phone must be a valid 10-digit number starting with 6-9"
  },
  password: {
    required: true,
    pattern: patterns.password,
    message:
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  },
  role: {
    required: false,
    pattern: /^(customer|admin)$/,
    message: "Role must be either 'customer' or 'admin'"
  }
};

const loginSchema = {
  email: {
    required: true,
    pattern: patterns.email,
    message: "Email must be a valid email address"
  },
  password: {
    required: true,
    message: "Password is required"
  }
};

authRouter.post("/register", validateBody(registerSchema), registerHandler);
authRouter.post("/login", validateBody(loginSchema), loginHandler);

module.exports = authRouter;

