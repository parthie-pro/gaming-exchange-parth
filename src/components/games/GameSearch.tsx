/*
<ai_context>
This client component provides a search input with autocomplete for games.
</ai_context>
*/

"use client"

import React, { useRef, useState, useEffect } from "react"
import { useGameSearch } from "@/hooks/useGameSearch"
import GameAutoComplete from "./GameAutoComplete"
import { IGDBGame } from "@/lib/igdb/types"
import { Search } from "lucide-react"

interface GameSearchProps {
  onSelect?: (game: IGDBGame) => void
  placeholder?: string
  className?: string
  initialQuery?: string
  autoFocus?: boolean
}

export default function GameSearch({
  onSelect,
  placeholder = "Search for games...",
  className = "",
  initialQuery = "",
  autoFocus = false
}: GameSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { query, games, loading, error, setQuery, getImageUrl } = useGameSearch({
    initialQuery,
    debounceMs: 300
  })

  // Handle selecting a game
  const handleSelect = (game: IGDBGame) => {
    if (onSelect) {
      onSelect(game)
    }
    setIsOpen(false)
    setQuery(game.name)
  }

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Auto-focus the input when the component mounts
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(e.target.value.length > 0)
          }}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600 dark:bg-gray-800 dark:text-white"
          aria-label="Search for games"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-1">
          Error: {error}
        </div>
      )}

      <GameAutoComplete
        games={games}
        loading={loading}
        getImageUrl={getImageUrl}
        onSelect={handleSelect}
        isOpen={isOpen}
      />
    </div>
  )
} 