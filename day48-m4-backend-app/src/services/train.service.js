const crypto = require("crypto");
const { trains } = require("../models/train.model.js");
const { bookings } = require("../models/booking.model.js");
const { createHttpError } = require("../utils/error.utils.js");

const getBookedSeatNumbers = (trainId, travelDate) => {
  if (!travelDate) return [];
  const bookedSeatNumbers = [];

  for (const b of bookings) {
    if (b.trainId === trainId && b.travelDate === travelDate && b.status === "CONFIRMED") {
      for (const p of b.passengers) {
        if (p.seatNumber) {
          bookedSeatNumbers.push(p.seatNumber);
        }
      }
    }
  }

  return bookedSeatNumbers;
};

const calculateAvailableSeats = (train, travelDate) => {
  if (!travelDate) {
    return train.totalSeats;
  }
  const bookedSeats = getBookedSeatNumbers(train.id, travelDate);
  const remaining = train.totalSeats - bookedSeats.length;
  return Math.max(0, remaining);
};

const findTrainById = (id) => {
  return trains.find((t) => t.id === id) || null;
};

const getTrainById = (id) => {
  const train = findTrainById(id);
  if (!train) {
    throw createHttpError(404, "Train not found");
  }
  return train;
};

const searchTrains = (filters = {}) => {
  const { source, destination, travelDate } = filters;

  let result = trains.filter((t) => t.status === "ACTIVE");

  if (source) {
    const s = source.trim().toLowerCase();
    result = result.filter((t) => t.source.toLowerCase() === s);
  }

  if (destination) {
    const d = destination.trim().toLowerCase();
    result = result.filter((t) => t.destination.toLowerCase() === d);
  }

  if (travelDate) {
    const dateObj = new Date(travelDate + "T00:00:00Z");
    const dayOfWeek = dateObj.getUTCDay();

    result = result.filter((t) => {
      if (Array.isArray(t.runningDays) && t.runningDays.length > 0) {
        return t.runningDays.includes(dayOfWeek);
      }
      return true;
    });
  }

  return result.map((train) => {
    return {
      ...train,
      availableSeats: calculateAvailableSeats(train, travelDate)
    };
  });
};

const createTrain = (trainData) => {
  const {
    trainNumber,
    name,
    source,
    destination,
    departureTime,
    arrivalTime,
    runningDays,
    totalSeats,
    farePerSeat,
    status = "ACTIVE"
  } = trainData;

  const existing = trains.find((t) => t.trainNumber === trainNumber);
  if (existing) {
    throw createHttpError(409, `Train with number ${trainNumber} already exists`);
  }

  const now = new Date().toISOString();
  const newTrain = {
    id: "trn_" + crypto.randomBytes(6).toString("hex"),
    trainNumber,
    name,
    source,
    destination,
    departureTime,
    arrivalTime,
    runningDays: Array.isArray(runningDays) ? runningDays : [0, 1, 2, 3, 4, 5, 6],
    totalSeats: parseInt(totalSeats, 10),
    farePerSeat: parseFloat(farePerSeat),
    status,
    createdAt: now,
    updatedAt: now
  };

  trains.push(newTrain);
  return newTrain;
};

const updateTrain = (id, updates) => {
  const train = getTrainById(id);

  if (updates.trainNumber && updates.trainNumber !== train.trainNumber) {
    const duplicate = trains.find(
      (t) => t.trainNumber === updates.trainNumber && t.id !== id
    );
    if (duplicate) {
      throw createHttpError(
        409,
        `Train number ${updates.trainNumber} is already used by another train`
      );
    }
    train.trainNumber = updates.trainNumber;
  }

  if (updates.name !== undefined) train.name = updates.name;
  if (updates.source !== undefined) train.source = updates.source;
  if (updates.destination !== undefined) train.destination = updates.destination;
  if (updates.departureTime !== undefined) train.departureTime = updates.departureTime;
  if (updates.arrivalTime !== undefined) train.arrivalTime = updates.arrivalTime;
  if (updates.runningDays !== undefined && Array.isArray(updates.runningDays)) {
    train.runningDays = updates.runningDays;
  }
  if (updates.totalSeats !== undefined) {
    train.totalSeats = parseInt(updates.totalSeats, 10);
  }
  if (updates.farePerSeat !== undefined) {
    train.farePerSeat = parseFloat(updates.farePerSeat);
  }
  if (updates.status !== undefined) train.status = updates.status;

  train.updatedAt = new Date().toISOString();
  return train;
};

const deleteTrain = (id) => {
  const trainIndex = trains.findIndex((t) => t.id === id);
  if (trainIndex === -1) {
    throw createHttpError(404, "Train not found");
  }

  const today = new Date().toISOString().slice(0, 10);
  const hasFutureConfirmedBookings = bookings.some(
    (b) => b.trainId === id && b.status === "CONFIRMED" && b.travelDate >= today
  );

  if (hasFutureConfirmedBookings) {
    throw createHttpError(
      409,
      "Cannot delete train: active CONFIRMED future bookings exist for this train"
    );
  }

  const [deletedTrain] = trains.splice(trainIndex, 1);
  return deletedTrain;
};

module.exports = {
  findTrainById,
  getTrainById,
  getBookedSeatNumbers,
  calculateAvailableSeats,
  searchTrains,
  createTrain,
  updateTrain,
  deleteTrain
};

