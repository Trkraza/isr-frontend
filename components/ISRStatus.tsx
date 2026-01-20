'use client'

import { Clock, Tag, Zap, Database } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'
import { ISRConfig } from '@/lib/types'

interface ISRStatusProps {
  config: ISRConfig
  className?: string
}

export default function ISRStatus({ config, className = '' }: ISRStatusProps) {
  const {
    revalidate,
    tags = [],
    preRendered = false,
    lastUpdated,
    cacheHits,
  } = config

  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-300 flex items-center space-x-2">
          <Zap className="w-4 h-4 text-primary-400" />
          <span>ISR Configuration</span>
        </h3>
        {preRendered && (
          <span className="badge-primary text-xs">
            Pre-rendered
          </span>
        )}
      </div>

      <div className="space-y-2 text-sm">
        {/* Revalidation Time */}
        {revalidate !== undefined && (
          <div className="flex items-center space-x-2 text-slate-400">
            <Clock className="w-4 h-4 text-primary-400" />
            <span>
              Revalidate: <span className="text-primary-400 font-mono">{revalidate}s</span>
            </span>
          </div>
        )}

        {/* Cache Tags */}
        {tags.length > 0 && (
          <div className="flex items-start space-x-2 text-slate-400">
            <Tag className="w-4 h-4 text-accent-purple mt-0.5" />
            <div className="flex-1">
              <span>Tags: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {tags.map((tag) => (
                  <span key={tag} className="badge-purple text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Last Updated */}
        {lastUpdated && (
          <div className="flex items-center space-x-2 text-slate-400">
            <Database className="w-4 h-4 text-accent-cyan" />
            <span>
              Updated: <span className="text-accent-cyan">{formatRelativeTime(lastUpdated)}</span>
            </span>
          </div>
        )}

        {/* Cache Hits */}
        {cacheHits !== undefined && (
          <div className="flex items-center space-x-2 text-slate-400">
            <span className="text-xs">
              Cache hits: <span className="text-green-400 font-mono">{cacheHits}</span>
            </span>
          </div>
        )}
      </div>

      {/* Educational Note */}
      <div className="mt-3 pt-3 border-t border-slate-800">
        <p className="text-xs text-slate-500 italic">
          💡 This page uses ISR to balance freshness and performance
        </p>
      </div>
    </div>
  )
}