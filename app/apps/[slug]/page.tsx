import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, Twitter, Globe, ArrowLeft } from 'lucide-react'
import { fetchAllApps, fetchAppBySlug } from '@/lib/api'
import MarkdownContent from '@/components/MarkdownContent'
import ISRStatus from '@/components/ISRStatus'
import CacheIndicator from '@/components/CacheIndicator'
import { getChainColor } from '@/lib/utils'

// ====================
// ISR CONFIGURATION
// ====================
export const revalidate = 60 // Time-based revalidation every 60 seconds

// Allow on-demand generation of new app pages
export const dynamicParams = true // Set to false to return 404 for unknown slugs

// ====================
// GENERATE STATIC PARAMS
// ====================
// Pre-render all known app pages at build time
export async function generateStaticParams() {
  try {
    const apps = await fetchAllApps({ revalidate: 0 }) // No cache for build time
    return apps.map((app) => ({
      slug: app.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params:', error)
    return []
  }
}

// ====================
// METADATA
// ====================
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const app = await fetchAppBySlug(slug, { revalidate: 60, tags: ['app-detail', slug] })
  
  if (!app) {
    return {
      title: 'App Not Found | ChainHub',
    }
  }

  return {
    title: `${app.name} | ChainHub`,
    description: app.description.substring(0, 160),
  }
}

// ====================
// PAGE COMPONENT
// ====================
export default async function AppDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Fetch app with ISR tags
  const app = await fetchAppBySlug(slug, {
    revalidate: 60,
    tags: ['app-detail', slug],
  })

  if (!app) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/apps"
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-primary-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Apps</span>
        </Link>

        {/* Cache Indicator */}
        <div className="mb-6">
          <CacheIndicator lastUpdated={app.updatedAt} revalidateTime={60} />
        </div>

        {/* ISR Status */}
        <ISRStatus
          config={{
            revalidate: 60,
            tags: ['app-detail', slug],
            preRendered: true,
            lastUpdated: app.updatedAt,
          }}
          className="mb-8"
        />

        {/* Main Content - Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - App Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* App Header */}
            <div className="glass-card p-6">
              {/* Logo */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-slate-800/50 p-3">
                {app.logo ? (
                  <Image
                    src={app.logo}
                    alt={app.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-purple rounded-xl flex items-center justify-center text-white font-bold text-3xl">
                    {app.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Name */}
              <h1 className="text-2xl font-bold text-white text-center mb-2">
                {app.name}
              </h1>

              {/* Featured Badge */}
              {app.isFeatured && (
                <div className="flex justify-center mb-4">
                  <span className="badge-purple animate-pulse">
                    ⭐ Featured
                  </span>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {app.tags.map((tag) => (
                  <span key={tag} className="badge-primary text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Chains */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-3 text-center">
                  Supported Chains
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {app.chains.map((chain) => (
                    <div
                      key={chain}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: getChainColor(chain) + '20',
                        color: getChainColor(chain),
                        border: `1px solid ${getChainColor(chain)}40`,
                      }}
                    >
                      {chain}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="glass-card p-6 space-y-3">
              <h3 className="text-sm font-semibold text-slate-400 mb-3">Links</h3>
              
              {app.website && (
                <a
                  href={app.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 glass-card-hover text-slate-300 hover:text-primary-400 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span className="flex-1">Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {app.twitter && (
                <a
                  href={app.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 glass-card-hover text-slate-300 hover:text-accent-cyan transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="flex-1">Twitter</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {app.github && (
                <a
                  href={app.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 glass-card-hover text-slate-300 hover:text-slate-100 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="flex-1">GitHub</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Metadata */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-slate-400 mb-3">Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Created</span>
                  <span className="text-slate-300">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Updated</span>
                  <span className="text-slate-300">
                    {new Date(app.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Description (Markdown) */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
              <h2 className="text-2xl font-bold text-white mb-6">About {app.name}</h2>
              <MarkdownContent content={app.description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}