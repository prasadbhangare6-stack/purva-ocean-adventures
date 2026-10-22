import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, Instagram, Minus, Plus } from 'lucide-react'
import { FAQS, INQUIRY_ENDPOINT, INSTAGRAM, NAV } from '../data/site'
import { useReveal } from '../lib/anim'
import { BrandMark } from './ui/BrandMark'

type FormState = 'idle' | 'loading' | 'done' | 'error'

export function Footer() {
  const root = useRef<HTMLElement>(null)
  useReveal(root, { y: 20, stagger: 0.07 })

  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [form, setForm] = useState({ name: '', email: '', interest: 'Maldives Maafushi', message: '' })
  const [state, setState] = useState<FormState>('idle')
  const [notice, setNotice] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: '' }))
    if (state === 'error') setState('idle')
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!form.name.trim()) nextErrors.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      nextErrors.email = 'Please enter a valid email address.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setState('loading')
    try {
      if (INQUIRY_ENDPOINT) {
        const res = await fetch(INQUIRY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.message || 'failed')
        setState('done')
        setNotice(data.message || 'Thank you — your enquiry is on its way. We reply personally, usually within two days.')
      } else {
        setState('done')
        setNotice(
          'This enquiry form is a frontend demo — no email service is connected, so nothing was sent. Your details stay in this browser.',
        )
      }
    } catch {
      setState('error')
      setNotice('We could not send that. Please try again, or write to us directly.')
    }
  }

  return (
    <footer id="contact" ref={root} className="relative mt-2 overflow-hidden bg-navy text-ivory">
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #28A8D9 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1480px] px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        {/* Journal */}
        <section id="journal" className="border-b border-ivory/12 pb-12" aria-labelledby="journal-title">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end" data-anim-group>
            <div data-anim>
              <p className="eyebrow text-ivory/45">Field Journal</p>
              <h2 id="journal-title" className="display mt-3 max-w-[26rem] text-[clamp(30px,3.4vw,46px)] leading-[1.02]">
                Dispatches from the water
              </h2>
              <p className="mt-4 max-w-[34rem] text-[13px] leading-[1.75] text-ivory/60">
                Dive logs, trip notes and small observations from the reef. The first entries are being
                written — join the list and they will arrive quietly in your inbox.
              </p>
            </div>
            <a
              href="#contact-form"
              className="btn btn-outline-light group self-start lg:self-end"
              data-anim
            >
              <span>Join the list</span>
              <ArrowRight className="btn-arrow" size={13} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Contact + FAQ */}
        <div className="grid gap-12 pt-12 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="plan-title" data-anim-group>
            <p className="eyebrow text-ivory/45" data-anim>
              Enquiries
            </p>
            <h2 id="plan-title" className="display mt-3 text-[clamp(34px,3.8vw,52px)] leading-[1]" data-anim>
              Plan your trip
            </h2>
            <p className="mt-4 max-w-[26rem] text-[13px] leading-[1.75] text-ivory/60" data-anim>
              Tell us when you would like to travel and how comfortable you are in the water. You will hear
              back personally — no automated booking, no pressure.
            </p>

            <form id="contact-form" onSubmit={submit} noValidate className="mt-7 space-y-4" data-anim>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="enq-name" className="mb-1.5 block text-[10px] uppercase tracking-[0.16em] text-ivory/45">
                    Name
                  </label>
                  <input
                    id="enq-name"
                    className="field"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'enq-name-error' : undefined}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p id="enq-name-error" className="mt-1.5 text-[10.5px] text-[#E9A79E]" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="enq-email" className="mb-1.5 block text-[10px] uppercase tracking-[0.16em] text-ivory/45">
                    Email
                  </label>
                  <input
                    id="enq-email"
                    type="email"
                    className="field"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'enq-email-error' : undefined}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p id="enq-email-error" className="mt-1.5 text-[10.5px] text-[#E9A79E]" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="enq-interest" className="mb-1.5 block text-[10px] uppercase tracking-[0.16em] text-ivory/45">
                  I am interested in
                </label>
                <select
                  id="enq-interest"
                  className="field appearance-none bg-navy"
                  value={form.interest}
                  onChange={(e) => update('interest', e.target.value)}
                >
                  <option>Maldives Maafushi — 22–27 Nov 2026</option>
                  <option>Beginners / Discover Scuba</option>
                  <option>Certified diver trips</option>
                  <option>Non-diver &amp; snorkelling</option>
                  <option>Future destinations</option>
                </select>
              </div>

              <div>
                <label htmlFor="enq-message" className="mb-1.5 block text-[10px] uppercase tracking-[0.16em] text-ivory/45">
                  Anything else? (optional)
                </label>
                <textarea
                  id="enq-message"
                  className="field min-h-[92px] resize-y"
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Number of travellers, experience level, questions…"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className="btn btn-light group" disabled={state === 'loading'}>
                  <span>{state === 'loading' ? 'Sending…' : 'Send Enquiry'}</span>
                  <ArrowRight className="btn-arrow" size={13} strokeWidth={1.6} aria-hidden="true" />
                </button>
                <p className="text-[10px] leading-[1.6] text-ivory/35">
                  {INQUIRY_ENDPOINT
                    ? 'Sent straight to the expedition inbox.'
                    : 'Demo form — deliveries are disabled until an endpoint is configured.'}
                </p>
              </div>

              <AnimatePresence>
                {(state === 'done' || state === 'error') && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    role="status"
                    aria-live="polite"
                    className={`flex items-start gap-3 rounded-[2px] border px-4 py-3 ${
                      state === 'done'
                        ? 'border-ivory/15 bg-ivory/5 text-ivory/75'
                        : 'border-[rgba(233,167,158,0.4)] bg-[rgba(233,167,158,0.1)] text-[#F3C7C1]'
                    }`}
                  >
                    {state === 'done' && (
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ivory text-navy">
                        <Check size={12} strokeWidth={2} />
                      </span>
                    )}
                    <p className="text-[11.5px] leading-[1.65]">{notice}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </section>

          {/* FAQ */}
          <section id="faqs" aria-labelledby="faq-title" data-anim-group>
            <p className="eyebrow text-ivory/45" data-anim>
              Good to know
            </p>
            <h2 id="faq-title" className="display mt-3 text-[clamp(30px,3.4vw,44px)] leading-[1]" data-anim>
              Questions, answered
            </h2>

            <ul className="mt-6 divide-y divide-ivory/12 border-y border-ivory/12">
              {FAQS.map((faq, i) => {
                const open = openFaq === i
                return (
                  <li key={faq.q} data-anim>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 py-4 text-left"
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span className="font-serif text-[17px] leading-snug text-ivory/90">{faq.q}</span>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ivory/25 text-ivory/70 transition-colors">
                        {open ? <Minus size={11} strokeWidth={1.6} /> : <Plus size={11} strokeWidth={1.6} />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[32rem] pb-5 text-[12.5px] leading-[1.75] text-ivory/55">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 rounded-[2px] border border-ivory/12 p-5" data-anim>
              <p className="font-serif text-[19px] leading-snug text-ivory/85">
                Still wondering something?
              </p>
              <p className="mt-2 text-[12px] leading-[1.7] text-ivory/50">
                Send the question through the enquiry form, or message Dr. Purva directly on Instagram. Every enquiry is answered personally.
              </p>
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-ivory/70 transition-colors hover:text-ivory"
              >
                <Instagram size={13} className="text-pink-400" />
                <span>Message {INSTAGRAM.handle} on Instagram</span>
                <ArrowUpRight size={10} className="text-ivory/40" />
              </a>
            </div>
          </section>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-ivory/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BrandMark className="h-9 w-9 text-ivory/80" />
            <div>
              <p className="text-[11.5px] font-medium tracking-[0.17em] text-ivory/85">PURVA OCEAN ADVENTURES</p>
              <p className="mt-1 text-[9.5px] tracking-[0.22em] text-ivory/40">COLLECTING SHADES OF BLUE</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-white/[0.05] px-3.5 py-1.5 text-[11px] text-ivory/85 transition-all hover:border-pink-500/50 hover:bg-white/10 hover:text-ivory"
              aria-label={`Follow ${INSTAGRAM.handle} on Instagram`}
            >
              <Instagram size={13} className="text-pink-400 transition-transform group-hover:scale-110" />
              <span>{INSTAGRAM.handle}</span>
              <ArrowUpRight size={11} className="text-ivory/40 transition-colors group-hover:text-ivory" />
            </a>

            <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="group inline-flex items-center gap-1 text-[10.5px] text-ivory/50 transition-colors hover:text-ivory"
                >
                  {n.label}
                  <ArrowUpRight
                    size={10}
                    strokeWidth={1.5}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-[9.5px] leading-relaxed text-ivory/30 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Purva Ocean Adventures. All rights reserved.</p>
          <p>
            Reference design recreation · Photography from Pexels contributors · Dates shown are
            illustrative, not confirmed availability.
          </p>
        </div>
      </div>
    </footer>
  )
}
