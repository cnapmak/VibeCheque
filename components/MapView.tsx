"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { getVibeCategory } from "@/lib/vibeCategories";
import "leaflet/dist/leaflet.css";

interface MapVenue {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  latitude: number;
  longitude: number;
  vibeCategory?: string | null;
  vibeScore?: number | null;
  avgUserVibeScore?: number | null;
  reviewCount: number;
}

function createEmojiMarker(emoji: string, color: string) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:44px;height:44px;border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        background:${color};
        border:3px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.3);
        display:flex;align-items:center;justify-content:center;
      ">
        <span style="transform:rotate(45deg);font-size:20px;line-height:1">${emoji}</span>
      </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -48],
  });
}

// Fit map bounds to all venue markers
function BoundsFitter({ venues }: { venues: MapVenue[] }) {
  const map = useMap();
  useEffect(() => {
    if (!venues.length) return;
    const bounds = L.latLngBounds(venues.map((v) => [v.latitude, v.longitude]));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
  }, [map, venues]);
  return null;
}

const VENUE_TYPE_LABELS: Record<string, string> = {
  RESTAURANT: "Restaurant", BAR: "Bar", CAFE: "Café", LOUNGE: "Lounge",
  CLUB: "Nightclub", ROOFTOP: "Rooftop", BREWERY: "Brewery",
  WINERY: "Winery", FOOD_HALL: "Food Hall", OTHER: "Venue",
};

const CATEGORY_COLORS: Record<string, string> = {
  COZY_INTIMATE: "#f59e0b",
  LIVELY_ENERGETIC: "#eab308",
  UPSCALE_REFINED: "#a855f7",
  CASUAL_CHILL: "#22c55e",
  TRENDY_HIPSTER: "#ec4899",
  FAMILY_FRIENDLY: "#3b82f6",
  SPORTS_BAR: "#f97316",
  DIVE_BAR: "#78716c",
  ROOFTOP_VIEWS: "#0ea5e9",
  HIDDEN_GEM: "#14b8a6",
};

export function MapView({ venues }: { venues: MapVenue[] }) {
  return (
    <div className="rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm" style={{ height: 560 }}>
      <MapContainer
        center={[39.5, -98.35]}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <BoundsFitter venues={venues} />
        {venues.map((venue) => {
          const vibe = venue.vibeCategory ? getVibeCategory(venue.vibeCategory) : null;
          const emoji = vibe?.emoji ?? "📍";
          const color = venue.vibeCategory ? (CATEGORY_COLORS[venue.vibeCategory] ?? "#7c3aed") : "#7c3aed";
          const icon = createEmojiMarker(emoji, color);
          const score = venue.avgUserVibeScore ?? venue.vibeScore;

          return (
            <Marker key={venue.id} position={[venue.latitude, venue.longitude]} icon={icon}>
              <Popup minWidth={200}>
                <div className="p-1">
                  <p className="font-bold text-gray-900 text-sm leading-tight mb-0.5">{venue.name}</p>
                  <p className="text-xs text-gray-500 mb-1">
                    {VENUE_TYPE_LABELS[venue.type] ?? venue.type} · {venue.city}, {venue.state}
                  </p>
                  {vibe && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 mb-1">
                      {vibe.emoji} {vibe.label}
                    </span>
                  )}
                  {score != null && (
                    <p className="text-xs text-gray-600">⭐ {score.toFixed(1)} · {venue.reviewCount} review{venue.reviewCount !== 1 ? "s" : ""}</p>
                  )}
                  <Link
                    href={`/venue/${venue.id}`}
                    className="block mt-2 text-center text-xs font-semibold text-purple-600 hover:text-purple-700 border border-purple-200 rounded-lg py-1 px-2 hover:bg-purple-50 transition-colors"
                  >
                    View venue →
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
