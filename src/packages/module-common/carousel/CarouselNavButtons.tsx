import Link from "next/link";
import clsx from "clsx";

/** Six 207px cards with 11px gaps: the title and nav buttons line up with the first and sixth card. */
export const CAROUSEL_DESK_WIDTH = "desk:w-[1297px]";

/** Cards per view: 2 on phones, 3 from sm, 4 from md, 5 from lg, 6 from xl; fixed 207px on the desktop grid. */
export const CAROUSEL_ITEM =
  "shrink-0 snap-start w-[calc((100%-11px)/2)] sm:w-[calc((100%-22px)/3)] md:w-[calc((100%-33px)/4)] lg:w-[calc((100%-44px)/5)] xl:w-[calc((100%-55px)/6)] desk:w-[207px] desk:h-[374px]";
/** Room for the outer cards' border and shadow at either scroll edge, without moving the cards. The track must not be `w-full`, or the padding shrinks the card area. */
export const CAROUSEL_EDGE = "-mx-[4px] px-[4px] scroll-px-[4px]";
export const CAROUSEL_COLUMNS =
  "auto-cols-[calc((100%-11px)/2)] sm:auto-cols-[calc((100%-22px)/3)] md:auto-cols-[calc((100%-33px)/4)] lg:auto-cols-[calc((100%-44px)/5)] xl:auto-cols-[calc((100%-55px)/6)] desk:auto-cols-[207px]";

interface CarouselNavButtonsProps {
  viewAllLink?: string;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

/** Carousel arrow icon; also used by listing pagination on phones. */
export function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 10 16" className="h-[14px] w-[9px]" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === "left" ? "M8 2 2 8l6 6" : "m2 2 6 6-6 6"} />
    </svg>
  );
}

export function CarouselNavButtons({ viewAllLink, onPrev, onNext, canPrev, canNext }: CarouselNavButtonsProps) {
  const arrow = (enabled: boolean) =>
    clsx(
      "hidden h-[41px] w-[41px] items-center justify-center rounded-[8px] border border-card-border bg-white transition-colors duration-(--duration-panel) sm:flex",
      enabled ? "cursor-pointer text-brand-black hover:bg-brand-surface" : "cursor-default text-muted-line",
    );

  return (
    <div className="flex shrink-0 select-none items-center">
      {viewAllLink && (
        <Link
          href={viewAllLink}
          className="flex h-[34px] items-center justify-center gap-[7px] whitespace-nowrap rounded-[8px] bg-brand-charcoal px-[12px] text-[13px] font-bold text-white sm:h-[39px] sm:w-[104px] sm:px-0 sm:text-[15px]"
        >
          View all
          <svg className="h-[12px] w-[14px]" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 7h13M9 2l5 5-5 5" />
          </svg>
        </Link>
      )}

      <button type="button" onClick={onPrev} disabled={!canPrev} aria-label="Previous items" className={clsx(arrow(canPrev), "sm:ml-[16px]")}>
        <Chevron direction="left" />
      </button>
      <button type="button" onClick={onNext} disabled={!canNext} aria-label="Next items" className={clsx(arrow(canNext), "sm:ml-[5px]")}>
        <Chevron direction="right" />
      </button>
    </div>
  );
}

export default CarouselNavButtons;
