import { useId } from "react";
import clsx from "clsx";

/** Gold Cash Back Reward coin (reward points everywhere: account menu, dashboard, rewards page, checkout). */
export function RewardCoin({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={clsx("shrink-0", className)}>
      <defs>
        <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe27a" />
          <stop offset="0.55" stopColor="#f5b800" />
          <stop offset="1" stopColor="#d99100" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="#c98500" />
      <circle cx="16" cy="15.2" r="14.2" fill={`url(#${id}-face)`} />
      <circle cx="16" cy="15.2" r="10.6" fill="none" stroke="#fff3c4" strokeOpacity="0.85" strokeWidth="1.3" />
      <path
        d="m16 8.6 1.95 4.1 4.5.55-3.3 3.1.85 4.45L16 18.6l-4 2.2.85-4.45-3.3-3.1 4.5-.55Z"
        fill="#fffbea"
        stroke="#c98500"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default RewardCoin;
