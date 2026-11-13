const express = require("express");
const router = express.Router();

const productController = require("../controllers/products.controller");
const authMiddleware = require("../middleware/authz.middleware");

router.post("/", authMiddleware("seller"), productController.createProduct); // access -> seller
router.get("/", authMiddleware("customer", "seller"), productController.getallProducts); // access -> both roles
router.put("/:id", authMiddleware("seller"), productController.updateProduct); // access -> seller
router.delete("/:id", authMiddleware("seller"), productController.deleteProduct); // access -> seller

module.exports = router;