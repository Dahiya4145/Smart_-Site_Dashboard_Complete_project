import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:7700/server/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save full user object (includes role, email, etc.)
        login(data);

        // ✅ Redirect after login
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong!");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <video autoPlay loop muted className="bg-video">
        <source src="/assets/video/42926-434300944_medium.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <div className="form-group">
          <input
            type="text"
            className="floating-input"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username" className="floating-label">
            Username
          </label>
        </div>

        <div className="form-group">
          <input
            type="password"
            className="floating-input"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password" className="floating-label">
            Password
          </label>
        </div>

        <button type="submit">Login</button>

        <p className="register-link">
          Don't have an account?{" "}
          <span className="link-text" onClick={handleRegisterRedirect}>
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
