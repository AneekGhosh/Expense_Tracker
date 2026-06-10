import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import ExpenseChart from "../components/ExpenseChart";
import TransactionForm from "../components/TransactionForm";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  console.log("DASHBOARD USER:", user);

  const [transactions, setTransactions] = useState([]);
  const [editingTx, setEditingTx] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await API.get("/transactions");

        console.log("TRANSACTIONS:", response.data);

        setTransactions(response.data.transactions || []);
      } catch (error) {
        if (error.response?.status === 401) {
          logout();
        }
      }
    };

    fetchDashboard();
  }, [refresh, logout]);

  const deleteTransaction = async (transactionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/transactions/${transactionId}`);
      toast.success("Transaction deleted!");
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete transaction");
    }
  };

  const handleUpdateTransaction = async () => {
    try {
      await API.patch("/transactions", {
        transaction_id: editingTx._id,
        remarks: editingTx.remarks,
        amount: editingTx.amount,
        transaction_type: editingTx.transaction_type,
      });

      toast.success("Transaction updated successfully!");

      setEditingTx(null);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to update transaction",
      );
    }
  };

  const totalIncome = transactions
    .filter((t) => t.transaction_type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.transaction_type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const currentBalance = totalIncome - totalExpense;
  const addTransaction = async (data, type) => {
    try {
      const endpoint =
        type === "income"
          ? "/transactions/addIncome"
          : "/transactions/addExpense";

      await API.post(endpoint, {
        remarks: data.remarks,
        amount: data.amount,
      });

      toast.success(
        `${type === "income" ? "Income" : "Expense"} added successfully!`,
      );

      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to add transaction");
    }
  };
  return (
    <div className="container-fluid px-4 py-4">
      {/* Edit Modal */}
      {editingTx && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ width: "400px" }}
          >
            <h4 className="mb-3">Edit Transaction</h4>

            <input
              type="text"
              className="form-control mb-3"
              value={editingTx.remarks}
              onChange={(e) =>
                setEditingTx({
                  ...editingTx,
                  remarks: e.target.value,
                })
              }
            />

            <input
              type="number"
              className="form-control mb-3"
              value={editingTx.amount}
              onChange={(e) =>
                setEditingTx({
                  ...editingTx,
                  amount: e.target.value,
                })
              }
            />

            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={handleUpdateTransaction}
              >
                Save
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setEditingTx(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-lg-3">
          <div className="glass-card p-4 h-100">
            <p className="small text-uppercase fw-bold mb-2 text-secondary">
              Account Holder
            </p>

            <h3 className="fw-bold mb-0">{user?.name || "Guest"}</h3>

            <small className="text-success">● Online</small>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="glass-card p-4 h-100">
            <p className="text-muted small text-uppercase fw-bold mb-2">
              Balance
            </p>

            <h3 className="fw-bold" style={{ color: "#6366f1" }}>
              ₹{currentBalance.toFixed(2)}
            </h3>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="glass-card p-4 h-100">
            <p className="text-muted small text-uppercase fw-bold mb-2">
              Income
            </p>

            <h3 className="fw-bold" style={{ color: "#10b981" }}>
              ₹{totalIncome.toFixed(2)}
            </h3>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="glass-card p-4 h-100">
            <p className="text-muted small text-uppercase fw-bold mb-2">
              Expenses
            </p>

            <h3 className="fw-bold" style={{ color: "#ef4444" }}>
              ₹{totalExpense.toFixed(2)}
            </h3>
          </div>
        </div>
      </div>

      {/* Forms */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <TransactionForm type="income" onAddTransaction={addTransaction} />
        </div>

        <div className="col-lg-6">
          <TransactionForm type="expense" onAddTransaction={addTransaction} />
        </div>
      </div>

      {/* Chart + Transactions */}
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4 h-100">
            <h4 className="mb-4">Income vs Expenses</h4>

            <ExpenseChart transactions={transactions} />
          </div>
        </div>

        <div className="col-lg-8">
          <div className="glass-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Recent Transactions</h4>

              <span className="badge bg-primary">
                {transactions.length} Records
              </span>
            </div>

            {transactions.length === 0 ? (
              <div className="text-center py-5">
                <h1>📊</h1>
                <h5>No Transactions Yet</h5>
                <p className="text-muted">
                  Add your first income or expense to get started.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Remarks</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {[...transactions].reverse().map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>

                        <td>{item.remarks}</td>

                        <td>
                          <span
                            className={`badge ${
                              item.transaction_type === "income"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {item.transaction_type.toUpperCase()}
                          </span>
                        </td>

                        <td
                          className={
                            item.transaction_type === "income"
                              ? "text-success fw-bold"
                              : "text-danger fw-bold"
                          }
                        >
                          ₹{item.amount}
                        </td>

                        <td>
                          <button
                            className="btn btn-sm btn-outline-warning me-2"
                            onClick={() => setEditingTx(item)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteTransaction(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
