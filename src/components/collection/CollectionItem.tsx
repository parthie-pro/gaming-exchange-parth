"use client"

import { SelectGame as Game } from "@/db/schema/games"

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
      </div>
      <button 
        onClick={() => onRemove(game.id)} 
        className="text-red-500 hover:text-red-700 px-3 py-1 rounded transition-colors disabled:opacity-50"
        disabled={isRemoving}
      >
        {isRemoving ? 'Removing...' : 'Remove'}
      </button>
    </div>
  )
}

export default CollectionItem