const mongoose = require("mongoose");

const getTransactions = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");
  const usersModel = mongoose.model("user");

  console.log(req.query);

  // Get User
  const user = await usersModel.findById(req.user._id);

  // Get Transactions
  const transactions = await transactionsModel.find({
    user_id: req.user._id,
    ...req.query,
  });

  res.status(200).json({
    status: "Success",

    user: {
      name: user.name,
      email: user.email,
      balance: user.balance,
    },

    transactions,
  });
};

module.exports = getTransactions;
