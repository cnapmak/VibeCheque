const PLACES_API_BASE = "https://maps.googleapis.com/maps/api/place";

export interface PlaceResult {
  name: string;
  rating: number | null;
  userRatingsTotal: number | null;
  placeId: string;
}

/**
 * Search for a venue on Google Places and return its rating.
 * Uses the Text Search API: https://developers.google.com/maps/documentation/places/web-service/text-search
 */
export async function fetchGoogleRating(
  venueName: string,
  address: string,
  city: string,
  state: string
): Promise<PlaceResult | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || apiKey === "your-google-places-api-key-here") return null;

  // Include address for precision — helps avoid grabbing the wrong location
  const query = `${venueName} ${address} ${city} ${state}`;

  const url = `${PLACES_API_BASE}/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Places API error: ${res.status}`);

  const data = await res.json();

  if (data.status === "REQUEST_DENIED") {
    throw new Error(`Google Places API: ${data.error_message ?? "request denied"}`);
  }

  if (!data.results || data.results.length === 0) return null;

  const top = data.results[0];
  return {
    name: top.name,
    rating: top.rating ?? null,
    userRatingsTotal: top.user_ratings_total ?? null,
    placeId: top.place_id,
  };
}
