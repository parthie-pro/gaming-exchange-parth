/*
<ai_context>
This file contains validation schemas for the game collection.
</ai_context>
*/

import { z } from "zod";

// Game condition options
export const gameConditionEnum = z.enum([
  "NEW", // Brand new, sealed
  "LIKE_NEW", // Opened but perfect condition
  "GOOD", // Minor wear, fully functional
  "FAIR", // Noticeable wear, fully functional
  "POOR" // Significant wear, may have issues
]);

export type GameCondition = z.infer<typeof gameConditionEnum>;

// Validation schema for adding a game to collection
export const addGameSchema = z.object({
  gameId: z.number().positive(),
  gameName: z.string().min(1, "Game name is required"),
  platform: z.string().min(1, "Platform is required"),
  condition: gameConditionEnum,
  notes: z.string().optional(),
  forTrade: z.boolean().default(false),
  coverImageId: z.string().optional(),
});

export type AddGameInput = z.infer<typeof addGameSchema>;

// Validation schema for updating a game in collection
export const updateGameSchema = z.object({
  id: z.string().uuid(),
  condition: gameConditionEnum.optional(),
  notes: z.string().optional(),
  forTrade: z.boolean().optional(),
});

export type UpdateGameInput = z.infer<typeof updateGameSchema>;

// Human-readable condition labels
export const conditionLabels: Record<GameCondition, string> = {
  NEW: "New (Sealed)",
  LIKE_NEW: "Like New",
  GOOD: "Good",
  FAIR: "Fair",
  POOR: "Poor"
}; 