import express from 'express';
import {
  createDepartment,
  getDepartmentsByCompany,
  deleteDepartment
} from '../controllers/department.controller.js';

const router = express.Router();

router.post('/', createDepartment);
router.get('/company/:companyId', getDepartmentsByCompany);
// router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);

export default router;
