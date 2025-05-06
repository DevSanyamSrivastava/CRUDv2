import express from 'express';
import {
  registerCompany,
  loginCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  updateCompanyByEmail,
  deleteCompany
} from '../controllers/company.controller.js';

const router = express.Router();

router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.put('/update/id/:id', updateCompanyById);       
router.put('/update/email', updateCompanyByEmail); 
router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.delete('/:id', deleteCompany);

export default router;
