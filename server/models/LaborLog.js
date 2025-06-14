import mongoose from 'mongoose';

const LaborLogSchema = new mongoose.Schema({
  siteId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Site', 
    required: true 
  },
   date: {
     type: Date, 
     default: Date.now 
   },
  numberOfWorkers: {
    type: Number,
    required: true,
    min: [0, 'Number of workers cannot be negative']
  },

  supervisorName: {
    type: String,
    required: true,
    trim: true
  },
  
  supervisorContact: {
    type: String,
    validate: {
      validator: v => /^[0-9]{10}$/.test(v),
      message: props => `${props.value} is not a valid 10-digit number!`
    },
    required: true
  },

  notes: {
    type: String,
    trim: true
  }
}, 
{ timestamps: true });

export default mongoose.model("LaborLog", LaborLogSchema);
