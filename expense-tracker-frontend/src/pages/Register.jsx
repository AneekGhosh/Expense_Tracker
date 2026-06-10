import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    balance: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users/register", formData);
      toast.success("Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={handleRegister}>
          <input type="text" name="name" placeholder="Name" className="form-control mb-3" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="form-control mb-3" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="form-control mb-3" onChange={handleChange} required />
          <input type="password" name="confirm_password" placeholder="Confirm Password" className="form-control mb-3" onChange={handleChange} required />
          <input type="number" name="balance" placeholder="Initial Balance" className="form-control mb-3" onChange={handleChange} />

          <button type="submit" className="btn btn-warning w-100">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;