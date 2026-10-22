import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type ModalProps = {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'ivory' | 'navy'
  className?: string
}

const sizes: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Modal({
  open,
  onClose,
  labelledBy,
  children,
  size = 'md',
  tone = 'ivory',
  className = '',
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null || n === document.activeElement,
      )
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement as HTMLElement
    const { overflow, paddingRight } = document.body.style
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    const raf = requestAnimationFrame(() => {
      const panel = panelRef.current
      const target =
        panel?.querySelector<HTMLElement>('[data-autofocus]') ??
        panel?.querySelector<HTMLElement>(FOCUSABLE) ??
        panel
      target?.focus({ preventScroll: true })
    })

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      restoreRef.current?.focus?.({ preventScroll: true })
    }
  }, [open, handleKeyDown])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 bg-[rgba(3,18,27,0.78)] backdrop-blur-[6px]"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.965, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.975, y: 8 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full ${sizes[size]} max-h-[90vh] overflow-y-auto no-scrollbar rounded-[3px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] ${
              tone === 'ivory' ? 'bg-ivory text-navy' : 'bg-navy text-ivory'
            } ${className}`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                tone === 'ivory'
                  ? 'bg-navy/5 text-navy hover:bg-navy hover:text-ivory'
                  : 'bg-white/10 text-ivory hover:bg-white hover:text-navy'
              }`}
              aria-label="Close dialog"
            >
              <X size={16} strokeWidth={1.6} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
