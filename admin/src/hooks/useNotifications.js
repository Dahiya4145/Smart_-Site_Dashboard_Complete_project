// hooks/useNotifications.js
import { useState, useEffect } from "react";
import axios from "axios";
import socket from "../socket"; // Make sure your socket instance is correctly configured and exported

const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    if (!userId) return; // early exit if no userId

    try {
      const res = await axios.get(
        `http://localhost:7700/server/notifications?userId=${userId}&limit=50`
      );
      console.log("Fetched notifications:", res.data.data);
      const notifs = res.data.data || [];

      setNotifications(notifs);

      // Calculate unread by checking if userId is NOT in readBy array
      setUnreadCount(notifs.filter((n) => !n.readBy.includes(userId)).length);

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
      setLoading(false);
    }
  };

  // Mark single notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(
        `http://localhost:7700/server/notifications/${notificationId}/read/${userId}?read=true`
      );
      fetchNotifications(); // Refresh list after marking read
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  // Mark single notification as unread
  const markAsUnread = async (notificationId) => {
    try {
      await axios.patch(
        `http://localhost:7700/server/notifications/${notificationId}/read/${userId}?read=false`
      );
      fetchNotifications(); // Refresh list after marking unread
    } catch (err) {
      console.error("Failed to mark as unread", err);
    }
  };

  // Mark all notifications as read for the user
  const markAllAsRead = async () => {
  if (!userId) return;

  try {
    await axios.patch(
      `http://localhost:7700/server/notifications/user/${userId}/markAllRead`
    );
    fetchNotifications(); // Refresh after marking all read
  } catch (err) {
    console.error("Failed to mark all as read", err);
  }
};


  useEffect(() => {
    if (!userId) return;

    fetchNotifications();

    // Listen to new notifications from socket.io
    const handleNewNotification = (notification) => {
      if (!notification.readBy.includes(userId)) {
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      }
    };

    socket.on("notificationCreated", handleNewNotification);

    // Clean up the socket listener on unmount or userId change
    return () => {
      socket.off("notificationCreated", handleNewNotification);
    };
  }, [userId]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    fetchNotifications,
  };
};

export default useNotifications;
