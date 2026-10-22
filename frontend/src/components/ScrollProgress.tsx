import { useEffect, useRef } from 'react'

/** Hairline reading-progress indicator, ivory → cyan, fixed above the header. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent" aria-hidden="true">
      <div
        ref={bar}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#063C59] via-[#1C7FA8] to-[#28A8D9]"
      />
    </div>
  )
}
