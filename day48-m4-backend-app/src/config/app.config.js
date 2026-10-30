const express = require("express");
const apiRouter = require("../routes/index.routes.js");
const { createHttpError, errorHandlerMiddleware } = require("../utils/error.utils.js");

const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use("/api", apiRouter);

  // 404 Catch-all handler
  app.use((req, res, next) => {
    return next(createHttpError(404, `Cannot ${req.method} ${req.originalUrl}`));
  });

  // Global Error Handler
  app.use(errorHandlerMiddleware);

  return app;
};

module.exports = {
  createApp
};

