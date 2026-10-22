import { Router } from 'express'
import {
  getExperiences,
  getFaqs,
  getGallery,
} from '../controllers/content.controller.js'

const router = Router()

router.get('/experiences', getExperiences)
router.get('/gallery', getGallery)
router.get('/faqs', getFaqs)

export default router
