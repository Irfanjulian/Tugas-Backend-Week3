const express = require("express");
const router = express.Router();
const transactionsController = require("../controller/transactions");

router
  .get("/", transactionsController.getTransactions)
  .post("/", transactionsController.insertTransactions)
  // .put("/transactions/:id", transactionsRouter.updateTransactions)
  // .delete("/transactions/:id", transactionsRouter.deleteTransactions)

module.exports = router;
