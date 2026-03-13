const PLACES_API_BASE = "https://maps.googleapis.com/maps/api/place";

export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface GooglePlaceDetails {
  placeId: string;
  name: string;
  rating: number | null;
  userRatingsTotal: number | null;
  reviews: GoogleReview[];
}

function hasApiKey(): boolean {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  return !!key && key !== "your-google-places-api-key-here";
}

/**
 * Fetch a venue's Google rating + up to 5 reviews.
 * Step 1: Text Search → place_id + rating
 * Step 2: Place Details → review text
 */
export async function fetchGooglePlaceDetails(
  venueName: string,
  address: string,
  city: string,
  state: string
): Promise<GooglePlaceDetails | null> {
  if (!hasApiKey()) return null;

  const apiKey = process.env.GOOGLE_PLACES_API_KEY!;
  const query = `${venueName} ${address} ${city} ${state}`;

  // Step 1 — Text Search to get the place_id and basic rating
  const searchUrl = `${PLACES_API_BASE}/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) throw new Error(`Text Search HTTP ${searchRes.status}`);

  const searchData = await searchRes.json();
  if (searchData.status === "REQUEST_DENIED") {
    throw new Error(`Google Places: ${searchData.error_message ?? "request denied"}`);
  }
  if (!searchData.results?.length) return null;

  const topResult = searchData.results[0];
  const placeId: string = topResult.place_id;

  // Step 2 — Place Details to get review text
  const detailsUrl = `${PLACES_API_BASE}/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;
  const detailsRes = await fetch(detailsUrl);
  if (!detailsRes.ok) throw new Error(`Place Details HTTP ${detailsRes.status}`);

  const detailsData = await detailsRes.json();
  const place = detailsData.result;

  const reviews: GoogleReview[] = (place?.reviews ?? [])
    .filter((r: { text?: string }) => r.text?.trim())
    .map((r: { author_name: string; rating: number; text: string; relative_time_description: string }) => ({
      authorName: r.author_name,
      rating: r.rating,
      text: r.text.trim(),
      relativeTime: r.relative_time_description,
    }));

  return {
    placeId,
    name: place?.name ?? topResult.name,
    rating: place?.rating ?? topResult.rating ?? null,
    userRatingsTotal: place?.user_ratings_total ?? topResult.user_ratings_total ?? null,
    reviews,
  };
}

/**
 * Lightweight version — just fetches the average rating (no review text).
 * Used by the admin sync script.
 */
export async function fetchGoogleRating(
  venueName: string,
  address: string,
  city: string,
  state: string
): Promise<{ rating: number | null; userRatingsTotal: number | null; placeId: string } | null> {
  if (!hasApiKey()) return null;

  const apiKey = process.env.GOOGLE_PLACES_API_KEY!;
  const query = `${venueName} ${address} ${city} ${state}`;
  const url = `${PLACES_API_BASE}/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Places API error: ${res.status}`);

  const data = await res.json();
  if (data.status === "REQUEST_DENIED") {
    throw new Error(`Google Places: ${data.error_message ?? "request denied"}`);
  }
  if (!data.results?.length) return null;

  const top = data.results[0];
  return {
    rating: top.rating ?? null,
    userRatingsTotal: top.user_ratings_total ?? null,
    placeId: top.place_id,
  };
}
