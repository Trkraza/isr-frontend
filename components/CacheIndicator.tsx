'use client'

import { Clock } from 'lucide-react'
import { formatRelativeTime, getCacheStatusColor } from '@/lib/utils'

interface CacheIndicatorProps {
  lastUpdated: string
  revalidateTime?: number
  className?: string
}

export default function CacheIndicator({
  lastUpdated,
  revalidateTime = 60,
  className = '',
}: CacheIndicatorProps) {
  const ageInSeconds = Math.floor((Date.now() - new Date(lastUpdated).getTime()) / 1000)
  const colorClass = getCacheStatusColor(ageInSeconds, revalidateTime)

  const getStatus = () => {
    if (ageInSeconds < revalidateTime * 0.5) return 'Fresh'
    if (ageInSeconds < revalidateTime) return 'Aging'
    return 'Stale'
  }

  const getGlow = () => {
    if (ageInSeconds < revalidateTime * 0.5) return 'shadow-green-500/50'
    if (ageInSeconds < revalidateTime) return 'shadow-yellow-500/50'
    return 'shadow-orange-500/50'
  }

  return (
    <div
      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-card text-xs ${className}`}
    >
      <Clock className={`w-3 h-3 ${colorClass} animate-pulse`} />
      <span className="text-slate-300">
        {getStatus()}
      </span>
      <span className={colorClass}>
        {formatRelativeTime(lastUpdated)}
      </span>
    </div>
  )
}