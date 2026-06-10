const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  
  console.log("LOGIN CONTROLLER UPDATED");
  const userModel = mongoose.model("user");

  const { email, password } = req.body;

  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) {
    throw new Error("Email does not exist");
  }

  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) {
    throw new Error("Email and Password do not match");
  }

  const accessToken = jwtManager(getUser);

  console.log("SENDING USER:", {
    _id: getUser._id,
    name: getUser.name,
    email: getUser.email,
  });

  res.status(200).json({
    status: "Success",
    message: "User Login Successful",
    accessToken,

    user: {
      _id: getUser._id,
      name: getUser.name,
      email: getUser.email,
    },
  });
};

module.exports = login;
