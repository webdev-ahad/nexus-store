import type { ReactNode } from 'react'

type SectionHeaderProps = {
  label: string
  title: string
  description?: string
  className?: string
  trailing?: ReactNode
}

const SectionHeader = ({
  label,
  title,
  description,
  className = '',
  trailing,
}: SectionHeaderProps) => {
  return (
    <div className={`mb-10 animate-fade-in-up ${className}`}>
      <div className={`flex flex-col gap-4 ${trailing ? 'sm:flex-row sm:items-end sm:justify-between' : ''}`}>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-purple-300">{label}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
          {description && (
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">{description}</p>
          )}
        </div>
        {trailing}
      </div>
    </div>
  )
}

export default SectionHeader
