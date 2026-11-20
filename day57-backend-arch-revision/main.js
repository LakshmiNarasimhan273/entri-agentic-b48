const express = require("express");
require("dotenv").config();
const app = express();

const dbConnection = require("./config/dbConnection.config");

const leadRoutes = require("./routes/leads.routes");
const errorHandler = require("./utils/errorHandler");

app.use(express.json());
app.use(errorHandler);

app.use("/api/leads", leadRoutes);

dbConnection();
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});