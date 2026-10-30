const crypto = require("crypto");
const { users } = require("../models/user.model.js");
const { bookings } = require("../models/booking.model.js");
const { refunds } = require("../models/refund.model.js");
const { createHttpError } = require("../utils/error.utils.js");

const sanitizeUser = (user) => {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt
  };
};

const findUserByEmail = (email) => {
  if (!email) return null;
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === normalized) || null;
};

const findUserById = (id) => {
  if (!id) return null;
  return users.find((u) => u.id === id) || null;
};

const createUser = (userData) => {
  const { name, email, phone, passwordHash, salt, role } = userData;

  const existing = findUserByEmail(email);
  if (existing) {
    throw createHttpError(409, "User with this email already exists");
  }

  const user = {
    id: "usr_" + crypto.randomBytes(6).toString("hex"),
    name,
    email: email.trim().toLowerCase(),
    phone,
    passwordHash,
    salt,
    role: role || "customer",
    createdAt: new Date().toISOString()
  };

  users.push(user);
  return sanitizeUser(user);
};

const getUserProfile = (userId) => {
  const user = findUserById(userId);
  if (!user) {
    throw createHttpError(404, "User profile not found");
  }

  const userBookings = bookings ? bookings.filter((b) => b.userId === userId) : [];
  const userRefunds = refunds ? refunds.filter((r) => r.userId === userId) : [];

  return {
    user: sanitizeUser(user),
    bookings: userBookings,
    refunds: userRefunds
  };
};

module.exports = {
  sanitizeUser,
  findUserByEmail,
  findUserById,
  createUser,
  getUserProfile
};

