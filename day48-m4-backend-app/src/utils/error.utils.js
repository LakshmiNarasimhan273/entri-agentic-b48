const { sendError } = require("./response.utils.js");

const createHttpError = (statusCode, message, errors) => {
  const errorObj = {
    isHttpError: true,
    statusCode: statusCode || 500,
    message: message || "Internal Server Error"
  };

  if (errors !== undefined && errors !== null) {
    errorObj.errors = errors;
  }

  return errorObj;
};

const errorHandlerMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    err && typeof err.statusCode === "number" && err.statusCode >= 400 && err.statusCode < 600
      ? err.statusCode
      : 500;

  const message =
    statusCode === 500
      ? "Internal Server Error"
      : (err && err.message) || "An error occurred";

  const errors = err && err.errors ? err.errors : undefined;

  return sendError(res, statusCode, message, errors);
};

module.exports = {
  createHttpError,
  errorHandlerMiddleware
};

