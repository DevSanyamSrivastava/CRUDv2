import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import all routes
import companyRoutes from './routes/company.routes.js';
import departmentRoutes from './routes/department.routes.js';
import jobTitleRoutes from './routes/jobTitle.routes.js';
import eventImageRoutes from './routes/eventImage.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import leaveRoutes from './routes/leave.routes.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 
app.use('/uploads', express.static('uploads')); 

// Connect to MongoDB
connectDB();

// Route setup
app.use('/api/company', companyRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/job-title', jobTitleRoutes);
app.use('/api/event-image', eventImageRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leave', leaveRoutes);

// Home route
app.get('/', (req, res) => {
  res.send(' HR Management API is up and running ');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
