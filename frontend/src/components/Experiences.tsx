import { useRef, useState } from 'react'
import { ArrowRight, Compass, Sparkles } from 'lucide-react'
import { EXPERIENCES } from '../data/site'
import { useReveal } from '../lib/anim'
import { Modal } from './ui/Modal'

const EXPERIENCE_TAGS = ['Discover Scuba Diving', 'Guided Reef & Channel Dives', 'Snorkel & Ocean Retreat']

export function Experiences() {
  const root = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  useReveal(root, { y: 24, stagger: 0.1 })

  const active = openIndex !== null ? EXPERIENCES[openIndex] : null

  return (
    <section
      id="experiences"
      ref={root}
      className="card bg-ivory px-6 py-10 sm:px-12 sm:py-14 text-navy shadow-[0_20px_50px_-20px_rgba(3,18,27,0.1)] border border-navy/5"
      aria-labelledby="experiences-title"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2" data-anim-group>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/70 px-3 py-1 text-[9.5px] font-medium uppercase tracking-[0.2em] text-navy/70 mb-3">
            <Compass size={11} className="text-cyan" />
            <span>Inclusive Expeditions</span>
          </div>
          <h2
            id="experiences-title"
            className="display text-[clamp(32px,3.5vw,48px)] leading-[0.98] text-navy"
            data-anim
          >
            Dive Experiences
            <span className="block text-navy/65">For Every Explorer</span>
          </h2>
        </div>
        <p className="max-w-md text-[13.5px] leading-[1.7] text-navy/60" data-anim>
          Whether you are taking your very first breath underwater or tracking manta rays through deep channels, every expedition offers bespoke guidance tailored to your experience.
        </p>
      </div>

      <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-3" data-anim-group>
        {EXPERIENCES.map((exp, i) => (
          <article
            key={exp.title}
            className="group relative isolate aspect-[1.3/1] sm:aspect-[1.15/1] overflow-hidden rounded-[4px] bg-navy shadow-md cursor-pointer transition-all duration-500 hover:shadow-xl"
            data-anim
            onClick={() => setOpenIndex(i)}
          >
            <img
              src={exp.image}
              alt={exp.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-sea group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent transition-opacity duration-700 group-hover:from-navy/100" />
            <div className="absolute inset-0 bg-navy/15" />

            <div className="relative flex h-full w-full flex-col justify-end p-6 text-left">
              <span className="mb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan">
                {EXPERIENCE_TAGS[i] || 'Ocean Expedition'}
              </span>
              <h3 className="font-serif text-[26px] leading-tight text-ivory">{exp.title}</h3>
              <p className="mt-2 text-[12px] leading-[1.65] text-ivory/75 line-clamp-2">{exp.copy}</p>

              <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.16em] text-ivory/80 group-hover:text-ivory transition-colors">
                  Explore Details
                </span>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/40 text-ivory transition-all duration-500 ease-sea group-hover:scale-105 group-hover:border-ivory group-hover:bg-ivory group-hover:text-navy"
                  aria-hidden="true"
                >
                  <ArrowRight size={13} strokeWidth={1.6} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Modal open={active !== null} onClose={() => setOpenIndex(null)} labelledBy="exp-modal-title" size="md">
        {active && (
          <div>
            <div className="relative h-52 w-full overflow-hidden sm:h-64">
              <img src={active.image} alt={active.alt} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
              <h3
                id="exp-modal-title"
                className="display absolute bottom-5 left-6 text-[36px] text-ivory leading-none"
              >
                {active.title}
              </h3>
            </div>
            <div className="px-7 py-7">
              <p className="text-[14px] leading-[1.8] text-navy/75">{active.copy}</p>
              <div className="mt-4 rounded-[2px] border border-navy/10 bg-cream/50 p-4">
                <p className="text-[12px] leading-[1.7] text-navy/65">
                  Every expedition maintains a low instructor-to-diver ratio. During your pre-trip consultation, Dr. Purva personally assesses your comfort level to curate dive plans, equipment setups, and buddy pairings.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <a href="#contact" className="btn btn-dark group flex-1 justify-center" onClick={() => setOpenIndex(null)}>
                  <span>Enquire About This Track</span>
                  <ArrowRight className="btn-arrow" size={13} strokeWidth={1.6} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
