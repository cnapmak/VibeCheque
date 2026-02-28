"use client";

import { getVibeCategory } from "@/lib/vibeCategories";

interface VibeBadgeProps {
  category: string;
  size?: "sm" | "md" | "lg";
}

export function VibeBadge({ category, size = "md" }: VibeBadgeProps) {
  const vibe = getVibeCategory(category);
  if (!vibe) return null;

  const sizeClasses = {
    sm: "text-xs px-2.5 py-0.5 gap-1.5",
    md: "text-sm px-3 py-1 gap-2",
    lg: "text-sm px-4 py-1.5 gap-2",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${vibe.badgeClass} ${sizeClasses[size]}`}
    >
      <span
        className="rounded-full flex-shrink-0"
        style={{
          width: size === "lg" ? 7 : 6,
          height: size === "lg" ? 7 : 6,
          background: vibe.accent,
        }}
      />
      {vibe.label}
    </span>
  );
}
