"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
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

const VENUE_TYPE_LABELS: Record<string, string> = {
  RESTAURANT: "Restaurant", BAR: "Bar", CAFE: "Café", LOUNGE: "Lounge",
  CLUB: "Nightclub", ROOFTOP: "Rooftop", BREWERY: "Brewery",
  WINERY: "Winery", FOOD_HALL: "Food Hall", OTHER: "Venue",
};

function pinIconUrl(color: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38">` +
    `<path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 24 14 24S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="${color}"/>` +
    `<circle cx="14" cy="14" r="5.5" fill="white"/>` +
    `</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function MapView({ venues }: { venues: MapVenue[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<LeafletMarker[]>([]);
  const [isReady, setIsReady] = useState(false);

  // ── Initialize Leaflet map (once) ─────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [41.9, -87.65],
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    setIsReady(true);

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, []);

  // ── Add / refresh markers whenever venues change ───────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!isReady || !map) return;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const newMarkers: LeafletMarker[] = [];

    venues.forEach((venue) => {
      const vibe = venue.vibeCategory ? getVibeCategory(venue.vibeCategory) : null;
      const color = vibe?.mapColor ?? "#6d28d9";
      const score = venue.avgUserVibeScore ?? venue.vibeScore;
      const typeLabel = VENUE_TYPE_LABELS[venue.type] ?? venue.type;

      const icon = new L.Icon({
        iconUrl: pinIconUrl(color),
        iconSize: [28, 38] as [number, number],
        iconAnchor: [14, 38] as [number, number],
        popupAnchor: [0, -40] as [number, number],
      });

      const popupHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;min-width:190px;padding:4px 2px">
          <p style="margin:0 0 2px;font-weight:700;font-size:13px;color:#111;line-height:1.3">${venue.name}</p>
          <p style="margin:0 0 6px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.04em;font-weight:500">${typeLabel}</p>
          ${vibe ? `<p style="margin:0 0 6px;font-size:11px;font-weight:600;color:${vibe.accent}">${vibe.label}</p>` : ""}
          ${score != null ? `<p style="margin:0 0 10px;font-size:11px;color:#6b7280">${score.toFixed(1)} avg &middot; ${venue.reviewCount} review${venue.reviewCount !== 1 ? "s" : ""}</p>` : ""}
          <a
            href="/venue/${venue.id}"
            style="display:block;text-align:center;font-size:12px;font-weight:600;color:#7c3aed;text-decoration:none;border:1px solid #ddd6fe;border-radius:8px;padding:6px 10px;background:#faf5ff"
          >View venue &rarr;</a>
        </div>`;

      const marker = new L.Marker(
        L.latLng(venue.latitude, venue.longitude),
        { icon }
      )
        .addTo(map)
        .bindPopup(popupHtml, { minWidth: 200, maxWidth: 250 });

      newMarkers.push(marker);
    });

    markersRef.current = newMarkers;

    // Fit map to show all visible markers
    if (venues.length > 0) {
      const bounds = L.latLngBounds(
        venues.map((v) => L.latLng(v.latitude, v.longitude))
      );
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    }
  }, [isReady, venues]);

  return (
    <div
      className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
      style={{ height: 560 }}
    >
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}
