import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable experimental features for ISR debugging
  experimental: {
    // staleTimes: {
    //   dynamic: 30,
    //   static: 180,
    // },
  },
  // Logging for cache debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig