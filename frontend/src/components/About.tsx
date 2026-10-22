import { useRef } from 'react'
import { ArrowRight, ArrowUpRight, Compass, Heart, Instagram, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { INSTAGRAM } from '../data/site'
import { useReveal } from '../lib/anim'

export function About() {
  const root = useRef<HTMLElement>(null)
  useReveal(root, { y: 20, stagger: 0.08 })

  return (
    <section
      id="about"
      ref={root}
      className="card relative overflow-hidden bg-cream text-navy p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_-20px_rgba(3,18,27,0.12)] border border-navy/5"
      aria-labelledby="about-title"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
        {/* Short & Sweet Story */}
        <div data-anim-group>
          <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/70 px-3 py-1 text-[9.5px] font-medium uppercase tracking-[0.2em] text-navy/70 mb-3">
            <Compass size={11} className="text-cyan" />
            <span>About The Collective</span>
          </div>

          <h2
            id="about-title"
            className="display text-[clamp(32px,3.5vw,46px)] leading-[1] text-navy"
            data-anim
          >
            Curated For Curious Ocean Souls.
          </h2>

          <p className="mt-4 text-[14px] sm:text-[14.5px] leading-[1.75] text-navy/75 max-w-xl" data-anim>
            Founded by <strong>Dr. Purva</strong> — a physiotherapist and certified PADI Rescue Diver — <strong>Purva Ocean Adventures</strong> is a boutique collective created for those who seek meaningful, unhurried ocean travel.
          </p>

          <p className="mt-2.5 text-[13px] leading-[1.7] text-navy/60 max-w-xl" data-anim>
            We trade crowded commercial cattle boats for strictly 8–10 person expeditions, medical-grade diver comfort, and deep reverence for marine life.
          </p>

          {/* Quick Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5" data-anim>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-navy/10 px-3 py-1 text-[11px] font-medium text-navy/85 shadow-sm">
              <Users size={12} className="text-cyan" />
              Max 10 Explorers
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-navy/10 px-3 py-1 text-[11px] font-medium text-navy/85 shadow-sm">
              <ShieldCheck size={12} className="text-deep" />
              Physio & Rescue Guided
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-navy/10 px-3 py-1 text-[11px] font-medium text-navy/85 shadow-sm">
              <Heart size={12} className="text-rose-500" />
              100% Ocean-First Ethos
            </span>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3" data-anim>
            <a href="#contact" className="btn btn-dark group !px-5 !py-3 shadow-md">
              <span>Plan A Trip With Us</span>
              <ArrowRight className="btn-arrow" size={13} strokeWidth={1.6} aria-hidden="true" />
            </a>

            <a
              href={INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light group !border-navy/20 !px-5 !py-3"
            >
              <Instagram size={13} className="text-pink-600" />
              <span>Follow {INSTAGRAM.handle}</span>
              <ArrowUpRight className="btn-arrow" size={13} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Visual Card */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden rounded-[4px] shadow-md group" data-anim>
          <img
            src="/images/maldives-aerial2.jpg"
            alt="Pristine lagoon and palm island in the Maldives"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-sea group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

          {/* Bottom attribution overlay */}
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-[3px] bg-navy/70 backdrop-blur-md border border-white/15 text-ivory flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium tracking-wide">Purva Ocean Adventures</p>
              <p className="text-[9.5px] text-ivory/60">Kaafu Atoll, Maldives & Beyond</p>
            </div>
            <span className="text-[9px] uppercase tracking-[0.16em] text-cyan font-semibold">
              Boutique Journeys
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
