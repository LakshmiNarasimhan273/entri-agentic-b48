const crypto = require("crypto");
const { bookings } = require("../models/booking.model.js");
const trainService = require("./train.service.js");
const refundService = require("./refund.service.js");
const { createHttpError } = require("../utils/error.utils.js");

const generatePNR = () => {
  let pnr;
  let exists = true;
  while (exists) {
    pnr = "PNR" + crypto.randomBytes(4).toString("hex").toUpperCase().slice(0, 7);
    exists = bookings.some((b) => b.pnr === pnr);
  }
  return pnr;
};

const createBooking = (userId, bookingData) => {
  const { trainId, travelDate, passengers } = bookingData;

  const today = new Date().toISOString().slice(0, 10);
  if (travelDate < today) {
    throw createHttpError(400, "travelDate cannot be in the past");
  }

  const train = trainService.getTrainById(trainId);
  if (train.status !== "ACTIVE") {
    throw createHttpError(400, "Train is currently inactive and cannot be booked");
  }

  if (Array.isArray(train.runningDays) && train.runningDays.length > 0) {
    const travelDay = new Date(travelDate + "T00:00:00Z").getUTCDay();
    if (!train.runningDays.includes(travelDay)) {
      throw createHttpError(400, `Train ${train.trainNumber} does not run on the selected date`);
    }
  }

  if (!Array.isArray(passengers) || passengers.length === 0) {
    throw createHttpError(400, "At least one passenger is required");
  }

  // Retrieve already booked seats
  const occupiedSeatNumbers = new Set(trainService.getBookedSeatNumbers(trainId, travelDate));
  const availableCount = train.totalSeats - occupiedSeatNumbers.size;

  if (passengers.length > availableCount) {
    throw createHttpError(
      400,
      `Insufficient seat availability. Requested ${passengers.length}, but only ${availableCount} seats are available.`
    );
  }

  // Validate manually specified seats
  const allocatedSeatsInRequest = new Set();
  for (const p of passengers) {
    if (p.seatNumber !== undefined && p.seatNumber !== null) {
      const seat = parseInt(p.seatNumber, 10);
      if (Number.isNaN(seat) || seat < 1 || seat > train.totalSeats) {
        throw createHttpError(
          400,
          `Invalid seat number ${p.seatNumber}. Valid seats are between 1 and ${train.totalSeats}.`
        );
      }
      if (occupiedSeatNumbers.has(seat)) {
        throw createHttpError(
          409,
          `Seat number ${seat} is already booked for train ${train.trainNumber} on ${travelDate}.`
        );
      }
      if (allocatedSeatsInRequest.has(seat)) {
        throw createHttpError(
          400,
          `Duplicate seat number ${seat} requested for multiple passengers in the same booking.`
        );
      }
      allocatedSeatsInRequest.add(seat);
    }
  }

  // Allocate seats (specified first, then auto-assign lowest available)
  const allReservedSeats = new Set([...occupiedSeatNumbers, ...allocatedSeatsInRequest]);
  const processedPassengers = [];

  for (const p of passengers) {
    let assignedSeat;
    if (p.seatNumber !== undefined && p.seatNumber !== null) {
      assignedSeat = parseInt(p.seatNumber, 10);
    } else {
      // Find lowest available seat number
      for (let s = 1; s <= train.totalSeats; s += 1) {
        if (!allReservedSeats.has(s)) {
          assignedSeat = s;
          allReservedSeats.add(s);
          break;
        }
      }
    }

    if (!assignedSeat) {
      throw createHttpError(400, "Unable to assign a seat due to availability constraints.");
    }

    processedPassengers.push({
      name: p.name.trim(),
      age: parseInt(p.age, 10),
      gender: p.gender.trim().toUpperCase(),
      seatNumber: assignedSeat
    });
  }

  const totalFare = processedPassengers.length * train.farePerSeat;
  const now = new Date().toISOString();

  const newBooking = {
    id: "bkg_" + crypto.randomBytes(6).toString("hex"),
    pnr: generatePNR(),
    userId,
    trainId,
    travelDate,
    passengers: processedPassengers,
    totalFare,
    status: "CONFIRMED",
    refundStatus: "NONE",
    bookedAt: now,
    cancelledAt: null
  };

  bookings.push(newBooking);
  return newBooking;
};

const getBookingById = (id, requestingUser) => {
  const booking = bookings.find((b) => b.id === id);
  if (!booking) {
    throw createHttpError(404, "Booking not found");
  }

  if (requestingUser.role !== "admin" && booking.userId !== requestingUser.userId) {
    throw createHttpError(403, "Access denied: you can only view your own bookings");
  }

  return booking;
};

const getBookingByPNR = (pnr, requestingUser) => {
  const booking = bookings.find((b) => b.pnr.toUpperCase() === pnr.toUpperCase());
  if (!booking) {
    throw createHttpError(404, "Booking with given PNR not found");
  }

  if (requestingUser.role !== "admin" && booking.userId !== requestingUser.userId) {
    throw createHttpError(403, "Access denied: you can only view your own bookings");
  }

  return booking;
};

const getBookingsByUserId = (userId) => {
  return bookings.filter((b) => b.userId === userId);
};

const getAllBookings = (filters = {}) => {
  const { trainId, userId, status, travelDate } = filters;

  return bookings.filter((b) => {
    if (trainId && b.trainId !== trainId) return false;
    if (userId && b.userId !== userId) return false;
    if (status && b.status !== status) return false;
    if (travelDate && b.travelDate !== travelDate) return false;
    return true;
  });
};

const cancelBooking = (bookingId, requestingUser) => {
  const booking = bookings.find((b) => b.id === bookingId);
  if (!booking) {
    throw createHttpError(404, "Booking not found");
  }

  if (requestingUser.role !== "admin" && booking.userId !== requestingUser.userId) {
    throw createHttpError(403, "Access denied: you can only cancel your own bookings");
  }

  if (booking.status !== "CONFIRMED") {
    throw createHttpError(400, `Cannot cancel booking with status: ${booking.status}`);
  }

  const train = trainService.getTrainById(booking.trainId);
  const [depHours, depMinutes] = train.departureTime.split(":").map(Number);
  const [year, month, day] = booking.travelDate.split("-").map(Number);
  const departureDate = new Date(year, month - 1, day, depHours, depMinutes, 0);
  const now = new Date();

  if (now.getTime() >= departureDate.getTime()) {
    throw createHttpError(400, "Cannot cancel booking after train departure");
  }

  const diffHours = (departureDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  const refundRate = diffHours > 24 ? 0.9 : 0.5;
  const refundAmount = Math.round(booking.totalFare * refundRate * 100) / 100;

  booking.status = "CANCELLED";
  booking.cancelledAt = now.toISOString();
  booking.refundStatus = "PENDING";

  const refund = refundService.createRefundRecord(booking.id, booking.userId, refundAmount);

  return {
    booking,
    refund
  };
};

module.exports = {
  generatePNR,
  createBooking,
  getBookingById,
  getBookingByPNR,
  getBookingsByUserId,
  getAllBookings,
  cancelBooking
};
