import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home on logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">🏗️ BuildSmart</div>

      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
         <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
        <Link to="/contact">Contact</Link>

        {!user ? (
          <Link to="/login">
            <button className="auth-btn">Login / Register</button>
          </Link>
        ) : (
          <>
            <span className="navbar-user">👋 {user.username}</span>
            <button className="auth-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>

      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
