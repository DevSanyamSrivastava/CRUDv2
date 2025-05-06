import express from 'express';
import {
  createJobTitle,
  getJobTitlesByCompany,
  getJobTitlesByDepartment,
  updateJobTitle,
  deleteJobTitle
} from '../controllers/jobTitle.controller.js';

const router = express.Router();

router.post('/', createJobTitle);
router.get('/company/:companyId', getJobTitlesByCompany);
router.get('/department/:departmentId', getJobTitlesByDepartment);
router.put('/:id', updateJobTitle);
router.delete('/:id', deleteJobTitle);

export default router;
