import { fetchGooglePlaceDetails } from "../lib/googlePlaces";

async function main() {
  const result = await fetchGooglePlaceDetails("Alinea", "1723 N Halsted St", "Chicago", "IL");
  if (!result) { console.log("No result — check API key"); return; }

  console.log("Name:", result.name);
  console.log("Rating:", result.rating, `(${result.userRatingsTotal} total reviews on Google)`);
  console.log("Reviews fetched:", result.reviews.length);
  result.reviews.forEach((r, i) => {
    console.log(`\nReview ${i + 1} — ${r.rating}/5 — ${r.relativeTime}`);
    console.log(r.text.slice(0, 300) + (r.text.length > 300 ? "..." : ""));
  });
}

main().catch(console.error);
