const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const jsonwebtoken = require("jsonwebtoken");
const login = async (req, res) => {
  const userModel = mongoose.model("user");
  const { email, password } = req.body;

  const getUser = await userModel.findOne({
    email: email,
  });
  if (!getUser) throw new Error("Email  does not exist");

  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) throw Error("Email and Password do not match");

  const accessToken = jwtManager(getUser);

  res.status(200).json({
    status: "Success",
    message: "User Login Successful",
    accessToken: accessToken,
  });
};
module.exports = login;
