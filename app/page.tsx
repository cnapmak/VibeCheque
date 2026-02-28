"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Search, Zap, MapPin, Sparkles, LayoutGrid, Map } from "lucide-react";
import { VenueCard } from "@/components/VenueCard";
import { VIBE_CATEGORIES } from "@/lib/vibeCategories";
import Link from "next/link";

const MapView = dynamic(
  () => import("@/components/MapView").then((m) => m.MapView),
  { ssr: false, loading: () => <div className="rounded-2xl bg-gray-100 animate-pulse" style={{ height: 560 }} /> }
);

interface Venue {
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
  vibeScore?: number | null;
  avgUserVibeScore?: number | null;
  reviewCount: number;
}

export default function HomePage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const fetchVenues = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);

    const res = await fetch(`/api/venues?${params}`);
    const data = await res.json();
    setVenues(data);
    setLoading(false);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const timeout = setTimeout(fetchVenues, 300);
    return () => clearTimeout(timeout);
  }, [fetchVenues]);

  return (
    <div>
      {/* Hero Section */}
      <section className="vibe-gradient text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Sparkles size={14} />
            <span>AI-Powered Vibe Analysis</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-5 leading-tight">
            Find Your
            <br />
            <span className="text-yellow-300">Perfect Vibe</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
            Discover restaurants and bars by their atmosphere. Our AI reads the room so you
            don&apos;t walk into the wrong vibe.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-lg font-medium shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
            />
          </div>
        </div>
      </section>

      {/* Vibe Categories Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setSelectedCategory("")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === ""
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Zap size={13} />
              All Vibes
            </button>
            {Object.entries(VIBE_CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(selectedCategory === key ? "" : key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === key
                    ? "bg-gray-900 text-white"
                    : `${cat.badgeClass} hover:opacity-80`
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {/* Stats Bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {selectedCategory
                ? `${VIBE_CATEGORIES[selectedCategory as keyof typeof VIBE_CATEGORIES]?.label ?? ""} Venues`
                : searchQuery
                ? `Results for "${searchQuery}"`
                : "All Venues"}
            </h2>
            <p className="text-sm text-gray-500">
              {loading ? "Loading..." : `${venues.length} venue${venues.length !== 1 ? "s" : ""} found`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Grid / Map toggle */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <LayoutGrid size={15} />
                Grid
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  viewMode === "map"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Map size={15} />
                Map
              </button>
            </div>
            <Link
              href="/add-venue"
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              + Add a venue
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {!loading && venues.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No venues found</h3>
            <p className="text-gray-500 mb-6">
              Be the first to add this spot to VibeCheque!
            </p>
            <Link
              href="/add-venue"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-600 transition-all"
            >
              <MapPin size={18} />
              Add a Venue
            </Link>
          </div>
        )}

        {/* Venue Grid */}
        {viewMode === "grid" && (
          loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-48 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          )
        )}

        {/* Map View */}
        {viewMode === "map" && !loading && (
          <MapView
            venues={venues.filter(
              (v): v is typeof v & { latitude: number; longitude: number } =>
                v.latitude != null && v.longitude != null
            )}
          />
        )}
        {viewMode === "map" && loading && (
          <div className="rounded-2xl bg-gray-100 animate-pulse" style={{ height: 560 }} />
        )}
      </section>

      {/* How It Works */}
      <section className="bg-white border-t border-gray-200 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12">
            How VibeCheque Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 vibe-gradient rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg">
                🤖
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">AI Reads the Room</h3>
              <p className="text-gray-500 text-sm">
                Our AI agent analyzes the venue and assigns it to one of 10 vibe
                categories with a detailed summary.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg">
                ⭐
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Community Rates the Vibe</h3>
              <p className="text-gray-500 text-sm">
                Real visitors share their vibe experiences and vote on each
                other&apos;s reviews.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg">
                🎯
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">You Find Your Vibe</h3>
              <p className="text-gray-500 text-sm">
                Filter by vibe category to find exactly the atmosphere you&apos;re
                looking for tonight.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
