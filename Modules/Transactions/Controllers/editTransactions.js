const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");

  const { transaction_id, remarks, amount, transaction_type } = req.body || {};

  if (!transaction_id) {
    return res.status(400).json({
      status: "Failed",
      message: "Transaction id is required!",
    });
  }

  if (
    transaction_type &&
    transaction_type !== "income" &&
    transaction_type !== "expense"
  ) {
    return res.status(400).json({
      status: "Failed",
      message: "Transaction type must be income or expense",
    });
  }

  if (!validator.isMongoId(transaction_id.toString())) {
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

  await transactionsModel.updateOne(
    { _id: transaction_id },
    { remarks, transaction_type, amount },
    { runValidators: true },
  );

  res.status(200).json({
    status: "TRANSACTION UPDATED SUCCESSFULLY",
  });
};

module.exports = editTransaction;
