import { SelectGame } from "@/db/schema/games";
import { GameCondition } from "@/lib/validations/collection";

// Re-export the SelectGame type as Game for use in components
export type Game = SelectGame;

// Export other common types
export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never };

export * from "./next-auth";
export * from "./server-action-types"; 