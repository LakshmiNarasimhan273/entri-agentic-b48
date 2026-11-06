const express = require("express");
const app = express();
require("dotenv").config();

const {PORT} = require("./config/server.config");
const dbConnection = require("./config/dbConnection.config");

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dbConnection();
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});