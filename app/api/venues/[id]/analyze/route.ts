import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeVenueVibe } from "@/lib/vibeAgent";
import { fetchGooglePlaceDetails } from "@/lib/googlePlaces";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const venue = await prisma.venue.findUnique({ where: { id } });
  if (!venue) {
    return NextResponse.json({ error: "Venue not found" }, { status: 404 });
  }

  try {
    // Step 1 — Fetch Google rating + review text (gracefully skipped if no API key)
    const googleData = await fetchGooglePlaceDetails(
      venue.name,
      venue.address,
      venue.city,
      venue.state
    ).catch((err) => {
      console.warn("Google Places fetch failed (continuing without):", err.message);
      return null;
    });

    // Step 2 — Run AI analysis, grounded in real reviews when available
    const analysis = await analyzeVenueVibe(
      venue.name,
      venue.website,
      venue.type,
      `${venue.address}, ${venue.city}, ${venue.state}`,
      googleData?.reviews ?? []
    );

    // Step 3 — Persist everything in one update
    const updatedVenue = await prisma.venue.update({
      where: { id },
      data: {
        vibeCategory: analysis.vibeCategory,
        vibeSummary: analysis.vibeSummary,
        vibeAnalyzedAt: new Date(),
        // Update Google data if we fetched fresh results
        ...(googleData?.rating != null && { googleRating: googleData.rating }),
        ...(googleData?.placeId && { googlePlaceId: googleData.placeId }),
        ...(googleData?.reviews && {
          googleReviewsCache: JSON.stringify(googleData.reviews),
          googleReviewsCachedAt: new Date(),
        }),
      },
    });

    return NextResponse.json({
      venue: updatedVenue,
      analysis,
      googleReviewsUsed: googleData?.reviews.length ?? 0,
      googleRating: googleData?.rating ?? null,
    });
  } catch (error) {
    console.error("Vibe analysis failed:", error);
    return NextResponse.json(
      { error: "AI vibe analysis failed. Check your API key." },
      { status: 500 }
    );
  }
}
