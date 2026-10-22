import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'dark' | 'light' | 'outline-light'
  className?: string
  arrow?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
}

/** Shared CTA button. Renders an <a> when href is provided, else a <button>. */
export function Button({
  children,
  href,
  onClick,
  variant = 'dark',
  className = '',
  arrow = true,
  type = 'button',
  disabled,
}: Props) {
  const cls = `btn btn-${variant} group ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="btn-arrow" size={14} strokeWidth={1.6} aria-hidden="true" />
      )}
    </>
  )

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {inner}
    </button>
  )
}

type IconButtonProps = {
  label: string
  onClick: () => void
  children: ReactNode
  disabled?: boolean
  className?: string
  dark?: boolean
}

export function IconButton({
  label,
  onClick,
  children,
  disabled,
  className = '',
  dark = false,
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`icon-btn ${dark ? 'border-white/25 text-ivory hover:bg-ivory hover:text-navy' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
