import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Layout effect that is safe during SSR / first paint. */
export const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

type RevealOptions = {
  y?: number
  stagger?: number
  duration?: number
  start?: string
  delay?: number
  scale?: number
}

/**
 * Universal scroll-reveal system.
 *
 * Any element marked `[data-anim]` inside the scope is revealed once when it
 * enters the viewport. Elements sharing the same closest `[data-anim-group]`
 * wrapper are staggered together, so a section can contain several distinct
 * beats without hand-written timelines.
 */
export function useReveal<T extends HTMLElement>(
  scope: RefObject<T | null>,
  opts: RevealOptions = {},
) {
  const { y = 26, stagger = 0.085, duration = 0.95, start = 'top 88%', delay = 0, scale = 1 } = opts

  useIsoLayoutEffect(() => {
    const root = scope.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-anim]', root)
      const groups = new Map<Element, HTMLElement[]>()

      items.forEach((el) => {
        const key = el.closest('[data-anim-group]') ?? root
        const bucket = groups.get(key)
        if (bucket) bucket.push(el)
        else groups.set(key, [el])
      })

      groups.forEach((list) => {
        gsap.from(list, {
          y,
          opacity: 0,
          scale,
          duration,
          delay,
          ease: 'power3.out',
          stagger,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: list[0],
            start,
            once: true,
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [scope, y, stagger, duration, start, delay, scale])
}

/**
 * Subtle, scroll-linked parallax for a media element.
 * `depth` is the total vertical travel in percent across the section.
 */
export function useParallax(
  scope: RefObject<HTMLElement | null>,
  targetSelector: string,
  depth = 12,
) {
  useIsoLayoutEffect(() => {
    const root = scope.current
    if (!root || prefersReducedMotion()) return

    const el = root.querySelector<HTMLElement>(targetSelector)
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -depth / 2 },
        {
          yPercent: depth / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [scope, targetSelector, depth])
}

/** Refresh ScrollTrigger after fonts / images settle. */
export function useScrollRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const t = window.setTimeout(refresh, 500)
    window.addEventListener('load', refresh)
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('load', refresh)
    }
  }, [])
}

/** Tracks which section is currently in the middle of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '')
  const current = useRef(ids[0] ?? '')
  const key = ids.join('|')

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id && visible.target.id !== current.current) {
          current.current = visible.target.id
          setActive(visible.target.id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5] },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return active
}

/**
 * Mask reveal for major photography (clip-path, one-directional).
 * The strongest treatment is reserved for the hero and key imagery only.
 */
export function useClipReveal(
  scope: RefObject<HTMLElement | null>,
  selector: string,
  opts: { direction?: 'up' | 'down' | 'left' | 'right'; duration?: number; start?: string } = {},
) {
  const { direction = 'up', duration = 1.15, start = 'top 86%' } = opts

  useIsoLayoutEffect(() => {
    const root = scope.current
    if (!root || prefersReducedMotion()) return
    const el = root.querySelector<HTMLElement>(selector)
    if (!el) return

    const from = {
      up: 'inset(100% 0% 0% 0%)',
      down: 'inset(0% 0% 100% 0%)',
      right: 'inset(0% 0% 0% 100%)',
      left: 'inset(0% 100% 0% 0%)',
    }[direction]

    const ctx = gsap.context(() => {
      gsap.from(el, {
        clipPath: from,
        duration,
        ease: 'power3.inOut',
        clearProps: 'clip-path',
        scrollTrigger: { trigger: el, start, once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [scope, selector, direction, duration, start])
}
