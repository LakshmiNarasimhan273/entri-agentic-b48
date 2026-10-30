const express = require("express");
const bookingController = require("../controllers/booking.controller.js");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware.js");
const {
  validateBody,
  validateParams,
  validateQuery,
  patterns,
  isValidDate
} = require("../middlewares/validation.middleware.js");

const bookingRouter = express.Router();

const idParamSchema = {
  id: {
    required: true,
    pattern: patterns.id,
    message: "Booking ID must be a valid identifier"
  }
};

const pnrParamSchema = {
  pnr: {
    required: true,
    pattern: patterns.pnr,
    message: "PNR must be a valid alphanumeric code"
  }
};

const createBookingSchema = {
  trainId: {
    required: true,
    pattern: patterns.id,
    message: "trainId is required and must be valid"
  },
  travelDate: {
    required: true,
    validator: (val) => isValidDate(val),
    message: "travelDate must be a valid date in YYYY-MM-DD format"
  },
  passengers: {
    required: true,
    validator: (val) => {
      if (!Array.isArray(val) || val.length === 0) return false;
      return val.every((p) => {
        if (!p || typeof p !== "object") return false;
        const validName = typeof p.name === "string" && patterns.name.test(p.name.trim());
        const ageNum = parseInt(p.age, 10);
        const validAge = Number.isInteger(ageNum) && ageNum > 0 && ageNum <= 120;
        const validGender =
          typeof p.gender === "string" && /^(m|f|o|male|female|other)$/i.test(p.gender.trim());
        const validSeat =
          p.seatNumber === undefined ||
          p.seatNumber === null ||
          (Number.isInteger(parseInt(p.seatNumber, 10)) && parseInt(p.seatNumber, 10) > 0);
        return validName && validAge && validGender && validSeat;
      });
    },
    message:
      "passengers must be a non-empty array with valid passenger details (name: 2-50 chars, age: 1-120, gender: M/F/O, optional positive seatNumber)"
  }
};

const adminBookingsQuerySchema = {
  trainId: {
    required: false,
    pattern: patterns.id,
    message: "trainId must be a valid identifier"
  },
  userId: {
    required: false,
    pattern: patterns.id,
    message: "userId must be a valid identifier"
  },
  status: {
    required: false,
    pattern: /^(CONFIRMED|CANCELLED)$/,
    message: "status must be CONFIRMED or CANCELLED"
  },
  travelDate: {
    required: false,
    validator: (val) => !val || isValidDate(val),
    message: "travelDate must be a valid date in YYYY-MM-DD format"
  }
};

// Customer list own bookings (must be before /:id)
bookingRouter.get("/my", authenticate, authorizeRoles("customer"), bookingController.getMyBookings);

// Admin view all bookings (with optional filters)
bookingRouter.get(
  "/",
  authenticate,
  authorizeRoles("admin"),
  validateQuery(adminBookingsQuerySchema),
  bookingController.getAllBookings
);

// Lookup by PNR (customer own or admin)
bookingRouter.get(
  "/pnr/:pnr",
  authenticate,
  authorizeRoles("customer", "admin"),
  validateParams(pnrParamSchema),
  bookingController.getBookingByPNR
);

// Lookup by ID (customer own or admin)
bookingRouter.get(
  "/:id",
  authenticate,
  authorizeRoles("customer", "admin"),
  validateParams(idParamSchema),
  bookingController.getBookingById
);

// Book ticket (customer only)
bookingRouter.post(
  "/",
  authenticate,
  authorizeRoles("customer"),
  validateBody(createBookingSchema),
  bookingController.createBooking
);

// Cancel ticket (customer only)
bookingRouter.patch(
  "/:id/cancel",
  authenticate,
  authorizeRoles("customer"),
  validateParams(idParamSchema),
  bookingController.cancelBooking
);

module.exports = bookingRouter;
