import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  siteId: { 
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Site', 
     required: true 
    },
  title: String,
  description: String,
  startDate: String,
  status: {
     type: String, 
     enum: ['pending', 'in-progress', 'completed'], 
     default: 'pending' 
    },
  dueDate: Date
}, 
{ timestamps: true }
);

export default mongoose.model("Task", TaskSchema);