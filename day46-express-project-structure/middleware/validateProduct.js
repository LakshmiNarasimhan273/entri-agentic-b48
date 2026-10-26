const validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || price === undefined || price === null) {
    return res.status(400).json({
      message: "Name and price are required"
    });
  }

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      message: "Name must be a non-empty string"
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      message: "Price must be a positive number"
    });
  }

  next();
};

module.exports = validateProduct;