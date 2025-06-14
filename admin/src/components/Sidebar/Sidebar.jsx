import { Link, useLocation } from "react-router-dom";
import {
  FaTasks,
  FaHardHat,
  FaBox,
  FaUser,
  FaClipboardList,
  FaHome,
  FaUsers,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaBell,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "./Sidebar.css";

// Accept theme and toggleTheme as props
export default function Sidebar({ theme, toggleTheme }) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Watch screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { to: "/users", label: "Users", icon: <FaUsers /> },
    { to: "/tasks", label: "Tasks", icon: <FaTasks /> },
    { to: "/sites", label: "Sites", icon: <FaHardHat /> },
    { to: "/material", label: "Material", icon: <FaBox /> },
    { to: "/labour", label: "Labour Log", icon: <FaClipboardList /> },
    { to: "/notifications", label: "Notifications", icon: <FaBell /> },
    { to: "/profile", label: "Profile", icon: <FaUser /> },
  ];

  return (
    <motion.div
      className={`sidebar ${isMobile ? "mobile" : ""}`}
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="sidebar-header">
        {!isMobile && <h1 className="sidebar-title">Admin Portal</h1>}
        {isMobile && (
          <button className="btn-menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </div>

      <nav className={`sidebar-nav ${isMobile && !menuOpen ? "hidden" : ""}`}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`sidebar-link ${location.pathname === link.to ? "active" : ""}`}
          >
            <span className="icon">{link.icon}</span>
            {!isMobile && link.label}
          </Link>
        ))}

        {/* Theme Toggle Button */}
        <button className="sidebar-link theme-toggle" onClick={toggleTheme}>
          <span className="icon">{theme === "dark" ? <FaSun /> : <FaMoon />}</span>
          {!isMobile && (theme === "dark" ? "Light Mode" : "Dark Mode")}
        </button>
      </nav>
    </motion.div>
  );
}
