"use client"

import React, { useState } from 'react';
import { SelectGame as Game } from "@/db/schema/games"
import CollectionItem from './CollectionItem';
import { removeGameAction } from '@/server/actions/collection';
import { toast } from 'sonner';

interface CollectionListProps {
  games: Game[];
}

const CollectionList: React.FC<CollectionListProps> = ({ games: initialGames }) => {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [isRemoving, setIsRemoving] = useState<{[key: string]: boolean}>({});

  const handleRemove = async (id: string) => {
    // Update local state to show loading
    setIsRemoving(prev => ({ ...prev, [id]: true }));
    
    try {
      const result = await removeGameAction(id);
      
      if (result.isSuccess) {
        // Remove from local state
        setGames(prev => prev.filter(game => game.id !== id));
        toast.success("Game removed from collection");
      } else {
        toast.error(result.message || "Failed to remove game");
      }
    } catch (error) {
      toast.error("An error occurred while removing the game");
      console.error(error);
    } finally {
      setIsRemoving(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="collection-list space-y-4">
      {games.length === 0 ? (
        <p className="text-gray-500">No games in your collection.</p>
      ) : (
        games.map(game => (
          <CollectionItem 
            key={game.id} 
            game={game} 
            onRemove={handleRemove} 
            isRemoving={isRemoving[game.id] || false}
          />
        ))
      )}
    </div>
  );
};

export default CollectionList; 