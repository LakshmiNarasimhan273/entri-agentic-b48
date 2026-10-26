const productService = require("../services/product.service");

const getProducts = (req, res, next) => {
  try {
    const products = productService.getProducts();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const createProduct = (req, res, next) => {
  try {
    const { name, price } = req.body;

    const product = productService.createProduct(name, price);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, createProduct };