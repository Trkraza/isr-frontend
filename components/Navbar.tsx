import Link from 'next/link'
import { Layers, Sparkles, BarChart3 } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text font-['Space_Grotesk']">
              ChainHub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              href="/apps"
              className="text-slate-300 hover:text-primary-400 transition-colors font-medium"
            >
              All Apps
            </Link>
            <Link
              href="/featured"
              className="flex items-center space-x-1 text-slate-300 hover:text-accent-purple transition-colors font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>Featured</span>
            </Link>
            <Link
              href="/stats"
              className="flex items-center space-x-1 text-slate-300 hover:text-accent-cyan transition-colors font-medium"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Stats</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}