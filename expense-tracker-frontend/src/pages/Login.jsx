import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await API.post("/users/login", formData);

      console.log("LOGIN DATA:", response.data);
      console.log("USER DATA:", response.data.user);

      login(
        response.data.user || response.data,
        response.data.accessToken || response.data.token,
      );

      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4 border-0">
        <h2 className="text-center mb-4 fw-bold">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-2"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="text-end mb-3">
            <Link to="/forgot-password" className="text-decoration-none small">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <hr />

        <p className="text-center mb-0">
          Don't have an account?{" "}
          <Link to="/register" className="fw-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
