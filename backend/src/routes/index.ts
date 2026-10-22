import { Router } from 'express'
import healthRoutes from './health.routes.js'
import inquiryRoutes from './inquiry.routes.js'
import newsletterRoutes from './newsletter.routes.js'
import tripRoutes from './trip.routes.js'
import contentRoutes from './content.routes.js'
import testimonialRoutes from './testimonial.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/inquiries', inquiryRoutes)
router.use('/newsletter', newsletterRoutes)
router.use('/trips', tripRoutes)
router.use('/content', contentRoutes)
router.use('/testimonials', testimonialRoutes)

export default router
