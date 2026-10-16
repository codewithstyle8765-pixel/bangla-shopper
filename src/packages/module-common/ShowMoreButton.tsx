"use client";

/** Collapsing from below the fold would leave the reader mid-page: bring the block's top back under the sticky bars. */
export function scrollBackTo(el: Element | null) {
  const covered = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pdp-sticky-top")) || 0;
  if (!el || el.getBoundingClientRect().top >= covered) return;
  el.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

interface ShowMoreButtonProps {
  open: boolean;
  onToggle: () => void;
  more: string;
  less?: string;
  controls?: string;
  className?: string;
}

/** Centred "See more ▾ / See less ▴" pill under a clamped section or list. */
export function ShowMoreButton({ open, onToggle, more, less = "See less", controls, className = "" }: ShowMoreButtonProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={controls}
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-card-border bg-white px-5 text-[14px] font-semibold text-brand-coral transition-colors hover:border-brand-coral"
      >
        {open ? less : more}
        <svg viewBox="0 0 12 12" aria-hidden="true" className={`h-3 w-3 transition-transform duration-(--duration-panel) ${open ? "rotate-180" : ""}`}>
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export default ShowMoreButton;
