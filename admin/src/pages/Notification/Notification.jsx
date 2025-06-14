import React from "react";
import DataTableDeleteOnly from "../../components/DataTable/DataTableDeleteOnly";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Notification.css";
import useNotifications from "../../hooks/useNotifications";

export default function Notification({ theme, userId }) {
  const {
    notifications,
    loading,
    markAllAsRead,
    fetchNotifications,
  } = useNotifications(userId);

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      toast.success("All notifications marked as read");
      fetchNotifications();
    } catch (err) {
      toast.error("Failed to mark all as read");
      console.error(err);
    }
  };

  const handleDelete = async (notificationId) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;
    try {
      await fetch(`http://localhost:7700/server/notifications/${notificationId}`, { method: "DELETE" });
      toast.success("Notification deleted");
      fetchNotifications();
    } catch (err) {
      toast.error("Failed to delete notification");
      console.error(err);
    }
  };

  const tableColumns = [
    { label: "Action", accessor: "action" },
    { label: "Entity", accessor: "entity" },
    { label: "Performed By", accessor: "performedBy" },
    { label: "Role", accessor: "role" },
    { label: "Description", accessor: "description" },
    {
      label: "Status",
      accessor: "readBy",
      render: (row) => (row.readBy.includes(userId) ? "Read" : "Unread"),
    },
    {
      label: "Timestamp",
      accessor: "createdAt",
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
  ];

  if (loading) {
    return (
      <div className={`notification-page ${theme}-theme`}>
        <div>Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className={`notification-page ${theme}-theme`}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="notification-header">
        <h2>Notifications</h2>
        {notifications.length > 0 && (
          <button className="btn btn-mark-all" onClick={handleMarkAllRead}>
            Mark All Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
  <div className="no-notifications-container">
    <svg
      className="no-notifications-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width="64"
      height="64"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 17v-2a4 4 0 10-8 0v2m5 4h4a4 4 0 004-4v-3a4 4 0 00-4-4h-1.5M12 3v4M7 21h10"
      />
    </svg>
    <h3>No Notifications</h3>
    <p>You’re all caught up! No new notifications at the moment.</p>
  </div>
) : (
  <DataTableDeleteOnly
    columns={tableColumns}
    data={notifications}
    onDelete={handleDelete}
  />
)}

    </div>
  );
}
