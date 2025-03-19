"use server"

import { Suspense } from 'react';
import CollectionList from "@/components/collection/CollectionList";
import { getUserGamesAction } from "@/server/actions/collection";
import { SelectGame } from "@/db/schema/games";

export default async function CollectionPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">My Game Collection</h1>
      <p className="text-gray-600 mb-6">Select a game from your collection to list it for trade</p>
      
      <Suspense fallback={<div className="text-center py-10">Loading your games...</div>}>
        <GameCollectionData />
      </Suspense>
    </div>
  );
}

async function GameCollectionData() {
  const { data: games, isSuccess } = await getUserGamesAction();
  
  return (
    <>
      {!isSuccess ? (
        <div className="text-red-500">Failed to load your collection. Please try again.</div>
      ) : games && games.length > 0 ? (
        <CollectionList games={games} />
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Your collection is empty!</p>
          <a 
            href="/games/search" 
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Search for games to add
          </a>
        </div>
      )}
    </>
  );
} 