"use client";

import { Children, useRef, type ReactNode } from "react";
import { CarouselNavButtons } from "./CarouselNavButtons";
import { useScrollEdges } from "./useScrollEdges";
import { useDragScroll } from "./useDragScroll";
import { CAROUSEL_COLUMNS, CAROUSEL_DESK_WIDTH, CAROUSEL_EDGE } from "./CarouselNavButtons";

interface TwoRowProductCarouselProps {
  title?: string;
  viewAllLink?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}

export function TwoRowProductCarousel({
  title,
  viewAllLink,
  children,
  className = "",
  titleClassName = "",
}: TwoRowProductCarouselProps) {
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
      <div className={`w-full ${CAROUSEL_DESK_WIDTH}`}>
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
          className={`grid grid-rows-2 desk:grid-rows-[374px_374px] grid-flow-col ${CAROUSEL_COLUMNS} gap-[11px] overflow-x-auto snap-x snap-mandatory no-scrollbar select-none cursor-grab pb-1 ${CAROUSEL_EDGE}`}
        >
          {Children.map(children, (child) => (
            <div className="snap-start">{child}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TwoRowProductCarousel;
