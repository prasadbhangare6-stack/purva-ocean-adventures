import type { Request, Response, NextFunction } from 'express'
import { readJson, writeJson } from '../data/store.js'
import type { Inquiry, InquiryStatus } from '../types/index.js'

const INQUIRIES_FILE = 'inquiries.json'

export async function createInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, phone, dates, travellers, experience, notes, type } = req.body

    const existing = await readJson<Inquiry[]>(INQUIRIES_FILE, [])

    const now = new Date().toISOString()
    const newInquiry: Inquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name || 'Ocean Explorer',
      email,
      phone: phone || '',
      dates: dates || '',
      travellers: travellers || '1',
      experience: experience || 'Certified Diver',
      notes: notes || '',
      type: type || 'trip-inquiry',
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    }

    existing.unshift(newInquiry)
    await writeJson(INQUIRIES_FILE, existing)

    res.status(201).json({
      success: true,
      message: 'Thank you — your enquiry is on its way. We reply personally, usually within two days.',
      data: newInquiry,
    })
  } catch (error) {
    next(error)
  }
}

export async function getInquiries(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status, search } = req.query
    let inquiries = await readJson<Inquiry[]>(INQUIRIES_FILE, [])

    if (status && typeof status === 'string') {
      inquiries = inquiries.filter((inq) => inq.status === status)
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase()
      inquiries = inquiries.filter(
        (inq) =>
          inq.name.toLowerCase().includes(q) ||
          inq.email.toLowerCase().includes(q) ||
          inq.notes.toLowerCase().includes(q)
      )
    }

    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    })
  } catch (error) {
    next(error)
  }
}

export async function getInquiryById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params
    const inquiries = await readJson<Inquiry[]>(INQUIRIES_FILE, [])
    const found = inquiries.find((inq) => inq.id === id)

    if (!found) {
      res.status(404).json({
        success: false,
        message: `Inquiry with ID "${id}" was not found.`,
      })
      return
    }

    res.json({
      success: true,
      data: found,
    })
  } catch (error) {
    next(error)
  }
}

export async function updateInquiryStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params
    const { status } = req.body

    const validStatuses: InquiryStatus[] = ['pending', 'contacted', 'confirmed', 'archived']
    if (!validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      })
      return
    }

    const inquiries = await readJson<Inquiry[]>(INQUIRIES_FILE, [])
    const index = inquiries.findIndex((inq) => inq.id === id)

    if (index === -1) {
      res.status(404).json({
        success: false,
        message: `Inquiry with ID "${id}" was not found.`,
      })
      return
    }

    inquiries[index].status = status
    inquiries[index].updatedAt = new Date().toISOString()
    await writeJson(INQUIRIES_FILE, inquiries)

    res.json({
      success: true,
      message: 'Inquiry status updated successfully.',
      data: inquiries[index],
    })
  } catch (error) {
    next(error)
  }
}

export async function deleteInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params
    const inquiries = await readJson<Inquiry[]>(INQUIRIES_FILE, [])
    const filtered = inquiries.filter((inq) => inq.id !== id)

    if (filtered.length === inquiries.length) {
      res.status(404).json({
        success: false,
        message: `Inquiry with ID "${id}" was not found.`,
      })
      return
    }

    await writeJson(INQUIRIES_FILE, filtered)

    res.json({
      success: true,
      message: 'Inquiry removed successfully.',
    })
  } catch (error) {
    next(error)
  }
}
