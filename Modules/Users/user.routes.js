const express = require("express");

const register = require("./Controllers/Register");
const login = require("./Controllers/login");
const userDashboard = require("./Controllers/userdashboard");
const forgotPassword = require("./Controllers/forgotpassword");
const resetPassword = require("./Controllers/resetpassword");

const auth = require("../../Middleware/auth");

const userRoutes = express.Router();

// Public Routes
userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.post("/forgotpw", forgotPassword);
userRoutes.post("/resetpw", resetPassword);

// Protected Routes
userRoutes.use(auth);

userRoutes.get("/dashboard", userDashboard);

module.exports = userRoutes;
