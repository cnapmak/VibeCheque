"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Globe, Image, Loader2, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

const VENUE_TYPES = [
  { value: "RESTAURANT", label: "Restaurant" },
  { value: "BAR", label: "Bar" },
  { value: "CAFE", label: "Café" },
  { value: "LOUNGE", label: "Lounge" },
  { value: "CLUB", label: "Nightclub" },
  { value: "ROOFTOP", label: "Rooftop" },
  { value: "BREWERY", label: "Brewery" },
  { value: "WINERY", label: "Winery" },
  { value: "FOOD_HALL", label: "Food Hall" },
  { value: "OTHER", label: "Other" },
];

const INPUT_CLASS =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 transition-colors";

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
    imageUrl: "",
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
          imageUrl: formData.imageUrl || undefined,
          type: formData.type,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to create venue");
      }

      const venue = await res.json();
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
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-700 mb-8 tracking-wide uppercase transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Add a Venue</h1>
        <p className="text-sm text-gray-400">
          Add a restaurant or bar to get an AI vibe analysis and community reviews.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Venue Type */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Venue Type
          </label>
          <div className="flex flex-wrap gap-2">
            {VENUE_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData((p) => ({ ...p, type: type.value }))}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  formData.type === type.value
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Venue Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
            placeholder="e.g. The Violet Hour"
            className={INPUT_CLASS}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} />
              Street Address *
            </span>
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
            placeholder="e.g. 1520 N Damen Ave"
            className={INPUT_CLASS}
          />
        </div>

        {/* City / State / Country */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">City *</label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
              placeholder="Chicago"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">State *</label>
            <input
              type="text"
              required
              value={formData.state}
              onChange={(e) => setFormData((p) => ({ ...p, state: e.target.value }))}
              placeholder="IL"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">Country</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData((p) => ({ ...p, country: e.target.value }))}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            <span className="flex items-center gap-1.5">
              <Globe size={12} />
              Website <span className="font-normal normal-case text-gray-400">(helps AI analyze)</span>
            </span>
          </label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
            placeholder="https://example.com"
            className={INPUT_CLASS}
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            <span className="flex items-center gap-1.5">
              <Image size={12} />
              Cover Photo URL <span className="font-normal normal-case text-gray-400">(optional)</span>
            </span>
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData((p) => ({ ...p, imageUrl: e.target.value }))}
            placeholder="https://example.com/photo.jpg"
            className={INPUT_CLASS}
          />
          {formData.imageUrl && (
            <div className="mt-3 rounded-xl overflow-hidden h-44 border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}
        </div>

        {/* AI Toggle */}
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.runAnalysis}
              onChange={(e) => setFormData((p) => ({ ...p, runAnalysis: e.target.checked }))}
              className="mt-0.5 w-4 h-4 accent-violet-600"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={13} className="text-violet-500" />
                <span className="font-semibold text-violet-900 text-sm">
                  Run AI vibe analysis after adding
                </span>
              </div>
              <p className="text-xs text-violet-500/80">
                Claude will analyze the venue and assign a vibe category, score, and summary.
                Requires ANTHROPIC_API_KEY.
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
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-gray-700 disabled:opacity-50 transition-colors text-sm"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {formData.runAnalysis ? "Adding & analyzing..." : "Adding venue..."}
            </>
          ) : (
            <>
              <MapPin size={16} />
              Add Venue to VibeCheque
            </>
          )}
        </button>
      </form>
    </div>
  );
}
