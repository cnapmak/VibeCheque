"use client";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRate,
}: StarRatingProps) {
  const sizeMap = { sm: 16, md: 20, lg: 28 };
  const px = sizeMap[size];

  return (
    <div className="inline-flex gap-0.5">
      {Array.from({ length: maxRating }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;

        return (
          <button
            key={i}
            type={interactive ? "button" : undefined}
            onClick={interactive && onRate ? () => onRate(i + 1) : undefined}
            className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <svg
              width={px}
              height={px}
              viewBox="0 0 24 24"
              fill={filled ? "#f59e0b" : partial ? "url(#half)" : "none"}
              stroke={filled || partial ? "#f59e0b" : "#d1d5db"}
              strokeWidth="1.5"
            >
              {partial && (
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
