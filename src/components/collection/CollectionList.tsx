"use client"

import React from 'react';

interface CollectionListProps {
  games: Array<{ id: string; title: string; }>;
}

const CollectionList: React.FC<CollectionListProps> = ({ games }) => {
  return (
    <div className="collection-list">
      {games.map(game => (
        <div key={game.id} className="collection-item">
          {game.title}
        </div>
      ))}
    </div>
  );
};

export default CollectionList; 