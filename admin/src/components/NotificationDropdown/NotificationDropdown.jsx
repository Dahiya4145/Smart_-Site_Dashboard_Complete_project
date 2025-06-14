import React, { useState, useRef, useEffect } from "react";
import useNotifications from "../../hooks/useNotifications";
import "./NotificationDropdown.css";

export default function NotificationDropdown({ userId }) {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    loading,
  } = useNotifications(userId);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  const handleToggleRead = (notifId, isRead) => {
    if (isRead) {
      markAsUnread(notifId);
    } else {
      markAsRead(notifId);
    }
  };

  return (
    <div className="notification-dropdown-container" ref={dropdownRef}>
      <button
        className="notification-bell"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Toggle notifications dropdown"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="badge" aria-live="polite">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="notification-dropdown"
          role="region"
          aria-label="Notifications"
        >
          <div className="dropdown-header">
            <h4>Notifications</h4>
            {unreadCount > 0 && (
              <button className="mark-all-read" onClick={handleMarkAllRead}>
                Mark all as read
              </button>
            )}
          </div>

          {loading ? (
            <div className="loading" role="status" aria-live="polite">
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div className="empty">No notifications</div>
          ) : (
            <ul className="notification-list">
              {notifications.map((notif) => {
                const isRead = notif.readBy.includes(userId);
                const formattedDate = notif.createdAt
                  ? new Date(notif.createdAt).toLocaleString()
                  : "No date available";

                return (
                  <li
                    key={notif._id}
                    className={`notification-item ${isRead ? "read" : "unread"}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggleRead(notif._id, isRead);
                      }
                    }}
                    role="button"
                    aria-pressed={isRead}
                    onClick={() => handleToggleRead(notif._id, isRead)}
                  >
                    <div className="notification-message">
                      {notif.description || "No description"}
                    </div>
                    <div className="notification-timestamp">{formattedDate}</div>
                    <button
                      className="toggle-read-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleRead(notif._id, isRead);
                      }}
                      aria-label={isRead ? "Mark as unread" : "Mark as read"}
                    >
                      {isRead ? "Mark unread" : "Mark read"}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
