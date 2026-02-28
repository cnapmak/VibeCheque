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
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${vibe.badgeClass} ${sizeClasses[size]}`}
      style={{ borderColor: "currentColor", borderWidth: "1px", opacity: 0.9 }}
    >
      <span>{vibe.emoji}</span>
      <span>{vibe.label}</span>
    </span>
  );
}
