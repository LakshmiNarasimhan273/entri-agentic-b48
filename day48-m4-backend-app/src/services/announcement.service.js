const crypto = require("crypto");
const { announcements } = require("../models/announcement.model.js");
const trainService = require("./train.service.js");
const { createHttpError } = require("../utils/error.utils.js");

const getAllAnnouncements = () => {
  return announcements;
};

const getAnnouncementById = (id) => {
  const announcement = announcements.find((a) => a.id === id);
  if (!announcement) {
    throw createHttpError(404, "Announcement not found");
  }
  return announcement;
};

const createAnnouncement = (adminUserId, announcementData) => {
  const { title, message, trainId } = announcementData;

  if (trainId) {
    // Verify train exists if specified
    trainService.getTrainById(trainId);
  }

  const now = new Date().toISOString();
  const newAnnouncement = {
    id: "ann_" + crypto.randomBytes(6).toString("hex"),
    title: title.trim(),
    message: message.trim(),
    trainId: trainId || null,
    createdBy: adminUserId,
    createdAt: now,
    updatedAt: now
  };

  announcements.push(newAnnouncement);
  return newAnnouncement;
};

const updateAnnouncement = (id, updates) => {
  const announcement = getAnnouncementById(id);

  if (updates.trainId) {
    trainService.getTrainById(updates.trainId);
    announcement.trainId = updates.trainId;
  } else if (updates.trainId === null) {
    announcement.trainId = null;
  }

  if (updates.title !== undefined) {
    announcement.title = updates.title.trim();
  }

  if (updates.message !== undefined) {
    announcement.message = updates.message.trim();
  }

  announcement.updatedAt = new Date().toISOString();
  return announcement;
};

const deleteAnnouncement = (id) => {
  const index = announcements.findIndex((a) => a.id === id);
  if (index === -1) {
    throw createHttpError(404, "Announcement not found");
  }

  const [deleted] = announcements.splice(index, 1);
  return deleted;
};

module.exports = {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};

