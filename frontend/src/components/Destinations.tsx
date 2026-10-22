import { useRef, useState } from 'react'
import { ArrowRight, Check, Compass, Mail, Sparkles } from 'lucide-react'
import { DESTINATIONS, NEWSLETTER_ENDPOINT } from '../data/site'
import { gsap, prefersReducedMotion, useClipReveal, useIsoLayoutEffect, useParallax, useReveal } from '../lib/anim'
import { Modal } from './ui/Modal'

export function Destinations() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'error' | 'loading' | 'done'>('idle')
  const [message, setMessage] = useState('')

  useReveal(root, { y: 20, stagger: 0.08 })
  useClipReveal(root, '.dest-clip', { direction: 'right', duration: 1.35 })
  useParallax(root, '.dest-parallax', 12)

  /* Scroll-linked push-in on the photograph: 1.09 → 1.0 */
  useIsoLayoutEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dest-scale',
        { scale: 1.09 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    if (!valid) {
      setState('error')
      setMessage('Please enter a valid email address.')
      return
    }
    setState('loading')
    try {
      if (NEWSLETTER_ENDPOINT) {
        const res = await fetch(NEWSLETTER_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, type: 'destination-updates' }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Request failed')
        setState('done')
        setMessage(data.message || 'You are on the list. We will write when the next route opens.')
      } else {
        setState('done')
        setMessage('Saved! You will receive itinerary updates as soon as new dates drop.')
      }
    } catch {
      setState('error')
      setMessage('Something went wrong. Please try again in a moment.')
    }
  }

  const close = () => {
    setOpen(false)
    window.setTimeout(() => {
      setState('idle')
      setMessage('')
      setEmail('')
    }, 350)
  }

  return (
    <section
      id="destinations"
      ref={root}
      className="card relative isolate flex min-h-[360px] sm:min-h-[400px] flex-col justify-center overflow-hidden bg-navy text-ivory shadow-[0_20px_50px_-20px_rgba(3,18,27,0.4)]"
      aria-labelledby="dest-title"
    >
      <div className="dest-clip absolute inset-0 -z-10 overflow-hidden">
        <div className="dest-scale absolute inset-0">
          <div className="dest-parallax absolute -inset-y-[12%] inset-x-0">
            <img
              src={DESTINATIONS.image}
              alt={DESTINATIONS.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-navy/30" />
      </div>

      <div className="relative z-10 px-8 py-12 sm:px-14 sm:py-16 max-w-4xl" data-anim-group>
        <div className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/10 px-3.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.2em] text-ivory/90 mb-3 backdrop-blur-sm">
          <Compass size={11} className="text-cyan" />
          <span>Future Horizons</span>
        </div>

        <h2 id="dest-title" className="display text-[clamp(34px,3.8vw,52px)] leading-[0.98] text-ivory" data-anim>
          {DESTINATIONS.title}
        </h2>

        <p className="mt-3 text-[14px] text-ivory/70 max-w-xl" data-anim>
          We are currently scouting new pristine dive routes, private coral sanctuaries, and authentic homestays across the following destinations:
        </p>

        {/* Destination tags */}
        <div className="mt-5 flex flex-wrap items-center gap-2.5" data-anim>
          {DESTINATIONS.list.map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-medium text-ivory backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              {d}
            </span>
          ))}
        </div>

        {/* Inline subscription form */}
        <form onSubmit={submit} className="mt-8 max-w-md" data-anim>
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ivory/40 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (state !== 'idle') setState('idle')
                }}
                placeholder="Enter your email for priority dates"
                className="w-full rounded-full border border-white/20 bg-white/10 pl-10 pr-4 py-3 text-[12.5px] text-ivory placeholder-ivory/45 backdrop-blur-sm focus:border-cyan focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={state === 'loading'}
              className="btn btn-light group shrink-0 !py-3 !px-5 shadow-md"
            >
              <span>{state === 'loading' ? 'Joining…' : DESTINATIONS.cta}</span>
              <ArrowRight className="btn-arrow" size={12} strokeWidth={1.6} />
            </button>
          </div>

          {state === 'done' && (
            <p className="mt-3 text-[12px] text-emerald-300 flex items-center gap-1.5 font-medium">
              <Check size={14} />
              {message}
            </p>
          )}
          {state === 'error' && (
            <p className="mt-3 text-[12px] text-rose-300 font-medium">
              {message}
            </p>
          )}
        </form>
      </div>

      <Modal open={open} onClose={close} labelledBy="newsletter-title" size="sm">
        <div className="px-7 py-8">
          <p className="eyebrow text-navy/45">Destination Updates</p>
          <h3 id="newsletter-title" className="display mt-2 text-[32px] leading-none text-navy">
            Be the First to Dive
          </h3>
          <p className="mt-3 text-[13px] leading-[1.7] text-navy/65">
            Join the waitlist to receive private advance notification 48 hours before new expedition dates open publicly.
          </p>
          <form onSubmit={submit} className="mt-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full rounded-[3px] border border-navy/20 bg-ivory px-4 py-3 text-[13px] text-navy placeholder-navy/40 focus:border-navy focus:outline-none"
            />
            <button type="submit" className="btn btn-dark group mt-4 w-full justify-center">
              <span>Join Priority Waitlist</span>
              <ArrowRight className="btn-arrow" size={13} strokeWidth={1.6} />
            </button>
          </form>
        </div>
      </Modal>
    </section>
  )
}
