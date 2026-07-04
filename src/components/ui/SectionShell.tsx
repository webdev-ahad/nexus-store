import type { ReactNode } from 'react'

type SectionShellProps = {
  id?: string
  gradient?: 'top' | 'bottom' | 'center' | 'none'
  children: ReactNode
  className?: string
}

const gradients = {
  top: 'bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(139,92,246,0.12),transparent)]',
  bottom: 'bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(139,92,246,0.08),transparent)]',
  center: 'bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(139,92,246,0.06),transparent)]',
  none: '',
}

const SectionShell = ({ id, gradient = 'none', children, className = '' }: SectionShellProps) => {
  return (
    <section
      id={id}
      className={`relative overflow-hidden border-t border-white/[0.04] bg-zinc-950 px-4 py-14 sm:px-6 lg:px-8 ${className}`}
    >
      {gradient !== 'none' && (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${gradients[gradient]}`} />
      )}
      <div className="relative mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

export default SectionShell
