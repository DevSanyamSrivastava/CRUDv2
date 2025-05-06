import express from 'express';
import {
  uploadEventImage,
  getEventImagesByCompany,
  updateEventImage,
  deleteEventImage
} from '../controllers/eventImage.controller.js';

const router = express.Router();

router.post('/', uploadEventImage);
router.get('/company/:companyId', getEventImagesByCompany);
router.put('/:id', updateEventImage); // NEW
router.delete('/:id', deleteEventImage); // NEW

export default router;
