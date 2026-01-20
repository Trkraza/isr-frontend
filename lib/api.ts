import { Dapp, Stats } from './types'

const API_URL = process.env.NEXT_PUBLIC_CONTENT_API_URL || 'http://localhost:3001'

// ====================
// FETCH ALL APPS
// ====================
export async function fetchAllApps(options?: {
  revalidate?: number
  tags?: string[]
}): Promise<Dapp[]> {
  const res = await fetch(`${API_URL}/api/apps`, {
    next: {
      revalidate: options?.revalidate,
      tags: options?.tags,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch apps: ${res.statusText}`)
  }

  const data = await res.json()
  return data.apps || []
}

// ====================
// FETCH SINGLE APP
// ====================
export async function fetchAppBySlug(
  slug: string,
  options?: {
    revalidate?: number
    tags?: string[]
  }
): Promise<Dapp | null> {
  const res = await fetch(`${API_URL}/api/apps/${slug}`, {
    next: {
      revalidate: options?.revalidate,
      tags: options?.tags,
    },
  })

  if (!res.ok) {
    if (res.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch app: ${res.statusText}`)
  }

  const data = await res.json()
  return data.app || null
}

// ====================
// FETCH FEATURED APPS
// ====================
export async function fetchFeaturedApps(options?: {
  revalidate?: number
  tags?: string[]
}): Promise<Dapp[]> {
  const res = await fetch(`${API_URL}/api/apps?featured=true`, {
    next: {
      revalidate: options?.revalidate,
      tags: options?.tags,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch featured apps: ${res.statusText}`)
  }

  const data = await res.json()
  return data.apps || []
}

// ====================
// FETCH STATS
// ====================
export async function fetchStats(options?: {
  revalidate?: number
  tags?: string[]
}): Promise<Stats> {
  const res = await fetch(`${API_URL}/api/stats`, {
    next: {
      revalidate: options?.revalidate,
      tags: options?.tags,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch stats: ${res.statusText}`)
  }

  const data = await res.json()
  return data.stats
}

// ====================
// TRIGGER REVALIDATION
// ====================
export async function triggerRevalidation(
  type: 'path' | 'tag',
  value: string,
  secret: string
): Promise<{ revalidated: boolean; message?: string }> {
  const endpoint = type === 'path' ? '/api/revalidate-path' : '/api/revalidate-tag'

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      [type]: value,
      secret,
    }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Revalidation failed')
  }

  return res.json()
}