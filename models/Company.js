import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  companyName: { 
    type: String, 
    required: true 
  },
  ownerName: { 
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
    unique: true
  },
  phoneNo: { 
    type: String, 
    required: false,  
    unique: true, 
    sparse: true,
  },
  password: { 
    type: String, 
    required: true 
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Other'] 
  },
  address: {
    addressLine1: { type: String},
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String }
  },
  bio: { 
    type: String 
  },
  industryType: { 
    type: String 
  },
  website: { 
    type: String 
  },
  
  profileImage: {
    type: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
});

const Company = mongoose.model('Company', companySchema);
export default Company;
