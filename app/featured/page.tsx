import AppCard from '@/components/AppCard'
import ISRStatus from '@/components/ISRStatus'
import BentoGrid from '@/components/BentoGrid'
import CacheIndicator from '@/components/CacheIndicator'
import { fetchFeaturedApps } from '@/lib/api'
import { Sparkles, Info } from 'lucide-react'

// ====================
// TAG-BASED ISR
// ====================
// This page demonstrates revalidateTag
// Admin can revalidate ONLY this page without affecting /apps
export const revalidate = 60

export default async function FeaturedPage() {
  // Fetch with specific tag for granular revalidation
  const featuredApps = await fetchFeaturedApps({
    revalidate: 60,
    tags: ['featured-apps'], // Unique tag for this page only
  })

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-primary-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Featured Applications</h1>
                <p className="text-slate-400">
                  Curated selection of the best Web3 apps
                </p>
              </div>
            </div>
            <CacheIndicator lastUpdated={new Date().toISOString()} revalidateTime={60} />
          </div>

          {/* ISR Educational Section */}
          <div className="glass-card p-6 border-l-4 border-accent-purple mb-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  revalidateTag Demo
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  This page uses <span className="text-accent-purple font-mono">revalidateTag('featured-apps')</span> for granular cache control.
                </p>
                <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                  <li>Admin can revalidate <span className="text-accent-purple font-semibold">ONLY this page</span></li>
                  <li>The /apps page won't be affected</li>
                  <li>More efficient than revalidating entire paths</li>
                  <li>Perfect for targeted content updates</li>
                </ul>
                <div className="mt-3 p-3 bg-slate-900/50 rounded-lg">
                  <code className="text-xs text-accent-purple">
                    fetch('/api/apps?featured=true', {'{'}
                    <br />
                    &nbsp;&nbsp;next: {'{ tags: '}['featured-apps']{'] }'}
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
              tags: ['featured-apps'],
              preRendered: true,
              lastUpdated: new Date().toISOString(),
            }}
          />
        </div>

        {/* Featured Apps Grid */}
        {featuredApps.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No featured apps yet</p>
            <p className="text-sm text-slate-500 mt-2">Check back soon for curated selections!</p>
          </div>
        ) : (
          <BentoGrid>
            {featuredApps.map((app, index) => (
              <AppCard
                key={app.slug}
                app={app}
                size={index === 0 ? 'large' : index < 3 ? 'medium' : 'small'}
                featured
              />
            ))}
          </BentoGrid>
        )}

        {/* How to Revalidate Section */}
        <div className="mt-12 glass-card p-8">
          <h3 className="text-xl font-bold text-white mb-4">How to Trigger Revalidation</h3>
          <div className="space-y-4 text-sm text-slate-400">
            <div>
              <h4 className="text-white font-semibold mb-2">From Admin Panel:</h4>
              <code className="block p-3 bg-slate-900/50 rounded text-accent-purple text-xs">
                Click "Revalidate Tag" → Enter "featured-apps" → Submit
              </code>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Via API:</h4>
              <code className="block p-3 bg-slate-900/50 rounded text-accent-purple text-xs">
                POST /api/revalidate-tag
                <br />
                {'{ "tag": "featured-apps", "secret": "your-secret" }'}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}