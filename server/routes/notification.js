import express from 'express';
import {
  createNotification,
  getNotifications,
  markAsReadOrUnread,
  markAllAsReadByUser,
  updateNotification,
  deleteNotification
} from '../controllers/notification.js';

const router = express.Router();

router.post('/', createNotification);

router.get('/', getNotifications);

router.patch('/:id/read/:userId', markAsReadOrUnread); // ✅ New route

router.patch('/user/:userId/markAllRead', markAllAsReadByUser); // ✅ New route

router.put('/:id', updateNotification);

router.delete('/:id', deleteNotification);

export default router;
