const express = require("express");
const announcementController = require("../controllers/announcement.controller.js");
const { authenticate, authorizeRoles } = require("../middlewares/auth.middleware.js");
const {
  validateBody,
  validateParams,
  patterns
} = require("../middlewares/validation.middleware.js");

const announcementRouter = express.Router();

const idParamSchema = {
  id: {
    required: true,
    pattern: patterns.id,
    message: "Announcement ID must be a valid identifier"
  }
};

const createAnnouncementSchema = {
  title: {
    required: true,
    validator: (val) => typeof val === "string" && val.trim().length >= 2 && val.trim().length <= 100,
    message: "Title must be between 2 and 100 characters"
  },
  message: {
    required: true,
    validator: (val) => typeof val === "string" && val.trim().length >= 2 && val.trim().length <= 1000,
    message: "Message must be between 2 and 1000 characters"
  },
  trainId: {
    required: false,
    pattern: patterns.id,
    message: "trainId must be a valid identifier"
  }
};

const updateAnnouncementSchema = {
  title: {
    required: false,
    validator: (val) => typeof val === "string" && val.trim().length >= 2 && val.trim().length <= 100,
    message: "Title must be between 2 and 100 characters"
  },
  message: {
    required: false,
    validator: (val) => typeof val === "string" && val.trim().length >= 2 && val.trim().length <= 1000,
    message: "Message must be between 2 and 1000 characters"
  },
  trainId: {
    required: false,
    pattern: patterns.id,
    message: "trainId must be a valid identifier"
  }
};

// Public read access to announcements
announcementRouter.get("/", announcementController.getAllAnnouncements);

// Admin-only management
announcementRouter.post(
  "/",
  authenticate,
  authorizeRoles("admin"),
  validateBody(createAnnouncementSchema),
  announcementController.createAnnouncement
);

announcementRouter.put(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  validateParams(idParamSchema),
  validateBody(updateAnnouncementSchema),
  announcementController.updateAnnouncement
);

announcementRouter.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  validateParams(idParamSchema),
  announcementController.deleteAnnouncement
);

module.exports = announcementRouter;

