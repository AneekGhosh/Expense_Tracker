import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await API.post("/users/resetpw", {
        email,
        reset_code: resetCode,
        new_password: password,
      });

      toast.success(response.data.message || "Password reset successfully!");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.status ||
          "Password reset failed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow border-0 p-4">
        <h2 className="text-center mb-4 fw-bold">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Reset Code"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {confirmPassword && (
            <div className="mb-3">
              <small
                className={
                  password === confirmPassword ? "text-success" : "text-danger"
                }
              >
                {password === confirmPassword
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </small>
            </div>
          )}

          <button className="btn btn-success w-100" disabled={isLoading}>
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
