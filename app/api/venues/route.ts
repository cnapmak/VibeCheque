import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { geocodeAddress } from "@/lib/geocode";

const SORT_MAP: Record<string, Prisma.VenueOrderByWithRelationInput> = {
  score: { vibeScore: "desc" },
  community: { avgUserVibeScore: "desc" },
  popular: { reviewCount: "desc" },
  newest: { createdAt: "desc" },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const city = searchParams.get("city");
    const neighborhood = searchParams.get("neighborhood");
    const type = searchParams.get("type");
    const sort = searchParams.get("sort") ?? "newest";
    const limit = parseInt(searchParams.get("limit") ?? "20");

    const where: Prisma.VenueWhereInput = {};

    if (query) {
      where.OR = [
        { name: { contains: query } },
        { city: { contains: query } },
        { address: { contains: query } },
      ];
    }

    if (category) {
      where.vibeCategory = category;
    }

    if (city) {
      where.city = { contains: city };
    }

    if (neighborhood) {
      where.neighborhood = { contains: neighborhood };
    }

    if (type) {
      where.type = type;
    }

    const orderBy = SORT_MAP[sort] ?? SORT_MAP.newest;

    const venues = await prisma.venue.findMany({
      where,
      take: limit,
      orderBy,
      include: {
        _count: { select: { reviews: true } },
      },
    });

    return NextResponse.json(venues);
  } catch (err) {
    console.error("GET /api/venues error:", err);
    return NextResponse.json({ error: "Failed to fetch venues" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const coords = await geocodeAddress(
    body.address,
    body.city,
    body.state,
    body.country ?? "US"
  );

  const venue = await prisma.venue.create({
    data: {
      name: body.name,
      address: body.address,
      city: body.city,
      state: body.state,
      country: body.country ?? "US",
      website: body.website ?? null,
      phone: body.phone ?? null,
      imageUrl: body.imageUrl ?? null,
      latitude: coords?.latitude ?? null,
      longitude: coords?.longitude ?? null,
      type: body.type ?? "RESTAURANT",
    },
  });

  return NextResponse.json(venue, { status: 201 });
}
