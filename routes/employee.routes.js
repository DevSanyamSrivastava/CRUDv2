import express from 'express';
import {
  registerEmployee,
  loginEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee 
} from '../controllers/employee.controller.js';

const router = express.Router();

router.post('/register', registerEmployee);
router.post('/login', loginEmployee);
router.get('/company/:companyId', getAllEmployees);  
router.put('/:id', updateEmployee); 
router.get('/:id', getEmployeeById);  
router.delete('/:id', deleteEmployee);  

export default router;
