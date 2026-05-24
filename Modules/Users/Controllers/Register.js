const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("user");

  const { email, password, confirm_password, name, balance } = req.body;

  // Validations
  if (!email) throw new Error("Email must be provided!");
  if (!password) throw new Error("Password must be provided!");
  if (password.length < 5) {
    throw new Error("Password must be at least 5 characters long.");
  }

  if (!name) throw new Error("Name is required");
  if (balance === undefined) throw new Error("Balance is required");

  if (password !== confirm_password) {
    throw new Error("Password and confirmed password do not match!");
  }

  // Check duplicate email
  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) {
    throw new Error("This email already exists!");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  // Generate JWT token
  const accessToken = jwtManager(createdUser);

  // Send welcome email
  await emailManager(
    createdUser.email,
    "Welcome to Expense Tracker PRO. We hope you can manage your expenses easily from our platform!",
    "<h1>Welcome to Expense Tracker PRO</h1><br/><p>We hope you can manage your expenses easily from our platform!</p>",
    "Welcome to Expense Tracker PRO!",
  );

  // Response
  res.status(201).json({
    status: "Success",
    message: "User registered successfully!",
    accessToken: accessToken,
  });
};

module.exports = register;
