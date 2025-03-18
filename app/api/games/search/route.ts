/*
<ai_context>
This server route handles game search queries with the IGDB API.
</ai_context>
*/

import { NextRequest, NextResponse } from "next/server";
import { searchGames } from "@/lib/igdb/api";
import { IGDBSearchParams } from "@/lib/igdb/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit") as string)
      : 10;
    const offset = searchParams.get("offset")
      ? parseInt(searchParams.get("offset") as string)
      : 0;

    if (!query) {
      return NextResponse.json(
        { error: "Missing search query" },
        { status: 400 }
      );
    }

    // Simplify the API compared to the full IGDB route
    const igdbSearchParams: IGDBSearchParams = {
      query,
      limit,
      offset,
      fields: [
        "id",
        "name",
        "slug",
        "summary",
        "cover.image_id",
        "first_release_date",
        "platforms.name",
        "platforms.slug"
      ]
    };

    const games = await searchGames(igdbSearchParams);
    
    return NextResponse.json({
      games,
      total: games.length,
      query
    });
  } catch (error) {
    console.error("Error in game search route:", error);
    return NextResponse.json(
      { error: "Failed to search games" },
      { status: 500 }
    );
  }
} 