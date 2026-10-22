import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Camera, Expand, X } from 'lucide-react'
import { GALLERY, GALLERY_CATEGORIES, type GalleryCategory } from '../data/site'
import { useReveal } from '../lib/anim'

const PAGE_SIZE = 8

export function Gallery() {
  const root = useRef<HTMLElement>(null)
  const [category, setCategory] = useState<GalleryCategory>('All')
  const [page, setPage] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  useReveal(root, { y: 20, stagger: 0.08 })

  const items = useMemo(
    () => (category === 'All' ? GALLERY : GALLERY.filter((g) => g.category === category)),
    [category],
  )
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const visible = items.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

  const go = useCallback(
    (dir: 1 | -1) => setPage((p) => (p + dir + pageCount) % pageCount),
    [pageCount],
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % items.length))
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + items.length) % items.length))
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, items.length])

  return (
    <section
      id="gallery"
      ref={root}
      className="card flex flex-col bg-ivory px-6 py-10 sm:px-12 sm:py-14 text-navy shadow-[0_20px_50px_-20px_rgba(3,18,27,0.1)] border border-navy/5"
      aria-labelledby="gallery-title"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2" data-anim-group>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/70 px-3 py-1 text-[9.5px] font-medium uppercase tracking-[0.2em] text-navy/70 mb-3">
            <Camera size={11} className="text-cyan" />
            <span>Visual Journal</span>
          </div>
          <h2 id="gallery-title" className="display text-[clamp(32px,3.5vw,48px)] leading-[0.98] text-navy">
            Moments From The Blue
          </h2>
          <p className="mt-2 text-[13.5px] text-navy/60">
            Real encounters, surface intervals, and expedition captures across the Indian Ocean.
          </p>
        </div>

        {/* Categories & Pagination */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-navy/12 bg-white/50 p-1" role="tablist">
            {GALLERY_CATEGORIES.map((cat) => {
              const on = cat === category
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setCategory(cat)
                    setPage(0)
                  }}
                  className={`relative isolate rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-colors duration-300 ${
                    on ? 'text-ivory' : 'text-navy/65 hover:text-navy'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="gallery-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-navy"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  {cat}
                </button>
              )
            })}
          </div>

          {pageCount > 1 && (
            <div className="flex items-center gap-1.5 border-l border-navy/15 pl-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy hover:text-ivory"
                aria-label="Previous gallery page"
              >
                <ArrowLeft size={13} strokeWidth={1.6} />
              </button>
              <span className="text-[11px] tabular-nums text-navy/55 px-1">
                {safePage + 1}/{pageCount}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy hover:text-ivory"
                aria-label="Next gallery page"
              >
                <ArrowRight size={13} strokeWidth={1.6} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Images */}
      <div className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${category}-${safePage}`}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {visible.map((item) => (
              <div
                key={item.src}
                onClick={() => setLightbox(items.indexOf(item))}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-navy/10 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-sea group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="self-end flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-ivory backdrop-blur-sm">
                    <Expand size={13} />
                  </span>
                  <div>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan">
                      {item.category}
                    </span>
                    <p className="font-serif text-[16px] text-ivory leading-tight mt-0.5">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && items[lightbox] && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
          >
            <div className="absolute inset-0 bg-[rgba(3,18,27,0.92)] backdrop-blur-md" onClick={() => setLightbox(null)} />
            <motion.figure
              key={items[lightbox].src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[86vh] w-full max-w-4xl z-10"
            >
              <img
                src={items[lightbox].src}
                alt={items[lightbox].alt}
                className="max-h-[76vh] w-full rounded-[4px] object-contain mx-auto shadow-2xl"
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-[12px] uppercase tracking-[0.16em] text-ivory/80 px-2">
                <div>
                  <span className="text-cyan font-semibold mr-2">[{items[lightbox].category}]</span>
                  <span>{items[lightbox].caption}</span>
                </div>
                <span className="tabular-nums font-mono text-ivory/50">
                  {lightbox + 1} / {items.length}
                </span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory hover:text-navy"
              aria-label="Close image viewer"
            >
              <X size={18} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => setLightbox((i) => (i === null ? i : (i - 1 + items.length) % items.length))}
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory hover:text-navy sm:left-8"
              aria-label="Previous image"
            >
              <ArrowLeft size={18} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => setLightbox((i) => (i === null ? i : (i + 1) % items.length))}
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory hover:text-navy sm:right-8"
              aria-label="Next image"
            >
              <ArrowRight size={18} strokeWidth={1.6} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
