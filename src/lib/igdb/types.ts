/*
<ai_context>
This file contains TypeScript type definitions for IGDB API responses.
</ai_context>
*/

// Base Game interface
export interface IGDBGame {
  id: number;
  name: string;
  slug: string;
  summary?: string;
  storyline?: string;
  first_release_date?: number; // Unix timestamp
  rating?: number;
  rating_count?: number;
  cover?: IGDBCover;
  platforms?: IGDBPlatform[];
  genres?: IGDBGenre[];
  screenshots?: IGDBScreenshot[];
  involved_companies?: IGDBInvolvedCompany[];
  age_ratings?: IGDBAgeRating[];
  status?: number;
  url?: string;
  category?: number;
  hypes?: number;
  total_rating?: number;
  total_rating_count?: number;
}

// Cover image
export interface IGDBCover {
  id: number;
  image_id: string;
  url?: string;
}

// Platform
export interface IGDBPlatform {
  id: number;
  name: string;
  slug: string;
  abbreviation?: string;
  category?: number;
}

// Genre
export interface IGDBGenre {
  id: number;
  name: string;
  slug: string;
}

// Screenshot
export interface IGDBScreenshot {
  id: number;
  image_id: string;
  url?: string;
}

// Company involved in the game (developer, publisher, etc.)
export interface IGDBInvolvedCompany {
  id: number;
  company: IGDBCompany;
  developer: boolean;
  publisher: boolean;
}

// Company
export interface IGDBCompany {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo?: IGDBLogo;
}

// Logo
export interface IGDBLogo {
  id: number;
  image_id: string;
  url?: string;
}

// Age rating (PEGI, ESRB, etc.)
export interface IGDBAgeRating {
  id: number;
  category: number; // 1 = ESRB, 2 = PEGI, etc.
  rating: number; // Rating value
  synopsis?: string;
}

// Search request params
export interface IGDBSearchParams {
  query: string;
  limit?: number;
  offset?: number;
  fields?: string[];
}

// API response for search
export type IGDBSearchResponse = IGDBGame[]; 