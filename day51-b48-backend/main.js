const express = require("express");
const app = express();
require("dotenv").config();

const {PORT} = require("./config/server.config");
const dbConnection = require("./config/dbConnection.config");

const errorHandler = require("./utils/errorHandler");
const productRoute = require("./routes/products.route");
const authRoute = require("./routes/auth.routes");

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

app.use(express.json());
app.use(errorHandler);

app.use("/products", productRoute);
app.use("/auth", authRoute);

dbConnection();
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});