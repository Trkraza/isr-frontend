import { type ClassValue, clsx } from 'clsx'
import { formatDistanceToNow } from 'date-fns'

// Tailwind class merger (if using clsx)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Format timestamp to relative time
export function formatRelativeTime(timestamp: string): string {
  try {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  } catch {
    return 'Unknown'
  }
}

// Get cache status color
export function getCacheStatusColor(ageInSeconds: number, revalidateTime: number): string {
  if (ageInSeconds < revalidateTime * 0.5) {
    return 'text-green-400' // Fresh
  } else if (ageInSeconds < revalidateTime) {
    return 'text-yellow-400' // Aging
  } else {
    return 'text-orange-400' // Stale
  }
}

// Filter apps by search and filters
export function filterApps(
  apps: any[],
  search: string,
  chains: string[],
  tags: string[]
): any[] {
  return apps.filter((app) => {
    const matchesSearch = search
      ? app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description.toLowerCase().includes(search.toLowerCase())
      : true

    const matchesChains = chains.length > 0
      ? app.chains.some((chain: string) => chains.includes(chain.toLowerCase()))
      : true

    const matchesTags = tags.length > 0
      ? app.tags.some((tag: string) => tags.includes(tag))
      : true

    return matchesSearch && matchesChains && matchesTags
  })
}

// Shuffle array (for featured apps)
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Get chain color
export function getChainColor(chainName: string): string {
  const colors: Record<string, string> = {
    ethereum: '#627EEA',
    polygon: '#8247E5',
    arbitrum: '#28A0F0',
    optimism: '#FF0420',
    base: '#0052FF',
    avalanche: '#E84142',
    bsc: '#F3BA2F',
    solana: '#14F195',
  }
  return colors[chainName.toLowerCase()] || '#64748b'
}