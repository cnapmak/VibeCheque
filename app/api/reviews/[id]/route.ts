import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isAuthorized(request: NextRequest): boolean {
  const token = request.headers.get("x-admin-token");
  return token === process.env.ADMIN_PASSWORD;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  const venueId = review.venueId;

  // Delete the review (votes cascade via schema)
  await prisma.review.delete({ where: { id } });

  // Recalculate venue stats
  const agg = await prisma.review.aggregate({
    where: { venueId },
    _avg: { vibeRating: true },
    _count: true,
  });

  await prisma.venue.update({
    where: { id: venueId },
    data: {
      avgUserVibeScore: agg._avg.vibeRating,
      reviewCount: agg._count,
    },
  });

  return new NextResponse(null, { status: 204 });
}
