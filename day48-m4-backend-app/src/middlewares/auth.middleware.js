const { verifyToken } = require("../security/auth.security.js");
const { createHttpError } = require("../utils/error.utils.js");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createHttpError(401, "Authentication token is required");
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        createHttpError(403, "Forbidden: you do not have permission to access this resource")
      );
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorizeRoles
};

