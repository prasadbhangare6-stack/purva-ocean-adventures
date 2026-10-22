import type { Request, Response, NextFunction } from 'express'
import { createRequire } from 'node:module'
import { readJson } from '../data/store.js'
import type { Experience, GalleryItem } from '../types/index.js'

const require = createRequire(import.meta.url)
const seedExperiences: Experience[] = require('../data/seed/experiences.json')
const seedGallery: GalleryItem[] = require('../data/seed/gallery.json')

export async function getExperiences(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const experiences = await readJson<Experience[]>('experiences.json', seedExperiences)

    res.json({
      success: true,
      count: experiences.length,
      data: experiences,
    })
  } catch (error) {
    next(error)
  }
}

export async function getGallery(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category } = req.query
    let gallery = await readJson<GalleryItem[]>('gallery.json', seedGallery)

    if (category && typeof category === 'string' && category.toLowerCase() !== 'all') {
      gallery = gallery.filter((item) => item.category.toLowerCase() === category.toLowerCase())
    }

    res.json({
      success: true,
      count: gallery.length,
      data: gallery,
    })
  } catch (error) {
    next(error)
  }
}

export async function getFaqs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const faqs = [
      {
        q: 'Do I need to be a certified diver to join?',
        a: 'No. Expeditions are open to beginners, certified divers and non-divers. Discover Scuba sessions can be arranged for first-timers, and snorkellers are always welcome.',
      },
      {
        q: 'How do I book a spot?',
        a: 'Send an enquiry through the form below and we will reply personally with availability, the full itinerary and next steps. Nothing is charged or confirmed until you hear back from us.',
      },
      {
        q: 'How big are the groups?',
        a: 'Maximum 10 people per expedition — small enough for real guidance, big enough for good company.',
      },
      {
        q: 'What is included in a trip?',
        a: 'Every expedition is different. For Maldives Maafushi it includes scuba diving for all levels, a comfortable stay and boat dives as per the package. Exact inclusions are confirmed in your trip details.',
      },
    ]

    res.json({
      success: true,
      data: faqs,
    })
  } catch (error) {
    next(error)
  }
}
