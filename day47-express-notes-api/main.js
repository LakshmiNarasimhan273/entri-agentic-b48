const express = require("express");
const {PORT} = require("./config/server.config");

const userRoutes = require("./routes/userauth.route");
const noteRoutes = require("./routes/notes.route");

const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(errorHandler);

app.get("/health", (req, res) => {
    res.send("Notes API Running");
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})