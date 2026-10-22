import { z } from 'zod'

/* ------------------------------------------------------------------ */
/*  Inquiry Schemas & Types                                           */
/* ------------------------------------------------------------------ */
export const CreateInquirySchema = z.object({
  name: z.string().trim().max(100).optional().default('Ocean Explorer'),
  email: z.string().trim().email('Invalid email address'),
  phone: z.string().trim().optional().default(''),
  dates: z.string().trim().optional().default(''),
  travellers: z.string().trim().optional().default('1'),
  experience: z.string().trim().optional().default('Certified Diver'),
  notes: z.string().trim().max(1000).optional().default(''),
  type: z.string().optional().default('trip-inquiry'),
})

export type CreateInquiryInput = z.infer<typeof CreateInquirySchema>

export type InquiryStatus = 'pending' | 'contacted' | 'confirmed' | 'archived'

export interface Inquiry extends CreateInquiryInput {
  id: string
  status: InquiryStatus
  createdAt: string
  updatedAt: string
}

/* ------------------------------------------------------------------ */
/*  Newsletter Schemas & Types                                         */
/* ------------------------------------------------------------------ */
export const SubscribeNewsletterSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  type: z.string().trim().optional().default('destination-updates'),
})

export type SubscribeNewsletterInput = z.infer<typeof SubscribeNewsletterSchema>

export interface NewsletterSubscriber {
  id: string
  email: string
  type: string
  subscribedAt: string
}

/* ------------------------------------------------------------------ */
/*  Expedition / Trip Types                                           */
/* ------------------------------------------------------------------ */
export interface TripAmenity {
  icon: string
  title: string
  note: string
}

export interface Trip {
  id: string
  slug: string
  title: string[]
  eyebrow: string
  dates: string
  duration: string
  blurb: string
  description: string
  image: string
  imageAlt: string
  totalSpots: number
  spotsRemaining: number
  inclusions: string[]
  amenities: TripAmenity[]
  status: 'upcoming' | 'open' | 'waitlist' | 'completed'
}

/* ------------------------------------------------------------------ */
/*  Testimonial Types                                                  */
/* ------------------------------------------------------------------ */
export const CreateTestimonialSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(80),
  location: z.string().trim().min(1, 'Location is required').max(80),
  quote: z.string().trim().min(10, 'Review must be at least 10 characters').max(500),
})

export type CreateTestimonialInput = z.infer<typeof CreateTestimonialSchema>

export interface Testimonial {
  id: string
  kind: 'quote' | 'invite'
  quote?: string
  name?: string
  meta?: string
  avatar?: string
  title?: string
  copy?: string
  verified?: boolean
  createdAt?: string
}

/* ------------------------------------------------------------------ */
/*  Gallery & Experience Types                                        */
/* ------------------------------------------------------------------ */
export type GalleryCategory = 'Underwater' | 'People' | 'Destinations'

export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  caption: string
}

export interface Experience {
  id: string
  title: string
  copy: string
  image: string
  alt: string
  highlights?: string[]
}
