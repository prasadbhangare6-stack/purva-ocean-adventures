export type NavItem = { label: string; href: string }

export const NAV: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Upcoming Trips', href: '#featured' },
  { label: 'Dive Experiences', href: '#experiences' },
  { label: 'Meet Dr. Purva', href: '#host' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/* ------------------------------------------------------------------ */
/*  Hero scenes — the 01–04 rail on the right of the hero              */
/* ------------------------------------------------------------------ */
export const HERO_SCENES = [
  { src: '/images/hero-whale.jpg', alt: 'A whale shark gliding past a scuba diver in deep blue water' },
  { src: '/images/cave-rays.jpg', alt: 'Sunbeams falling into a cavern where divers swim' },
  { src: '/images/reef-manta.jpg', alt: 'A manta ray cruising over a coral reef' },
  { src: '/images/snorkel-turtle.jpg', alt: 'A snorkeller swimming above a sea turtle' },
]

/* ------------------------------------------------------------------ */
/*  Featured expedition                                                */
/* ------------------------------------------------------------------ */
export const FEATURED = {
  eyebrow: 'Featured Expedition',
  title: ['Maldives', 'Maafushi'] as const,
  dates: '22 – 27 NOV 2026',
  duration: '5 NIGHTS / 6 DAYS',
  blurb:
    'Crystal clear waters, vibrant marine life and unforgettable dive experiences in the Maldives.',
  cta: 'View Trip Details',
  image: '/images/maldives-aerial.jpg',
  imageAlt: 'Aerial view of a Maldivian island ringed by turquoise lagoon',
  amenities: [
    { icon: 'scuba', title: 'Scuba Diving', note: '(for all levels)' },
    { icon: 'stay', title: 'Comfortable Stay', note: '' },
    { icon: 'boat', title: 'Boat Dives', note: '(As per package)' },
    { icon: 'spots', title: 'Only 10 Spots', note: '' },
  ],
}

/* ------------------------------------------------------------------ */
/*  Dive experiences                                                   */
/* ------------------------------------------------------------------ */
export const EXPERIENCES = [
  {
    title: 'Beginners',
    copy: 'New to scuba? Start your ocean journey with confidence.',
    image: '/images/beginner1.jpg',
    alt: 'A diver descending through sunlit blue water',
  },
  {
    title: 'Certified Divers',
    copy: 'Take your diving to the next level with guided dives and advanced courses.',
    image: '/images/turtle-diver.jpg',
    alt: 'A scuba diver swimming above a coral reef',
  },
  {
    title: 'Non-Divers',
    copy: "Love the ocean but not diving? You're still welcome! Great for travellers, snorkellers and ocean lovers.",
    image: '/images/snorkel-turtle.jpg',
    alt: 'A snorkeller floating above a turtle in clear water',
  },
]

/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/*  Instagram & Social                                                 */
/* ------------------------------------------------------------------ */
export const INSTAGRAM = {
  url: 'https://www.instagram.com/dr.purvaa',
  handle: '@dr.purvaa',
  name: 'Purva | Scuba & Ocean Adventures',
  bio: 'Physiotherapist × PADI Rescue Diver',
  description: 'Follow Dr. Purva for real underwater expeditions, behind-the-scenes dive logs, and ocean stories.',
}

/* ------------------------------------------------------------------ */
/*  Host                                                               */
/* ------------------------------------------------------------------ */
export const HOST = {
  title: 'Meet Your Host',
  name: 'Dr. Purva',
  credentials: 'Physiotherapist | PADI Rescue Diver | Founder, Purva Ocean Adventures',
  bio: 'What started as a personal love for the ocean has now grown into a space where I get to share my two biggest passions — diving and meaningful travel.',
  cta: 'Read My Story',
  instagramCta: 'Connect on Instagram',
  instagramUrl: 'https://www.instagram.com/dr.purvaa',
  instagramHandle: '@dr.purvaa',
  signature: ['Diving', 'Travelling', 'People', 'The Ocean', 'Always'],
  oceanImage: '/images/underwater-diver.jpg',
  oceanImageAlt: 'Ocean dive expedition in deep blue waters',
}

export const QUOTE = {
  lines: ['“The ocean', 'is the giver...', 'We are just visitors.”'],
  image: '/images/cave-rays2.jpg',
  alt: 'A lone diver silhouetted beneath a shaft of light in a cavern',
}

/* ------------------------------------------------------------------ */
/*  Gallery                                                            */
/* ------------------------------------------------------------------ */
export type GalleryCategory = 'All' | 'Underwater' | 'People' | 'Destinations'
export const GALLERY_CATEGORIES: GalleryCategory[] = ['All', 'Underwater', 'People', 'Destinations']

export type GalleryItem = {
  src: string
  alt: string
  category: Exclude<GalleryCategory, 'All'>
  caption: string
}

export const GALLERY: GalleryItem[] = [
  { src: '/images/manta.jpg', alt: 'A manta ray over a reef', category: 'Underwater', caption: 'Manta passage — house reef' },
  { src: '/images/turtle-reef.jpg', alt: 'A hawksbill turtle on a coral reef', category: 'Underwater', caption: 'Hawksbill, slow morning' },
  { src: '/images/boat-diver.jpg', alt: 'A diver at the surface beside the boat', category: 'People', caption: 'Surface interval' },
  { src: '/images/maldives-aerial3.jpg', alt: 'Aerial view of a turquoise lagoon', category: 'Destinations', caption: 'Maafushi lagoon' },
  { src: '/images/reef-manta.jpg', alt: 'Manta rays gliding over coral', category: 'Underwater', caption: 'Cleaning station' },
  { src: '/images/snorkel-woman.jpg', alt: 'A snorkeller swimming at the surface', category: 'People', caption: 'First snorkel' },
  { src: '/images/cliffs.jpg', alt: 'Limestone cliffs and a turquoise lagoon', category: 'Destinations', caption: 'Next on the map' },
  { src: '/images/turtle-diver2.jpg', alt: 'A freediver above a turtle', category: 'People', caption: 'Two minutes down' },
  { src: '/images/maldives-aerial2.jpg', alt: 'Aerial view of a palm-lined island', category: 'Destinations', caption: 'Island time' },
  { src: '/images/underwater-diver.jpg', alt: 'A freediver beneath a manta ray', category: 'Underwater', caption: 'Blue hour' },
]

/* ------------------------------------------------------------------ */
/*  Destinations                                                       */
/* ------------------------------------------------------------------ */
export const DESTINATIONS = {
  title: 'More Destinations Coming Soon',
  list: ['Lakshadweep', 'Andaman', 'Indonesia', 'Bali', 'and more...'],
  cta: 'Be The First To Know',
  image: '/images/cliffs.jpg',
  alt: 'Aerial view of limestone cliffs, boats and a turquoise lagoon',
}

/* ------------------------------------------------------------------ */
/*  Benefits                                                           */
/* ------------------------------------------------------------------ */
export const BENEFITS = [
  { icon: 'heart', title: 'Ocean First', copy: 'Thoughtful, responsible and meaningful travel.' },
  { icon: 'globe', title: 'Curated Experiences', copy: 'Handpicked destinations & local expertise.' },
  { icon: 'users', title: 'Small Group Vibes', copy: 'Like-minded people, real connections.' },
  { icon: 'shield', title: 'Safety & Support', copy: 'Guided by a certified diver, with emphasis on safe and enjoyable diving.' },
  { icon: 'star', title: 'More Than Just a Trip', copy: "It's a community of ocean lovers." },
] as const

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/*  Slide 1 is the genuine reference testimonial. Slides 2–3 are       */
/*  intentionally not fake reviews — they invite real ones.            */
/* ------------------------------------------------------------------ */
export type Testimonial =
  | { kind: 'quote'; quote: string; name: string; meta: string; avatar?: string }
  | { kind: 'invite'; title: string; copy: string }

export const TESTIMONIALS: Testimonial[] = [
  {
    kind: 'quote',
    quote:
      'An unforgettable experience! The dives, the people and the entire trip was so well organized. Can’t wait for the next one!',
    name: 'Aashna',
    meta: 'Mumbai',
    avatar: '/images/snorkel-woman.jpg',
  },
  {
    kind: 'invite',
    title: 'Your story next?',
    copy: 'Travelled with us? Real guest stories will be published here — with permission, always.',
  },
  {
    kind: 'invite',
    title: 'Reserved for the ocean',
    copy: 'We only publish verified guest words. Send yours after your expedition and we will add it here.',
  },
]

/* ------------------------------------------------------------------ */
/*  Film — integration point. Set a real MP4/YouTube embed to enable.  */
/* ------------------------------------------------------------------ */
export const FILM_SRC = '' // e.g. '/media/purva-expedition-film.mp4'
export const FILM_POSTER = '/images/cave-divers.jpg'

/* ------------------------------------------------------------------ */
/*  Enquiry & newsletter endpoints — connects to backend /api routes    */
/* ------------------------------------------------------------------ */
export const INQUIRY_ENDPOINT = import.meta.env.VITE_INQUIRY_ENDPOINT ?? '/api/inquiries'
export const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT ?? '/api/newsletter'

export const FAQS = [
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
