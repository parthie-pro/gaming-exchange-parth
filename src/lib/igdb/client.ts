/*
<ai_context>
This file provides a client for interacting with the IGDB API,
handling authentication and request building.
</ai_context>
*/

const IGDB_API_URL = "https://api.igdb.com/v4";
const TWITCH_AUTH_URL = "https://id.twitch.tv/oauth2/token";

// Cached token and expiration
let accessToken: string | null = null;
let tokenExpiration: number | null = null;

/**
 * Get an access token for the IGDB API via Twitch
 */
async function getAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  if (accessToken && tokenExpiration && Date.now() < tokenExpiration) {
    return accessToken;
  }

  const clientId = process.env.IGDB_CLIENT_ID;
  const clientSecret = process.env.IGDB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("IGDB_CLIENT_ID and IGDB_CLIENT_SECRET must be set in .env");
  }

  try {
    const response = await fetch(
      `${TWITCH_AUTH_URL}?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = await response.json();

    // Cache the token and set expiration (subtract 5 minutes for safety margin)
    accessToken = data.access_token;
    tokenExpiration = Date.now() + (data.expires_in - 300) * 1000;

    return accessToken as string;
  } catch (error) {
    console.error("Error fetching IGDB access token:", error);
    throw error;
  }
}

/**
 * Make a request to the IGDB API
 */
export async function igdbRequest<T>(
  endpoint: string,
  query: string
): Promise<T> {
  try {
    const token = await getAccessToken();
    const clientId = process.env.IGDB_CLIENT_ID;

    if (!clientId) {
      throw new Error("IGDB_CLIENT_ID must be set in .env");
    }

    const response = await fetch(`${IGDB_API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
      body: query,
    });

    if (!response.ok) {
      throw new Error(`IGDB API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in IGDB request to ${endpoint}:`, error);
    throw error;
  }
} 