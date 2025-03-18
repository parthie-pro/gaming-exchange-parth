/*
<ai_context>
This client component provides a dropdown of game search results.
</ai_context>
*/

"use client"

import React from "react"
import { IGDBGame } from "@/lib/igdb/types"

interface GameAutoCompleteProps {
  games: IGDBGame[]
  loading: boolean
  getImageUrl: (imageId: string) => string
  onSelect: (game: IGDBGame) => void
  isOpen: boolean
}

export default function GameAutoComplete({
  games,
  loading,
  getImageUrl,
  onSelect,
  isOpen
}: GameAutoCompleteProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="absolute z-50 mt-1 max-h-96 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {loading && (
        <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-300">
          Searching...
        </div>
      )}

      {!loading && games.length === 0 && (
        <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-300">
          No games found
        </div>
      )}

      {!loading && games.length > 0 && (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {games.map((game) => (
            <li
              key={game.id}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => onSelect(game)}
            >
              {game.cover?.image_id ? (
                <img
                  src={getImageUrl(game.cover.image_id)}
                  alt={game.name}
                  className="h-16 w-12 object-cover rounded"
                />
              ) : (
                <div className="h-16 w-12 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                  No image
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {game.name}
                </p>
                
                {game.first_release_date && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(game.first_release_date * 1000).getFullYear()}
                  </p>
                )}
                
                {game.platforms && game.platforms.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {game.platforms.slice(0, 3).map((platform) => (
                      <span
                        key={platform.id}
                        className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 text-xs text-blue-700 dark:text-blue-300"
                      >
                        {platform.name}
                      </span>
                    ))}
                    {game.platforms.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{game.platforms.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
} 