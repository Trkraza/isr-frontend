'use client'

import { useState } from 'react'
import AppCard from '@/components/AppCard'
import Filters from '@/components/Filters'
import BentoGrid from '@/components/BentoGrid'
import { Dapp } from '@/lib/types'
import { filterApps } from '@/lib/utils'

interface ClientAppsGridProps {
  apps: Dapp[]
}

export default function ClientAppsGrid({ apps }: ClientAppsGridProps) {
  const [filteredApps, setFilteredApps] = useState<Dapp[]>(apps)

  const handleFilterChange = (filters: { search: string; chains: string[]; tags: string[] }) => {
    const filtered = filterApps(apps, filters.search, filters.chains, filters.tags)
    setFilteredApps(filtered)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <Filters onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Apps Grid */}
      <div className="lg:col-span-3">
        <div className="mb-4">
          <p className="text-sm text-slate-400">
            Showing <span className="text-primary-400 font-semibold">{filteredApps.length}</span> of{' '}
            <span className="text-slate-300 font-semibold">{apps.length}</span> apps
          </p>
        </div>

        {filteredApps.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-slate-400 text-lg">No apps found matching your filters</p>
            <p className="text-sm text-slate-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <BentoGrid>
            {filteredApps.map((app) => (
              <AppCard key={app.slug} app={app} size="small" featured={app.isFeatured} />
            ))}
          </BentoGrid>
        )}
      </div>
    </div>
  )
}