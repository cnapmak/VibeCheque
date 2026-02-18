"use client";

import Link from "next/link";
import { MapPin, Star, MessageSquare } from "lucide-react";
import { VibeBadge } from "./Vibebadge";
import { getVibeCategory } from "@/lib/vibeCategories";

interface VenueCardProps {
  venue: {
    id: string;
    name: string;
    city: string;
    state: string;
    type: string;
    vibeCategory?: string | null;
    vibeSummary?: string | null;
    vibeScore?: number | null;
    avgUserVibeScore?: number | null;
    reviewCount: number;
  };
}

const VENUE_TYPE_LABELS: Record<string, string> = {
  RESTAURANT: "Restaurant",
  BAR: "Bar",
  CAFE: "Café",
  LOUNGE: "Lounge",
  CLUB: "Nightclub",
  ROOFTOP: "Rooftop",
  BREWERY: "Brewery",
  WINERY: "Winery",
  FOOD_HALL: "Food Hall",
  OTHER: "Venue",
};

export function VenueCard({ venue }: VenueCardProps) {
  const vibe = venue.vibeCategory ? getVibeCategory(venue.vibeCategory) : null;

  return (
    <Link href={`/venue/${venue.id}`}>
      <div
        className={`group rounded-2xl border-2 p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
          vibe ? vibe.bgClass : "bg-gray-50 border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 truncate group-hover:text-purple-700 transition-colors">
              {venue.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
              <MapPin size={13} />
              <span>{venue.city}, {venue.state}</span>
              <span className="mx-1">·</span>
              <span>{VENUE_TYPE_LABELS[venue.type] ?? venue.type}</span>
            </div>
          </div>
          {vibe && (
            <div className="text-3xl flex-shrink-0">{vibe.emoji}</div>
          )}
        </div>

        {/* Vibe Badge */}
        {venue.vibeCategory && (
          <div className="mb-3">
            <VibeBadge category={venue.vibeCategory} size="sm" />
          </div>
        )}

        {/* Vibe Summary */}
        {venue.vibeSummary && (
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">
            {venue.vibeSummary}
          </p>
        )}

        {!venue.vibeSummary && (
          <p className="text-sm text-gray-400 italic mb-3">
            No vibe check yet — be the first!
          </p>
        )}

        {/* Stats Footer */}
        <div className="flex items-center gap-4 text-sm text-gray-500 pt-2 border-t border-gray-200/80">
          {venue.vibeScore != null && (
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-gray-800">{venue.vibeScore.toFixed(1)}</span>
              <span>AI score</span>
            </div>
          )}
          {venue.avgUserVibeScore != null && (
            <div className="flex items-center gap-1">
              <Star size={14} className="text-purple-400 fill-purple-400" />
              <span className="font-semibold text-gray-800">{venue.avgUserVibeScore.toFixed(1)}</span>
              <span>user score</span>
            </div>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <MessageSquare size={13} />
            <span>{venue.reviewCount} {venue.reviewCount === 1 ? "review" : "reviews"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
