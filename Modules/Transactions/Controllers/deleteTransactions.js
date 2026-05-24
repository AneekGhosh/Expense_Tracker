const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");
  const usersModel = mongoose.model("user");

  const { transaction_id } = req.params;

  if (!transaction_id || !validator.isMongoId(transaction_id.toString())) {
    return res.status(400).json({
      status: "Failed",
      message: "Please provide a valid id!",
    });
  }

  const getTransaction = await transactionsModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) {
    return res.status(404).json({
      status: "Failed",
      message: "Transaction not found!",
    });
  }

  const amount = Number(getTransaction.amount || 0);

  if (getTransaction.transaction_type === "income") {
    await usersModel.updateOne(
      { _id: getTransaction.user_id },
      { $inc: { balance: -amount } },
    );
  } else {
    await usersModel.updateOne(
      { _id: getTransaction.user_id },
      { $inc: { balance: amount } },
    );
  }

  // ✅ FIXED here
  await transactionsModel.deleteOne({
    _id: transaction_id,
  });

  res.status(200).json({
    status: "Deleted successfully!",
  });
};

module.exports = deleteTransaction;
