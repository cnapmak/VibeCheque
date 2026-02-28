"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  MapPin,
  Globe,
  Phone,
  Sparkles,
  Loader2,
  ArrowLeft,
  Star,
  MessageSquare,
  ChevronDown,
  ChevronUp,
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

export default function VenuePage() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchVenue = useCallback(async () => {
    const res = await fetch(`/api/venues/${id}`);
    if (res.ok) {
      const data = await res.json();
      setVenue(data);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchVenue();
  }, [fetchVenue]);

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
        <Loader2 size={32} className="animate-spin text-purple-500" />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Venue not found</h2>
        <Link href="/" className="text-purple-600 hover:underline">
          ← Back to discovery
        </Link>
      </div>
    );
  }

  const vibe = venue.vibeCategory ? getVibeCategory(venue.vibeCategory) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Nav */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-600 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to discovery
      </Link>

      {/* Hero Image */}
      {venue.imageUrl && (
        <div className="rounded-2xl overflow-hidden h-64 mb-6 border-2 border-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Venue Header */}
      <div
        className={`rounded-3xl border-2 p-8 mb-6 ${vibe ? vibe.bgClass : "bg-gray-50 border-gray-200"}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          {/* Vibe Emoji */}
          {vibe && (
            <div
              className={`w-20 h-20 rounded-2xl ${vibe.iconBg} flex items-center justify-center text-5xl shadow-sm flex-shrink-0`}
            >
              {vibe.emoji}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-semibold text-gray-500 bg-white/70 rounded-full px-3 py-1">
                {VENUE_TYPE_LABELS[venue.type] ?? venue.type}
              </span>
              {venue.vibeCategory && (
                <VibeBadge category={venue.vibeCategory} size="sm" />
              )}
            </div>

            <h1 className="text-3xl font-black text-gray-900 mb-2">{venue.name}</h1>

            <div className="flex items-center gap-1.5 text-gray-600 text-sm mb-4">
              <MapPin size={14} />
              <span>
                {venue.address}, {venue.city}, {venue.state}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {venue.website && (
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  <Globe size={14} />
                  Website
                </a>
              )}
              {venue.phone && (
                <a
                  href={`tel:${venue.phone}`}
                  className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 font-medium"
                >
                  <Phone size={14} />
                  {venue.phone}
                </a>
              )}
            </div>
          </div>

          {/* Score Block */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            {venue.vibeScore != null && (
              <div className="text-center bg-white/70 rounded-2xl px-5 py-3 shadow-sm">
                <div className="text-4xl font-black text-gray-900">
                  {venue.vibeScore.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500 font-medium">AI Vibe Score</div>
                <StarRating rating={venue.vibeScore / 2} size="sm" />
              </div>
            )}
            {venue.avgUserVibeScore != null && (
              <div className="text-center bg-white/70 rounded-2xl px-5 py-3 shadow-sm">
                <div className="text-2xl font-bold text-purple-700">
                  {venue.avgUserVibeScore.toFixed(1)}
                  <span className="text-base text-gray-400">/5</span>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {venue.reviewCount} user reviews
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Vibe Check Section */}
      <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sparkles size={18} className="text-purple-500" />
            AI Vibe Check
          </h2>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="flex items-center gap-1.5 text-sm bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-4 py-2 rounded-xl hover:from-purple-700 hover:to-pink-600 disabled:opacity-60 transition-all"
          >
            {analyzing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Sparkles size={14} />
            )}
            {venue.vibeAnalyzedAt ? "Re-analyze" : "Run AI Analysis"}
          </button>
        </div>

        {analyzeError && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 mb-4">
            {analyzeError}
          </div>
        )}

        {venue.vibeSummary ? (
          <div>
            <p className="text-gray-700 leading-relaxed text-base italic">
              &ldquo;{venue.vibeSummary}&rdquo;
            </p>
            {venue.vibeAnalyzedAt && (
              <p className="text-xs text-gray-400 mt-3">
                Analyzed on {new Date(venue.vibeAnalyzedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-3">🤖</div>
            <p className="text-sm">
              No AI vibe analysis yet. Click &ldquo;Run AI Analysis&rdquo; to get a vibe check!
            </p>
            {!process.env.NEXT_PUBLIC_HAS_AI && (
              <p className="text-xs mt-2 text-orange-500">
                Note: Set ANTHROPIC_API_KEY in .env to enable AI analysis
              </p>
            )}
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare size={18} className="text-purple-500" />
            Vibe Reviews
            {venue.reviewCount > 0 && (
              <span className="text-sm font-normal text-gray-400">
                ({venue.reviewCount})
              </span>
            )}
          </h2>
          <button
            onClick={() => setShowReviewForm((p) => !p)}
            className="flex items-center gap-1.5 text-sm border-2 border-purple-200 text-purple-700 font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition-all"
          >
            {showReviewForm ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {showReviewForm ? "Hide Form" : "Write a Review"}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="bg-white rounded-2xl border-2 border-purple-100 p-6 mb-4">
            <h3 className="font-semibold text-gray-900 mb-4">Share Your Vibe</h3>
            <ReviewForm
              venueId={venue.id}
              onSubmit={() => {
                setShowReviewForm(false);
                fetchVenue();
              }}
            />
          </div>
        )}

        {/* Reviews List */}
        {venue.reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="text-4xl mb-3">💬</div>
            <p className="font-semibold text-gray-700 mb-1">No reviews yet</p>
            <p className="text-sm text-gray-400">Be the first to vibe check this place!</p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Write the first review →
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

      {/* Rating Distribution */}
      {venue.reviews.length > 0 && (
        <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            Rating Breakdown
          </h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = venue.reviews.filter((r) => r.vibeRating === rating).length;
              const pct = venue.reviews.length > 0 ? (count / venue.reviews.length) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 w-16 text-right">
                    <StarRating rating={rating} size="sm" />
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-400 h-2 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-gray-500 w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
