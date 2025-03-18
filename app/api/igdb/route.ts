/*
<ai_context>
This server route handles proxying requests to the IGDB API.
</ai_context>
*/

import { NextRequest, NextResponse } from "next/server";
import * as igdbApi from "@/lib/igdb/api";
import { IGDBGame, IGDBSearchParams } from "@/lib/igdb/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    if (!action) {
      return NextResponse.json(
        { error: "Missing action parameter" },
        { status: 400 }
      );
    }

    switch (action) {
      case "search": {
        const query = searchParams.get("query");
        const limit = searchParams.get("limit")
          ? parseInt(searchParams.get("limit") as string)
          : 10;
        const offset = searchParams.get("offset")
          ? parseInt(searchParams.get("offset") as string)
          : 0;

        if (!query) {
          return NextResponse.json(
            { error: "Missing query parameter" },
            { status: 400 }
          );
        }

        const igdbSearchParams: IGDBSearchParams = {
          query,
          limit,
          offset
        };

        const games = await igdbApi.searchGames(igdbSearchParams);
        return NextResponse.json({ games });
      }

      case "game": {
        const id = searchParams.get("id");

        if (!id) {
          return NextResponse.json(
            { error: "Missing id parameter" },
            { status: 400 }
          );
        }

        const game = await igdbApi.getGameById(parseInt(id));

        if (!game) {
          return NextResponse.json(
            { error: "Game not found" },
            { status: 404 }
          );
        }

        return NextResponse.json({ game });
      }

      case "popular": {
        const limit = searchParams.get("limit")
          ? parseInt(searchParams.get("limit") as string)
          : 10;
        const offset = searchParams.get("offset")
          ? parseInt(searchParams.get("offset") as string)
          : 0;

        const games = await igdbApi.getPopularGames(limit, offset);
        return NextResponse.json({ games });
      }

      case "recent": {
        const limit = searchParams.get("limit")
          ? parseInt(searchParams.get("limit") as string)
          : 10;
        const offset = searchParams.get("offset")
          ? parseInt(searchParams.get("offset") as string)
          : 0;

        const games = await igdbApi.getRecentGames(limit, offset);
        return NextResponse.json({ games });
      }

      case "upcoming": {
        const limit = searchParams.get("limit")
          ? parseInt(searchParams.get("limit") as string)
          : 10;
        const offset = searchParams.get("offset")
          ? parseInt(searchParams.get("offset") as string)
          : 0;

        const games = await igdbApi.getUpcomingGames(limit, offset);
        return NextResponse.json({ games });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error in IGDB API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from IGDB" },
      { status: 500 }
    );
  }
} 