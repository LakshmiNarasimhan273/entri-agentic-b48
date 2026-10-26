const products = require("../models/product.model");

const getProducts = () => {
  return products;
};

const createProduct = (name, price) => {
  const product = {
    id: Date.now(),
    name,
    price
  };

  products.push(product);

  return product;
};

module.exports = { getProducts, createProduct };