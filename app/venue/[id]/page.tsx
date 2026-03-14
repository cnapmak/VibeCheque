"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  MapPin, Globe, Phone, Sparkles, Loader2,
  ArrowLeft, Star, MessageSquare, ChevronDown, ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { VibeBadge } from "@/components/Vibebadge";
import { PulseDot } from "@/components/PulseDot";
import { VenueCard } from "@/components/VenueCard";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewForm } from "@/components/ReviewForm";
import { StarRating } from "@/components/StarRating";
import { getVibeCategory } from "@/lib/vibeCategories";

interface Review {
  id: string;
  authorName: string;
  vibeRating: number;
  vibeCategory?: string | null;
  comment: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
}

interface SimilarVenue {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  imageUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  vibeCategory?: string | null;
  vibeSummary?: string | null;
  googleRating?: number | null;
  avgUserVibeScore?: number | null;
  reviewCount: number;
}

interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
}

interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  website?: string | null;
  phone?: string | null;
  imageUrl?: string | null;
  type: string;
  vibeCategory?: string | null;
  vibeSummary?: string | null;
  googleRating?: number | null;
  googlePlaceId?: string | null;
  avgUserVibeScore?: number | null;
  reviewCount: number;
  vibeAnalyzedAt?: string | null;
  reviews: Review[];
  googleReviews: GoogleReview[];
}

const VENUE_TYPE_LABELS: Record<string, string> = {
  RESTAURANT: "Restaurant", BAR: "Bar", CAFE: "Café", LOUNGE: "Lounge",
  CLUB: "Nightclub", ROOFTOP: "Rooftop", BREWERY: "Brewery",
  WINERY: "Winery", FOOD_HALL: "Food Hall", OTHER: "Venue",
};

export default function VenuePage() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [lastGoogleReviewsUsed, setLastGoogleReviewsUsed] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [similarVenues, setSimilarVenues] = useState<SimilarVenue[]>([]);

  const fetchVenue = useCallback(async () => {
    const res = await fetch(`/api/venues/${id}`);
    if (res.ok) {
      const data: Venue = await res.json();
      setVenue(data);
      if (data.vibeCategory) {
        const simRes = await fetch(`/api/venues?category=${data.vibeCategory}&limit=4`);
        if (simRes.ok) {
          const simData: SimilarVenue[] = await simRes.json();
          setSimilarVenues(simData.filter((v) => v.id !== data.id).slice(0, 3));
        }
      }
    }
    setLoading(false);
  }, [id]);

  useEffect(() => { fetchVenue(); }, [fetchVenue]);

  async function handleAnalyze() {
    setAnalyzing(true);
    setAnalyzeError(null);
    try {
      const res = await fetch(`/api/venues/${id}/analyze`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Analysis failed");
      setLastGoogleReviewsUsed(data.googleReviewsUsed ?? 0);
      await fetchVenue();
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 size={28} className="animate-spin text-violet-400" />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Venue not found</h2>
        <Link href="/" className="text-violet-600 hover:underline text-sm">Back to discovery</Link>
      </div>
    );
  }

  const vibe = venue.vibeCategory ? getVibeCategory(venue.vibeCategory) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-700 mb-8 tracking-wide uppercase transition-colors"
      >
        <ArrowLeft size={13} />
        Back
      </Link>

      {/* Hero Image */}
      {venue.imageUrl && (
        <div className="rounded-2xl overflow-hidden h-72 mb-6 border border-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={venue.imageUrl} alt={venue.name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Venue Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-5">
        {/* Category accent bar */}
        {vibe && (
          <div className="h-0.5 w-12 rounded-full mb-5" style={{ background: vibe.accent }} />
        )}

        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                {VENUE_TYPE_LABELS[venue.type] ?? venue.type}
              </span>
              {venue.vibeCategory && <VibeBadge category={venue.vibeCategory} size="sm" />}
            </div>

            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">{venue.name}</h1>

            <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-4">
              <MapPin size={13} />
              <span>{venue.address}, {venue.city}, {venue.state}</span>
            </div>

            <div className="flex flex-wrap gap-4">
              {venue.website && (
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors"
                >
                  <Globe size={13} />
                  Website
                </a>
              )}
              {venue.phone && (
                <a
                  href={`tel:${venue.phone}`}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium"
                >
                  <Phone size={13} />
                  {venue.phone}
                </a>
              )}
            </div>
          </div>

          {/* Score Block */}
          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            {venue.googleRating != null && (
              <div className="text-right">
                <div className="text-4xl font-black text-gray-900 leading-none">
                  {venue.googleRating.toFixed(1)}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1">Google Rating</div>
                <StarRating rating={venue.googleRating} size="sm" />
              </div>
            )}
            {venue.avgUserVibeScore != null && (
              <div className="text-right">
                <div className="text-2xl font-bold text-violet-600 leading-none">
                  {venue.avgUserVibeScore.toFixed(1)}
                  <span className="text-sm text-gray-400 font-normal">/5</span>
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1">
                  {venue.reviewCount} community reviews
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Vibe Check */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 tracking-tight">
            <Sparkles size={15} className="text-violet-500" />
            AI Vibe Analysis
          </h2>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="flex items-center gap-1.5 text-xs bg-gray-900 text-white font-semibold px-4 py-2 rounded-xl hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {analyzing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            {venue.vibeAnalyzedAt ? "Re-analyze" : "Run Analysis"}
          </button>
        </div>

        {analyzeError && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 mb-4">
            {analyzeError}
          </div>
        )}

        {analyzing ? (
          <div className="py-6 flex flex-col items-center gap-3">
            <PulseDot color={vibe?.accent ?? "#7c3aed"} size={72} />
            <p className="text-sm text-gray-400 font-medium">Reading the room…</p>
          </div>
        ) : venue.vibeSummary ? (
          <div>
            <p className="text-gray-600 leading-relaxed text-sm italic border-l-2 border-gray-100 pl-4">
              {venue.vibeSummary}
            </p>
            {venue.vibeAnalyzedAt && (
              <p className="text-xs text-gray-300 mt-3">
                Analyzed {new Date(venue.vibeAnalyzedAt).toLocaleDateString()}
                {lastGoogleReviewsUsed != null && lastGoogleReviewsUsed > 0 && (
                  <span className="ml-2 text-green-400">
                    · grounded in {lastGoogleReviewsUsed} Google review{lastGoogleReviewsUsed !== 1 ? "s" : ""}
                  </span>
                )}
              </p>
            )}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-400">
            <p className="text-sm">No analysis yet — click Run Analysis to generate one.</p>
          </div>
        )}
      </div>

      {/* Google Reviews */}
      {venue.googleReviews?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 tracking-tight">
              {/* Google "G" logo */}
              <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google Reviews
              {venue.googleRating != null && (
                <span className="text-gray-400 font-normal">
                  {venue.googleRating.toFixed(1)} ★
                </span>
              )}
            </h2>
            {venue.googlePlaceId && (
              <a
                href={`https://www.google.com/maps/place/?q=place_id:${venue.googlePlaceId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-violet-600 hover:text-violet-700 font-semibold transition-colors"
              >
                See all on Google →
              </a>
            )}
          </div>

          <div className="space-y-4">
            {venue.googleReviews.map((review, i) => (
              <div key={i} className={i < venue.googleReviews.length - 1 ? "pb-4 border-b border-gray-100" : ""}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-gray-800">{review.authorName}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        size={10}
                        className={s < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{review.relativeTime}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 tracking-tight">
            <MessageSquare size={15} className="text-violet-500" />
            Reviews
            {venue.reviewCount > 0 && (
              <span className="text-xs font-normal text-gray-400">({venue.reviewCount})</span>
            )}
          </h2>
          <button
            onClick={() => setShowReviewForm((p) => !p)}
            className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {showReviewForm ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            {showReviewForm ? "Close" : "Write a Review"}
          </button>
        </div>

        {showReviewForm && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
            <h3 className="font-semibold text-sm text-gray-900 mb-4">Your Take</h3>
            <ReviewForm
              venueId={venue.id}
              onSubmit={() => { setShowReviewForm(false); fetchVenue(); }}
            />
          </div>
        )}

        {venue.reviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="font-semibold text-sm text-gray-700 mb-1">No reviews yet</p>
            <p className="text-xs text-gray-400 mb-4">Be the first to weigh in on the vibe.</p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="text-xs text-violet-600 hover:text-violet-700 font-semibold transition-colors"
            >
              Write the first review
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {venue.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>

      {/* Rating Breakdown */}
      {venue.reviews.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          <h3 className="font-bold text-sm text-gray-900 mb-4 flex items-center gap-2 tracking-tight">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            Rating Breakdown
          </h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = venue.reviews.filter((r) => r.vibeRating === rating).length;
              const pct = venue.reviews.length > 0 ? (count / venue.reviews.length) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 w-14">
                    <StarRating rating={rating} size="sm" />
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{ width: `${pct}%`, background: "#7c3aed" }}
                    />
                  </div>
                  <span className="text-gray-400 w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Similar Vibes */}
      {similarVenues.length > 0 && (
        <div className="mb-5">
          <h3 className="font-bold text-sm text-gray-900 mb-4 flex items-center gap-2 tracking-tight">
            <Sparkles size={14} className="text-violet-500" />
            Similar Vibes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {similarVenues.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
