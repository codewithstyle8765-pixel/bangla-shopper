
type Direction = "up" | "down" | "left" | "right";

const ROTATE: Record<Direction, number> = { right: 0, down: 90, left: 180, up: 270 };

interface ShapeProps {
  direction?: Direction;
  className?: string;
}

export function Triangle({ direction = "down", className }: ShapeProps) {
  return (
    <svg viewBox="0 0 12 13" className={className} fill="currentColor" aria-hidden="true">
      <polygon points="0,1 12,1 6,12" transform={`rotate(${ROTATE[direction] - 90} 6 6.5)`} />
    </svg>
  );
}

export function NotchArrow({ direction = "right", className }: ShapeProps) {
  return (
    <svg viewBox="0 0 16 16" preserveAspectRatio="none" className={className} fill="currentColor" aria-hidden="true">
      <path d="M0.5 0.5 16 8 0.5 15.5 4.5 8Z" transform={`rotate(${ROTATE[direction]} 8 8)`} />
    </svg>
  );
}

export function MenuBars({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} fill="currentColor" aria-hidden="true">
      <rect y="0" width="20" height="2.4" />
      <rect y="5.8" width="20" height="2.4" />
      <rect y="11.6" width="20" height="2.4" />
    </svg>
  );
}

export function CutChevron({ direction = "left", className }: ShapeProps & { direction?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 13 26" className={className} fill="currentColor" aria-hidden="true">
      <path
        d={direction === "left" ? "M13 0 0 13l13 13V0ZM13 4 4 13l9 9V4Z" : "M0 0l13 13L0 26V0ZM0 4l9 9-9 9V4Z"}
        fillRule="evenodd"
      />
    </svg>
  );
}
