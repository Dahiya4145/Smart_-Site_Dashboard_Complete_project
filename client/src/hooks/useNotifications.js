import { useCallback } from "react";

const baseUrl = "http://localhost:7700/server";

export function useNotifications() {
  // Add a new notification
const addNotification = useCallback(async (notificationData) => {
  try {
    const res = await fetch(`${baseUrl}/notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notificationData),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to add notification");
    }
    return await res.json();
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error;
  }
}, []);

  // Edit/update a notification by ID
  const editNotification = useCallback(async (notificationId, updateData) => {
    try {
      const res = await fetch(`${baseUrl}/notifications/${notificationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update notification");
      }
      return await res.json();
    } catch (error) {
      console.error("Error updating notification:", error);
      throw error;
    }
  }, []);

  // Delete a notification by ID
  const deleteNotification = useCallback(async (notificationId) => {
    try {
      const res = await fetch(`${baseUrl}/notifications/${notificationId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete notification");
      }
      return true;
    } catch (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
  }, []);

  // Fetch notifications for a user
  const fetchNotifications = useCallback(async (userId) => {
    try {
      const res = await fetch(`${baseUrl}/notifications/user/${userId}`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch notifications");
      }
      return await res.json();
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }, []);

  // Mark a notification as read/unread
  const markAsRead = useCallback(async (notificationId, read = true) => {
    try {
      const res = await fetch(`${baseUrl}/notifications/read/${notificationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update read status");
      }
      return await res.json();
    } catch (error) {
      console.error("Error marking notification read/unread:", error);
      throw error;
    }
  }, []);

  // Mark all notifications as read for a user
  const markAllAsRead = useCallback(async (userId) => {
    try {
      const res = await fetch(`${baseUrl}/notifications/read/all/${userId}`, {
        method: "PUT",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to mark all notifications as read");
      }
      return await res.json();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      throw error;
    }
  }, []);

  return {
    addNotification,
    editNotification,
    deleteNotification,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
}
