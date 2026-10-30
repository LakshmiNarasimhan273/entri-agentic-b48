const userService = require("../services/user.service.js");
const { sendSuccess } = require("../utils/response.utils.js");

const getProfile = (req, res, next) => {
  try {
    const profile = userService.getUserProfile(req.user.userId);
    return sendSuccess(res, 200, "User profile retrieved successfully", profile);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile
};

