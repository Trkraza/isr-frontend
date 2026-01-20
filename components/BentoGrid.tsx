import { ReactNode } from 'react'

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export default function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto ${className}`}>
      {children}
    </div>
  )
}