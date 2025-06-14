import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import useNotifications from "../../hooks/useNotifications"; // adjust path if needed
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const theme = localStorage.getItem("theme") || "light";

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    loading,
  } = useNotifications(user?._id);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen((open) => !open);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle read/unread status on notification click
  const handleToggleRead = (notif) => {
    if (notif.readBy.includes(user?._id)) {
      markAsUnread(notif._id);
    } else {
      markAsRead(notif._id);
    }
  };

  return (
    <motion.nav
      className={`navbar ${theme === "dark" ? "dark-theme" : "light-theme"}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="navbar-left">
        {/* Optional: add logo or nav items here */}
      </div>

      <div
        className="navbar-right"
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        {/* Notification Bell */}
        <div
          className="notification-bell"
          onClick={toggleDropdown}
          style={{ cursor: "pointer", position: "relative", marginRight: "20px" }}
          title="Notifications"
          ref={dropdownRef}
        >
          <FaBell size={20} color={theme === "dark" ? "#fff" : "#000"} />
          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
                minWidth: "18px",
                textAlign: "center",
                lineHeight: "14px",
                pointerEvents: "none",
              }}
            >
              {unreadCount}
            </span>
          )}

          {dropdownOpen && (
            <div
              className="notification-dropdown"
              style={{
                position: "absolute",
                right: 0,
                top: "30px",
                width: "320px",
                maxHeight: "400px",
                overflowY: "auto",
                background: theme === "dark" ? "#1f2937" : "#fff",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                borderRadius: "8px",
                zIndex: 150,
                color: theme === "dark" ? "#f9fafb" : "#111827",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderBottom:
                    theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
                }}
              >
                <h4 style={{ margin: 0, fontSize: "16px" }}>Notifications</h4>
                {unreadCount > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAllAsRead();
                    }}
                    style={{
                      background: "#3b82f6",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "600",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#2563eb")}
                    onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {loading ? (
                <div style={{ padding: "16px", textAlign: "center" }}>Loading...</div>
              ) : notifications.length === 0 ? (
                <div
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    color: theme === "dark" ? "#9ca3af" : "#6b7280",
                  }}
                >
                  No notifications
                </div>
              ) : (
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {notifications.map((notif) => {
                    const isRead = notif.readBy.includes(user?._id);
                    return (
                      <li
                        key={notif._id}
                        onClick={() => handleToggleRead(notif)}
                        style={{
                          padding: "12px 16px",
                          borderBottom:
                            theme === "dark"
                              ? "1px solid #374151"
                              : "1px solid #e5e7eb",
                          cursor: "pointer",
                          backgroundColor: isRead
                            ? "transparent"
                            : theme === "dark"
                            ? "#134e8e"
                            : "#e0f2fe",
                          fontWeight: isRead ? "normal" : "600",
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                          fontSize: "14px",
                        }}
                      >
                        <div>{notif.message}</div>
                        <div
                          style={{
                            color: theme === "dark" ? "#9ca3af" : "#6b7280",
                            fontSize: "12px",
                          }}
                        >
                          {new Date(notif.createdAt).toLocaleString()}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="navbar-user">
          {user ? (
            <>
              <span className="username">Welcome, {user?.username}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <span>Not logged in</span>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
