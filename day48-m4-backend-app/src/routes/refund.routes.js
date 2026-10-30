const express = require("express");
const refundController = require("../controllers/refund.controller.js");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware.js");
const {
  validateBody,
  validateParams,
  validateQuery,
  patterns
} = require("../middlewares/validation.middleware.js");

const refundRouter = express.Router();

const idParamSchema = {
  id: {
    required: true,
    pattern: patterns.id,
    message: "Refund ID must be a valid identifier"
  }
};

const processRefundSchema = {
  decision: {
    required: true,
    pattern: /^(APPROVED|REJECTED)$/,
    message: "decision must be either APPROVED or REJECTED"
  },
  remarks: {
    required: false,
    message: "remarks must be a string"
  }
};

const refundQuerySchema = {
  status: {
    required: false,
    pattern: /^(PENDING|APPROVED|REJECTED)$/,
    message: "status must be PENDING, APPROVED, or REJECTED"
  }
};

// Customer view own refunds (must be before /:id)
refundRouter.get("/my", authenticate, authorizeRoles("customer"), refundController.getMyRefunds);

// Admin list refunds
refundRouter.get(
  "/",
  authenticate,
  authorizeRoles("admin"),
  validateQuery(refundQuerySchema),
  refundController.getAllRefunds
);

// Admin process refund
refundRouter.patch(
  "/:id/process",
  authenticate,
  authorizeRoles("admin"),
  validateParams(idParamSchema),
  validateBody(processRefundSchema),
  refundController.processRefund
);

module.exports = refundRouter;

