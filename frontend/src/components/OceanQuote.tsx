import { useRef } from 'react'
import { QUOTE } from '../data/site'
import { gsap, prefersReducedMotion, useClipReveal, useIsoLayoutEffect, useParallax, useReveal } from '../lib/anim'

export function OceanQuote() {
  const root = useRef<HTMLElement>(null)
  useReveal(root, { y: 16, stagger: 0.12 })

  /* Draw the small decorative rule after the quote lands */
  useIsoLayoutEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.quote-rule', {
        scaleX: 0,
        duration: 0.9,
        delay: 0.35,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])
  useClipReveal(root, '.quote-clip', { direction: 'down', duration: 1.25 })
  useParallax(root, '.quote-parallax', 14)

  return (
    <figure
      ref={root}
      className="card relative isolate flex min-h-[340px] sm:min-h-[380px] lg:min-h-[420px] flex-col justify-center items-center overflow-hidden bg-navy text-ivory shadow-[0_20px_50px_-20px_rgba(3,18,27,0.35)]"
    >
      <div className="quote-clip absolute inset-0 -z-10">
        <div className="quote-parallax absolute -inset-y-[12%] inset-x-0">
          <img
            src={QUOTE.image}
            alt={QUOTE.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/60 to-navy/40" />
        <div className="absolute inset-0 bg-navy/20" />
      </div>

      <blockquote
        className="relative z-10 flex flex-col items-center justify-center max-w-4xl px-6 py-14 sm:py-20 text-center"
        aria-label="Ocean Philosophy"
      >
        <span
          className="font-serif text-[56px] sm:text-[72px] leading-none text-ivory/25 mb-2 select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="font-serif text-[clamp(26px,3.2vw,44px)] italic leading-[1.3] text-ivory">
          {QUOTE.lines.map((line) => (
            <span key={line} className="inline sm:block" data-anim>
              {line.replace(/[“”]/g, '')}{' '}
            </span>
          ))}
        </p>

        <span
          className="quote-rule mt-6 block h-px w-14 origin-center bg-cyan/70"
          data-anim
          aria-hidden="true"
        />

        <p className="mt-4 text-[10.5px] uppercase tracking-[0.24em] text-ivory/70 font-medium" data-anim>
          Purva Ocean Ethos
        </p>
      </blockquote>
    </figure>
  )
}
