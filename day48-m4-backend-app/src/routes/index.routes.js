const express = require("express");
const authRouter = require("./auth.routes.js");
const userRouter = require("./user.routes.js");
const trainRouter = require("./train.routes.js");
const bookingRouter = require("./booking.routes.js");
const refundRouter = require("./refund.routes.js");
const announcementRouter = require("./announcement.routes.js");
const { sendSuccess } = require("../utils/response.utils.js");

const apiRouter = express.Router();

apiRouter.get("/health", (req, res) => {
  return sendSuccess(res, 200, "API is running healthy", { uptime: process.uptime() });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/trains", trainRouter);
apiRouter.use("/bookings", bookingRouter);
apiRouter.use("/refunds", refundRouter);
apiRouter.use("/announcements", announcementRouter);

module.exports = apiRouter;
