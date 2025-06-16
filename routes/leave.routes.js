import express from 'express';
import {
  applyLeave,
  getLeavesByEmployee,
  updateLeaveStatus,
  deleteLeave
} from '../controllers/leave.controller.js';

const router = express.Router();

router.post('/', applyLeave); 
router.get('/employee/:employeeId', getLeavesByEmployee); 
router.patch('/:id', updateLeaveStatus); 
router.delete('/:id', deleteLeave); 

export default router;
