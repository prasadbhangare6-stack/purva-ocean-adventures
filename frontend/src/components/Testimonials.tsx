import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, MessageSquareQuote, Sparkles } from 'lucide-react'
import { TESTIMONIALS } from '../data/site'
import { useReveal } from '../lib/anim'

export function Testimonials() {
  const root = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const busy = useRef(false)
  useReveal(root, { y: 20, stagger: 0.08 })

  const count = TESTIMONIALS.length

  const move = useCallback(
    (d: 1 | -1) => {
      if (busy.current) return
      busy.current = true
      setDir(d)
      setIndex((i) => (i + d + count) % count)
      window.setTimeout(() => {
        busy.current = false
      }, 480)
    },
    [count],
  )

  useEffect(() => {
    busy.current = false
  }, [])

  const item = TESTIMONIALS[index]

  return (
    <section
      ref={root}
      className="card flex flex-col bg-cream px-8 py-12 sm:px-14 sm:py-16 text-navy shadow-[0_20px_50px_-20px_rgba(3,18,27,0.12)] border border-navy/5"
      aria-labelledby="testimonials-title"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-navy/10" data-anim-group>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/60 px-3 py-1 text-[9.5px] font-medium uppercase tracking-[0.2em] text-navy/70 mb-3">
            <MessageSquareQuote size={11} className="text-cyan" />
            <span>Community Stories</span>
          </div>
          <h2 id="testimonials-title" className="display text-[clamp(32px,3.5vw,48px)] leading-[0.98] text-navy">
            Voices From The Expedition
          </h2>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/20 bg-white/60 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-ivory"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={15} strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/20 bg-white/60 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-ivory"
            aria-label="Next testimonial"
          >
            <ArrowRight size={15} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {/* Main Slide */}
      <div className="relative mt-10 min-h-[180px] max-w-3xl" data-anim>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: dir === 1 ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir === 1 ? -20 : 20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {item.kind === 'quote' ? (
              <figure>
                <span className="font-serif text-[48px] leading-none text-navy/20 block mb-2 select-none" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote>
                  <p className="font-serif text-[clamp(22px,2.4vw,32px)] italic leading-[1.38] text-navy">
                    {item.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {item.avatar && (
                    <img
                      src={item.avatar}
                      alt=""
                      loading="lazy"
                      className="h-10 w-10 rounded-full object-cover border border-navy/15 shadow-sm"
                    />
                  )}
                  <div>
                    <p className="text-[13px] font-semibold text-navy">{item.name}</p>
                    <p className="text-[11px] text-navy/55">{item.meta} • Verified Expedition Guest</p>
                  </div>
                </figcaption>
              </figure>
            ) : (
              <div className="py-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan block mb-2">
                  Reserved For The Ocean
                </span>
                <p className="font-serif text-[28px] sm:text-[34px] leading-tight text-navy">
                  {item.title}
                </p>
                <p className="mt-3 text-[14px] leading-[1.75] text-navy/65 max-w-xl">
                  {item.copy}
                </p>
                <a
                  href="#contact"
                  className="btn btn-dark group mt-6 inline-flex"
                >
                  <span>Share Your Expedition Story</span>
                  <ArrowRight className="btn-arrow" size={13} strokeWidth={1.6} />
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination indicators */}
      <div className="mt-8 flex items-center gap-2" role="tablist" aria-label="Testimonials">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Testimonial ${i + 1}`}
            onClick={() => {
              if (i === index) return
              setDir(i > index ? 1 : -1)
              setIndex(i)
            }}
            className="py-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-400 ${
                i === index ? 'w-8 bg-navy' : 'w-2 bg-navy/20 hover:bg-navy/40'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
