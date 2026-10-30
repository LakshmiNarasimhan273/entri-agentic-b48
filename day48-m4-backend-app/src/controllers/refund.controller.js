const refundService = require("../services/refund.service.js");
const { sendSuccess } = require("../utils/response.utils.js");

const getMyRefunds = (req, res, next) => {
  try {
    const refunds = refundService.getRefundsByUserId(req.user.userId);
    return sendSuccess(res, 200, "My refunds retrieved successfully", refunds);
  } catch (err) {
    next(err);
  }
};

const getAllRefunds = (req, res, next) => {
  try {
    const refunds = refundService.getAllRefunds(req.query);
    return sendSuccess(res, 200, "All refunds retrieved successfully", refunds);
  } catch (err) {
    next(err);
  }
};

const processRefund = (req, res, next) => {
  try {
    const result = refundService.processRefund(req.params.id, req.user.userId, req.body);
    return sendSuccess(res, 200, "Refund processed successfully", result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyRefunds,
  getAllRefunds,
  processRefund
};

