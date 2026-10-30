const bookingService = require("../services/booking.service.js");
const { sendSuccess } = require("../utils/response.utils.js");

const createBooking = (req, res, next) => {
  try {
    const booking = bookingService.createBooking(req.user.userId, req.body);
    return sendSuccess(res, 201, "Booking confirmed successfully", booking);
  } catch (err) {
    next(err);
  }
};

const getMyBookings = (req, res, next) => {
  try {
    const userBookings = bookingService.getBookingsByUserId(req.user.userId);
    return sendSuccess(res, 200, "My bookings retrieved successfully", userBookings);
  } catch (err) {
    next(err);
  }
};

const getBookingById = (req, res, next) => {
  try {
    const booking = bookingService.getBookingById(req.params.id, req.user);
    return sendSuccess(res, 200, "Booking details retrieved successfully", booking);
  } catch (err) {
    next(err);
  }
};

const getBookingByPNR = (req, res, next) => {
  try {
    const booking = bookingService.getBookingByPNR(req.params.pnr, req.user);
    return sendSuccess(res, 200, "Booking details retrieved successfully", booking);
  } catch (err) {
    next(err);
  }
};

const getAllBookings = (req, res, next) => {
  try {
    const allBookings = bookingService.getAllBookings(req.query);
    return sendSuccess(res, 200, "All bookings retrieved successfully", allBookings);
  } catch (err) {
    next(err);
  }
};

const cancelBooking = (req, res, next) => {
  try {
    const result = bookingService.cancelBooking(req.params.id, req.user);
    return sendSuccess(res, 200, "Booking cancelled successfully", result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  getBookingByPNR,
  getAllBookings,
  cancelBooking
};
