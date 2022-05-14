const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");

// ===> category/....
router.get("/", categoryController.getCategory);
router.post("/", categoryController.insertCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;

