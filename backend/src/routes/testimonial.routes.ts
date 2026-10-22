import { Router } from 'express'
import {
  createTestimonial,
  getTestimonials,
} from '../controllers/testimonial.controller.js'
import { validateBody } from '../middleware/validate.js'
import { CreateTestimonialSchema } from '../types/index.js'

const router = Router()

router.get('/', getTestimonials)
router.post('/', validateBody(CreateTestimonialSchema), createTestimonial)

export default router
