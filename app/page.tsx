// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
import { Suspense } from 'react'
import Hero from '@/components/Hero'
import ISRStatus from '@/components/ISRStatus'
import AppCard from '@/components/AppCard'
import BentoGrid from '@/components/BentoGrid'
import { fetchAllApps, fetchFeaturedApps, fetchStats } from '@/lib/api'
import { Info } from 'lucide-react'

// ====================
// MULTIPLE REVALIDATE TIMES
// ====================
// This page demonstrates how Next.js handles multiple fetch calls
// with different revalidate times. The LOWEST time will be used for the page.

export const revalidate = 30 // Will be overridden by the lowest fetch revalidate

export default async function Home() {
  // Different revalidate times for different data
  // The page will use 30s (the lowest)
  const [featuredApps, recentApps, stats] = await Promise.all([
    fetchFeaturedApps({ revalidate: 60, tags: ['featured'] }), // 60s
    fetchAllApps({ revalidate: 30, tags: ['recent', 'all-apps'] }), // 30s - LOWEST
    fetchStats({ revalidate: 3600, tags: ['stats'] }), // 3600s
  ])

  const recentAppsList = recentApps.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* ISR Learning Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="glass-card p-6 border-l-4 border-accent-cyan">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Multiple Revalidate Times Demo
              </h3>
              <p className="text-sm text-slate-400 mb-3">
                This page fetches data with different revalidation times:
              </p>
              <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                <li><span className="text-primary-400 font-mono">Featured apps: 60s</span> revalidation</li>
                <li><span className="text-accent-cyan font-mono">Recent apps: 30s</span> revalidation (lowest)</li>
                <li><span className="text-accent-purple font-mono">Stats: 3600s</span> revalidation</li>
              </ul>
              <p className="text-sm text-accent-cyan font-semibold mt-3">
                ⚡ Next.js uses the lowest time (30s) for the entire page!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ISR Status */}
        <ISRStatus
          config={{
            revalidate: 30,
            tags: ['featured', 'recent', 'all-apps', 'stats'],
            preRendered: true,
            lastUpdated: new Date().toISOString(),
          }}
        />

        {/* Featured Apps Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">⭐ Featured Apps</h2>
              <p className="text-sm text-slate-400">
                Revalidates every <span className="text-primary-400 font-mono">60 seconds</span>
              </p>
            </div>
          </div>
          <BentoGrid>
            {featuredApps.slice(0, 3).map((app, index) => (
              <AppCard
                key={app.slug}
                app={app}
                size={index === 0 ? 'large' : 'medium'}
                featured
              />
            ))}
          </BentoGrid>
        </section>

        {/* Recent Apps Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">🔥 Recent Additions</h2>
              <p className="text-sm text-slate-400">
                Revalidates every <span className="text-accent-cyan font-mono">30 seconds</span> (controls page revalidation)
              </p>
            </div>
          </div>
          <BentoGrid>
            {recentAppsList.map((app) => (
              <AppCard key={app.slug} app={app} size="small" />
            ))}
          </BentoGrid>
        </section>

        {/* Stats Section */}
        <section className="glass-card p-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white mb-2">📊 Platform Statistics</h2>
            <p className="text-sm text-slate-400">
              Revalidates every <span className="text-accent-purple font-mono">3600 seconds (1 hour)</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 glass-card">
              <div className="text-4xl font-bold gradient-text font-mono">{stats.totalApps}</div>
              <div className="text-sm text-slate-400 mt-2">Total Apps</div>
            </div>
            <div className="text-center p-6 glass-card">
              <div className="text-4xl font-bold gradient-text font-mono">{stats.totalChains}</div>
              <div className="text-sm text-slate-400 mt-2">Blockchains</div>
            </div>
            <div className="text-center p-6 glass-card">
              <div className="text-4xl font-bold gradient-text font-mono">{stats.totalCategories}</div>
              <div className="text-sm text-slate-400 mt-2">Categories</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}