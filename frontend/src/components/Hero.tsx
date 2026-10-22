import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Leaf, Play, ShieldCheck, Users } from 'lucide-react'
import { HERO_SCENES } from '../data/site'
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from '../lib/anim'

const HEADLINE = ['Explore.', 'Learn.', 'Dive. Belong.']

const TRUST = [
  { icon: Users, title: 'Small Groups', copy: 'Maximum 10 people' },
  { icon: Leaf, title: 'Meaningful Travel', copy: 'Ocean first approach' },
  { icon: ShieldCheck, title: 'Safe & Guided', copy: 'By a certified diver' },
]

export function Hero({ onWatchFilm }: { onWatchFilm: () => void }) {
  const root = useRef<HTMLElement>(null)
  const zoom = useRef<HTMLDivElement>(null)
  const cursor = useRef<HTMLDivElement>(null)
  const [scene, setScene] = useState(0)

  /* Preload the alternate hero scenes after first paint. */
  useEffect(() => {
    const t = window.setTimeout(() => {
      HERO_SCENES.slice(1).forEach((s) => {
        const img = new Image()
        img.src = s.src
      })
    }, 1200)
    return () => window.clearTimeout(t)
  }, [])

  /* Opening cinematic + scroll-linked depth */
  useIsoLayoutEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-clip', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.15, ease: 'power3.inOut' }, 0)
        .from('.hero-zoom', { scale: 1.16, duration: 1.9, ease: 'power2.out' }, 0)
        .from('.hero-eyebrow', { y: 14, opacity: 0, duration: 0.7 }, 0.24)
        .from('.hero-line-inner', { yPercent: 112, duration: 1.05, stagger: 0.09 }, 0.34)
        .from('.hero-copy', { y: 16, opacity: 0, duration: 0.85 }, 0.86)
        .from('.hero-cta > *', { y: 14, opacity: 0, duration: 0.7, stagger: 0.09 }, 1.0)
        .from('.hero-rail', { opacity: 0, x: 12, duration: 0.8 }, 1.05)
        .from('.hero-trust > *', { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 }, 1.12)

      /* Scroll depth — the photograph descends slower than the page. */
      gsap.to('.hero-zoom', {
        yPercent: 11,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-content', {
        yPercent: -6,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  /* Cursor-responsive drift (pointer devices only) */
  useEffect(() => {
    const el = root.current
    const layer = cursor.current
    if (!el || !layer) return
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const xTo = gsap.quickTo(layer, 'x', { duration: 1.1, ease: 'power3.out' })
    const yTo = gsap.quickTo(layer, 'y', { duration: 1.1, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      xTo(nx * 16)
      yTo(ny * 12)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section
      id="home"
      ref={root}
      className="card relative isolate flex min-h-[620px] sm:min-h-[660px] lg:min-h-[720px] flex-col justify-between overflow-hidden bg-navy text-ivory shadow-[0_20px_50px_-20px_rgba(3,18,27,0.4)]"
    >
      {/* Media */}
      <div className="absolute inset-0 -z-10">
        <div className="hero-clip absolute inset-0" style={{ willChange: 'clip-path' }}>
          <div ref={zoom} className="hero-zoom absolute inset-0" style={{ willChange: 'transform' }}>
            <div ref={cursor} className="hero-cursor absolute -inset-4">
              <AnimatePresence initial={false}>
                <motion.img
                  key={HERO_SCENES[scene].src}
                  src={HERO_SCENES[scene].src}
                  alt={HERO_SCENES[scene].alt}
                  className="absolute inset-0 h-full w-full object-cover object-[58%_38%]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  {...{ fetchpriority: 'high' }}
                  decoding="async"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/50 to-navy/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/95 via-transparent to-navy/20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="hero-content relative flex flex-1 flex-col justify-center px-6 pb-6 pt-12 sm:px-12 lg:px-16 lg:pt-16 xl:px-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/10 px-3.5 py-1.5 backdrop-blur-sm w-fit">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
          <p className="hero-eyebrow eyebrow text-ivory/90 text-[9.5px]">Collecting Shades of Blue • Maldives & Beyond</p>
        </div>

        <h1 className="display mt-6 text-[clamp(44px,5.2vw,72px)] text-ivory leading-[0.94]">
          {HEADLINE.map((line) => (
            <span key={line} className="mask-line">
              <span className="hero-line-inner block">{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-copy mt-5 max-w-[28rem] text-[14px] sm:text-[15px] leading-[1.7] text-ivory/80">
          Curated small-group ocean expeditions designed for curious travellers, beginner explorers, and certified divers.
        </p>

        <div className="hero-cta mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href="#featured" className="btn btn-light group !py-3.5 !pl-6 !pr-5 shadow-lg">
            <span>Explore Upcoming Trips</span>
            <ArrowRight className="btn-arrow" size={14} strokeWidth={1.6} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={onWatchFilm}
            className="group flex items-center gap-3 text-ivory"
            aria-label="Watch the expedition film"
          >
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ivory/45 transition-all duration-500 ease-sea group-hover:scale-105 group-hover:border-ivory group-hover:bg-ivory/10">
              <Play size={13} strokeWidth={1.5} className="ml-[2px] fill-ivory/90" aria-hidden="true" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ivory/85 transition-colors duration-300 group-hover:text-ivory">
              Watch Film
            </span>
          </button>
        </div>
      </div>

      {/* Scene rail */}
      <div className="hero-rail absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-4 sm:flex lg:right-10">
        {HERO_SCENES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setScene(i)}
            aria-label={`Show scene ${i + 1} of ${HERO_SCENES.length}`}
            aria-pressed={scene === i}
            className="group flex items-center gap-2.5"
          >
            <span
              className={`h-px transition-all duration-500 ease-sea ${
                scene === i ? 'w-8 bg-ivory' : 'w-3 bg-ivory/40 group-hover:w-6 group-hover:bg-ivory/70'
              }`}
            />
            <span
              className={`font-sans text-[11px] tabular-nums tracking-[0.14em] transition-colors duration-400 ${
                scene === i ? 'text-ivory font-medium' : 'text-ivory/45 group-hover:text-ivory/80'
              }`}
            >
              0{i + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Trust row */}
      <div className="hero-trust relative grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-ivory/12 px-6 py-5 sm:px-12 lg:px-16 xl:px-20 bg-navy/40 backdrop-blur-sm">
        {TRUST.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-center gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-ivory">
              <Icon size={18} strokeWidth={1.3} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-ivory/95">{title}</p>
              <p className="mt-0.5 text-[11.5px] leading-tight text-ivory/65">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
