"use server"

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/db";
import { gamesTable } from "@/db/schema/games";
import { eq } from "drizzle-orm";
import { ActionState } from "@/types";
import {
  uploadGameImage,
  deleteGameImage,
  getImageUrl
} from "@/lib/utils/image-upload";

/**
 * Updates a game's cover image in the database
 */
export async function updateGameImageAction(
  gameId: string, 
  imagePath: string | null
): Promise<ActionState<string | null>> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return {
        isSuccess: false,
        message: "You must be logged in to update a game image"
      };
    }
    
    // Update the game's cover image path
    const [updatedGame] = await db
      .update(gamesTable)
      .set({ 
        coverImageId: imagePath,
        updatedAt: new Date()
      })
      .where(
        eq(gamesTable.id, gameId)
      )
      .returning();
      
    if (!updatedGame) {
      return {
        isSuccess: false,
        message: "Failed to update game image"
      };
    }
    
    // Return the public URL if an image path was provided
    const imageUrl = imagePath ? getImageUrl(imagePath) : null;
    
    return {
      isSuccess: true,
      message: "Game image updated successfully",
      data: imageUrl
    };
  } catch (error) {
    console.error("Error updating game image:", error);
    return {
      isSuccess: false,
      message: "An error occurred while updating the game image"
    };
  }
}

/**
 * Deletes a game's cover image from storage and updates the database
 */
export async function deleteGameImageAction(
  gameId: string
): Promise<ActionState<void>> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return {
        isSuccess: false,
        message: "You must be logged in to delete a game image"
      };
    }
    
    // Get the current image path
    const [game] = await db
      .select()
      .from(gamesTable)
      .where(eq(gamesTable.id, gameId))
      .limit(1);
    
    if (!game) {
      return {
        isSuccess: false,
        message: "Game not found"
      };
    }
    
    // Make sure the game belongs to the current user
    if (game.userId !== userId) {
      return {
        isSuccess: false,
        message: "You don't have permission to update this game"
      };
    }
    
    // Delete the image from storage if it exists
    if (game.coverImageId) {
      const deleteResult = await deleteGameImage(game.coverImageId);
      
      if (!deleteResult.success) {
        return {
          isSuccess: false,
          message: deleteResult.error || "Failed to delete image from storage"
        };
      }
    }
    
    // Update the game record to remove the image reference
    await db
      .update(gamesTable)
      .set({ 
        coverImageId: null,
        updatedAt: new Date()
      })
      .where(eq(gamesTable.id, gameId));
    
    return {
      isSuccess: true,
      message: "Game image deleted successfully",
      data: undefined
    };
  } catch (error) {
    console.error("Error deleting game image:", error);
    return {
      isSuccess: false,
      message: "An error occurred while deleting the game image"
    };
  }
} 