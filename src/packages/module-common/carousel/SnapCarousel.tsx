"use client";

import { Children, useRef, type ReactNode, type RefObject } from "react";
import clsx from "clsx";
import { useDragScroll } from "./useDragScroll";
import { useSnapPager } from "./useSnapPager";

/** One dot per page; the current page is solid. */
export function PagerDots({ pages, page, goTo, label, className }: { pages: number; page: number; goTo: (index: number) => void; label: string; className?: string }) {
  if (pages < 2) return null;
  return (
    <div className={clsx("flex items-center justify-center gap-[15px]", className)}>
      {Array.from({ length: pages }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => goTo(index)}
          aria-label={`${label} ${index + 1} of ${pages}`}
          aria-current={index === page ? "true" : undefined}
          className={clsx(
            "h-[15px] w-[15px] cursor-pointer rounded-full transition-colors duration-(--duration-panel)",
            index === page ? "bg-brand-black" : "bg-brand-black/50 hover:bg-brand-black/70",
          )}
        />
      ))}
    </div>
  );
}

interface SnapCarouselProps {
  children: ReactNode;
  /** Width classes for each slide (cards per view). */
  itemClassName: string;
  label: string;
  className?: string;
  dotsClassName?: string;
  /** Lets the parent drive the same row (e.g. arrows placed elsewhere in the layout). */
  trackRef?: RefObject<HTMLDivElement | null>;
  showDots?: boolean;
  /** Gap between slides. */
  gapClassName?: string;
}

/** Swipe / drag row that snaps per slide, with page dots; never autoplays. */
export function SnapCarousel({ children, itemClassName, label, className, dotsClassName, trackRef, showDots = true, gapClassName = "gap-[11px]" }: SnapCarouselProps) {
  const ownRef = useRef<HTMLDivElement>(null);
  const ref = trackRef ?? ownRef;
  const pager = useSnapPager(ref);
  const drag = useDragScroll(ref);

  return (
    <>
      <div
        ref={ref}
        {...drag}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className={clsx("no-scrollbar flex cursor-grab snap-x snap-mandatory overflow-x-auto select-none", gapClassName, className)}
      >
        {Children.map(children, (child) => (
          <div className={clsx("shrink-0 snap-start", itemClassName)}>{child}</div>
        ))}
      </div>
      {showDots && <PagerDots {...pager} label={label} className={dotsClassName} />}
    </>
  );
}

export default SnapCarousel;
