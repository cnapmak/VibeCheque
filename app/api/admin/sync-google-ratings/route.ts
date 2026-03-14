import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchGooglePlaceDetails } from "@/lib/googlePlaces";

function isAuthorized(request: NextRequest): boolean {
  return request.headers.get("x-admin-token") === process.env.ADMIN_PASSWORD;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || apiKey === "your-google-places-api-key-here") {
    return NextResponse.json(
      { error: "GOOGLE_PLACES_API_KEY is not configured in .env" },
      { status: 400 }
    );
  }

  const venues = await prisma.venue.findMany({
    select: { id: true, name: true, address: true, city: true, state: true },
  });

  const results: { name: string; rating: number | null; status: string }[] = [];

  for (const venue of venues) {
    try {
      const place = await fetchGooglePlaceDetails(
        venue.name, venue.address, venue.city, venue.state
      );
      if (place?.rating != null) {
        await prisma.venue.update({
          where: { id: venue.id },
          data: {
            googleRating: place.rating,
            googlePlaceId: place.placeId,
            googleReviewsCache: JSON.stringify(place.reviews),
            googleReviewsCachedAt: new Date(),
          },
        });
        results.push({ name: venue.name, rating: place.rating, status: "updated" });
      } else {
        results.push({ name: venue.name, rating: null, status: "not_found" });
      }
    } catch (err) {
      results.push({ name: venue.name, rating: null, status: `error: ${err instanceof Error ? err.message : String(err)}` });
    }

    await new Promise((r) => setTimeout(r, 150));
  }

  const updated = results.filter((r) => r.status === "updated").length;
  const notFound = results.filter((r) => r.status === "not_found").length;
  const errors = results.filter((r) => r.status.startsWith("error")).length;

  return NextResponse.json({ updated, notFound, errors, results });
}
