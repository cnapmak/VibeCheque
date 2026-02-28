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

function createPinMarker(color: string) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: ${color};
        border: 2.5px solid white;
        box-shadow: 0 1px 6px rgba(0,0,0,0.35);
      "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -12],
  });
}

function BoundsFitter({ venues }: { venues: MapVenue[] }) {
  const map = useMap();
  useEffect(() => {
    if (!venues.length) return;
    const bounds = L.latLngBounds(venues.map((v) => [v.latitude, v.longitude]));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
  }, [map, venues]);
  return null;
}

const VENUE_TYPE_LABELS: Record<string, string> = {
  RESTAURANT: "Restaurant", BAR: "Bar", CAFE: "Café", LOUNGE: "Lounge",
  CLUB: "Nightclub", ROOFTOP: "Rooftop", BREWERY: "Brewery",
  WINERY: "Winery", FOOD_HALL: "Food Hall", OTHER: "Venue",
};

export function MapView({ venues }: { venues: MapVenue[] }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: 560 }}>
      <MapContainer
        center={[41.9, -87.65]}
        zoom={12}
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
          const color = vibe?.mapColor ?? "#6d28d9";
          const icon = createPinMarker(color);
          const score = venue.avgUserVibeScore ?? venue.vibeScore;

          return (
            <Marker key={venue.id} position={[venue.latitude, venue.longitude]} icon={icon}>
              <Popup minWidth={200} maxWidth={240}>
                <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", padding: "4px 2px" }}>
                  <p style={{ fontWeight: 700, fontSize: 13, color: "#111", marginBottom: 2, lineHeight: 1.3 }}>{venue.name}</p>
                  <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>
                    {VENUE_TYPE_LABELS[venue.type] ?? venue.type} — {venue.city}
                  </p>
                  {vibe && (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontSize: 11, fontWeight: 600, color: vibe.accent,
                      marginBottom: 6,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: vibe.mapColor, display: "inline-block" }} />
                      {vibe.label}
                    </span>
                  )}
                  {score != null && (
                    <p style={{ fontSize: 11, color: "#6b7280", marginBottom: 8 }}>
                      {score.toFixed(1)} avg · {venue.reviewCount} review{venue.reviewCount !== 1 ? "s" : ""}
                    </p>
                  )}
                  <Link
                    href={`/venue/${venue.id}`}
                    style={{
                      display: "block", textAlign: "center", fontSize: 12,
                      fontWeight: 600, color: "#7c3aed", textDecoration: "none",
                      border: "1px solid #ddd6fe", borderRadius: 8, padding: "5px 10px",
                    }}
                  >
                    View venue
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
