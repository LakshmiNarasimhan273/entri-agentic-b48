const express = require("express");
const trainController = require("../controllers/train.controller.js");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware.js");
const {
  validateBody,
  validateParams,
  validateQuery,
  patterns,
  isValidDate
} = require("../middlewares/validation.middleware.js");

const trainRouter = express.Router();

const idParamSchema = {
  id: {
    required: true,
    pattern: patterns.id,
    message: "Train ID must be a valid alphanumeric identifier"
  }
};

const trainQuerySchema = {
  source: {
    required: false,
    pattern: patterns.city,
    message: "Source city must be between 2 and 50 characters"
  },
  destination: {
    required: false,
    pattern: patterns.city,
    message: "Destination city must be between 2 and 50 characters"
  },
  travelDate: {
    required: false,
    validator: (val) => !val || isValidDate(val),
    message: "travelDate must be a valid date in YYYY-MM-DD format"
  }
};

const trainNamePattern = /^[a-zA-Z0-9\s\-]{2,50}$/;

const createTrainSchema = {
  trainNumber: {
    required: true,
    pattern: patterns.trainNumber,
    message: "trainNumber must be exactly 5 digits"
  },
  name: {
    required: true,
    pattern: trainNamePattern,
    message: "Train name must be between 2 and 50 alphanumeric characters"
  },
  source: {
    required: true,
    pattern: patterns.city,
    message: "Source city must be between 2 and 50 characters"
  },
  destination: {
    required: true,
    pattern: patterns.city,
    message: "Destination city must be between 2 and 50 characters"
  },
  departureTime: {
    required: true,
    pattern: patterns.time,
    message: "departureTime must be in HH:mm 24-hour format"
  },
  arrivalTime: {
    required: true,
    pattern: patterns.time,
    message: "arrivalTime must be in HH:mm 24-hour format"
  },
  totalSeats: {
    required: true,
    pattern: patterns.positiveInteger,
    message: "totalSeats must be a positive integer"
  },
  farePerSeat: {
    required: true,
    pattern: patterns.positiveNumber,
    message: "farePerSeat must be a positive number"
  },
  status: {
    required: false,
    pattern: /^(ACTIVE|INACTIVE)$/,
    message: "status must be either ACTIVE or INACTIVE"
  },
  runningDays: {
    required: false,
    validator: (val) =>
      val === undefined ||
      (Array.isArray(val) &&
        val.every((d) => Number.isInteger(d) && d >= 0 && d <= 6)),
    message: "runningDays must be an array of integers between 0 and 6"
  }
};

const updateTrainSchema = {
  trainNumber: {
    required: false,
    pattern: patterns.trainNumber,
    message: "trainNumber must be exactly 5 digits"
  },
  name: {
    required: false,
    pattern: trainNamePattern,
    message: "Train name must be between 2 and 50 alphanumeric characters"
  },
  source: {
    required: false,
    pattern: patterns.city,
    message: "Source city must be between 2 and 50 characters"
  },
  destination: {
    required: false,
    pattern: patterns.city,
    message: "Destination city must be between 2 and 50 characters"
  },
  departureTime: {
    required: false,
    pattern: patterns.time,
    message: "departureTime must be in HH:mm 24-hour format"
  },
  arrivalTime: {
    required: false,
    pattern: patterns.time,
    message: "arrivalTime must be in HH:mm 24-hour format"
  },
  totalSeats: {
    required: false,
    pattern: patterns.positiveInteger,
    message: "totalSeats must be a positive integer"
  },
  farePerSeat: {
    required: false,
    pattern: patterns.positiveNumber,
    message: "farePerSeat must be a positive number"
  },
  status: {
    required: false,
    pattern: /^(ACTIVE|INACTIVE)$/,
    message: "status must be either ACTIVE or INACTIVE"
  },
  runningDays: {
    required: false,
    validator: (val) =>
      val === undefined ||
      (Array.isArray(val) &&
        val.every((d) => Number.isInteger(d) && d >= 0 && d <= 6)),
    message: "runningDays must be an array of integers between 0 and 6"
  }
};

trainRouter.get(
  "/",
  authenticate,
  authorizeRoles("customer", "admin"),
  validateQuery(trainQuerySchema),
  trainController.searchTrains
);

trainRouter.get(
  "/:id",
  authenticate,
  authorizeRoles("customer", "admin"),
  validateParams(idParamSchema),
  trainController.getTrainById
);

trainRouter.post(
  "/",
  authenticate,
  authorizeRoles("admin"),
  validateBody(createTrainSchema),
  trainController.createTrain
);

trainRouter.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  validateParams(idParamSchema),
  validateBody(updateTrainSchema),
  trainController.updateTrain
);

trainRouter.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  validateParams(idParamSchema),
  trainController.deleteTrain
);

module.exports = trainRouter;

