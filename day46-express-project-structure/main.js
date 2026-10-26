const express = require("express");
const { PORT } = require("./config/server.config");
const productRoutes = require("./routes/product.route");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(express.json());

app.use("/products", productRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});