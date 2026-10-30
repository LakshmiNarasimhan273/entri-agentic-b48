const sendSuccess = (res, statusCode = 200, message = "Success", data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const sendError = (res, statusCode = 500, message = "Internal Server Error", errors) => {
  const payload = {
    success: false,
    message
  };

  if (errors !== undefined && errors !== null) {
    payload.errors = errors;
  }

  return res.status(statusCode).json(payload);
};

module.exports = {
  sendSuccess,
  sendError
};

