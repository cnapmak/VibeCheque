"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  MapPin, Globe, Phone, Sparkles, Loader2,
  ArrowLeft, Star, MessageSquare, ChevronDown, ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { VibeBadge } from "@/components/Vibebadge";
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
  vibeScore?: number | null;
  avgUserVibeScore?: number | null;
  reviewCount: number;
  vibeAnalyzedAt?: string | null;
  reviews: Review[];
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
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchVenue = useCallback(async () => {
    const res = await fetch(`/api/venues/${id}`);
    if (res.ok) setVenue(await res.json());
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
            {venue.vibeScore != null && (
              <div className="text-right">
                <div className="text-4xl font-black text-gray-900 leading-none">
                  {venue.vibeScore.toFixed(1)}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1">AI Score</div>
                <StarRating rating={venue.vibeScore / 2} size="sm" />
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

        {venue.vibeSummary ? (
          <div>
            <p className="text-gray-600 leading-relaxed text-sm italic border-l-2 border-gray-100 pl-4">
              {venue.vibeSummary}
            </p>
            {venue.vibeAnalyzedAt && (
              <p className="text-xs text-gray-300 mt-3">
                Analyzed {new Date(venue.vibeAnalyzedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-400">
            <p className="text-sm">No analysis yet — click Run Analysis to generate one.</p>
          </div>
        )}
      </div>

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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
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
    </div>
  );
}
