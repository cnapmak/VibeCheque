/**
 * CLI script to fetch real Google Places ratings for all venues.
 *
 * Usage:
 *   npx tsx scripts/fetch-google-ratings.ts
 *
 * Requires GOOGLE_PLACES_API_KEY in .env
 */
import { PrismaClient } from "@prisma/client";
import { fetchGoogleRating } from "../lib/googlePlaces";
const prisma = new PrismaClient();

async function main() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || apiKey === "your-google-places-api-key-here") {
    console.error("ERROR: Set GOOGLE_PLACES_API_KEY in your .env file first.");
    console.error("Get a key at: https://console.cloud.google.com/apis/library/places-backend.googleapis.com");
    process.exit(1);
  }

  const venues = await prisma.venue.findMany({
    select: { id: true, name: true, address: true, city: true, state: true, googleRating: true },
    orderBy: { name: "asc" },
  });

  console.log(`Fetching Google ratings for ${venues.length} venues...\n`);

  let updated = 0;
  let notFound = 0;
  let errors = 0;

  for (const venue of venues) {
    try {
      const place = await fetchGoogleRating(venue.name, venue.address, venue.city, venue.state);
      if (place?.rating != null) {
        await prisma.venue.update({ where: { id: venue.id }, data: { googleRating: place.rating } });
        const prev = venue.googleRating != null ? ` (was ${venue.googleRating})` : "";
        console.log(`✓ ${venue.name}: ${place.rating}${prev} (${place.userRatingsTotal} reviews)`);
        updated++;
      } else {
        console.log(`? ${venue.name}: not found on Google Places`);
        notFound++;
      }
    } catch (err) {
      console.error(`✗ ${venue.name}: ${err instanceof Error ? err.message : String(err)}`);
      errors++;
    }

    // Stay within Google's 10 QPS rate limit
    await new Promise((r) => setTimeout(r, 150));
  }

  console.log(`\nDone. Updated: ${updated} · Not found: ${notFound} · Errors: ${errors}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
