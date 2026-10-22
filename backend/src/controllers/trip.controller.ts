import type { Request, Response, NextFunction } from 'express'
import { createRequire } from 'node:module'
import { readJson, writeJson } from '../data/store.js'
import type { Trip } from '../types/index.js'

const require = createRequire(import.meta.url)
const initialSeedTrips: Trip[] = require('../data/seed/trips.json')

const TRIPS_FILE = 'trips.json'

function getInitialTrips(): Trip[] {
  return initialSeedTrips || []
}

export async function getTrips(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const initial = await getInitialTrips()
    const trips = await readJson<Trip[]>(TRIPS_FILE, initial)

    res.json({
      success: true,
      count: trips.length,
      data: trips,
    })
  } catch (error) {
    next(error)
  }
}

export async function getTripByIdOrSlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { identifier } = req.params
    const initial = await getInitialTrips()
    const trips = await readJson<Trip[]>(TRIPS_FILE, initial)

    const trip = trips.find(
      (t) => t.id === identifier || t.slug === identifier
    )

    if (!trip) {
      res.status(404).json({
        success: false,
        message: `Expedition "${identifier}" not found.`,
      })
      return
    }

    res.json({
      success: true,
      data: trip,
    })
  } catch (error) {
    next(error)
  }
}

export async function updateTripSpots(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { identifier } = req.params
    const { spotsRemaining } = req.body

    if (typeof spotsRemaining !== 'number' || spotsRemaining < 0) {
      res.status(400).json({
        success: false,
        message: 'spotsRemaining must be a positive number or zero.',
      })
      return
    }

    const initial = await getInitialTrips()
    const trips = await readJson<Trip[]>(TRIPS_FILE, initial)

    const index = trips.findIndex(
      (t) => t.id === identifier || t.slug === identifier
    )

    if (index === -1) {
      res.status(404).json({
        success: false,
        message: `Expedition "${identifier}" not found.`,
      })
      return
    }

    trips[index].spotsRemaining = spotsRemaining
    trips[index].status = spotsRemaining === 0 ? 'waitlist' : 'open'
    await writeJson(TRIPS_FILE, trips)

    res.json({
      success: true,
      message: 'Expedition spots updated successfully.',
      data: trips[index],
    })
  } catch (error) {
    next(error)
  }
}
