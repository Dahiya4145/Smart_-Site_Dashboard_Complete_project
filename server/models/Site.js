import mongoose from 'mongoose';

const SiteSchema = new mongoose.Schema( {
   
    name: { 
     type: String, 
     required: true 
    },
    location: { 
        type: String, 
        required: true
     },
    status: { 
        type: String, 
        enum: ['active', 'paused', 'completed'], 
        default: 'active' 
    },
    startDate: Date,
    endDate: Date,

    // ➕ Add these two:
    latitude: Number,
    longitude: Number

},
{ timestamps: true }
);

export default mongoose.model("Site", SiteSchema);