/*
<ai_context>
This hook provides search functionality for games using the IGDB API.
</ai_context>
*/

import { useState, useEffect, useCallback } from "react";
import { IGDBGame } from "@/lib/igdb/types";
import { getIGDBImageUrl } from "@/lib/igdb/api";

export interface UseGameSearchProps {
  initialQuery?: string;
  debounceMs?: number;
  limit?: number;
}

export interface UseGameSearchResult {
  query: string;
  games: IGDBGame[];
  loading: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  getImageUrl: (imageId: string) => string;
}

export function useGameSearch({
  initialQuery = "",
  debounceMs = 300,
  limit = 10
}: UseGameSearchProps = {}): UseGameSearchResult {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [games, setGames] = useState<IGDBGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce the query to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [query, debounceMs]);

  // Fetch games when the debounced query changes
  useEffect(() => {
    async function fetchGames() {
      if (!debouncedQuery.trim()) {
        setGames([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Using our dedicated search API
        const response = await fetch(
          `/api/games/search?q=${encodeURIComponent(debouncedQuery)}&limit=${limit}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to search games");
        }

        const data = await response.json();
        setGames(data.games);
      } catch (err) {
        console.error("Error searching games:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setGames([]);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [debouncedQuery, limit]);

  // Utility function for image URLs
  const getImageUrl = useCallback((imageId: string) => {
    return getIGDBImageUrl(imageId, "cover_big");
  }, []);

  return {
    query,
    games,
    loading,
    error,
    setQuery,
    getImageUrl
  };
} 