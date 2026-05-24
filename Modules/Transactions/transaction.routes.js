const express = require("express");

const jsonwebtoken = require("jsonwebtoken");

const auth = require("../../Middleware/auth");
const addIncome = require("./Controllers/addIncome");
const addexpense = require("./Controllers/addExpense");
const getTransactions = require("./Controllers/gettransactions");
const deleteTransaction = require("./Controllers/deleteTransactions");
const editTransaction = require("./Controllers/editTransactions");
const transactionRoutes = express.Router();

//Protected Routes
transactionRoutes.use(auth);

transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addexpense);
transactionRoutes.get("/", getTransactions);
transactionRoutes.delete("/:transaction_id", deleteTransaction);
transactionRoutes.patch("/",editTransaction);

module.exports = transactionRoutes;
