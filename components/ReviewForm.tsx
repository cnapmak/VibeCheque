"use client";

import { useState } from "react";
import { StarRating } from "./StarRating";
import { VIBE_CATEGORIES } from "@/lib/vibeCategories";
import { Send, Loader2 } from "lucide-react";

interface ReviewFormProps {
  venueId: string;
  onSubmit: () => void;
}

export function ReviewForm({ venueId, onSubmit }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    authorName: "",
    comment: "",
    vibeRating: 0,
    vibeCategory: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formData.vibeRating === 0) {
      setError("Please give a vibe rating!");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/venues/${venueId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          vibeCategory: formData.vibeCategory || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to submit review");
      }

      setSuccess(true);
      setFormData({ authorName: "", comment: "", vibeRating: 0, vibeCategory: "" });
      setTimeout(() => {
        setSuccess(false);
        onSubmit();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-2">✅</div>
        <p className="font-semibold text-green-800">Vibe check submitted!</p>
        <p className="text-sm text-green-600">Thanks for sharing the vibe.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Your Name *
        </label>
        <input
          type="text"
          required
          value={formData.authorName}
          onChange={(e) => setFormData((p) => ({ ...p, authorName: e.target.value }))}
          placeholder="e.g. Alex M."
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-purple-400 focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Vibe Rating *
        </label>
        <div className="flex items-center gap-3">
          <StarRating
            rating={formData.vibeRating}
            interactive
            size="lg"
            onRate={(r) => setFormData((p) => ({ ...p, vibeRating: r }))}
          />
          {formData.vibeRating > 0 && (
            <span className="text-sm font-medium text-gray-600">
              {["", "Low key", "Decent vibes", "Good vibes", "Great vibes", "Immaculate vibes"][formData.vibeRating]}
            </span>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Vibe Category <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <select
          value={formData.vibeCategory}
          onChange={(e) => setFormData((p) => ({ ...p, vibeCategory: e.target.value }))}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-purple-400 focus:outline-none transition-colors bg-white"
        >
          <option value="">Pick the vibe that fits...</option>
          {Object.entries(VIBE_CATEGORIES).map(([key, val]) => (
            <option key={key} value={key}>
              {val.emoji} {val.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Your Vibe Check *
        </label>
        <textarea
          required
          value={formData.comment}
          onChange={(e) => setFormData((p) => ({ ...p, comment: e.target.value }))}
          placeholder="Describe the vibe... What's the energy like? The crowd? The music? Would you come back?"
          rows={4}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-purple-400 focus:outline-none transition-colors resize-none"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-600 disabled:opacity-60 transition-all"
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Send size={18} />
        )}
        {loading ? "Submitting..." : "Submit Vibe Check"}
      </button>
    </form>
  );
}
