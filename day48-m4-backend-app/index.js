require("dotenv").config();

const serverConfig = require("./src/config/server.config.js");
const { createApp } = require("./src/config/app.config.js");

const app = createApp();

const server = app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port}`);
});

module.exports = { app, server };

