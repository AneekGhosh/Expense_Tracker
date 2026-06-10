import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  remarks: yup
    .string()
    .required("Remarks are required")
    .min(5, "Must be at least 5 characters long"),
  amount: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .required("Amount is required")
    .positive("Amount must be a positive number"),
});

const TransactionForm = ({ onAddTransaction, type }) => {
  const isIncome = type === "income";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onAddTransaction(data, type);
    reset();
  };

  return (
    <div
      className={`card shadow-sm p-4 mb-4 ${isIncome ? "border-success" : "border-danger"}`}
    >
      <h3 className={`mb-4 ${isIncome ? "text-success" : "text-danger"}`}>
        Add {isIncome ? "Income" : "Expense"}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Remarks (e.g., Groceries)"
            className={`form-control ${errors.remarks ? "is-invalid" : "mb-3"}`}
            {...register("remarks")}
          />
          {errors.remarks && (
            <div className="invalid-feedback mb-3 d-block text-start">
              {errors.remarks.message}
            </div>
          )}
        </div>
        <div>
          <input
            type="number"
            step="0.01"
            placeholder="Amount (₹)"
            className={`form-control ${errors.amount ? "is-invalid" : "mb-3"}`}
            {...register("amount")}
          />
          {errors.amount && (
            <div className="invalid-feedback mb-3 d-block text-start">
              {errors.amount.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`btn ${isIncome ? "btn-success" : "btn-danger"} w-100`}
        >
          Add {isIncome ? "Income" : "Expense"}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
