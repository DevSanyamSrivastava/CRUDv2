import express from 'express';
import {
  recordAttendance,
  getAttendanceByEmployee,
  updateAttendance,
  deleteAttendance
} from '../controllers/attendance.controller.js';

const router = express.Router();

router.post('/', recordAttendance);
router.get('/employeeAttendance/:employeeId', getAttendanceByEmployee);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

export default router;
   