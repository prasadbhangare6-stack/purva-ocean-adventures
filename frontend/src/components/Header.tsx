import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Instagram, Menu, X } from 'lucide-react'
import { INSTAGRAM, NAV } from '../data/site'
import { BrandMark } from './ui/BrandMark'
import { useActiveSection } from '../lib/anim'

const SECTION_IDS = ['home', 'featured', 'host', 'experiences', 'gallery', 'destinations', 'about', 'contact', 'journal', 'faqs']

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const isActive = (href: string) => {
    const id = href.replace('#', '')
    if (id === 'featured') return active === 'featured' || active === 'destinations'
    return active === id
  }

  return (
    <header
      className={`sticky top-0 z-[70] bg-ivory/92 backdrop-blur-md transition-[box-shadow,background-color] duration-500 ${
        scrolled ? 'shadow-[0_1px_0_rgba(3,18,27,0.09),0_10px_30px_-24px_rgba(3,18,27,0.5)]' : ''
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1480px] items-center gap-4 px-6 sm:px-8 lg:px-12">
        {/* Brand */}
        <a
          href="#home"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Purva Ocean Adventures — home"
        >
          <BrandMark className="h-10 w-10 text-navy transition-transform duration-700 ease-sea group-hover:rotate-[-8deg]" />
          <span className="flex flex-col leading-none">
            <span className="text-[13.5px] font-medium tracking-[0.17em] text-navy">PURVA OCEAN</span>
            <span className="mt-1 text-[8.5px] font-medium tracking-[0.34em] text-navy/65">
              ADVENTURES
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden flex-1 justify-center lg:flex" aria-label="Primary">
          <ul className="flex items-center gap-5 xl:gap-7">
            {NAV.map((item) => {
              const on = isActive(item.href)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative block py-2 text-[11.5px] tracking-[0.035em] transition-colors duration-300 ${
                      on ? 'text-navy' : 'text-navy/62 hover:text-navy'
                    }`}
                    aria-current={on ? 'true' : undefined}
                  >
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-[1px] h-px overflow-hidden">
                      {on && (
                        <motion.span
                          layoutId="nav-underline"
                          className="block h-full w-full bg-navy"
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Desktop Instagram & CTA */}
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <a
            href={INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition-all duration-300 hover:border-pink-500/50 hover:bg-gradient-to-tr hover:from-amber-500/10 hover:via-rose-500/10 hover:to-purple-500/10 hover:text-pink-600"
            aria-label={`Follow Dr. Purva on Instagram (${INSTAGRAM.handle})`}
            title={`Dr. Purva on Instagram (${INSTAGRAM.handle})`}
          >
            <Instagram size={17} strokeWidth={1.75} />
          </a>

          <a
            href="#contact"
            className="btn btn-dark group shrink-0 !px-5 !py-3 !text-[10px]"
          >
            <span>Plan Your Trip</span>
            <ArrowRight className="btn-arrow" size={13} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy hover:text-ivory lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={17} strokeWidth={1.6} /> : <Menu size={17} strokeWidth={1.6} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-navy/10 bg-ivory lg:hidden"
          >
            <nav aria-label="Mobile" className="px-5 pb-7 pt-4">
              <ul className="flex flex-col">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-navy/8 last:border-none"
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-3.5 font-serif text-[26px] leading-none text-navy"
                    >
                      {item.label}
                      <ArrowRight size={15} strokeWidth={1.4} className="text-navy/40" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={INSTAGRAM.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-[2px] border border-navy/15 bg-white/70 px-4 py-3 text-navy shadow-sm transition-all hover:bg-navy hover:text-ivory"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white">
                      <Instagram size={14} />
                    </span>
                    <span className="text-[12px] font-medium tracking-wide">Follow {INSTAGRAM.handle}</span>
                  </div>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-dark w-full justify-between"
                >
                  <span>Plan Your Trip</span>
                  <ArrowRight size={13} strokeWidth={1.6} />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
