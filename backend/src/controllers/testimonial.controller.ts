import type { Request, Response, NextFunction } from 'express'
import { createRequire } from 'node:module'
import { readJson, writeJson } from '../data/store.js'
import type { Testimonial } from '../types/index.js'

const require = createRequire(import.meta.url)
const initialSeedTestimonials: Testimonial[] = require('../data/seed/testimonials.json')

const TESTIMONIALS_FILE = 'testimonials.json'

function getInitialTestimonials(): Testimonial[] {
  return initialSeedTestimonials || []
}

export async function getTestimonials(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const initial = await getInitialTestimonials()
    const testimonials = await readJson<Testimonial[]>(TESTIMONIALS_FILE, initial)

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    })
  } catch (error) {
    next(error)
  }
}

export async function createTestimonial(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, location, quote } = req.body

    const initial = await getInitialTestimonials()
    const testimonials = await readJson<Testimonial[]>(TESTIMONIALS_FILE, initial)

    const newTestimonial: Testimonial = {
      id: `test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      kind: 'quote',
      name,
      meta: location,
      quote,
      verified: false,
      createdAt: new Date().toISOString(),
    }

    // Insert right after verified testimonials
    testimonials.splice(1, 0, newTestimonial)
    await writeJson(TESTIMONIALS_FILE, testimonials)

    res.status(201).json({
      success: true,
      message: 'Thank you for sharing your story! It has been submitted for review.',
      data: newTestimonial,
    })
  } catch (error) {
    next(error)
  }
}
