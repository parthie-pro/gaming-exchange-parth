/*
<ai_context>
This client page demonstrates the game search component with autocomplete.
</ai_context>
*/

"use client"

import React, { useState } from "react"
import GameSearch from "@/components/games/GameSearch"
import { IGDBGame } from "@/lib/igdb/types"
import { getIGDBImageUrl } from "@/lib/igdb/api"

export default function GameSearchTestPage() {
  const [selectedGame, setSelectedGame] = useState<IGDBGame | null>(null)

  const handleSelectGame = (game: IGDBGame) => {
    console.log("Selected game:", game)
    setSelectedGame(game)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Game Search Test</h1>
      
      <div className="max-w-xl mb-8">
        <GameSearch
          onSelect={handleSelectGame}
          placeholder="Search for your favorite games..."
          autoFocus
        />
        <p className="text-sm text-gray-500 mt-2">
          Try searching for a game (e.g., "Mario", "Zelda", "Final Fantasy")
        </p>
      </div>
      
      {selectedGame && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-xl">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedGame.name}</h2>
            
            <div className="flex flex-col md:flex-row gap-6">
              {selectedGame.cover?.image_id && (
                <img
                  src={getIGDBImageUrl(selectedGame.cover.image_id, "cover_big")}
                  alt={selectedGame.name}
                  className="w-32 h-44 object-cover rounded-md"
                />
              )}
              
              <div className="flex-1">
                {selectedGame.summary && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Summary</h3>
                    <p className="text-gray-600 dark:text-gray-300">{selectedGame.summary}</p>
                  </div>
                )}
                
                {selectedGame.first_release_date && (
                  <div className="mb-3">
                    <h3 className="text-md font-semibold">Release Date</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {new Date(selectedGame.first_release_date * 1000).toLocaleDateString()}
                    </p>
                  </div>
                )}
                
                {selectedGame.platforms && selectedGame.platforms.length > 0 && (
                  <div className="mb-3">
                    <h3 className="text-md font-semibold mb-1">Platforms</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedGame.platforms.map((platform) => (
                        <span
                          key={platform.id}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-md text-sm"
                        >
                          {platform.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedGame.genres && selectedGame.genres.length > 0 && (
                  <div>
                    <h3 className="text-md font-semibold mb-1">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedGame.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 