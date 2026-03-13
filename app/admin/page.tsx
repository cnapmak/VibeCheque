"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, Search, LogOut, ShieldCheck, Loader2, Star } from "lucide-react";
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

const VENUE_TYPE_LABELS: Record<string, string> = {
  RESTAURANT: "Restaurant", BAR: "Bar", CAFE: "Café", LOUNGE: "Lounge",
  CLUB: "Nightclub", ROOFTOP: "Rooftop", BREWERY: "Brewery", OTHER: "Venue",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState(false);

  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  const fetchReviews = useCallback(async (tok: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reviews", {
        headers: { "x-admin-token": tok },
      });
      if (!res.ok) throw new Error("unauthorized");
      setReviews(await res.json());
    } catch {
      setToken(null);
      sessionStorage.removeItem("admin_token");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) fetchReviews(token);
  }, [token, fetchReviews]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(false);
    const res = await fetch("/api/admin/reviews", {
      headers: { "x-admin-token": password },
    });
    if (res.ok) {
      sessionStorage.setItem("admin_token", password);
      setToken(password);
      setReviews(await res.json());
    } else {
      setAuthError(true);
    }
  }

  async function handleDelete(id: string) {
    if (!token) return;
    setDeletingId(id);
    setConfirmId(null);
    try {
      await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setReviews([]);
    setPassword("");
  }

  const filtered = reviews.filter((r) => {
    const q = search.toLowerCase();
    return (
      !q ||
      r.venue.name.toLowerCase().includes(q) ||
      r.authorName.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q)
    );
  });

  // ── Login screen ──────────────────────────────────────────────────────────
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
              {authError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">Incorrect password.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
            >
              Sign in
            </button>
          </form>
          <p className="text-center mt-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              ← Back to VibeCheque
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck size={18} className="text-violet-600" />
          <span className="font-black text-gray-900 tracking-tight">VibeCheque Admin</span>
          <span className="text-xs text-gray-400 font-medium">Review Management</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs text-violet-600 hover:text-violet-700 font-semibold transition-colors">
            View site →
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 font-semibold transition-colors"
          >
            <LogOut size={13} />
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Reviews", value: reviews.length },
            { label: "Venues with Reviews", value: new Set(reviews.map((r) => r.venue.id)).size },
            { label: "Avg Vibe Rating", value: reviews.length ? (reviews.reduce((s, r) => s + r.vibeRating, 0) / reviews.length).toFixed(1) : "—" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 px-5 py-4">
              <p className="text-2xl font-black text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by venue, author, or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-violet-400 transition-colors"
          />
        </div>

        {/* Count */}
        <p className="text-xs text-gray-400 font-medium mb-3">
          {loading ? "Loading…" : `${filtered.length} review${filtered.length !== 1 ? "s" : ""}`}
        </p>

        {/* Reviews table */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={24} className="animate-spin text-violet-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">No reviews found.</div>
        ) : (
          <div className="space-y-2">
            {filtered.map((review) => {
              const vibe = review.vibeCategory ? getVibeCategory(review.vibeCategory) : null;
              const isDeleting = deletingId === review.id;
              const isConfirming = confirmId === review.id;

              return (
                <div
                  key={review.id}
                  className={`bg-white rounded-xl border border-gray-200 px-5 py-4 transition-opacity ${isDeleting ? "opacity-40 pointer-events-none" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      {/* Venue + meta row */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                        <Link
                          href={`/venue/${review.venue.id}`}
                          className="text-sm font-bold text-gray-900 hover:text-violet-700 transition-colors"
                        >
                          {review.venue.name}
                        </Link>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-400">
                          {VENUE_TYPE_LABELS[review.venue.type] ?? review.venue.type}
                          {review.venue.neighborhood ? ` · ${review.venue.neighborhood}` : ""}
                        </span>
                      </div>

                      {/* Author + rating + vibe */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                        <span className="text-xs font-semibold text-gray-700">{review.authorName}</span>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={11}
                              className={i < review.vibeRating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                            />
                          ))}
                        </div>
                        {vibe && (
                          <span
                            className="text-[10px] font-semibold uppercase tracking-wider"
                            style={{ color: vibe.accent }}
                          >
                            {vibe.label}
                          </span>
                        )}
                        <span className="text-xs text-gray-300">
                          {new Date(review.createdAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Comment */}
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{review.comment}</p>
                    </div>

                    {/* Delete controls */}
                    <div className="flex-shrink-0">
                      {isConfirming ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(review.id)}
                            className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="text-xs font-semibold text-gray-500 hover:text-gray-700 px-2 py-1.5 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(review.id)}
                          disabled={isDeleting}
                          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors p-1.5 rounded-lg hover:bg-red-50"
                        >
                          {isDeleting ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
