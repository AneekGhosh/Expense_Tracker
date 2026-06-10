import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/users/forgotpw", {
        email,
      });

      toast.success(response.data.status);

      navigate("/reset-password");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.status ||
          "Failed to send reset code"
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn btn-primary w-100">
            Send Reset Code
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;