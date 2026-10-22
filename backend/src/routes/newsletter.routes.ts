import { Router } from 'express'
import {
  getSubscribers,
  subscribe,
  unsubscribe,
} from '../controllers/newsletter.controller.js'
import { validateBody } from '../middleware/validate.js'
import { SubscribeNewsletterSchema } from '../types/index.js'

const router = Router()

router.post('/', validateBody(SubscribeNewsletterSchema), subscribe)
router.get('/', getSubscribers)
router.delete('/:idOrEmail', unsubscribe)

export default router
