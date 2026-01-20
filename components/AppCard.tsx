import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { Dapp } from '@/lib/types'
import { getChainColor } from '@/lib/utils'

interface AppCardProps {
  app: Dapp
  size?: 'small' | 'medium' | 'large'
  featured?: boolean
}

export default function AppCard({ app, size = 'medium', featured = false }: AppCardProps) {
  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1 md:col-span-2',
    large: 'col-span-1 md:col-span-2 lg:col-span-3',
  }

  return (
    <Link
      href={`/apps/${app.slug}`}
      className={`glass-card-hover p-6 group relative overflow-hidden ${sizeClasses[size]}`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="badge-purple animate-pulse">
            ⭐ Featured
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex items-start space-x-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-xl bg-slate-800/50 p-2 group-hover:scale-110 transition-transform">
            {app.logo ? (
              <Image
                src={app.logo}
                alt={app.name}
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-purple rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {app.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors truncate">
              {app.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Description */}
          <p className="text-sm text-slate-400 line-clamp-2 mb-3">
            {app.description.split('\n')[0].substring(0, 120)}...
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {app.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge-primary text-xs">
                {tag}
              </span>
            ))}
          </div>

          {/* Chains */}
          <div className="flex items-center space-x-2">
            {app.chains.slice(0, 4).map((chain) => (
              <div
                key={chain}
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: getChainColor(chain) + '20',
                  color: getChainColor(chain),
                  border: `1px solid ${getChainColor(chain)}40`,
                }}
                title={chain}
              >
                {chain.charAt(0).toUpperCase()}
              </div>
            ))}
            {app.chains.length > 4 && (
              <span className="text-xs text-slate-500">
                +{app.chains.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Link>
  )
}