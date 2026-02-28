import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const voteType = body.voteType as "UP" | "DOWN";

  if (voteType !== "UP" && voteType !== "DOWN") {
    return NextResponse.json(
      { error: "voteType must be UP or DOWN" },
      { status: 400 }
    );
  }

  // Use IP for voter identity (simplified for prototype)
  const forwarded = request.headers.get("x-forwarded-for");
  const voterIp = forwarded?.split(",")[0]?.trim() ?? "unknown";

  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  // Check existing vote
  const existingVote = await prisma.vote.findUnique({
    where: { reviewId_voterIp: { reviewId: id, voterIp } },
  });

  if (existingVote) {
    if (existingVote.voteType === voteType) {
      // Remove vote (toggle off)
      await prisma.vote.delete({
        where: { reviewId_voterIp: { reviewId: id, voterIp } },
      });

      const updated = await prisma.review.update({
        where: { id },
        data: {
          upvotes: voteType === "UP" ? { decrement: 1 } : undefined,
          downvotes: voteType === "DOWN" ? { decrement: 1 } : undefined,
        },
      });
      return NextResponse.json({ review: updated, action: "removed" });
    } else {
      // Switch vote
      await prisma.vote.update({
        where: { reviewId_voterIp: { reviewId: id, voterIp } },
        data: { voteType },
      });

      const updated = await prisma.review.update({
        where: { id },
        data: {
          upvotes:
            voteType === "UP" ? { increment: 1 } : { decrement: 1 },
          downvotes:
            voteType === "DOWN" ? { increment: 1 } : { decrement: 1 },
        },
      });
      return NextResponse.json({ review: updated, action: "switched" });
    }
  }

  // New vote
  await prisma.vote.create({
    data: { reviewId: id, voterIp, voteType },
  });

  const updated = await prisma.review.update({
    where: { id },
    data: {
      upvotes: voteType === "UP" ? { increment: 1 } : undefined,
      downvotes: voteType === "DOWN" ? { increment: 1 } : undefined,
    },
  });

  return NextResponse.json({ review: updated, action: "added" });
}
