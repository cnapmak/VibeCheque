import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeVenueVibe } from "@/lib/vibeAgent";

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
    const analysis = await analyzeVenueVibe(
      venue.name,
      venue.website,
      venue.type,
      `${venue.address}, ${venue.city}, ${venue.state}`
    );

    const updatedVenue = await prisma.venue.update({
      where: { id },
      data: {
        vibeCategory: analysis.vibeCategory,
        vibeSummary: analysis.vibeSummary,
        vibeScore: analysis.vibeScore,
        vibeAnalyzedAt: new Date(),
      },
    });

    return NextResponse.json({ venue: updatedVenue, analysis });
  } catch (error) {
    console.error("Vibe analysis failed:", error);
    return NextResponse.json(
      { error: "AI vibe analysis failed. Check your API key." },
      { status: 500 }
    );
  }
}
