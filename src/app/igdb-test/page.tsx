/*
<ai_context>
This client page demonstrates the IGDB API integration by showing popular games.
</ai_context>
*/

"use client"

import { useState, useEffect } from "react"
import { IGDBGame } from "@/lib/igdb/types"

export default function IGDBTestPage() {
  const [games, setGames] = useState<IGDBGame[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPopularGames() {
      try {
        setLoading(true)
        const response = await fetch("/api/igdb?action=popular")
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch games")
        }
        
        const data = await response.json()
        setGames(data.games)
        setError(null)
      } catch (err) {
        console.error("Error fetching games:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchPopularGames()
  }, [])

  function getImageUrl(imageId: string) {
    return `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">IGDB API Test</h1>
      <h2 className="text-2xl font-semibold mb-4">Popular Games</h2>
      
      {loading && <p className="text-gray-500">Loading games...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
          <p className="text-sm mt-1">
            Make sure you have set up IGDB_CLIENT_ID and IGDB_CLIENT_SECRET in your .env.local file.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <div key={game.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {game.cover?.image_id && (
              <img 
                src={getImageUrl(game.cover.image_id)} 
                alt={game.name}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{game.name}</h3>
              {game.first_release_date && (
                <p className="text-sm text-gray-500 mb-2">
                  Released: {new Date(game.first_release_date * 1000).toLocaleDateString()}
                </p>
              )}
              {game.summary && (
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{game.summary}</p>
              )}
              {game.genres && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {game.genres.map((genre) => (
                    <span 
                      key={genre.id} 
                      className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {!loading && !error && games.length === 0 && (
        <p className="text-gray-500">No games found.</p>
      )}
    </div>
  )
} 