const express = require("express");
const router = express.Router();
const productController = require("../controller/products");

router.get("/", productController.getProducts);
router.get("/:id", productController.detailProducts);
router.post("/", productController.insertProducts);
router.put("/:id", productController.updateProducts);
router.delete("/:id", productController.deleteProducts);

module.exports = router;
