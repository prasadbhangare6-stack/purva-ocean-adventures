import { useRef } from 'react'
import { Globe2, Heart, ShieldCheck, Sparkles, Star, Users } from 'lucide-react'
import { BENEFITS } from '../data/site'
import { useReveal } from '../lib/anim'

const ICONS = { heart: Heart, globe: Globe2, users: Users, shield: ShieldCheck, star: Star } as const

export function Benefits() {
  const root = useRef<HTMLElement>(null)
  useReveal(root, { y: 20, stagger: 0.08 })

  return (
    <section
      ref={root}
      className="card flex flex-col bg-navy px-8 py-12 sm:px-12 sm:py-16 text-ivory shadow-[0_20px_50px_-20px_rgba(3,18,27,0.4)]"
      aria-labelledby="benefits-title"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-ivory/12 pb-8" data-anim-group>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-white/5 px-3 py-1 text-[9.5px] font-medium uppercase tracking-[0.2em] text-cyan mb-3">
            <Sparkles size={11} />
            <span>The Purva Ethos</span>
          </div>
          <h2 id="benefits-title" className="display text-[clamp(32px,3.5vw,48px)] leading-[0.98] text-ivory" data-anim>
            Why Travel With Us?
          </h2>
        </div>
        <p className="max-w-md text-[13.5px] leading-[1.7] text-ivory/65" data-anim>
          Thoughtful expeditions built around conservation, medical diver care, and small-group camaraderie.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8" data-anim-group>
        {BENEFITS.map((b, i) => {
          const Icon = ICONS[b.icon]
          return (
            <div key={b.title} className="group flex flex-col" data-anim>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-cyan transition-all duration-500 ease-sea group-hover:scale-110 group-hover:bg-cyan/15 group-hover:border-cyan/40">
                <Icon size={20} strokeWidth={1.3} aria-hidden="true" />
              </span>
              <span className="mt-4 text-[10px] font-mono text-ivory/30">0{i + 1}</span>
              <h3 className="text-[15px] font-semibold text-ivory leading-snug mt-1">{b.title}</h3>
              <p className="mt-2 text-[12px] leading-[1.65] text-ivory/60">{b.copy}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
