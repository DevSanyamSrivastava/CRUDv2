import express from 'express';
import upload from '../middleware/upload.js';
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


router.post('/register', upload.single('profileImage'), registerCompany);

router.post('/login', loginCompany);
router.put('/update/id/:id', upload.single('profileImage'), updateCompanyById);
router.put('/update/email', upload.single('profileImage'), updateCompanyByEmail);
router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.delete('/:id', deleteCompany);

export default router;
