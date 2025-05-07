import express from 'express';
import upload from '../middleware/upload.js';
import {
  registerEmployee,
  loginEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee 
} from '../controllers/employee.controller.js';

const router = express.Router();

router.post('/register', upload.single('profileImage'), registerEmployee);
router.post('/login', loginEmployee);
router.get('/company/:companyId', getAllEmployees);  
router.put('/update/:id', upload.single('profileImage'), updateEmployee);
router.get('/:id', getEmployeeById);  
router.delete('/:id', deleteEmployee);  

export default router;
