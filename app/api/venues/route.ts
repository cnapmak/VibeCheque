import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { geocodeAddress } from "@/lib/geocode";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const category = searchParams.get("category");
  const city = searchParams.get("city");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  const where: Record<string, unknown> = {};

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

  const venues = await prisma.venue.findMany({
    where,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { reviews: true } },
    },
  });

  return NextResponse.json(venues);
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
