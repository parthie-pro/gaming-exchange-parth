"use client"

import { SelectGame as Game } from "@/db/schema/games"
import Link from "next/link"

interface CollectionItemProps {
  game: Game
  onRemove: (id: string) => void
  isRemoving?: boolean
}

const CollectionItem: React.FC<CollectionItemProps> = ({ game, onRemove, isRemoving = false }) => {
  return (
    <div className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div>
        <h2 className="font-semibold text-lg">{game.name}</h2>
        <p className="text-gray-600">{game.platform}</p>
        {game.condition && (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {game.condition}
          </span>
        )}
        {game.forTrade && (
          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            Listed for Trade
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        <Link 
          href={`/collection/list?id=${game.id}`}
          className={`px-3 py-1 rounded transition-colors ${
            game.forTrade 
              ? "text-blue-500 hover:text-blue-700" 
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {game.forTrade ? 'Edit Listing' : 'List for Trade'}
        </Link>
        <button 
          onClick={() => onRemove(game.id)} 
          className="text-red-500 hover:text-red-700 px-3 py-1 rounded transition-colors disabled:opacity-50"
          disabled={isRemoving}
        >
          {isRemoving ? 'Removing...' : 'Remove'}
        </button>
      </div>
    </div>
  )
}

export default CollectionItem