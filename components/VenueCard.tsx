"use client";

import Link from "next/link";
import { MapPin, Star, MessageSquare } from "lucide-react";
import { VibeBadge } from "./Vibebadge";
import { PulseDot } from "./PulseDot";
import { getVibeCategory } from "@/lib/vibeCategories";

interface VenueCardProps {
  venue: {
    id: string;
    name: string;
    city: string;
    state: string;
    type: string;
    imageUrl?: string | null;
    vibeCategory?: string | null;
    vibeSummary?: string | null;
    googleRating?: number | null;
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
  const isHot =
    (venue.avgUserVibeScore != null && venue.avgUserVibeScore >= 4) ||
    (venue.googleRating != null && venue.googleRating >= 4.5);
  const dotColor = vibe?.accent ?? "#6366f1";

  return (
    <Link href={`/venue/${venue.id}`}>
      <div className="group bg-white rounded-2xl border border-gray-150 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">

        {/* Cover Image */}
        {venue.imageUrl ? (
          <div className="h-44 w-full overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={venue.imageUrl}
              alt={venue.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {isHot && (
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/55 backdrop-blur-sm rounded-full pl-0.5 pr-2 py-0.5">
                <PulseDot color={dotColor} size={16} />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">
                  Hot
                </span>
              </div>
            )}
          </div>
        ) : (
          <div
            className="h-28 w-full relative"
            style={{
              background: vibe
                ? `linear-gradient(135deg, ${vibe.accent}22 0%, ${vibe.accent}44 100%)`
                : "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)",
            }}
          >
            {isHot && (
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full pl-0.5 pr-2 py-0.5">
                <PulseDot color={dotColor} size={16} />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">
                  Hot
                </span>
              </div>
            )}
          </div>
        )}

        {/* Category accent line */}
        {vibe && (
          <div className="h-0.5 w-full" style={{ background: vibe.accent }} />
        )}

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base text-gray-900 leading-snug truncate group-hover:text-violet-700 transition-colors">
                {venue.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5 font-medium tracking-wide uppercase">
                <MapPin size={11} />
                <span>{venue.city}</span>
                <span className="mx-0.5">·</span>
                <span>{VENUE_TYPE_LABELS[venue.type] ?? venue.type}</span>
              </div>
            </div>
          </div>

          {/* Vibe Badge */}
          {venue.vibeCategory && (
            <div className="mb-3">
              <VibeBadge category={venue.vibeCategory} size="sm" />
            </div>
          )}

          {/* Vibe Summary */}
          {venue.vibeSummary ? (
            <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
              {venue.vibeSummary}
            </p>
          ) : (
            <p className="text-sm text-gray-300 italic mb-4">
              No vibe check yet — be the first.
            </p>
          )}

          {/* Stats Footer */}
          <div className="flex items-center gap-4 text-xs text-gray-400 pt-3 border-t border-gray-100">
            {venue.googleRating != null && (
              <div className="flex items-center gap-1">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="font-semibold text-gray-700">{venue.googleRating.toFixed(1)}</span>
                <span>Google</span>
              </div>
            )}
            {venue.avgUserVibeScore != null && (
              <div className="flex items-center gap-1">
                <Star size={12} className="text-violet-400 fill-violet-400" />
                <span className="font-semibold text-gray-700">{venue.avgUserVibeScore.toFixed(1)}</span>
                <span>community</span>
              </div>
            )}
            <div className="flex items-center gap-1 ml-auto">
              <MessageSquare size={11} />
              <span>{venue.reviewCount} {venue.reviewCount === 1 ? "review" : "reviews"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
