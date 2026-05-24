const express = require("express");
const cors = require("cors");
const errorhandler = require("./Handlers/errorhandler");
const jwtManager = require("./managers/jwtManager");
require("dotenv").config();
const mongoose = require("mongoose");
//Model initialization
const user = require("./Models/user.model");
const transactions = require("./Models/transactions.model");

const userroutes = require("./Modules/Users/user.Routes");
const transactionRoutes = require("./Modules/Transactions/transaction.routes");

// Connect to MongoDB
mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/users", userroutes);
app.use("/api/transactions", transactionRoutes);

//End of all routes

app.use((req, res) => {
  res.status(404).json({
    status: "failed",
    message: "NOT FOUND!",
  });
});

app.use(errorhandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000\nhttp://localhost:3000");
});
