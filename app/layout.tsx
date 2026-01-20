import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'ChainHub - Discover Web3 Apps',
  description: 'Explore the best decentralized applications across all blockchains. Learn ISR with Next.js 15.',
  keywords: ['Web3', 'DeFi', 'NFT', 'Dapp', 'Blockchain', 'Ethereum', 'ISR', 'Next.js'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen font-sans">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="glass-card mt-20 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
            <p>
              Built with Next.js 15 • Showcasing ISR Features
            </p>
            <p className="mt-2">
              <span className="gradient-text font-semibold">ChainHub</span> - Learning Incremental Static Regeneration
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}