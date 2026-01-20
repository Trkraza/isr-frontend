'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { CHAINS, CATEGORIES } from '@/lib/types'

interface FiltersProps {
  onFilterChange: (filters: {
    search: string
    chains: string[]
    tags: string[]
  }) => void
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [search, setSearch] = useState('')
  const [selectedChains, setSelectedChains] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFilterChange({ search: value, chains: selectedChains, tags: selectedTags })
  }

  const toggleChain = (chainId: string) => {
    const newChains = selectedChains.includes(chainId)
      ? selectedChains.filter((c) => c !== chainId)
      : [...selectedChains, chainId]
    setSelectedChains(newChains)
    onFilterChange({ search, chains: newChains, tags: selectedTags })
  }

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(newTags)
    onFilterChange({ search, chains: selectedChains, tags: newTags })
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedChains([])
    setSelectedTags([])
    onFilterChange({ search: '', chains: [], tags: [] })
  }

  const hasActiveFilters = search || selectedChains.length > 0 || selectedTags.length > 0

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search apps..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 glass-card text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
        />
      </div>

      {/* Chains Filter */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Blockchains</h3>
        <div className="flex flex-wrap gap-2">
          {CHAINS.map((chain) => {
            const isSelected = selectedChains.includes(chain.id)
            return (
              <button
                key={chain.id}
                onClick={() => toggleChain(chain.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50 shadow-lg shadow-primary-500/20'
                    : 'glass-card text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: chain.color + '20',
                        color: chain.color,
                        borderColor: chain.color + '50',
                      }
                    : {}
                }
              >
                <span className="mr-1">{chain.icon}</span>
                {chain.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Categories Filter */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isSelected = selectedTags.includes(category)
            return (
              <button
                key={category}
                onClick={() => toggleTag(category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/50 shadow-lg shadow-accent-purple/20'
                    : 'glass-card text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center space-x-2 px-4 py-2 glass-card-hover text-sm font-medium text-slate-300 hover:text-white"
        >
          <X className="w-4 h-4" />
          <span>Clear all filters</span>
        </button>
      )}
    </div>
  )
}