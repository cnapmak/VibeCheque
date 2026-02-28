import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const venue = await prisma.venue.findUnique({ where: { id } });
  if (!venue) {
    return NextResponse.json({ error: "Venue not found" }, { status: 404 });
  }

  const body = await request.json();

  if (!body.authorName || !body.comment || !body.vibeRating) {
    return NextResponse.json(
      { error: "Missing required fields: authorName, comment, vibeRating" },
      { status: 400 }
    );
  }

  if (body.vibeRating < 1 || body.vibeRating > 5) {
    return NextResponse.json(
      { error: "vibeRating must be between 1 and 5" },
      { status: 400 }
    );
  }

  const review = await prisma.review.create({
    data: {
      venueId: id,
      authorName: body.authorName,
      authorEmail: body.authorEmail ?? null,
      vibeRating: body.vibeRating,
      vibeCategory: body.vibeCategory ?? null,
      comment: body.comment,
      visitedAt: body.visitedAt ? new Date(body.visitedAt) : null,
    },
  });

  // Recalculate avg vibe score
  const agg = await prisma.review.aggregate({
    where: { venueId: id },
    _avg: { vibeRating: true },
    _count: true,
  });

  await prisma.venue.update({
    where: { id },
    data: {
      avgUserVibeScore: agg._avg.vibeRating,
      reviewCount: agg._count,
    },
  });

  return NextResponse.json(review, { status: 201 });
}
