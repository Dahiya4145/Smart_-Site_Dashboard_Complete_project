import React, { useState } from "react";
import "./register.css";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("http://localhost:7700/server/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="register-page">
      <video autoPlay loop muted className="bg-video">
        <source src="/assets/video/42926-434300944_medium.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay"></div>

      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>

        <p className="auth-switch-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
