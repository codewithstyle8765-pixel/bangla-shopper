"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { VerifiedIcon } from "@/packages/module-common/icons/UiIcons";
import clsx from "clsx";
import { NextImage } from "@/packages/module-common/NextImage";
import { RatingStars } from "@/packages/module-common/RatingStars";
import { NotchArrow } from "@/packages/module-common/icons/Shapes";

/** Two lines of the 30px-leading response text. */
const COLLAPSED_HEIGHT = 60;

export interface ProductReviewData {
  id: string;
  author: string;
  verified: boolean;
  firstPurchase: string;
  totalPurchased: number;
  rating: number;
  title: string;
  date: string;
  time: string;
  /** e.g. Pros / Value / Price. */
  sections: Array<{ label: string; text: string }>;
  photos: string[];
  response?: { highlight?: string; before: string; after?: string };
}

export function ReviewItem({ review, onOpenPhoto }: { review: ProductReviewData; onOpenPhoto?: (src: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(true);
  const [fullHeight, setFullHeight] = useState(COLLAPSED_HEIGHT);
  const textRef = useRef<HTMLParagraphElement>(null);

  const toggle = () => {
    if (expanded) {
      setExpanded(false);
      /* No transitionend without animation. */
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setClamped(true);
      return;
    }
    setClamped(false);
    setExpanded(true);
  };

  /* Measure the unclamped text so the open height fits it exactly. */
  useLayoutEffect(() => {
    if (expanded && textRef.current) setFullHeight(textRef.current.scrollHeight);
  }, [expanded, clamped]);

  return (
    <article className="w-full">
      <div className="flex flex-col items-start md:flex-row">
        <div className="w-[180px] shrink-0 text-[14px] leading-[24px] text-brand-ink">
          <p className="text-[16px] font-bold">{review.author}</p>
          {review.verified && (
            <p className="flex items-center gap-[2px]">
              <VerifiedIcon className="ml-[2px] mt-[4px] h-[17px] w-[17px] self-start" />
              Verified Buyer
            </p>
          )}
          <p>
            First Purchase: <span className="font-medium">{review.firstPurchase}</span>
          </p>
          <p>
            Total Purchased: <span className="font-medium">{review.totalPurchased} Times</span>
          </p>
        </div>

        <div className="mt-3 w-full min-w-0 md:mt-[5px] md:ml-[44px] md:flex-1">
          {/* Stars and date share the first line; below lg the title gets its own full-width line. */}
          <div className="flex w-full items-center justify-between gap-3 pl-px">
            <div className="flex min-w-0 items-center gap-x-[14px]">
              <RatingStars value={review.rating} size={15} gap={6} />
              <h4 className="hidden text-[16px] font-bold leading-none text-brand-ink lg:block">{review.title}</h4>
            </div>
            <p className="shrink-0 text-right text-[13px] leading-none text-brand-ink sm:text-[14px] lg:mt-[2px]">
              {review.date}: <span className="font-medium">{review.time}</span>
            </p>
          </div>
          <h4 className="mt-[10px] pl-px text-[16px] font-bold leading-[1.3] text-brand-ink lg:hidden">{review.title}</h4>

          <dl className="mt-[9px] text-brand-ink">
            {review.sections.map((s) => (
              <div key={s.label}>
                <dt className="text-[16px] font-semibold leading-[24px]">{s.label}</dt>
                <dd className="text-[14px] leading-[24px]">{s.text}</dd>
              </div>
            ))}
          </dl>

          {review.photos.length > 0 && (
            <ul className="mt-[11px] flex gap-[15px]">
              {review.photos.map((src) => (
                <li key={src}>
                  <button type="button" onClick={() => onOpenPhoto?.(src)} disabled={!onOpenPhoto} aria-label={`View photo from ${review.author}`} className="block cursor-zoom-in overflow-hidden disabled:cursor-default">
                    <NextImage src={src} alt={`Photo from ${review.author}`} width={75} height={75} className="h-[75px] w-[75px] object-cover transition-transform duration-300 hover:scale-105" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {review.response && (
            <div className="mt-[15px] flex min-h-[105px] items-start bg-surface-soft p-[6px_10px_7px_11px] desk:mr-[7px]">
              <div className="min-w-0 flex-1">
                <p className="text-[16px] font-semibold leading-[28px] text-brand-ink">BanglaShoppers Response</p>
                {/* Height animates between two lines and the full text; the ellipsis returns once it has closed. */}
                <div
                  className="overflow-hidden transition-[max-height] duration-(--duration-panel) ease-(--ease-panel) motion-reduce:transition-none"
                  style={{ maxHeight: expanded ? fullHeight : COLLAPSED_HEIGHT }}
                  onTransitionEnd={() => !expanded && setClamped(true)}
                >
                  <p ref={textRef} className={clsx("text-[16px] leading-[30px] text-brand-ink", clamped && "line-clamp-2")}>
                    {review.response.before}{" "}
                    {review.response.highlight && <strong className="font-semibold">{review.response.highlight}</strong>}{" "}
                    {review.response.after}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggle}
                  aria-expanded={expanded}
                  className="relative z-10 mt-[8px] ml-auto flex cursor-pointer items-center gap-[6px] text-right text-[16px] font-bold leading-none text-brand-ink hover:text-brand-coral desk:-mt-[14px] desk:block"
                >
                  {expanded ? "Show less" : "Read more"}
                  <NotchArrow direction={expanded ? "up" : "down"} className="h-[12px] w-[14px] shrink-0 text-brand-dark desk:hidden" />
                </button>
              </div>
              <NotchArrow
                direction={expanded ? "up" : "down"}
                className="ml-[2px] mt-[75px] hidden h-[14px] w-[16px] shrink-0 text-brand-dark transition-transform desk:block"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ReviewItem;
