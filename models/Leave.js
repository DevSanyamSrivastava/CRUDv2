import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee',
    required: true
  },
  dateFrom: { 
    type: Date, 
    required: true 
  },
  dateTo: { 
    type: Date, 
    required: true 
  },
  numberOfDays: { 
    type: Number, 
    required: true 
  },
  time: { 
    type: String // Full-day, First Half, Second Half
  },
  reason: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;
