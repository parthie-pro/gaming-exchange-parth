/*
<ai_context>
This file contains server actions for managing a user's game collection.
</ai_context>
*/

"use server"

import { db } from "@/db/db"
import { eq, and, ne } from "drizzle-orm"
import { ActionState } from "@/types/server-action-types"
import { AddGameInput, UpdateGameInput } from "@/lib/validations/collection"
import { auth } from "@clerk/nextjs/server"
import { gamesTable, SelectGame } from "@/db/schema/games"

// Add a game to the user's collection
export async function addGameToCollectionAction(
  data: AddGameInput
): Promise<ActionState<SelectGame>> {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return {
        isSuccess: false,
        message: "You must be logged in to add a game to your collection"
      };
    }

    // Insert the game into the database
    const [game] = await db.insert(gamesTable).values({
      userId,
      externalId: data.gameId.toString(),
      name: data.gameName,
      platform: data.platform,
      condition: data.condition,
      notes: data.notes || null,
      forTrade: data.forTrade,
      coverImageId: data.coverImageId || null,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();

    return {
      isSuccess: true,
      message: "Game added to collection",
      data: game
    };
  } catch (error) {
    console.error("Error adding game to collection:", error);
    return {
      isSuccess: false,
      message: "Failed to add game to collection"
    };
  }
}

// Get all games in the user's collection
export async function getUserGamesAction(): Promise<ActionState<SelectGame[]>> {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return {
        isSuccess: false,
        message: "You must be logged in to view your collection"
      };
    }

    const games = await db.query.games.findMany({
      where: eq(gamesTable.userId, userId),
      orderBy: [gamesTable.createdAt]
    });

    return {
      isSuccess: true,
      message: "Games retrieved successfully",
      data: games
    };
  } catch (error) {
    console.error("Error getting user games:", error);
    return {
      isSuccess: false,
      message: "Failed to get games"
    };
  }
}

// Get games available for trade
export async function getGamesForTradeAction(): Promise<ActionState<SelectGame[]>> {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return {
        isSuccess: false,
        message: "You must be logged in to view games for trade"
      };
    }

    // Get games marked for trade, excluding the user's own games
    const games = await db.query.games.findMany({
      where: and(
        eq(gamesTable.forTrade, true),
        // Don't show the user's own games
        ne(gamesTable.userId, userId)
      )
    });

    return {
      isSuccess: true,
      message: "Games for trade retrieved successfully",
      data: games
    };
  } catch (error) {
    console.error("Error getting games for trade:", error);
    return {
      isSuccess: false,
      message: "Failed to get games for trade"
    };
  }
}

// Update a game in the user's collection
export async function updateGameAction(
  data: UpdateGameInput
): Promise<ActionState<SelectGame>> {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return {
        isSuccess: false,
        message: "You must be logged in to update a game"
      };
    }

    // Make sure the game belongs to the user
    const gameToUpdate = await db.query.games.findFirst({
      where: and(
        eq(gamesTable.id, data.id),
        eq(gamesTable.userId, userId)
      )
    });

    if (!gameToUpdate) {
      return {
        isSuccess: false,
        message: "Game not found or doesn't belong to you"
      };
    }

    // Update only the fields that were provided
    const updateData: Partial<typeof gamesTable.$inferInsert> = {
      updatedAt: new Date()
    };

    if (data.condition) updateData.condition = data.condition;
    if (data.notes !== undefined) updateData.notes = data.notes || null;
    if (data.forTrade !== undefined) updateData.forTrade = data.forTrade;

    const [updatedGame] = await db
      .update(gamesTable)
      .set(updateData)
      .where(eq(gamesTable.id, data.id))
      .returning();

    return {
      isSuccess: true,
      message: "Game updated successfully",
      data: updatedGame
    };
  } catch (error) {
    console.error("Error updating game:", error);
    return {
      isSuccess: false,
      message: "Failed to update game"
    };
  }
}

// Remove a game from the user's collection
export async function removeGameAction(
  id: string
): Promise<ActionState<void>> {
  try {
    const session = await auth();
    const userId = session?.userId;
    
    if (!userId) {
      return {
        isSuccess: false,
        message: "You must be logged in to remove a game"
      };
    }

    // Make sure the game belongs to the user
    const gameToRemove = await db.query.games.findFirst({
      where: and(
        eq(gamesTable.id, id),
        eq(gamesTable.userId, userId)
      )
    });

    if (!gameToRemove) {
      return {
        isSuccess: false,
        message: "Game not found or doesn't belong to you"
      };
    }

    await db
      .delete(gamesTable)
      .where(eq(gamesTable.id, id));

    return {
      isSuccess: true,
      message: "Game removed from collection",
      data: undefined
    };
  } catch (error) {
    console.error("Error removing game:", error);
    return {
      isSuccess: false,
      message: "Failed to remove game"
    };
  }
} 