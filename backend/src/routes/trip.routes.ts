import { Router } from 'express'
import {
  getTripByIdOrSlug,
  getTrips,
  updateTripSpots,
} from '../controllers/trip.controller.js'

const router = Router()

router.get('/', getTrips)
router.get('/:identifier', getTripByIdOrSlug)
router.patch('/:identifier/spots', updateTripSpots)

export default router
