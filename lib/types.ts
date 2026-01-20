// Dapp/App data structure
export interface Dapp {
  slug: string
  name: string
  description: string // Markdown content
  logo: string // URL
  tags: string[]
  chains: string[]
  website: string
  twitter?: string
  github?: string
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

// Stats data
export interface Stats {
  totalApps: number
  totalChains: number
  totalCategories: number
  lastUpdated: string
}

// API Response types
export interface AppsResponse {
  apps: Dapp[]
  total: number
}

export interface AppResponse {
  app: Dapp
}

// Filter types
export interface Filters {
  search: string
  chains: string[]
  tags: string[]
}

// ISR Status for educational display
export interface ISRConfig {
  revalidate?: number
  tags?: string[]
  preRendered?: boolean
  lastUpdated?: string
  cacheHits?: number
}

// Chain data
export interface Chain {
  id: string
  name: string
  icon: string
  color: string
}

// Common chains
export const CHAINS: Chain[] = [
  { id: 'ethereum', name: 'Ethereum', icon: '⟠', color: '#627EEA' },
  { id: 'polygon', name: 'Polygon', icon: '⬡', color: '#8247E5' },
  { id: 'arbitrum', name: 'Arbitrum', icon: '◆', color: '#28A0F0' },
  { id: 'optimism', name: 'Optimism', icon: '🔴', color: '#FF0420' },
  { id: 'base', name: 'Base', icon: '🔵', color: '#0052FF' },
  { id: 'avalanche', name: 'Avalanche', icon: '▲', color: '#E84142' },
  { id: 'bsc', name: 'BSC', icon: '◆', color: '#F3BA2F' },
  { id: 'solana', name: 'Solana', icon: '◎', color: '#14F195' },
]

// Common categories/tags
export const CATEGORIES = [
  'DeFi',
  'NFT',
  'Gaming',
  'DEX',
  'Lending',
  'Bridge',
  'Wallet',
  'Analytics',
  'Infrastructure',
  'DAO',
  'Social',
  'Marketplace',
]