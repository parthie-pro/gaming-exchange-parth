/*
<ai_context>
This file provides functions to interact with the IGDB API.
</ai_context>
*/

import { igdbRequest } from "./client";
import { IGDBGame, IGDBSearchParams, IGDBSearchResponse } from "./types";

/**
 * Search for games using a query string
 */
export async function searchGames(
  params: IGDBSearchParams
): Promise<IGDBGame[]> {
  const { query, limit = 10, offset = 0, fields = [] } = params;
  
  // Default fields to fetch if none specified
  const fieldsToFetch = fields.length
    ? fields
    : [
        "id",
        "name",
        "slug",
        "summary",
        "cover.image_id",
        "first_release_date",
        "platforms.name",
        "platforms.slug",
        "genres.name"
      ];

  const searchQuery = `
    search "${query}";
    fields ${fieldsToFetch.join(",")};
    limit ${limit};
    offset ${offset};
  `;

  return await igdbRequest<IGDBSearchResponse>("games", searchQuery);
}

/**
 * Get a specific game by ID
 */
export async function getGameById(id: number): Promise<IGDBGame | null> {
  const query = `
    fields id,name,slug,summary,storyline,first_release_date,rating,rating_count,
    cover.image_id,platforms.name,platforms.slug,genres.name,screenshots.image_id,
    involved_companies.company.name,involved_companies.developer,involved_companies.publisher,
    age_ratings.*;
    where id = ${id};
  `;

  const results = await igdbRequest<IGDBGame[]>("games", query);
  return results.length > 0 ? results[0] : null;
}

/**
 * Get popular games
 */
export async function getPopularGames(
  limit: number = 10,
  offset: number = 0
): Promise<IGDBGame[]> {
  const query = `
    fields id,name,slug,summary,cover.image_id,first_release_date,
    platforms.name,platforms.slug,genres.name;
    sort total_rating_count desc;
    where total_rating_count > 0 & cover != null;
    limit ${limit};
    offset ${offset};
  `;

  return await igdbRequest<IGDBGame[]>("games", query);
}

/**
 * Get recently released games
 */
export async function getRecentGames(
  limit: number = 10,
  offset: number = 0
): Promise<IGDBGame[]> {
  const now = Math.floor(Date.now() / 1000);
  const sixMonthsAgo = now - 15778800; // 6 months in seconds

  const query = `
    fields id,name,slug,summary,cover.image_id,first_release_date,
    platforms.name,platforms.slug,genres.name;
    sort first_release_date desc;
    where first_release_date > ${sixMonthsAgo} & first_release_date < ${now} & cover != null;
    limit ${limit};
    offset ${offset};
  `;

  return await igdbRequest<IGDBGame[]>("games", query);
}

/**
 * Get upcoming games
 */
export async function getUpcomingGames(
  limit: number = 10,
  offset: number = 0
): Promise<IGDBGame[]> {
  const now = Math.floor(Date.now() / 1000);
  const sixMonthsFromNow = now + 15778800; // 6 months in seconds

  const query = `
    fields id,name,slug,summary,cover.image_id,first_release_date,
    platforms.name,platforms.slug,genres.name;
    sort first_release_date asc;
    where first_release_date > ${now} & first_release_date < ${sixMonthsFromNow} & cover != null;
    limit ${limit};
    offset ${offset};
  `;

  return await igdbRequest<IGDBGame[]>("games", query);
}

/**
 * Helper function to build image URLs for IGDB images
 */
export function getIGDBImageUrl(imageId: string, size: string = "cover_big"): string {
  const validSizes = [
    "cover_small", // 90x128
    "cover_big", // 264x374
    "screenshot_med", // 569x320
    "screenshot_big", // 889x500
    "screenshot_huge", // 1280x720
    "logo_med", // 284x160
    "thumb", // 90x90
    "micro", // 35x35
    "720p", // 1280x720
    "1080p" // 1920x1080
  ];

  if (!validSizes.includes(size)) {
    size = "cover_big";
  }

  return `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;
} 