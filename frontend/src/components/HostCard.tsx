import { useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, CheckCircle2, HeartPulse, Instagram, ShieldCheck, Sparkles } from 'lucide-react'
import { HOST, INSTAGRAM } from '../data/site'
import { useClipReveal, useReveal } from '../lib/anim'
import { Modal } from './ui/Modal'

export function HostCard() {
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  useReveal(root, { y: 20, stagger: 0.08 })
  useClipReveal(root, '.host-media', { direction: 'up', duration: 1.05, start: 'top 92%' })

  return (
    <section
      id="host"
      ref={root}
      className="card flex flex-col lg:grid lg:grid-cols-[44%_56%] bg-cream text-navy overflow-hidden shadow-[0_20px_50px_-20px_rgba(3,18,27,0.18)] border border-navy/5"
      aria-labelledby="host-title"
    >
      {/* Visual Column */}
      <div className="host-media relative min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] w-full overflow-hidden">
        <img
          src={HOST.oceanImage}
          alt={HOST.oceanImageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center transition-transform duration-[1600ms] ease-sea hover:scale-[1.045]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-cream/40" />

        {/* Floating verified host Instagram badge */}
        <div className="absolute bottom-6 left-6 right-6 rounded-[4px] border border-white/20 bg-navy/85 p-4 text-ivory backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-navy/95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md">
                <Instagram size={17} strokeWidth={2} />
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-semibold tracking-wide text-ivory">{INSTAGRAM.handle}</span>
                  <CheckCircle2 size={13} className="text-sky-400" />
                </div>
                <p className="text-[10px] tracking-wide text-ivory/65">Official Host Profile • Verified Explorer</p>
              </div>
            </div>
            <a
              href={INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[9.5px] font-medium tracking-wider uppercase text-ivory transition-colors hover:bg-white hover:text-navy"
            >
              <span>Follow</span>
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* Narrative Column */}
      <div className="flex w-full flex-col justify-center px-8 py-10 sm:px-12 sm:py-14">
        <div data-anim-group>
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/60 px-3 py-1 text-[9.5px] font-medium uppercase tracking-[0.2em] text-navy/70">
              <Sparkles size={11} className="text-cyan" />
              <span>{HOST.title}</span>
            </div>

            <a
              href={INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-1.5 rounded-full border border-navy/12 bg-white/70 px-3 py-1 text-[10px] font-medium text-navy/80 transition-all hover:bg-navy hover:text-ivory"
            >
              <Instagram size={12} className="text-pink-600 group-hover:text-ivory" />
              <span>{INSTAGRAM.handle}</span>
              <ArrowUpRight size={11} className="opacity-50" />
            </a>
          </div>

          <h2 id="host-title" className="display mt-4 text-[clamp(36px,3.8vw,52px)] leading-[0.96] text-navy" data-anim>
            {HOST.name}
          </h2>

          <p className="mt-2 text-[10px] sm:text-[10.5px] font-semibold uppercase leading-[1.6] tracking-[0.14em] text-deep" data-anim>
            {HOST.credentials}
          </p>

          <p className="mt-5 text-[14px] leading-[1.75] text-navy/75" data-anim>
            {HOST.bio}
          </p>

          {/* Three key pillars */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-navy/10 py-5" data-anim>
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy mt-0.5">
                <HeartPulse size={15} strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-[12px] font-semibold text-navy">Physiotherapy-Led</p>
                <p className="mt-0.5 text-[11px] leading-[1.5] text-navy/60">Equalisation support, ergonomic diving posture, and post-dive recovery.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy mt-0.5">
                <ShieldCheck size={15} strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-[12px] font-semibold text-navy">PADI Rescue Diver</p>
                <p className="mt-0.5 text-[11px] leading-[1.5] text-navy/60">Strict safety protocols, small ratio buddy teams, and peace of mind underwater.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions & Signature */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6" data-anim-group>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn btn-dark group !px-5 !py-3 shadow-md"
              data-anim
            >
              <span>{HOST.cta}</span>
              <ArrowRight className="btn-arrow" size={12} strokeWidth={1.6} aria-hidden="true" />
            </button>

            <a
              href={INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light group !border-navy/20 !px-5 !py-3"
              data-anim
            >
              <Instagram size={13} className="text-pink-600" />
              <span>{HOST.instagramCta}</span>
              <ArrowUpRight className="btn-arrow" size={12} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>

          <div className="text-left sm:text-right" data-anim>
            <p className="text-[9px] uppercase tracking-[0.16em] text-navy/40">Host Signature</p>
            <p
              className="font-script text-[18px] text-navy/70 mt-1 -rotate-[2deg]"
              aria-hidden="true"
            >
              Diving • Travelling • The Ocean • Always
            </p>
          </div>
        </div>
      </div>

      {/* Host Details & Instagram Modal */}
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="host-modal-title" size="md">
        <div className="grid sm:grid-cols-[0.85fr_1fr]">
          <div className="relative h-56 overflow-hidden sm:h-full sm:min-h-[360px]">
            <img
              src="/images/cave-rays2.jpg"
              alt="Ocean waters and diving rays"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-ivory">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white">
                  <Instagram size={17} />
                </span>
                <div>
                  <p className="text-[13px] font-semibold leading-none">{INSTAGRAM.handle}</p>
                  <p className="mt-1 text-[10px] text-ivory/70">Real dive logs & ocean expedition moments</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-7 py-8">
            <p className="eyebrow text-navy/45">Founder & Expedition Leader</p>
            <h3 id="host-modal-title" className="display mt-2 text-[36px] leading-none text-navy">
              {HOST.name}
            </h3>
            <p className="mt-2 text-[9.5px] font-semibold uppercase leading-[1.7] tracking-[0.14em] text-deep">
              {HOST.credentials}
            </p>
            <p className="mt-4 text-[13.5px] leading-[1.8] text-navy/75">{HOST.bio}</p>
            <p className="mt-3 text-[12.5px] leading-[1.8] text-navy/60">
              Every expedition is hosted personally — from the initial itinerary consultation to the final sunset boat ride back to shore. See authentic underwater reels, previous trip highlights, and daily dive updates directly on Dr. Purva's official Instagram profile.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark group flex-1 justify-center"
              >
                <Instagram size={14} className="text-pink-400" />
                <span>Visit @dr.purvaa</span>
                <ArrowUpRight className="btn-arrow" size={13} strokeWidth={1.6} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn btn-light group"
              >
                <span>Say Hello</span>
                <ArrowRight className="btn-arrow" size={13} strokeWidth={1.6} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  )
}
