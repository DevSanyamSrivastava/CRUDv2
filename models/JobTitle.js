import mongoose from 'mongoose';

const jobTitleSchema = new mongoose.Schema({
  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company',
    required: true
  },
  departmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department',
    required: true
  },
  jobTitle: { 
    type: String, 
    required: true 
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

const JobTitle = mongoose.model('JobTitle', jobTitleSchema);
export default JobTitle;
