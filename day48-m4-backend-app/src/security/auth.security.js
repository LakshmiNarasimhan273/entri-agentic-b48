const crypto = require("crypto");
const serverConfig = require("../config/server.config.js");
const userService = require("../services/user.service.js");
const { sendSuccess } = require("../utils/response.utils.js");
const { createHttpError } = require("../utils/error.utils.js");

const base64UrlEncode = (str) => Buffer.from(str, "utf8").toString("base64url");
const base64UrlDecode = (str) => Buffer.from(str, "base64url").toString("utf8");

const generateSalt = () => crypto.randomBytes(16).toString("hex");

const hashPassword = (password, salt) => {
  return crypto.scryptSync(password, salt, 64).toString("hex");
};

const verifyPassword = (password, salt, storedHash) => {
  const hash = hashPassword(password, salt);
  const hashBuf = Buffer.from(hash, "hex");
  const storedBuf = Buffer.from(storedHash, "hex");
  if (hashBuf.length !== storedBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(hashBuf, storedBuf);
};

const createToken = (payload) => {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const exp = now + serverConfig.tokenExpiryMinutes * 60;
  const tokenPayload = { ...payload, iat: now, exp };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(tokenPayload));
  const signature = crypto
    .createHmac("sha256", serverConfig.tokenSecret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

const verifyToken = (token) => {
  if (!token || typeof token !== "string") {
    throw createHttpError(401, "Authentication token required");
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw createHttpError(401, "Malformed authentication token");
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", serverConfig.tokenSecret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSignature);

  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    throw createHttpError(401, "Invalid token signature");
  }

  let payload;
  try {
    payload = JSON.parse(base64UrlDecode(encodedPayload));
  } catch (err) {
    throw createHttpError(401, "Invalid token payload");
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    throw createHttpError(401, "Token has expired");
  }

  return payload;
};

const registerHandler = (req, res, next) => {
  try {
    const { name, email, phone, password, role = "customer", adminKey } = req.body;

    if (role === "admin") {
      if (!adminKey || adminKey !== serverConfig.adminRegistrationKey) {
        throw createHttpError(403, "Invalid admin registration key");
      }
    } else if (role !== "customer") {
      throw createHttpError(400, "Invalid role specified. Must be 'customer' or 'admin'");
    }

    const existingUser = userService.findUserByEmail(email);
    if (existingUser) {
      throw createHttpError(409, "Email is already registered");
    }

    const salt = generateSalt();
    const passwordHash = hashPassword(password, salt);

    const safeUser = userService.createUser({
      name,
      email,
      phone,
      passwordHash,
      salt,
      role
    });

    const token = createToken({
      userId: safeUser.id,
      email: safeUser.email,
      role: safeUser.role
    });

    return sendSuccess(res, 201, "User registered successfully", {
      user: safeUser,
      token
    });
  } catch (err) {
    next(err);
  }
};

const loginHandler = (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = userService.findUserByEmail(email);
    if (!user) {
      throw createHttpError(401, "Invalid email or password");
    }

    const isValid = verifyPassword(password, user.salt, user.passwordHash);
    if (!isValid) {
      throw createHttpError(401, "Invalid email or password");
    }

    const safeUser = userService.sanitizeUser(user);
    const token = createToken({
      userId: safeUser.id,
      email: safeUser.email,
      role: safeUser.role
    });

    return sendSuccess(res, 200, "Login successful", {
      token,
      user: safeUser
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  createToken,
  verifyToken,
  registerHandler,
  loginHandler
};

