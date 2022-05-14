require("dotenv").config();

const express = require("express");
const productRouter = require("./src/routes/products");
const categoryRouter = require("./src/routes/category");
const transactionsRouter = require("./src/routes/transactions");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const helmet = require("helmet");
const xss = require('xss-clean')

// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss())

// Router
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/transactions", transactionsRouter);

// transactions
// app.get("/transactions", transactionsController.getTransactions);
// app.post("/transactions", transactionsController.insertTransactions);
// app.put("/transactions/:id", transactionsController.updateTransactions);
// app.delete("/transactions/:id", transactionsController.deleteTransactions);

// Error Handling
app.use((err, req, res, next) => {
  const messError = err.message || "internal server error";
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: messError
  });
});

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
