import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'

// Seed data compiled directly — zero disk read dependencies at runtime
const SEED_TRIPS = [
  {
    id: "trip-maldives-maafushi-2026",
    slug: "maldives-maafushi",
    eyebrow: "Featured Expedition",
    title: ["Maldives", "Maafushi"],
    dates: "22 – 27 NOV 2026",
    duration: "5 NIGHTS / 6 DAYS",
    blurb: "Crystal clear waters, vibrant marine life and unforgettable dive experiences in the Maldives.",
    description: "Maafushi is a local island in Kaafu Atoll: quiet beaches, a house reef within swimming distance and short boat rides to the atoll's most-loved dive sites. Days follow the water — two dives, a long surface interval, and evenings slow enough to actually talk to each other.",
    image: "/images/maldives-aerial.jpg",
    imageAlt: "Aerial view of a Maldivian island ringed by turquoise lagoon",
    totalSpots: 10,
    spotsRemaining: 3,
    status: "open",
    inclusions: [
      "Scuba diving for all levels",
      "Comfortable stay",
      "Boat dives as per package",
      "Maximum 10 travellers"
    ],
    amenities: [
      { icon: "scuba", title: "Scuba Diving", note: "(for all levels)" },
      { icon: "stay", title: "Comfortable Stay", note: "" },
      { icon: "boat", title: "Boat Dives", note: "(As per package)" },
      { icon: "spots", title: "Only 10 Spots", note: "" }
    ]
  },
  {
    id: "trip-lakshadweep-2027",
    slug: "lakshadweep-kadmat",
    eyebrow: "Upcoming Expedition",
    title: ["Lakshadweep", "Kadmat Island"],
    dates: "15 – 20 JAN 2027",
    duration: "5 NIGHTS / 6 DAYS",
    blurb: "Pristine coral gardens and uncrowded dive sites in India's premier archipelago.",
    description: "Explore vibrant reef walls, manta cleaning stations, and turquoise lagoons in an untouched marine sanctuary.",
    image: "/images/cliffs.jpg",
    imageAlt: "Aerial view of limestone cliffs and clear waters",
    totalSpots: 8,
    spotsRemaining: 8,
    status: "upcoming",
    inclusions: [
      "Guided coral reef boat dives",
      "Beachfront eco-resort stay",
      "All meals and local transfers",
      "Small group exploration"
    ],
    amenities: [
      { icon: "scuba", title: "Reef Dives", note: "(certified & beginner)" },
      { icon: "stay", title: "Lagoon Stay", note: "" },
      { icon: "boat", title: "Daily Boat Trips", note: "" },
      { icon: "spots", title: "Only 8 Spots", note: "" }
    ]
  }
]

const SEED_EXPERIENCES = [
  {
    id: "exp-beginners",
    title: "Beginners",
    copy: "New to scuba? Start your ocean journey with confidence.",
    image: "/images/beginner1.jpg",
    alt: "A diver descending through sunlit blue water",
    highlights: [
      "Zero prior swimming or diving experience required for Discover Scuba",
      "PADI certified instructors with personalized 1-on-1 attention",
      "Confined shallow water training before open ocean dives",
      "All high-grade scuba gear provided and fitted"
    ]
  },
  {
    id: "exp-certified",
    title: "Certified Divers",
    copy: "Take your diving to the next level with guided dives and advanced courses.",
    image: "/images/turtle-diver.jpg",
    alt: "A scuba diver swimming above a coral reef",
    highlights: [
      "Drift dives, wall dives, and deep dive expeditions",
      "PADI Advanced Open Water & Rescue diver specialty certifications",
      "Marine life identification briefings before every dive",
      "Dedicated dive guide to buddy ratio of max 4:1"
    ]
  },
  {
    id: "exp-non-divers",
    title: "Non-Divers",
    copy: "Love the ocean but not diving? You're still welcome! Great for travellers, snorkellers and ocean lovers.",
    image: "/images/snorkel-turtle.jpg",
    alt: "A snorkeller floating above a turtle in clear water",
    highlights: [
      "Guided reef snorkeling safari with lifejackets and fins",
      "Island hopping, sunset cruises, and sandbar excursions",
      "Join the boat crew and watch dolphins in the wild",
      "Relaxed ocean retreat atmosphere"
    ]
  }
]

const SEED_GALLERY = [
  { id: "gal-1", src: "/images/reef-manta2.jpg", alt: "A manta ray cruising over a coral reef", category: "Underwater", caption: "Manta passage — house reef" },
  { id: "gal-2", src: "/images/turtle-reef.jpg", alt: "A hawksbill turtle on a coral reef", category: "Underwater", caption: "Hawksbill, slow morning" },
  { id: "gal-3", src: "/images/boat-diver.jpg", alt: "A diver at the surface beside the boat", category: "People", caption: "Surface interval" },
  { id: "gal-4", src: "/images/maldives-aerial3.jpg", alt: "Aerial view of a turquoise lagoon", category: "Destinations", caption: "Maafushi lagoon" },
  { id: "gal-5", src: "/images/reef-manta.jpg", alt: "Manta rays gliding over coral", category: "Underwater", caption: "Cleaning station" },
  { id: "gal-6", src: "/images/snorkel-woman.jpg", alt: "A snorkeller swimming at the surface", category: "People", caption: "First snorkel" },
  { id: "gal-7", src: "/images/cliffs.jpg", alt: "Limestone cliffs and a turquoise lagoon", category: "Destinations", caption: "Next on the map" },
  { id: "gal-8", src: "/images/turtle-diver2.jpg", alt: "A freediver above a turtle", category: "People", caption: "Two minutes down" },
  { id: "gal-9", src: "/images/maldives-aerial2.jpg", alt: "Aerial view of a palm-lined island", category: "Destinations", caption: "Island time" },
  { id: "gal-10", src: "/images/underwater-diver.jpg", alt: "A freediver beneath a manta ray", category: "Underwater", caption: "Blue hour" }
]

const SEED_TESTIMONIALS = [
  {
    id: "test-1",
    kind: "quote",
    quote: "An unforgettable experience! The dives, the people and the entire trip was so well organized. Can’t wait for the next one!",
    name: "Aashna",
    meta: "Mumbai",
    avatar: "/images/snorkel-woman.jpg",
    verified: true,
    createdAt: "2026-09-15T10:00:00.000Z"
  },
  {
    id: "test-2",
    kind: "invite",
    title: "Your story next?",
    copy: "Travelled with us? Real guest stories will be published here — with permission, always."
  },
  {
    id: "test-3",
    kind: "invite",
    title: "Reserved for the ocean",
    copy: "We only publish verified guest words. Send yours after your expedition and we will add it here."
  }
]

const FAQS = [
  {
    q: "Do I need to be a certified diver to join?",
    a: "No. Expeditions are open to beginners, certified divers and non-divers. Discover Scuba sessions can be arranged for first-timers, and snorkellers are always welcome."
  },
  {
    q: "How do I book a spot?",
    a: "Send an enquiry through the form below and we will reply personally with availability, the full itinerary and next steps. Nothing is charged or confirmed until you hear back from us."
  },
  {
    q: "How big are the groups?",
    a: "Maximum 10 people per expedition — small enough for real guidance, big enough for good company."
  },
  {
    q: "What is included in a trip?",
    a: "Every expedition is different. For Maldives Maafushi it includes scuba diving for all levels, a comfortable stay and boat dives as per the package. Exact inclusions are confirmed in your trip details."
  }
]

// In-memory state with disk persistence to /tmp (survives across warm lambda invocations)
let tripsData: any[] = [...SEED_TRIPS]
let testimonialsData: any[] = [...SEED_TESTIMONIALS]
let inquiriesData: any[] = []
let subscribersData: any[] = []

const isVercel = Boolean(process.env.VERCEL)
const DATA_DIR = isVercel ? '/tmp/data-storage' : path.resolve(process.cwd(), 'data-storage')

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch {}
}

async function persistFile(filename: string, data: any) {
  try {
    await ensureDir()
    await fs.writeFile(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2), 'utf-8')
  } catch {}
}

// Read body helper
function readBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        resolve({})
      }
    })
  })
}

// Send JSON helper
function sendJson(res: http.ServerResponse, status: number, data: any) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'no-cache'
  })
  res.end(JSON.stringify(data))
}

// Primary request handler for Vercel Serverless Function & Local HTTP Server
export default async function handler(req: http.IncomingMessage, res: http.ServerResponse) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    })
    res.end()
    return
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  let pathname = url.pathname

  // Normalize path (handle both /api/* and direct /* routing)
  if (pathname.startsWith('/api')) {
    pathname = pathname.substring(4) || '/'
  }

  const method = req.method || 'GET'

  try {
    // Welcome / Docs route
    if (pathname === '/' && method === 'GET') {
      sendJson(res, 200, {
        name: 'Purva Ocean Adventures API',
        status: 'active',
        version: '1.0.0',
        author: 'Dr. Purva Kuroa & Ocean Expeditions Team',
        instagram: 'https://www.instagram.com/dr.purvaa',
        docs: '/api/health',
        endpoints: [
          '/api/health',
          '/api/inquiries',
          '/api/newsletter',
          '/api/trips',
          '/api/content/experiences',
          '/api/content/gallery',
          '/api/content/faqs',
          '/api/testimonials'
        ]
      })
      return
    }

    // Health check
    if (pathname === '/health' && method === 'GET') {
      sendJson(res, 200, {
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        service: 'purva-ocean-backend',
        platform: isVercel ? 'vercel-serverless' : 'node-server'
      })
      return
    }

    // Trips endpoints
    if (pathname === '/trips' && method === 'GET') {
      sendJson(res, 200, {
        success: true,
        count: tripsData.length,
        data: tripsData
      })
      return
    }

    if (pathname.startsWith('/trips/') && method === 'GET') {
      const identifier = pathname.replace('/trips/', '').replace(/\/$/, '')
      const trip = tripsData.find(t => t.id === identifier || t.slug === identifier)
      if (!trip) {
        sendJson(res, 404, { success: false, message: `Expedition "${identifier}" not found.` })
        return
      }
      sendJson(res, 200, { success: true, data: trip })
      return
    }

    if (pathname.startsWith('/trips/') && pathname.endsWith('/spots') && method === 'PATCH') {
      const identifier = pathname.replace('/trips/', '').replace('/spots', '')
      const body = await readBody(req)
      const { spotsRemaining } = body
      const index = tripsData.findIndex(t => t.id === identifier || t.slug === identifier)
      if (index === -1) {
        sendJson(res, 404, { success: false, message: `Expedition "${identifier}" not found.` })
        return
      }
      tripsData[index].spotsRemaining = Number(spotsRemaining)
      tripsData[index].status = Number(spotsRemaining) === 0 ? 'waitlist' : 'open'
      persistFile('trips.json', tripsData)
      sendJson(res, 200, { success: true, data: tripsData[index] })
      return
    }

    // Inquiries endpoints
    if (pathname === '/inquiries') {
      if (method === 'GET') {
        sendJson(res, 200, { success: true, count: inquiriesData.length, data: inquiriesData })
        return
      }
      if (method === 'POST') {
        const body = await readBody(req)
        const now = new Date().toISOString()
        const newInquiry = {
          id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          name: body.name || 'Ocean Explorer',
          email: body.email || '',
          phone: body.phone || '',
          dates: body.dates || '',
          travellers: body.travellers || '1',
          experience: body.experience || 'Certified Diver',
          notes: body.notes || '',
          type: body.type || 'trip-inquiry',
          status: 'pending',
          createdAt: now,
          updatedAt: now
        }
        inquiriesData.unshift(newInquiry)
        persistFile('inquiries.json', inquiriesData)
        sendJson(res, 201, {
          success: true,
          message: 'Thank you! Your enquiry has been received. Dr. Purva and team will get back to you shortly.',
          data: newInquiry
        })
        return
      }
    }

    // Newsletter endpoints
    if (pathname === '/newsletter') {
      if (method === 'GET') {
        sendJson(res, 200, { success: true, count: subscribersData.length, data: subscribersData })
        return
      }
      if (method === 'POST') {
        const body = await readBody(req)
        const email = (body.email || '').toLowerCase().trim()
        if (!email) {
          sendJson(res, 400, { success: false, message: 'Valid email address is required.' })
          return
        }
        const existing = subscribersData.find(s => s.email === email)
        if (existing) {
          sendJson(res, 200, {
            success: true,
            message: 'You are already on the list! We will write when the next route opens.',
            data: existing
          })
          return
        }
        const newSub = {
          id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          email,
          type: body.type || 'destination-updates',
          subscribedAt: new Date().toISOString()
        }
        subscribersData.unshift(newSub)
        persistFile('subscribers.json', subscribersData)
        sendJson(res, 201, {
          success: true,
          message: 'Welcome aboard! You are now subscribed to Purva Ocean Adventures updates.',
          data: newSub
        })
        return
      }
    }

    // Content: Experiences
    if (pathname === '/content/experiences' && method === 'GET') {
      sendJson(res, 200, { success: true, count: SEED_EXPERIENCES.length, data: SEED_EXPERIENCES })
      return
    }

    // Content: Gallery
    if (pathname === '/content/gallery' && method === 'GET') {
      const category = url.searchParams.get('category')
      let items = SEED_GALLERY
      if (category && category.toLowerCase() !== 'all') {
        items = items.filter(i => i.category.toLowerCase() === category.toLowerCase())
      }
      sendJson(res, 200, { success: true, count: items.length, data: items })
      return
    }

    // Content: FAQs
    if (pathname === '/content/faqs' && method === 'GET') {
      sendJson(res, 200, { success: true, data: FAQS })
      return
    }

    // Testimonials
    if (pathname === '/testimonials') {
      if (method === 'GET') {
        sendJson(res, 200, { success: true, count: testimonialsData.length, data: testimonialsData })
        return
      }
      if (method === 'POST') {
        const body = await readBody(req)
        const newTestimonial = {
          id: `test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          kind: 'quote',
          name: body.name || 'Ocean Guest',
          meta: body.location || '',
          quote: body.quote || '',
          verified: false,
          createdAt: new Date().toISOString()
        }
        testimonialsData.splice(1, 0, newTestimonial)
        persistFile('testimonials.json', testimonialsData)
        sendJson(res, 201, {
          success: true,
          message: 'Thank you for sharing your story! It has been submitted for review.',
          data: newTestimonial
        })
        return
      }
    }

    // 404 for unknown endpoints
    sendJson(res, 404, {
      success: false,
      message: `Endpoint ${method} ${pathname} not found.`
    })
  } catch (err: any) {
    sendJson(res, 500, {
      success: false,
      message: 'Internal server error',
      error: err?.message || String(err)
    })
  }
}

// Local development server listener
if (!isVercel) {
  const port = parseInt(process.env.PORT || '5000', 10)
  const server = http.createServer(handler)
  server.listen(port, () => {
    console.log(`\n🌊 ============================================`)
    console.log(`   Purva Ocean Adventures API Server (Standalone)`)
    console.log(`   Running on: http://localhost:${port}`)
    console.log(`   Health:     http://localhost:${port}/api/health`)
    console.log(`============================================ 🌊\n`)
  })
}
