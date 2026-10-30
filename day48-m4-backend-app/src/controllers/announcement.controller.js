const announcementService = require("../services/announcement.service.js");
const { sendSuccess } = require("../utils/response.utils.js");

const getAllAnnouncements = (req, res, next) => {
  try {
    const list = announcementService.getAllAnnouncements();
    return sendSuccess(res, 200, "Announcements retrieved successfully", list);
  } catch (err) {
    next(err);
  }
};

const createAnnouncement = (req, res, next) => {
  try {
    const created = announcementService.createAnnouncement(req.user.userId, req.body);
    return sendSuccess(res, 201, "Announcement created successfully", created);
  } catch (err) {
    next(err);
  }
};

const updateAnnouncement = (req, res, next) => {
  try {
    const updated = announcementService.updateAnnouncement(req.params.id, req.body);
    return sendSuccess(res, 200, "Announcement updated successfully", updated);
  } catch (err) {
    next(err);
  }
};

const deleteAnnouncement = (req, res, next) => {
  try {
    const deleted = announcementService.deleteAnnouncement(req.params.id);
    return sendSuccess(res, 200, "Announcement deleted successfully", deleted);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};

