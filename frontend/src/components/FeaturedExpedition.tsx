import { useRef } from 'react'
import { ArrowRight, BedDouble, Calendar, Ship, Sparkles, Users, Waves } from 'lucide-react'
import { FEATURED } from '../data/site'
import { useClipReveal, useParallax, useReveal } from '../lib/anim'

const ICONS = { scuba: Waves, stay: BedDouble, boat: Ship, spots: Users } as const

export function FeaturedExpedition({ onViewTrip }: { onViewTrip: () => void }) {
  const root = useRef<HTMLElement>(null)
  useReveal(root, { y: 22, stagger: 0.08 })
  useClipReveal(root, '.feat-img', { direction: 'right', duration: 1.2 })
  useParallax(root, '.feat-parallax', 7)

  return (
    <section
      id="featured"
      ref={root}
      className="card flex flex-col bg-cream text-navy lg:flex-row overflow-hidden shadow-[0_20px_50px_-20px_rgba(3,18,27,0.18)] border border-navy/5"
      aria-labelledby="featured-title"
    >
      {/* Copy Column */}
      <div className="w-full shrink-0 px-8 py-10 sm:px-12 sm:py-14 lg:w-[46%] flex flex-col justify-center">
        <div data-anim-group>
          <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/60 px-3 py-1 text-[9.5px] font-medium uppercase tracking-[0.2em] text-navy/70 w-fit">
            <Sparkles size={11} className="text-cyan" />
            <span>{FEATURED.eyebrow}</span>
          </div>

          <h2
            id="featured-title"
            className="display mt-4 text-[clamp(38px,4vw,56px)] leading-[0.96] text-navy"
            data-anim
          >
            {FEATURED.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10.5px] font-medium uppercase tracking-[0.14em] text-navy/75" data-anim>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-2.5 py-1">
              <Calendar size={12} className="text-navy/60" />
              {FEATURED.dates}
            </span>
            <span className="text-navy/30">•</span>
            <span className="rounded-full bg-navy/5 px-2.5 py-1">{FEATURED.duration}</span>
            <span className="text-navy/30">•</span>
            <span className="rounded-full bg-cyan/15 text-deep font-semibold px-2.5 py-1">Only 3 Spots Left</span>
          </div>

          <p className="mt-5 max-w-[28rem] text-[14px] leading-[1.7] text-navy/70" data-anim>
            {FEATURED.blurb}
          </p>

          <p className="mt-3 max-w-[28rem] text-[12.5px] leading-[1.7] text-navy/55" data-anim>
            Maafushi is a local island in Kaafu Atoll: serene turquoise beaches, a thriving house reef within swimming distance, and short boat rides to the atoll’s most-loved manta points and channels.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4" data-anim>
            <button
              type="button"
              onClick={onViewTrip}
              className="btn btn-dark group !px-6 !py-3.5 shadow-md"
            >
              <span>{FEATURED.cta}</span>
              <ArrowRight className="btn-arrow" size={13} strokeWidth={1.6} aria-hidden="true" />
            </button>
            <a
              href="#contact"
              className="btn btn-light group !border-navy/20 !px-6 !py-3.5"
            >
              <span>Enquire About Dates</span>
            </a>
          </div>
        </div>
      </div>

      {/* Image + floating amenities Column */}
      <div className="relative min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] flex-1 overflow-hidden">
        <div className="feat-img absolute inset-0 overflow-hidden">
          <div className="feat-parallax absolute -inset-y-[8%] inset-x-0">
            <img
              src={FEATURED.image}
              alt={FEATURED.imageAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-sea hover:scale-[1.05]"
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-cream/40 lg:via-transparent lg:to-transparent"
          aria-hidden="true"
        />

        {/* Floating amenities glass card */}
        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-auto sm:right-8">
          <div
            className="w-full sm:w-[260px] rounded-[4px] bg-[rgba(251,248,241,0.96)] p-5 shadow-[0_20px_50px_-15px_rgba(3,18,27,0.4)] backdrop-blur-md border border-white/60"
            data-anim-group
          >
            <p className="eyebrow text-navy/40 mb-3 text-[9px]">Included in Package</p>
            <ul className="flex flex-col divide-y divide-navy/8">
              {FEATURED.amenities.map((a) => {
                const Icon = ICONS[a.icon as keyof typeof ICONS]
                return (
                  <li key={a.title} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0" data-anim>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
                      <Icon size={15} strokeWidth={1.3} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium leading-tight text-navy">{a.title}</p>
                      {a.note && <p className="mt-0.5 text-[10px] leading-tight text-navy/50">{a.note}</p>}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
