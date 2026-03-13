"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, Search, LogOut, ShieldCheck, Loader2, Star, MapPin } from "lucide-react";
import Link from "next/link";
import { getVibeCategory } from "@/lib/vibeCategories";

interface AdminReview {
  id: string;
  authorName: string;
  vibeRating: number;
  vibeCategory: string | null;
  comment: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  venue: {
    id: string;
    name: string;
    neighborhood: string | null;
    type: string;
  };
}

interface AdminVenue {
  id: string;
  name: string;
  type: string;
  neighborhood: string | null;
  city: string;
  vibeCategory: string | null;
  googleRating: number | null;
  avgUserVibeScore: number | null;
  reviewCount: number;
  createdAt: string;
}

const VENUE_TYPE_LABELS: Record<string, string> = {
  RESTAURANT: "Restaurant", BAR: "Bar", CAFE: "Café", LOUNGE: "Lounge",
  CLUB: "Nightclub", ROOFTOP: "Rooftop", BREWERY: "Brewery", OTHER: "Venue",
};

type Tab = "reviews" | "venues";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState(false);
  const [tab, setTab] = useState<Tab>("venues");

  // Reviews state
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewSearch, setReviewSearch] = useState("");
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [confirmReviewId, setConfirmReviewId] = useState<string | null>(null);

  // Venues state
  const [venues, setVenues] = useState<AdminVenue[]>([]);
  const [venuesLoading, setVenuesLoading] = useState(false);
  const [venueSearch, setVenueSearch] = useState("");
  const [deletingVenueId, setDeletingVenueId] = useState<string | null>(null);
  const [confirmVenueId, setConfirmVenueId] = useState<string | null>(null);

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  const fetchReviews = useCallback(async (tok: string) => {
    setReviewsLoading(true);
    try {
      const res = await fetch("/api/admin/reviews", { headers: { "x-admin-token": tok } });
      if (!res.ok) throw new Error("unauthorized");
      setReviews(await res.json());
    } catch {
      setToken(null);
      sessionStorage.removeItem("admin_token");
    } finally {
      setReviewsLoading(false);
    }
  }, []);

  const fetchVenues = useCallback(async () => {
    setVenuesLoading(true);
    try {
      const res = await fetch("/api/venues?limit=200&sort=newest");
      if (res.ok) setVenues(await res.json());
    } finally {
      setVenuesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchReviews(token);
      fetchVenues();
    }
  }, [token, fetchReviews, fetchVenues]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(false);
    const res = await fetch("/api/admin/reviews", { headers: { "x-admin-token": password } });
    if (res.ok) {
      sessionStorage.setItem("admin_token", password);
      setToken(password);
      setReviews(await res.json());
      fetchVenues();
    } else {
      setAuthError(true);
    }
  }

  async function handleDeleteReview(id: string) {
    if (!token) return;
    setDeletingReviewId(id);
    setConfirmReviewId(null);
    try {
      await fetch(`/api/reviews/${id}`, { method: "DELETE", headers: { "x-admin-token": token } });
      setReviews((prev) => prev.filter((r) => r.id !== id));
      // Update review count in venues list
      setVenues((prev) =>
        prev.map((v) => {
          const review = reviews.find((r) => r.id === id);
          if (review && v.id === review.venue.id) {
            return { ...v, reviewCount: Math.max(0, v.reviewCount - 1) };
          }
          return v;
        })
      );
    } finally {
      setDeletingReviewId(null);
    }
  }

  async function handleDeleteVenue(id: string) {
    if (!token) return;
    setDeletingVenueId(id);
    setConfirmVenueId(null);
    try {
      const res = await fetch(`/api/venues/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      if (res.ok || res.status === 204) {
        setVenues((prev) => prev.filter((v) => v.id !== id));
        // Also remove associated reviews from the reviews list
        setReviews((prev) => prev.filter((r) => r.venue.id !== id));
      }
    } finally {
      setDeletingVenueId(null);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setReviews([]);
    setVenues([]);
    setPassword("");
  }

  const filteredReviews = reviews.filter((r) => {
    const q = reviewSearch.toLowerCase();
    return !q || r.venue.name.toLowerCase().includes(q) || r.authorName.toLowerCase().includes(q) || r.comment.toLowerCase().includes(q);
  });

  const filteredVenues = venues.filter((v) => {
    const q = venueSearch.toLowerCase();
    return !q || v.name.toLowerCase().includes(q) || (v.neighborhood ?? "").toLowerCase().includes(q) || (v.city ?? "").toLowerCase().includes(q);
  });

  // ── Login screen ─────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 justify-center mb-8">
            <ShieldCheck size={20} className="text-violet-600" />
            <span className="font-black text-gray-900 tracking-tight">VibeCheque Admin</span>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-violet-400 focus:outline-none transition-colors"
              />
              {authError && <p className="text-xs text-red-500 mt-1.5 font-medium">Incorrect password.</p>}
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-gray-700 transition-colors">
              Sign in
            </button>
          </form>
          <p className="text-center mt-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">← Back to VibeCheque</Link>
          </p>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck size={18} className="text-violet-600" />
          <span className="font-black text-gray-900 tracking-tight">VibeCheque Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-violet-600 hover:text-violet-700 font-semibold transition-colors">View site →</Link>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 font-semibold transition-colors">
            <LogOut size={13} />
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Venues", value: venues.length },
            { label: "Total Reviews", value: reviews.length },
            { label: "Venues Analyzed", value: venues.filter((v) => v.vibeCategory).length },
            { label: "Avg Vibe Rating", value: reviews.length ? (reviews.reduce((s, r) => s + r.vibeRating, 0) / reviews.length).toFixed(1) : "—" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 px-5 py-4">
              <p className="text-2xl font-black text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
          {(["venues", "reviews"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t} {t === "venues" ? `(${venues.length})` : `(${reviews.length})`}
            </button>
          ))}
        </div>

        {/* ── Venues Tab ── */}
        {tab === "venues" && (
          <>
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search venues by name, neighborhood, or city..."
                value={venueSearch}
                onChange={(e) => setVenueSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-violet-400 transition-colors"
              />
            </div>
            <p className="text-xs text-gray-400 font-medium mb-3">
              {venuesLoading ? "Loading…" : `${filteredVenues.length} venue${filteredVenues.length !== 1 ? "s" : ""}`}
            </p>

            {venuesLoading ? (
              <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-violet-400" /></div>
            ) : (
              <div className="space-y-2">
                {filteredVenues.map((venue) => {
                  const vibe = venue.vibeCategory ? getVibeCategory(venue.vibeCategory) : null;
                  const isDeleting = deletingVenueId === venue.id;
                  const isConfirming = confirmVenueId === venue.id;

                  return (
                    <div
                      key={venue.id}
                      className={`bg-white rounded-xl border border-gray-200 px-5 py-4 transition-opacity ${isDeleting ? "opacity-40 pointer-events-none" : ""}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                            <Link
                              href={`/venue/${venue.id}`}
                              className="text-sm font-bold text-gray-900 hover:text-violet-700 transition-colors"
                            >
                              {venue.name}
                            </Link>
                            <span className="text-gray-300">·</span>
                            <span className="text-xs text-gray-400">
                              {VENUE_TYPE_LABELS[venue.type] ?? venue.type}
                            </span>
                            {vibe && (
                              <>
                                <span className="text-gray-300">·</span>
                                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: vibe.accent }}>
                                  {vibe.label}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            {(venue.neighborhood || venue.city) && (
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <MapPin size={10} />
                                {[venue.neighborhood, venue.city].filter(Boolean).join(", ")}
                              </span>
                            )}
                            <span className="text-xs text-gray-400">
                              {venue.reviewCount} review{venue.reviewCount !== 1 ? "s" : ""}
                            </span>
                            {venue.googleRating != null && (
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <Star size={10} className="text-amber-400 fill-amber-400" />
                                {venue.googleRating.toFixed(1)} Google
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Delete controls */}
                        <div className="flex-shrink-0">
                          {isConfirming ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDeleteVenue(venue.id)}
                                className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setConfirmVenueId(null)}
                                className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-2 py-1.5 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmVenueId(venue.id)}
                              disabled={isDeleting}
                              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors p-1.5 rounded-lg hover:bg-red-50"
                            >
                              {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── Reviews Tab ── */}
        {tab === "reviews" && (
          <>
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by venue, author, or content..."
                value={reviewSearch}
                onChange={(e) => setReviewSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-violet-400 transition-colors"
              />
            </div>
            <p className="text-xs text-gray-400 font-medium mb-3">
              {reviewsLoading ? "Loading…" : `${filteredReviews.length} review${filteredReviews.length !== 1 ? "s" : ""}`}
            </p>

            {reviewsLoading ? (
              <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin text-violet-400" /></div>
            ) : filteredReviews.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-sm">No reviews found.</div>
            ) : (
              <div className="space-y-2">
                {filteredReviews.map((review) => {
                  const vibe = review.vibeCategory ? getVibeCategory(review.vibeCategory) : null;
                  const isDeleting = deletingReviewId === review.id;
                  const isConfirming = confirmReviewId === review.id;

                  return (
                    <div
                      key={review.id}
                      className={`bg-white rounded-xl border border-gray-200 px-5 py-4 transition-opacity ${isDeleting ? "opacity-40 pointer-events-none" : ""}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                            <Link href={`/venue/${review.venue.id}`} className="text-sm font-bold text-gray-900 hover:text-violet-700 transition-colors">
                              {review.venue.name}
                            </Link>
                            <span className="text-gray-300">·</span>
                            <span className="text-xs text-gray-400">
                              {VENUE_TYPE_LABELS[review.venue.type] ?? review.venue.type}
                              {review.venue.neighborhood ? ` · ${review.venue.neighborhood}` : ""}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                            <span className="text-xs font-semibold text-gray-700">{review.authorName}</span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={11} className={i < review.vibeRating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                              ))}
                            </div>
                            {vibe && (
                              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: vibe.accent }}>
                                {vibe.label}
                              </span>
                            )}
                            <span className="text-xs text-gray-300">
                              {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{review.comment}</p>
                        </div>

                        <div className="flex-shrink-0">
                          {isConfirming ? (
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleDeleteReview(review.id)} className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors">
                                Delete
                              </button>
                              <button onClick={() => setConfirmReviewId(null)} className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-2 py-1.5 transition-colors">
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmReviewId(review.id)}
                              disabled={isDeleting}
                              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors p-1.5 rounded-lg hover:bg-red-50"
                            >
                              {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
