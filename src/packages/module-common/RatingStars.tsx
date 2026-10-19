
export const STAR_PATH =
  "M12 2.25l2.955 6.088 6.67.86-4.885 4.63 1.235 6.61L12 17.21l-5.975 3.228 1.235-6.61L2.375 9.198l6.67-.86L12 2.25z";

export interface RatingStarsProps {
  /** Supports fractional fill, e.g. 4.2. */
  value: number;
  max?: number;
  size?: number;
  gap?: number;
  className?: string;
}

export function RatingStars({
  value,
  max = 5,
  size = 14,
  gap = 5,
  className = "",
}: RatingStarsProps) {
  const clamped = Math.max(0, Math.min(max, value));

  return (
    <span
      role="img"
      aria-label={`Rated ${clamped.toFixed(1)} out of ${max}`}
      className={`inline-flex items-center shrink-0 ${className}`}
      style={{ gap }}
    >
      {Array.from({ length: max }).map((_, idx) => {
        const fill = Math.max(0, Math.min(1, clamped - idx));
        return (
          <span
            key={idx}
            aria-hidden="true"
            className="relative inline-block shrink-0"
            style={{ width: size, height: size }}
          >
            <svg
              viewBox="2.3 2.2 19.4 18.3"
              width={size}
              height={size}
              className="absolute inset-0 fill-muted-line"
            >
              <path d={STAR_PATH} />
            </svg>
            {fill > 0 && (
              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <svg
                  viewBox="2.3 2.2 19.4 18.3"
                  width={size}
                  height={size}
                  className="fill-star-filled"
                >
                  <path d={STAR_PATH} />
                </svg>
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export default RatingStars;
