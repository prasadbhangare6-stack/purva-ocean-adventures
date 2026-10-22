import type { Request, Response, NextFunction } from 'express'
import { readJson, writeJson } from '../data/store.js'
import type { NewsletterSubscriber } from '../types/index.js'

const SUBSCRIBERS_FILE = 'subscribers.json'

export async function subscribe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, type = 'destination-updates' } = req.body

    const subscribers = await readJson<NewsletterSubscriber[]>(SUBSCRIBERS_FILE, [])

    const normalizedEmail = email.toLowerCase().trim()
    const existing = subscribers.find((s) => s.email.toLowerCase() === normalizedEmail)

    if (existing) {
      res.status(200).json({
        success: true,
        message: 'You are already on the list! We will write when the next route opens.',
        data: existing,
      })
      return
    }

    const newSubscriber: NewsletterSubscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: normalizedEmail,
      type,
      subscribedAt: new Date().toISOString(),
    }

    subscribers.unshift(newSubscriber)
    await writeJson(SUBSCRIBERS_FILE, subscribers)

    res.status(201).json({
      success: true,
      message: 'You are on the list. We will write when the next route opens.',
      data: newSubscriber,
    })
  } catch (error) {
    next(error)
  }
}

export async function getSubscribers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const subscribers = await readJson<NewsletterSubscriber[]>(SUBSCRIBERS_FILE, [])
    res.json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    })
  } catch (error) {
    next(error)
  }
}

export async function unsubscribe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idOrEmail } = req.params
    const subscribers = await readJson<NewsletterSubscriber[]>(SUBSCRIBERS_FILE, [])

    const filtered = subscribers.filter(
      (s) => s.id !== idOrEmail && s.email.toLowerCase() !== idOrEmail.toLowerCase()
    )

    if (filtered.length === subscribers.length) {
      res.status(404).json({
        success: false,
        message: 'Subscriber not found.',
      })
      return
    }

    await writeJson(SUBSCRIBERS_FILE, filtered)

    res.json({
      success: true,
      message: 'You have been unsubscribed from updates.',
    })
  } catch (error) {
    next(error)
  }
}
