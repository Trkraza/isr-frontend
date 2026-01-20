import ISRStatus from '@/components/ISRStatus'
import CacheIndicator from '@/components/CacheIndicator'
import { fetchStats, fetchAllApps } from '@/lib/api'
import { BarChart3, Info, TrendingUp, Package, Layers } from 'lucide-react'
import { CHAINS, CATEGORIES } from '@/lib/types'

// ====================
// STATS WITH LONG REVALIDATION
// ====================
export const revalidate = 3600 // 1 hour - stats don't change frequently

export default async function StatsPage() {
  const [stats, allApps] = await Promise.all([
    fetchStats({ revalidate: 3600, tags: ['stats'] }),
    fetchAllApps({ revalidate: 3600, tags: ['stats-apps'] }),
  ])

  // Calculate additional stats
  const chainDistribution = CHAINS.map((chain) => ({
    ...chain,
    count: allApps.filter((app) => 
      app.chains.some((c) => c.toLowerCase() === chain.id)
    ).length,
  })).filter((c) => c.count > 0)

  const categoryDistribution = CATEGORIES.map((cat) => ({
    name: cat,
    count: allApps.filter((app) => app.tags.includes(cat)).length,
  })).filter((c) => c.count > 0).sort((a, b) => b.count - a.count)

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-primary-500 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Platform Statistics</h1>
                <p className="text-slate-400">
                  Analytics and insights across ChainHub
                </p>
              </div>
            </div>
            <CacheIndicator lastUpdated={stats.lastUpdated} revalidateTime={3600} />
          </div>

          {/* ISR Educational Section */}
          <div className="glass-card p-6 border-l-4 border-accent-cyan mb-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Long Revalidation Time
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  This page uses <span className="text-accent-cyan font-mono">revalidate: 3600</span> (1 hour) because stats don't change frequently.
                </p>
                <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                  <li>Reduces server load for infrequently updated data</li>
                  <li>Users get instant responses from cache</li>
                  <li>Background regeneration happens every hour</li>
                  <li>Still supports on-demand revalidation if needed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ISR Status */}
          <ISRStatus
            config={{
              revalidate: 3600,
              tags: ['stats', 'stats-apps'],
              preRendered: true,
              lastUpdated: stats.lastUpdated,
            }}
          />
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-primary-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-4xl font-bold gradient-text mb-2 font-mono">
              {stats.totalApps}
            </div>
            <div className="text-sm text-slate-400">Total Applications</div>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-4">
              <Layers className="w-8 h-8 text-accent-cyan" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-4xl font-bold gradient-text mb-2 font-mono">
              {stats.totalChains}
            </div>
            <div className="text-sm text-slate-400">Supported Chains</div>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-accent-purple" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-4xl font-bold gradient-text mb-2 font-mono">
              {stats.totalCategories}
            </div>
            <div className="text-sm text-slate-400">Categories</div>
          </div>
        </div>

        {/* Chain Distribution */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Chain Distribution</h2>
          <div className="space-y-4">
            {chainDistribution.map((chain) => {
              const percentage = (chain.count / allApps.length) * 100
              return (
                <div key={chain.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300 flex items-center space-x-2">
                      <span>{chain.icon}</span>
                      <span>{chain.name}</span>
                    </span>
                    <span className="text-sm text-slate-400">
                      {chain.count} apps ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: chain.color,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Category Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryDistribution.map((category) => (
              <div key={category.name} className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-primary-400 mb-1 font-mono">
                  {category.count}
                </div>
                <div className="text-sm text-slate-400">{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Note about unstable_cache */}
        <div className="mt-8 glass-card p-6 bg-slate-900/30">
          <p className="text-sm text-slate-500 italic text-center">
            💡 In production, this page can use <code className="text-accent-cyan">unstable_cache</code> to cache KV database queries for even better performance
          </p>
        </div>
      </div>
    </div>
  )
}