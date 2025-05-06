import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company',
    required: true
  },
  employeeId: { 
    type: String, 
    required: true,
    unique: true
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
  },
  username: { 
    type: String, 
    required: true 
  },
  phoneNo: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  departmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department',
    required: true
  },
  salary: { 
    type: Number, 
    required: true 
  },
  jobTitleId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'JobTitle',
    required: true
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other'] 
  },
  dateOfBirth: { 
    type: Date 
  },
  joiningDate: { 
    type: Date, 
    required: true 
  },
  address: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String }
  },
  bio: { 
    type: String 
  },
  profileImage: {
    type: String
  },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
