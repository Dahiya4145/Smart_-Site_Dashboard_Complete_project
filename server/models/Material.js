import mongoose from 'mongoose';

const MaterialSchema = new mongoose.Schema({
  siteId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Site', 
     required: true 
    },
  materialName: String,
  quantity: Number,
  unit: String,
  remarks: String,
  receivedDate: Date
}, 
{ timestamps: true }
);

export default mongoose.model("Material", MaterialSchema);