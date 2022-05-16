const express = require("express");
const router = express.Router();
const productsRouter = require("./products");
const categoryRouter = require("./category");
const transactionsRouter = require("./transactions");
const usersRouter = require("./users");

router
  .use("/products", productsRouter)
  .use("/category", categoryRouter)
  .use("/transactions", transactionsRouter)
  .use("/users", usersRouter);

module.exports = router;

// const productRouter = require("./src/routes/products");
// const categoryRouter = require("./src/routes/category");
// const transactionsRouter = require("./src/routes/transactions");

// app.use("/products", productRouter);
// app.use("/category", categoryRouter);
// app.use("/transactions", transactionsRouter);

// app.get("/transactions", transactionsController.getTransactions);
// app.post("/transactions", transactionsController.insertTransactions);
// app.put("/transactions/:id", transactionsController.updateTransactions);
// app.delete("/transactions/:id", transactionsController.deleteTransactions);
