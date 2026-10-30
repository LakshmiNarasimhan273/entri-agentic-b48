const trainService = require("../services/train.service.js");
const { sendSuccess } = require("../utils/response.utils.js");

const searchTrains = (req, res, next) => {
  try {
    const trains = trainService.searchTrains(req.query);
    return sendSuccess(res, 200, "Trains retrieved successfully", trains);
  } catch (err) {
    next(err);
  }
};

const getTrainById = (req, res, next) => {
  try {
    const train = trainService.getTrainById(req.params.id);
    return sendSuccess(res, 200, "Train details retrieved successfully", train);
  } catch (err) {
    next(err);
  }
};

const createTrain = (req, res, next) => {
  try {
    const train = trainService.createTrain(req.body);
    return sendSuccess(res, 201, "Train created successfully", train);
  } catch (err) {
    next(err);
  }
};

const updateTrain = (req, res, next) => {
  try {
    const train = trainService.updateTrain(req.params.id, req.body);
    return sendSuccess(res, 200, "Train updated successfully", train);
  } catch (err) {
    next(err);
  }
};

const deleteTrain = (req, res, next) => {
  try {
    const deleted = trainService.deleteTrain(req.params.id);
    return sendSuccess(res, 200, "Train deleted successfully", deleted);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  searchTrains,
  getTrainById,
  createTrain,
  updateTrain,
  deleteTrain
};

