import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative overflow-hidden py-20 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 glass-card mb-6 animate-float">
          <Sparkles className="w-4 h-4 text-primary-400" />
          <span className="text-sm text-slate-300">
            Showcasing Next.js 15 ISR Features
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-['Space_Grotesk']">
          <span className="gradient-text">
            Discover Web3
          </span>
          <br />
          <span className="text-white">
            Applications
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Explore the best decentralized apps across all blockchains.
          Built to demonstrate <span className="text-primary-400 font-semibold">Incremental Static Regeneration</span> patterns.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/apps"
            className="group px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all flex items-center space-x-2"
          >
            <span>Browse All Apps</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/featured"
            className="px-8 py-3 glass-card-hover text-white rounded-lg font-semibold flex items-center space-x-2"
          >
            <Sparkles className="w-5 h-5 text-accent-purple" />
            <span>View Featured</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text font-mono">50+</div>
            <div className="text-sm text-slate-400 mt-1">Dapps</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text font-mono">10+</div>
            <div className="text-sm text-slate-400 mt-1">Chains</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text font-mono">12+</div>
            <div className="text-sm text-slate-400 mt-1">Categories</div>
          </div>
        </div>
      </div>
    </div>
  )
}