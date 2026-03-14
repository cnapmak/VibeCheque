-- AlterTable
ALTER TABLE "Venue" ADD COLUMN "googlePlaceId" TEXT;
ALTER TABLE "Venue" ADD COLUMN "googleReviewsCache" TEXT;
ALTER TABLE "Venue" ADD COLUMN "googleReviewsCachedAt" DATETIME;
