"use client";

import { Children, useRef, type ReactNode } from "react";
import { CarouselNavButtons } from "./CarouselNavButtons";
import { useScrollEdges } from "./useScrollEdges";
import { useDragScroll } from "./useDragScroll";
import { CAROUSEL_DESK_WIDTH, CAROUSEL_EDGE, CAROUSEL_ITEM } from "./CarouselNavButtons";

interface ProductCarouselProps {
  title?: string;
  viewAllLink?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  /** Let six cards overflow the 1290px grid (2px left, 5px right) so the last card is not clipped. */
  bleed?: boolean;
}

export function ProductCarousel({
  title,
  viewAllLink,
  children,
  className = "",
  titleClassName = "",
  bleed = true,
}: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { canPrev, canNext } = useScrollEdges(containerRef);

  /* One visible page per click, whatever the card size. */
  const scroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: (direction === "left" ? -1 : 1) * el.clientWidth, behavior: "smooth" });
  };

  const dragHandlers = useDragScroll(containerRef);

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`w-full ${CAROUSEL_DESK_WIDTH} ${bleed ? "desk:-ml-[2px]" : ""}`}
      >
        {title && (
          <div className="flex items-center justify-between gap-3 mb-[10px] w-full">
            <h2
              className={`text-[clamp(13px,0.75vw+10.3px,18px)] font-black uppercase tracking-[0.1em] text-brand-dark leading-tight ${titleClassName}`}
            >
              {title}
            </h2>

            <CarouselNavButtons
              viewAllLink={viewAllLink}
              onPrev={() => scroll("left")}
              onNext={() => scroll("right")}
              canPrev={canPrev}
              canNext={canNext}
            />
          </div>
        )}

        <div
          ref={containerRef}
          {...dragHandlers}
          className={`flex gap-[11px] overflow-x-auto snap-x snap-mandatory no-scrollbar select-none cursor-grab pb-1 ${CAROUSEL_EDGE}`}
        >
          {Children.map(children, (child) => (
            <div className={CAROUSEL_ITEM}>{child}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCarousel;
