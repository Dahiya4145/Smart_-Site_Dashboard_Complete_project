import Notification from "../models/Notification.js";
import { io } from "../server.js"; // Make sure io is exported from your main app/server file

// Create a new notification
export const createNotification = async (req, res, next) => {
  try {
    const newNotification = new Notification(req.body);
    const savedNotification = await newNotification.save();

    // Emit event to all clients
    io.emit("notificationCreated", savedNotification);

    res.status(201).json(savedNotification);
  } catch (err) {
    next(err);
  }
};

// Get notifications with pagination and optional unread filter by userId
export const getNotifications = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const userId = req.query.userId;
    const unreadOnly = req.query.unread === "true";

    const query = {};

    // If unreadOnly and userId given, filter notifications not read by this user
    if (unreadOnly && userId) {
      query.readBy = { $ne: userId };
    }

    const notifications = await Notification.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Notification.countDocuments(query);

    res.status(200).json({
      data: notifications,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (err) {
    next(err);
  }
};

// Mark a notification as read or unread by userId
export const markAsReadOrUnread = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const read = req.query.read === "true";

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const alreadyRead = notification.readBy.includes(userId);

    if (read && !alreadyRead) {
      notification.readBy.push(userId);
    } else if (!read && alreadyRead) {
      notification.readBy = notification.readBy.filter(id => id !== userId);
    }

    await notification.save();
    io.emit("notificationUpdated", notification);

    res.status(200).json(notification);
  } catch (err) {
    next(err);
  }
};


// Update notification fields (generic update)
export const updateNotification = async (req, res, next) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    io.emit("notificationUpdated", updatedNotification);

    res.status(200).json(updatedNotification);
  } catch (err) {
    next(err);
  }
};

// Delete a notification
export const deleteNotification = async (req, res, next) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Notification not found" });
    }

    io.emit("notificationDeleted", req.params.id);

    res.status(200).json({ message: "Notification deleted" });
  } catch (err) {
    next(err);
  }
};

// Mark all notifications as read by a specific user
export const markAllAsReadByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const result = await Notification.updateMany(
      { readBy: { $ne: userId } },
      { $push: { readBy: userId } }
    );

    io.emit("notificationsMarkedReadByUser", { userId });

    res.status(200).json({
      message: `${result.modifiedCount} notifications marked as read for user ${userId}`,
    });
  } catch (err) {
    next(err);
  }
};