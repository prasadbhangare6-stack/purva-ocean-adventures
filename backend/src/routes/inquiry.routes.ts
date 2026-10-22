import { Router } from 'express'
import {
  createInquiry,
  deleteInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
} from '../controllers/inquiry.controller.js'
import { validateBody } from '../middleware/validate.js'
import { CreateInquirySchema } from '../types/index.js'

const router = Router()

router.post('/', validateBody(CreateInquirySchema), createInquiry)
router.get('/', getInquiries)
router.get('/:id', getInquiryById)
router.patch('/:id/status', updateInquiryStatus)
router.delete('/:id', deleteInquiry)

export default router
