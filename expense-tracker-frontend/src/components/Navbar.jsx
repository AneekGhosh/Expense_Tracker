import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-3"
      style={{
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link
          className="navbar-brand fw-bold fs-4 text-decoration-none"
          to="/dashboard"
          style={{ color: "#111827" }}
        >
          💰 ExpenseTracker Pro
        </Link>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="d-flex align-items-center gap-2">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#6366f1",
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() || "G"}
                </div>

                <div className="d-none d-md-block">
                  <div className="fw-semibold" style={{ color: "#111827" }}>
                    {user?.name}
                  </div>

                  <small className="text-success">● Online</small>
                </div>
              </div>

              <button className="btn btn-outline-danger" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {location.pathname !== "/login" && (
                <Link to="/login" className="btn btn-outline-dark">
                  Login
                </Link>
              )}

              {location.pathname !== "/register" && (
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
