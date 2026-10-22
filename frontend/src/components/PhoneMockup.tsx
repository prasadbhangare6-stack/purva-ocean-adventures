import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { BrandMark } from './ui/BrandMark'
import { gsap, prefersReducedMotion } from '../lib/anim'

/**
 * Decorative desktop-only device mockup showing the same site at mobile width.
 * Purely visual: it never intercepts pointer events or covers a control.
 */
export function PhoneMockup() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        scale: 0.94,
        duration: 1.1,
        delay: 0.9,
        ease: 'power3.out',
      })
      gsap.to(el.querySelector('.phone-float'), {
        y: -10,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to(el, {
        y: -46,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1 },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-4 right-0 z-30 hidden w-[172px] select-none xl:block 2xl:right-2"
    >
      <div className="phone-float">
        <div className="rounded-[22px] border border-[#0b1116] bg-[#0b1116] p-[3px] shadow-[0_30px_60px_-24px_rgba(3,18,27,0.75),0_2px_0_rgba(255,255,255,0.6)_inset]">
          <div className="relative overflow-hidden rounded-[19px] bg-ivory">
            {/* speaker / camera cutout */}
            <div className="absolute left-1/2 top-1 z-20 h-[3px] w-8 -translate-x-1/2 rounded-full bg-[rgba(11,17,22,0.85)]" />

            {/* mini header */}
            <div className="flex items-center gap-1 px-2 pb-1 pt-2.5">
              <BrandMark className="h-4 w-4 text-navy" />
              <div className="flex flex-col leading-none">
                <span className="text-[4.2px] font-medium tracking-[0.18em] text-navy">PURVA OCEAN</span>
                <span className="mt-[1.5px] text-[2.8px] tracking-[0.28em] text-navy/60">ADVENTURES</span>
              </div>
              <div className="ml-auto flex flex-col gap-[2px]">
                <span className="block h-[1px] w-[6px] bg-navy/70" />
                <span className="block h-[1px] w-[6px] bg-navy/70" />
              </div>
            </div>

            {/* mini hero */}
            <div className="relative mx-1.5 overflow-hidden rounded-[2px] bg-navy px-2 pb-2 pt-3 text-ivory">
              <img
                src="/images/hero-whale.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/45 to-navy/25" />
              <div className="relative">
                <p className="text-[2.6px] font-medium uppercase tracking-[0.22em] text-ivory/75">
                  Collecting Shades of Blue
                </p>
                <p className="mt-[3px] font-serif text-[10px] leading-[0.95] text-ivory">
                  Explore.
                  <br />
                  Learn.
                  <br />
                  Dive. Belong.
                </p>
                <p className="mt-[3px] text-[2.6px] leading-[1.5] text-ivory/70">
                  Curated ocean journeys for curious humans who love the ocean.
                </p>
                <span className="mt-[5px] inline-flex items-center gap-[3px] rounded-full bg-ivory px-1.5 py-[3px] text-[2.8px] font-medium uppercase tracking-[0.14em] text-navy">
                  Explore Trips
                  <ArrowRight size={3} strokeWidth={2} />
                </span>
              </div>
            </div>

            {/* mini featured card */}
            <div className="mx-1.5 mb-1.5 mt-1 overflow-hidden rounded-[2px] bg-cream">
              <div className="relative h-[38px] w-full overflow-hidden">
                <img src="/images/maldives-aerial.jpg" alt="" className="h-full w-full object-cover" />
              </div>
              <div className="px-1.5 py-1">
                <p className="text-[3px] font-medium uppercase tracking-[0.18em] text-navy/45">
                  Featured Expedition
                </p>
                <p className="mt-[2px] font-serif text-[6.5px] leading-none text-navy">Maldives Maafushi</p>
                <p className="mt-[2px] text-[2.6px] tracking-[0.1em] text-navy/55">22 – 27 NOV 2026 | 5 NIGHTS / 6 DAYS</p>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 pb-2 pt-0.5">
              <span className="h-[1px] w-3 bg-navy/20" />
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-navy text-ivory">
                <ArrowRight size={4} strokeWidth={2} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
