import ISRStatus from '@/components/ISRStatus'
import CacheIndicator from '@/components/CacheIndicator'

import { fetchAllApps } from '@/lib/api'
import { Info } from 'lucide-react'
import ClientAppsGrid from '@/components/ClientAppsGrid'

// ====================
// TIME-BASED ISR
// ====================
// This page demonstrates time-based revalidation
// Data is fetched on the server with ISR enabled

export const revalidate = 60 // Revalidate every 60 seconds

export default async function AppsPage() {
  // Server-side fetch with ISR tags
  const apps = await fetchAllApps({
    revalidate: 60,
    tags: ['apps-list', 'all-apps'],
  })

  const timestamp = new Date().toISOString()

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">All Applications</h1>
              <p className="text-slate-400">
                Showing {apps.length} apps
              </p>
            </div>
            <CacheIndicator lastUpdated={timestamp} revalidateTime={60} />
          </div>

          {/* ISR Educational Section */}
          <div className="glass-card p-6 border-l-4 border-primary-500 mb-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Time-Based ISR Demo
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  This page uses <span className="text-primary-400 font-mono">revalidate: 60</span> for automatic background updates.
                </p>
                <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                  <li>First request: Instant response from cache</li>
                  <li>After 60 seconds: Stale content served, regeneration starts</li>
                  <li>Next request: Fresh content from cache</li>
                  <li>Filtering happens client-side (no page reload)</li>
                </ul>
                <div className="mt-3 p-3 bg-slate-900/50 rounded-lg">
                  <code className="text-xs text-primary-400">
                    export const revalidate = 60
                    <br />
                    const apps = await fetchAllApps({'{'}
                    <br />
                    &nbsp;&nbsp;revalidate: 60,
                    <br />
                    &nbsp;&nbsp;tags: ['apps-list', 'all-apps']
                    <br />
                    {'}'})
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* ISR Status */}
          <ISRStatus
            config={{
              revalidate: 60,
              tags: ['apps-list', 'all-apps'],
              preRendered: true,
              lastUpdated: timestamp,
            }}
          />
        </div>

        {/* Client-side interactive grid with filters */}
        <ClientAppsGrid apps={apps} />
      </div>
    </div>
  )
}