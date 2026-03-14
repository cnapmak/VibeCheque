import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const venue = await prisma.venue.findUnique({
    where: { id },
    include: {
      reviews: {
        orderBy: [{ upvotes: "desc" }, { createdAt: "desc" }],
        take: 50,
      },
      _count: { select: { reviews: true } },
    },
  });

  if (!venue) {
    return NextResponse.json({ error: "Venue not found" }, { status: 404 });
  }

  // Parse cached Google reviews from JSON string
  const googleReviews = venue.googleReviewsCache
    ? JSON.parse(venue.googleReviewsCache)
    : [];

  return NextResponse.json({ ...venue, googleReviews });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.headers.get("x-admin-token");
  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const venue = await prisma.venue.findUnique({ where: { id } });
  if (!venue) {
    return NextResponse.json({ error: "Venue not found" }, { status: 404 });
  }

  // Cascades to reviews and votes via schema
  await prisma.venue.delete({ where: { id } });

  return new NextResponse(null, { status: 204 });
}
