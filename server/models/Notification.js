import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  action: { 
    type: String, 
    enum: ['add', 'edit', 'delete'], 
    required: true 
  },
  entity: { 
    type: String, 
    enum: ['task', 'site', 'material', 'labour'], 
    required: true 
  },
  entityId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  performedBy: { 
    type: String,  // username or userId
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'engineer'], 
    required: true 
  },
  description: { 
    type: String,  // human-readable text like "Admin John added a new site"
    required: true 
  },
  // timestamp: { 
  //   type: Date, 
  //   default: Date.now 
  // },
  readBy: {
    type: [String],  // array of user IDs (or usernames) who have read this notification
    default: []
  }
 },{ timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
