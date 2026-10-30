const crypto = require("crypto");
const { refunds } = require("../models/refund.model.js");
const { bookings } = require("../models/booking.model.js");
const { createHttpError } = require("../utils/error.utils.js");

const createRefundRecord = (bookingId, userId, amount) => {
  const refund = {
    id: "ref_" + crypto.randomBytes(6).toString("hex"),
    bookingId,
    userId,
    amount,
    status: "PENDING",
    requestedAt: new Date().toISOString(),
    processedAt: null,
    processedBy: null,
    remarks: ""
  };

  refunds.push(refund);
  return refund;
};

const getRefundsByUserId = (userId) => {
  return refunds.filter((r) => r.userId === userId);
};

const getRefundById = (id) => {
  const refund = refunds.find((r) => r.id === id);
  if (!refund) {
    throw createHttpError(404, "Refund record not found");
  }
  return refund;
};

const getAllRefunds = (filters = {}) => {
  const { status } = filters;
  if (!status) {
    return refunds;
  }
  return refunds.filter((r) => r.status === status);
};

const processRefund = (id, adminUserId, { decision, remarks = "" }) => {
  if (decision !== "APPROVED" && decision !== "REJECTED") {
    throw createHttpError(400, "Decision must be either 'APPROVED' or 'REJECTED'");
  }

  const refund = getRefundById(id);
  if (refund.status !== "PENDING") {
    throw createHttpError(
      409,
      `Refund has already been processed with status: ${refund.status}`
    );
  }

  const now = new Date().toISOString();
  refund.status = decision;
  refund.processedAt = now;
  refund.processedBy = adminUserId;
  refund.remarks = remarks;

  // Update linked booking refundStatus
  const booking = bookings.find((b) => b.id === refund.bookingId);
  if (booking) {
    booking.refundStatus = decision;
  }

  return {
    refund,
    booking
  };
};

module.exports = {
  createRefundRecord,
  getRefundsByUserId,
  getRefundById,
  getAllRefunds,
  processRefund
};

