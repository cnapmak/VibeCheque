"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Search, MapPin, Sparkles, LayoutGrid, Map } from "lucide-react";
import { VenueCard } from "@/components/VenueCard";
import { VIBE_CATEGORIES } from "@/lib/vibeCategories";
import Link from "next/link";

const MapView = dynamic(
  () => import("@/components/MapView").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => <div className="rounded-2xl bg-gray-100 animate-pulse" style={{ height: 560 }} />,
  }
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

const NEIGHBORHOODS = ["Ukrainian Village", "Logan Square", "Avondale", "Wicker Park", "Lincoln Park", "River North", "Gold Coast"];
const VENUE_TYPES = ["RESTAURANT", "BAR", "BREWERY", "CAFE", "LOUNGE", "ROOFTOP", "OTHER"];
const VENUE_TYPE_LABELS: Record<string, string> = {
  RESTAURANT: "Restaurant", BAR: "Bar", BREWERY: "Brewery", CAFE: "Café",
  LOUNGE: "Lounge", ROOFTOP: "Rooftop", OTHER: "Other",
};
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "score", label: "AI Score" },
  { value: "community", label: "Community" },
  { value: "popular", label: "Popular" },
];

export default function HomePage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const fetchVenues = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedNeighborhood) params.set("neighborhood", selectedNeighborhood);
      if (selectedType) params.set("type", selectedType);
      if (sortBy !== "newest") params.set("sort", sortBy);

      const res = await fetch(`/api/venues?${params}`);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setVenues(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch venues:", err);
      setVenues([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, selectedNeighborhood, selectedType, sortBy]);

  useEffect(() => {
    const timeout = setTimeout(fetchVenues, 300);
    return () => clearTimeout(timeout);
  }, [fetchVenues]);

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient text-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-8 text-white/70">
            <Sparkles size={12} />
            <span>AI-Powered Vibe Analysis · Chicago</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black mb-5 leading-[1.05] tracking-tight">
            Find Your Kind
            <br />
            <span className="text-violet-300">of Night</span>
          </h1>

          <p className="text-lg text-white/60 mb-10 max-w-md mx-auto leading-relaxed">
            Discover Chicago&apos;s best restaurants and bars by atmosphere — not just ratings.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or neighborhood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-gray-900 text-sm font-medium bg-white shadow-2xl focus:outline-none focus:ring-2 focus:ring-violet-300/50 placeholder:text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-gray-200 sticky top-[60px] z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 space-y-2">
          {/* Vibe Category row */}
          <div className="overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                  selectedCategory === ""
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {Object.entries(VIBE_CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(selectedCategory === key ? "" : key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap border ${
                    selectedCategory === key
                      ? "bg-gray-900 text-white border-gray-900"
                      : `${cat.badgeClass} hover:opacity-80`
                  }`}
                >
                  <span
                    className="rounded-full flex-shrink-0"
                    style={{
                      width: 6,
                      height: 6,
                      background: selectedCategory === key ? "white" : cat.accent,
                    }}
                  />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Neighborhood + Type row */}
          <div className="overflow-x-auto">
            <div className="flex items-center gap-4 min-w-max">
              {/* Neighborhood pills */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mr-1">Area</span>
                <button
                  onClick={() => setSelectedNeighborhood("")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedNeighborhood === ""
                      ? "bg-violet-100 text-violet-700"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                {NEIGHBORHOODS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setSelectedNeighborhood(selectedNeighborhood === n ? "" : n)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      selectedNeighborhood === n
                        ? "bg-violet-100 text-violet-700"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <div className="w-px h-4 bg-gray-200 flex-shrink-0" />

              {/* Type pills */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mr-1">Type</span>
                <button
                  onClick={() => setSelectedType("")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedType === ""
                      ? "bg-violet-100 text-violet-700"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                {VENUE_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(selectedType === t ? "" : t)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                      selectedType === t
                        ? "bg-violet-100 text-violet-700"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {VENUE_TYPE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              {selectedCategory
                ? VIBE_CATEGORIES[selectedCategory as keyof typeof VIBE_CATEGORIES]?.label
                : searchQuery
                ? `"${searchQuery}"`
                : selectedNeighborhood || selectedType
                ? [selectedNeighborhood, selectedType && VENUE_TYPE_LABELS[selectedType]].filter(Boolean).join(" · ")
                : "All Venues"}
            </h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {loading ? "Loading..." : `${venues.length} venue${venues.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold text-gray-700 bg-gray-100 border-0 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-300/50 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <LayoutGrid size={13} />
                Grid
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  viewMode === "map"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Map size={13} />
                Map
              </button>
            </div>
            <Link
              href="/add-venue"
              className="text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors"
            >
              + Add venue
            </Link>
          </div>
        </div>

        {/* Empty */}
        {!loading && venues.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4 font-black text-gray-200">?</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No venues found</h3>
            <p className="text-sm text-gray-400 mb-6">Be the first to add this spot.</p>
            <Link
              href="/add-venue"
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
            >
              <MapPin size={15} />
              Add a Venue
            </Link>
          </div>
        )}

        {/* Grid */}
        {viewMode === "grid" && (
          loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-200/60 rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          )
        )}

        {/* Map */}
        {viewMode === "map" && !loading && (
          <MapView
            venues={venues.filter(
              (v): v is typeof v & { latitude: number; longitude: number } =>
                v.latitude != null && v.longitude != null
            )}
          />
        )}
        {viewMode === "map" && loading && (
          <div className="rounded-2xl bg-gray-200/60 animate-pulse" style={{ height: 560 }} />
        )}
      </section>

      {/* How It Works */}
      <section className="bg-white border-t border-gray-200 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-500 text-center mb-3">
            How it works
          </p>
          <h2 className="text-3xl font-black text-center text-gray-900 mb-14 tracking-tight">
            We read the room.<br />You pick the vibe.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                number: "01",
                title: "AI Reads the Room",
                body: "Our AI analyzes each venue and assigns it to one of ten vibe categories with a detailed atmospheric summary.",
              },
              {
                number: "02",
                title: "Community Rates It",
                body: "Real visitors share their vibe experiences and vote on each other's reviews to surface the most useful ones.",
              },
              {
                number: "03",
                title: "You Find Your Night",
                body: "Filter by vibe to find exactly the atmosphere you want — intimate dinner, loud bar, rooftop cocktails, or something in between.",
              },
            ].map((item) => (
              <div key={item.number}>
                <p className="text-3xl font-black text-gray-100 mb-3 tracking-tight">{item.number}</p>
                <h3 className="font-bold text-base text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
