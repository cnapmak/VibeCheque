const PLACES_V1 = "https://places.googleapis.com/v1/places";

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

function apiKey(): string | null {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  return key && key !== "your-google-places-api-key-here" ? key : null;
}

function placesHeaders(fieldMask: string, key: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": key,
    "X-Goog-FieldMask": fieldMask,
  };
}

/**
 * Full fetch: rating + up to 5 review texts.
 * Step 1 — Text Search (New) → place id + rating
 * Step 2 — Place Details (New) → reviews
 */
export async function fetchGooglePlaceDetails(
  venueName: string,
  address: string,
  city: string,
  state: string
): Promise<GooglePlaceDetails | null> {
  const key = apiKey();
  if (!key) return null;

  // Step 1 — Text Search
  const searchRes = await fetch(`${PLACES_V1}:searchText`, {
    method: "POST",
    headers: placesHeaders("places.id,places.displayName,places.rating,places.userRatingCount", key),
    body: JSON.stringify({ textQuery: `${venueName} ${address} ${city} ${state}` }),
  });

  if (!searchRes.ok) throw new Error(`Places Text Search HTTP ${searchRes.status}`);
  const searchData = await searchRes.json();

  const topPlace = searchData.places?.[0];
  if (!topPlace) return null;

  const placeId: string = topPlace.id;

  // Step 2 — Place Details for review text
  const detailsRes = await fetch(`${PLACES_V1}/${placeId}`, {
    headers: placesHeaders(
      "id,displayName,rating,userRatingCount,reviews",
      key
    ),
  });

  if (!detailsRes.ok) throw new Error(`Places Details HTTP ${detailsRes.status}`);
  const place = await detailsRes.json();

  const reviews: GoogleReview[] = (place.reviews ?? [])
    .filter((r: { text?: { text?: string } }) => r.text?.text?.trim())
    .map((r: {
      authorAttribution?: { displayName?: string };
      rating?: number;
      text?: { text?: string };
      relativePublishTimeDescription?: string;
    }) => ({
      authorName: r.authorAttribution?.displayName ?? "Anonymous",
      rating: r.rating ?? 0,
      text: r.text?.text?.trim() ?? "",
      relativeTime: r.relativePublishTimeDescription ?? "",
    }));

  return {
    placeId,
    name: place.displayName?.text ?? topPlace.displayName?.text ?? venueName,
    rating: place.rating ?? topPlace.rating ?? null,
    userRatingsTotal: place.userRatingCount ?? topPlace.userRatingCount ?? null,
    reviews,
  };
}

/**
 * Lightweight: rating only (used by admin sync script).
 */
export async function fetchGoogleRating(
  venueName: string,
  address: string,
  city: string,
  state: string
): Promise<{ rating: number | null; userRatingsTotal: number | null; placeId: string } | null> {
  const key = apiKey();
  if (!key) return null;

  const res = await fetch(`${PLACES_V1}:searchText`, {
    method: "POST",
    headers: placesHeaders("places.id,places.rating,places.userRatingCount", key),
    body: JSON.stringify({ textQuery: `${venueName} ${address} ${city} ${state}` }),
  });

  if (!res.ok) throw new Error(`Places Text Search HTTP ${res.status}`);
  const data = await res.json();

  const top = data.places?.[0];
  if (!top) return null;

  return {
    rating: top.rating ?? null,
    userRatingsTotal: top.userRatingCount ?? null,
    placeId: top.id,
  };
}
