import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee',
    required: true
  },
  date: { 
    type: Date, 
    required: true 
  },
  day: { 
    type: String, 
    required: true 
  },
  checkInTime: { 
    type: Date, 
    required: true 
  },
  checkOutTime: { 
    type: Date 
  },
  duration: { 
    type: Number  
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Half-Day',  'Remote'],
    default: 'Present'
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
