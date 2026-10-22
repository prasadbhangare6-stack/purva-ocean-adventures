type Props = { className?: string }

/** Brand mark — abstract whale shark in a circle. */
export function BrandMark({ className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={className}
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="22" cy="22" r="21" opacity="0.75" />
      <path d="M8.6 25.4c4.6.2 8.2-1.8 10.8-5.6 1.6-2.3 3.9-3.9 6.6-4.4 2-.4 3.6-1.4 4.7-2.9" />
      <path d="M30.7 12.5c1.6 1.1 2.8 2.7 3.4 4.6M8.6 25.4c1.7 3.4 5 5.6 9 5.9 3.9.3 7.3-1.1 9.9-3.9" opacity="0.55" />
      <circle cx="16.6" cy="20.4" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="20.4" cy="17.9" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="24.4" cy="16.6" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="18.2" cy="24.0" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}
