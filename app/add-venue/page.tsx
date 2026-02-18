"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Globe, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const VENUE_TYPES = [
  { value: "RESTAURANT", label: "Restaurant", emoji: "🍽️" },
  { value: "BAR", label: "Bar", emoji: "🍸" },
  { value: "CAFE", label: "Café", emoji: "☕" },
  { value: "LOUNGE", label: "Lounge", emoji: "🛋️" },
  { value: "CLUB", label: "Nightclub", emoji: "🎵" },
  { value: "ROOFTOP", label: "Rooftop", emoji: "🌆" },
  { value: "BREWERY", label: "Brewery", emoji: "🍺" },
  { value: "WINERY", label: "Winery", emoji: "🍷" },
  { value: "FOOD_HALL", label: "Food Hall", emoji: "🏪" },
  { value: "OTHER", label: "Other", emoji: "📍" },
];

export default function AddVenuePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "US",
    website: "",
    phone: "",
    type: "RESTAURANT",
    runAnalysis: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/venues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          website: formData.website || undefined,
          phone: formData.phone || undefined,
          type: formData.type,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to create venue");
      }

      const venue = await res.json();

      // Run AI analysis if requested
      if (formData.runAnalysis) {
        await fetch(`/api/venues/${venue.id}/analyze`, { method: "POST" });
      }

      router.push(`/venue/${venue.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-purple-600 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to discovery
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Add a Venue</h1>
        <p className="text-gray-500">
          Add a restaurant or bar to get an AI vibe check and community reviews.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Venue Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Venue Type *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {VENUE_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData((p) => ({ ...p, type: type.value }))}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs font-medium transition-all ${
                  formData.type === type.value
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                <span className="text-xl">{type.emoji}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Venue Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
            placeholder="e.g. The Rusty Anchor Bar"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-purple-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              Street Address *
            </span>
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
            placeholder="e.g. 123 Main Street"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-purple-400 focus:outline-none transition-colors"
          />
        </div>

        {/* City / State / Country */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1">City *</label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
              placeholder="e.g. Austin"
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-purple-400 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">State *</label>
            <input
              type="text"
              required
              value={formData.state}
              onChange={(e) => setFormData((p) => ({ ...p, state: e.target.value }))}
              placeholder="TX"
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-purple-400 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData((p) => ({ ...p, country: e.target.value }))}
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-purple-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <span className="flex items-center gap-1.5">
              <Globe size={14} />
              Website <span className="font-normal text-gray-400">(optional — helps AI analyze better)</span>
            </span>
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
            placeholder="https://example.com"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm focus:border-purple-400 focus:outline-none transition-colors"
          />
        </div>

        {/* AI Analysis Toggle */}
        <div className="bg-purple-50 border-2 border-purple-100 rounded-2xl p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.runAnalysis}
              onChange={(e) => setFormData((p) => ({ ...p, runAnalysis: e.target.checked }))}
              className="mt-0.5 w-4 h-4 rounded accent-purple-600"
            />
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-purple-500" />
                <span className="font-semibold text-purple-900 text-sm">
                  Run AI Vibe Analysis after adding
                </span>
              </div>
              <p className="text-xs text-purple-600 mt-0.5">
                Our AI will analyze this venue and assign it a vibe category and summary.
                Requires ANTHROPIC_API_KEY to be set.
              </p>
            </div>
          </label>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl hover:from-purple-700 hover:to-pink-600 disabled:opacity-60 transition-all text-base shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              {formData.runAnalysis ? "Adding & Analyzing Vibe..." : "Adding Venue..."}
            </>
          ) : (
            <>
              <MapPin size={20} />
              Add Venue to VibeCheque
            </>
          )}
        </button>
      </form>
    </div>
  );
}
