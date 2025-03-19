"use server"

import { Suspense } from "react"
import { notFound } from "next/navigation"
import { ListGameForm } from "@/components/games/ListGameForm"
import { db } from "@/db/db"
import { gamesTable } from "@/db/schema/games"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"

// The page takes a game ID as a query parameter
interface ListGamePageProps {
  searchParams: { id?: string }
}

export default async function ListGamePage({ searchParams }: ListGamePageProps) {
  const { id } = searchParams
  
  if (!id) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">List Game for Trade</h1>
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 mb-4">
          <p className="text-yellow-800">No game selected. Please select a game from your collection.</p>
        </div>
        
        <Link 
          href="/collection" 
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Go to My Collection
        </Link>
      </div>
    )
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">List Game for Trade</h1>
      
      <Suspense fallback={<div className="animate-pulse">Loading game details...</div>}>
        <GameDetails id={id} />
      </Suspense>
    </div>
  )
}

async function GameDetails({ id }: { id: string }) {
  const { userId } = await auth()
  
  if (!userId) {
    return <div>Please log in to manage your games.</div>
  }
  
  // Fetch the game details
  const [game] = await db
    .select()
    .from(gamesTable)
    .where(eq(gamesTable.id, id))
    .limit(1)
  
  // Make sure the game exists and belongs to the current user
  if (!game || game.userId !== userId) {
    notFound()
  }
  
  return <ListGameForm game={game} />
} 