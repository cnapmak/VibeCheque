"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { StarRating } from "./StarRating";
import { VibeBadge } from "./Vibebadge";

interface Review {
  id: string;
  authorName: string;
  vibeRating: number;
  vibeCategory?: string | null;
  comment: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [upvotes, setUpvotes] = useState(review.upvotes);
  const [downvotes, setDownvotes] = useState(review.downvotes);
  const [voted, setVoted] = useState<"UP" | "DOWN" | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleVote(voteType: "UP" | "DOWN") {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews/${review.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteType }),
      });
      const data = await res.json();
      if (res.ok) {
        setUpvotes(data.review.upvotes);
        setDownvotes(data.review.downvotes);
        if (data.action === "removed") {
          setVoted(null);
        } else {
          setVoted(voteType);
        }
      }
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  }

  const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const diff = Date.now() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    return `${Math.floor(months / 12)}y ago`;
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-5 hover:border-gray-200 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
              {review.authorName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{review.authorName}</p>
              <p className="text-xs text-gray-400">{timeAgo(review.createdAt)}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <StarRating rating={review.vibeRating} size="sm" />
        </div>
      </div>

      {review.vibeCategory && (
        <div className="mb-2">
          <VibeBadge category={review.vibeCategory} size="sm" />
        </div>
      )}

      <p className="text-gray-700 text-sm leading-relaxed mb-4">{review.comment}</p>

      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">Helpful?</span>
        <button
          onClick={() => handleVote("UP")}
          disabled={loading}
          className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all ${
            voted === "UP"
              ? "bg-green-100 text-green-700 font-semibold"
              : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600"
          }`}
        >
          <ThumbsUp size={14} />
          <span>{upvotes}</span>
        </button>
        <button
          onClick={() => handleVote("DOWN")}
          disabled={loading}
          className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all ${
            voted === "DOWN"
              ? "bg-red-100 text-red-700 font-semibold"
              : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
          }`}
        >
          <ThumbsDown size={14} />
          <span>{downvotes}</span>
        </button>
      </div>
    </div>
  );
}
