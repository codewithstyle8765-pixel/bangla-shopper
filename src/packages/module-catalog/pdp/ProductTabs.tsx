"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import {
  CameraIcon,
  EditNoteIcon,
  SearchIcon,
} from "@/packages/module-common/icons/UiIcons";
import { NextImage } from "@/packages/module-common/NextImage";
import { RatingStars, STAR_PATH } from "@/packages/module-common/RatingStars";
import { NotchArrow } from "@/packages/module-common/icons/Shapes";
import { Select } from "@/packages/module-common/form/Select";
import { ReadMore } from "@/packages/module-common/ReadMore";
import { ShowMoreButton, scrollBackTo } from "@/packages/module-common/ShowMoreButton";
import { ReviewItem, type ProductReviewData } from "./ReviewItem";
import { CustomerPhotos, customerPhotosOf, type CustomerPhoto } from "./CustomerPhotos";
import { WriteReviewDialog } from "./WriteReviewDialog";
import { SpecsTable } from "./SpecsTable";
import { QuestionsPanel } from "./QuestionsPanel";
import { TabHeading } from "./TabHeading";
import { PdpSectionNav, type PdpBuyProduct } from "./PdpSectionNav";
import type { ProductQuestion, ProductReview, ProductReviewSummary } from "@/types/storefront";

const REVIEW_SORTS = [
  { value: "helpful", label: "Most Helpful" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "highest", label: "Highest Rating" },
  { value: "lowest", label: "Lowest Rating" },
] as const;
type ReviewSort = (typeof REVIEW_SORTS)[number]["value"];

/** Review dates are dd/mm/yyyy. */
const reviewTime = (r: ProductReviewData) => {
  const [d, m, y] = r.date.split("/").map(Number);
  return new Date(y, m - 1, d).getTime();
};

/** Every keyword must appear in the title, text or reviewer name. */
function searchReviews(reviews: ProductReviewData[], query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return reviews;
  return reviews.filter((r) => {
    const haystack = [r.title, r.author, ...r.sections.map((s) => s.text)]
      .join(" ")
      .toLowerCase();
    return words.every((w) => haystack.includes(w));
  });
}

/** "Most Helpful" keeps the API order. */
function sortReviews(reviews: ProductReviewData[], sort: ReviewSort) {
  const list = [...reviews];
  if (sort === "newest") list.sort((a, b) => reviewTime(b) - reviewTime(a));
  if (sort === "oldest") list.sort((a, b) => reviewTime(a) - reviewTime(b));
  if (sort === "highest") list.sort((a, b) => b.rating - a.rating);
  if (sort === "lowest") list.sort((a, b) => a.rating - b.rating);
  return list;
}

export interface ProductTabsProps {
  className?: string;
  reviewCount?: number;
  /** Average rating out of 5. */
  rating?: number;
  reviews?: ProductReview[];
  reviewSummaries?: ProductReviewSummary[];
  specs?: Array<{ label: string; value: string }>;
  /** Answered questions for the Q&A tab. */
  questions?: ProductQuestion[];
  /** Product the "Write a review" form submits for. */
  sku?: string;
  productName?: string;
  description?: ReactNode;
  /** Shown in the sticky strip / bottom bar once the summary's Add to Cart has scrolled away. */
  product: PdpBuyProduct;
}

const ddmmyyyy = (at: Date) => `${String(at.getDate()).padStart(2, "0")}/${String(at.getMonth() + 1).padStart(2, "0")}/${at.getFullYear()}`;

/** Magento review → the review card's shape (dates dd/mm/yyyy; purchase details only for verified buyers). */
function toReviewData(r: ProductReview): ProductReviewData {
  const at = new Date(r.createdAt);
  const sections = [{ label: "Review", text: r.text }];
  if (r.pros) sections.push({ label: "Pros", text: r.pros });
  if (r.value) sections.push({ label: "Value", text: r.value });
  if (r.price) sections.push({ label: "Price", text: r.price });
  if (r.breakdown.length) sections.push({ label: "Ratings", text: r.breakdown.map((b) => `${b.name} ${b.value}/5`).join(" · ") });
  return {
    id: r.id,
    author: r.author,
    verified: r.verified,
    ...(r.verified && r.firstPurchaseAt && { firstPurchase: ddmmyyyy(new Date(r.firstPurchaseAt)) }),
    ...(r.verified && r.totalPurchased > 0 && { totalPurchased: r.totalPurchased }),
    rating: r.rating,
    title: r.title,
    date: ddmmyyyy(at),
    time: at.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true }),
    sections,
    photos: r.photos,
    ...(r.storeReply && { response: { before: r.storeReply } }),
  };
}

const REVIEWS_PREVIEW = 3;

function ViewAllButton({ onClick, count, className = "" }: { onClick: () => void; count: number; className?: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={`View all ${count} customer photos`} aria-haspopup="dialog" className={`group flex items-center gap-[2px] cursor-pointer ${className}`}>
      <span className="text-[16px] font-bold text-brand-ink underline-offset-[3px] group-hover:underline">View All</span>
      <NotchArrow direction="right" className="w-[14px] h-[16px] ml-[2px] text-brand-dark transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}




function StripArrow({ direction, disabled, onClick }: { direction: "left" | "right"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous customer images" : "Next customer images"}
      className="w-[20px] h-[88px] rounded-[4px] bg-surface-gray flex items-center justify-center shrink-0 cursor-pointer hover:bg-divider transition-[background-color,opacity] disabled:cursor-default disabled:opacity-40 disabled:hover:bg-surface-gray"
    >
      <NotchArrow direction={direction} className="w-[14px] h-[16px] text-brand-dark" />
    </button>
  );
}

function StripPhoto({ photo, onOpen, className = "w-full", tabIndex }: { photo: CustomerPhoto; onOpen: () => void; className?: string; tabIndex?: number }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      tabIndex={tabIndex}
      aria-label={`Customer photo from ${photo.review.author}'s review`}
      className={`block cursor-zoom-in overflow-hidden rounded-[16px] ${className}`}
    >
      <NextImage src={photo.src} alt="" width={218} height={180} className="aspect-[218/180] w-full object-cover transition-transform duration-300 hover:scale-105" />
    </button>
  );
}

const DURATIONS = [
  ["overall", "Overall"],
  ["30d", "Last 30 days"],
  ["60d", "Last 60 days"],
  ["12m", "Last 12 months"],
] as const;

const DURATION_DAYS: Record<(typeof DURATIONS)[number][0], number> = { overall: 0, "30d": 30, "60d": 60, "12m": 365 };

/** Share of reviews per star, 5 down to 1. */
const ratingBreakdown = (reviews: ProductReviewData[]) =>
  [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    percentage: reviews.length ? Math.round((reviews.filter((r) => r.rating === stars).length / reviews.length) * 100) : 0,
  }));

export function ProductTabs({
  className = "",
  reviewCount = 0,
  rating = 0,
  reviews: productReviews = [],
  reviewSummaries = [],
  specs = [],
  questions = [],
  sku = "",
  productName = "",
  description,
  product,
}: ProductTabsProps) {
  const sections = [
    { id: "description", label: "Description" },
    ...(specs.length ? [{ id: "specifications", label: "Specs" }] : []),
    { id: "reviews", label: `Reviews (${reviewCount.toLocaleString()})` },
    { id: "questions", label: `Q&A (${questions.length})` },
    { id: "disclaimer", label: "Disclaimer" },
  ];

  /** Every section stays on the page (indexable); the sticky strip above links to them. */
  const section = (id: string, title: string, panel: ReactNode) => (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-[var(--pdp-sticky-top,var(--sticky-header))] border-t border-card-border py-6 first-of-type:border-t-0 lg:py-8"
    >
      <TabHeading as="h2" id={`${id}-title`}>
        {title}
      </TabHeading>
      <div className="mt-4 lg:mt-5">{panel}</div>
    </section>
  );

  const [reviews, setReviews] = useState<ProductReviewData[]>(() => productReviews.map(toReviewData));
  const [selectedDuration, setSelectedDuration] = useState<(typeof DURATIONS)[number][0]>("overall");
  const [verifiedBuyersOnly, setVerifiedBuyersOnly] = useState(false);
  const [withMediaOnly, setWithMediaOnly] = useState(false);
  const [guestResponses, setGuestResponses] = useState(false);
  const [brandResponses, setBrandResponses] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewSort, setReviewSort] = useState<ReviewSort>("helpful");
  const [appliedQuery, setAppliedQuery] = useState("");
  const sinceDays = DURATION_DAYS[selectedDuration];
  const since = sinceDays ? Date.now() - sinceDays * 86_400_000 : 0;
  const visibleReviews = sortReviews(
    searchReviews(reviews, appliedQuery).filter(
      (r) =>
        (!verifiedBuyersOnly || r.verified) &&
        (!withMediaOnly || r.photos.length > 0) &&
        (!guestResponses || !r.verified) &&
        (!brandResponses || Boolean(r.response)) &&
        (!since || reviewTime(r) >= since),
    ),
    reviewSort,
  );

  const PERIOD_MAP: Record<(typeof DURATIONS)[number][0], string> = {
    overall: "ALL",
    "30d": "LAST_30_DAYS",
    "60d": "LAST_60_DAYS",
    "12m": "LAST_12_MONTHS",
  };
  const activeSummary = reviewSummaries.find((s) => s.period === PERIOD_MAP[selectedDuration]);
  const breakdown = activeSummary?.distribution?.length
    ? [5, 4, 3, 2, 1].map((stars) => {
        const item = activeSummary.distribution.find((d) => d.stars === stars);
        return { stars, percentage: item?.percent ?? 0 };
      })
    : ratingBreakdown(reviews);
  const average = activeSummary?.averageRating || rating || (reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0);
  const currentRatingCount = activeSummary?.ratingsCount || reviewCount;
  const ratingsLabel = `${currentRatingCount.toLocaleString()} rating${currentRatingCount === 1 ? "" : "s"}`;
  /* Customer photos: the strip pages through them, "View All" opens the grid, a photo opens the viewer. */
  const customerPhotos = customerPhotosOf(reviews);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [stripStart, setStripStart] = useState(0);
  const [highlightedReview, setHighlightedReview] = useState<string | null>(null);
  const stripMax = Math.max(0, customerPhotos.length - 3);
  /* A photo opens just the viewer (as the product gallery does); "View All" opens the grid. */
  const openPhotos = (index: number | null) => {
    if (index === null) setPhotosOpen(true);
    else setPhotoIndex(index);
  };
  const stepStrip = (step: number) => setStripStart((s) => Math.min(stripMax, Math.max(0, s + step)));
  const [writingReview, setWritingReview] = useState(false);
  const [allReviews, setAllReviews] = useState(false);
  const reviewListRef = useRef<HTMLDivElement>(null);
  /* Shows the whole list (the review may be past the preview), then scrolls to it once the dialogs have closed. */
  const readReview = (id: string) => {
    setPhotosOpen(false);
    setPhotoIndex(null);
    setAppliedQuery("");
    setSearchQuery("");
    setAllReviews(true);
    setHighlightedReview(id);
    window.setTimeout(() => document.getElementById(`review-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 350);
    window.setTimeout(() => setHighlightedReview((cur) => (cur === id ? null : cur)), 2600);
  };
  /* Filters and search show every match; the preview only trims the unfiltered list. */
  const reviewsCollapsible = !appliedQuery && !withMediaOnly && !since && visibleReviews.length > REVIEWS_PREVIEW;
  const listedReviews = reviewsCollapsible && !allReviews ? visibleReviews.slice(0, REVIEWS_PREVIEW) : visibleReviews;

  const handleReviewSubmitted = useCallback((newReview: {
    nickname: string;
    rating: number;
    summary: string;
    text: string;
    pros?: string;
    value?: string;
    price?: string;
    photos: string[];
  }) => {
    const sections: Array<{ label: string; text: string }> = [];
    if (newReview.pros) sections.push({ label: "Pros", text: newReview.pros });
    if (newReview.value) sections.push({ label: "Value", text: newReview.value });
    if (newReview.price) sections.push({ label: "Price", text: newReview.price });
    if (newReview.text) sections.push({ label: "Detailed Review", text: newReview.text });

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
    const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true });

    const created: ProductReviewData = {
      id: `r-${Date.now()}`,
      author: newReview.nickname,
      verified: true,
      firstPurchase: dateStr,
      totalPurchased: 1,
      rating: newReview.rating,
      title: newReview.summary,
      date: dateStr,
      time: timeStr,
      sections: sections.length > 0 ? sections : [{ label: "Detailed Review", text: newReview.text }],
      photos: newReview.photos,
    };

    setReviews((prev) => [created, ...prev]);
  }, []);

  return (
    <div className={`w-full desk:w-[1291px] font-sans leading-none desk:ml-px ${className}`}>
      <PdpSectionNav sections={sections} product={product} />

      {section("description", "Description", <ReadMore variant="pill" collapsedHeight={420}>{description}</ReadMore>)}

      {specs.length > 0 && section("specifications", "Specifications", <SpecsTable specs={specs.map((spec) => [spec.label, spec.value])} />)}

      {section(
        "reviews",
        "Ratings & Reviews",
        <div className="w-full bg-white">
          {/* Top duration bar + Call-to-action */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 lg:gap-4">
            <div className="flex h-[36px] w-full lg:w-fit shrink-0 select-none items-center gap-[3px] overflow-x-auto rounded-[10px] bg-muted-line p-[4px] no-scrollbar">
              {DURATIONS.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedDuration(value)}
                  aria-pressed={selectedDuration === value}
                  className={`h-[28px] flex-1 lg:flex-none shrink-0 cursor-pointer whitespace-nowrap rounded-[7.5px] px-[8px] sm:px-[12px] text-center text-[13px] sm:text-[14px] font-medium leading-[28px] transition-all ${selectedDuration === value
                    ? "bg-white text-brand-ink shadow-xs font-semibold"
                    : "text-brand-dark hover:text-black"
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <p className="whitespace-nowrap text-[15px] font-bold text-brand-ink">
                Do you own this product?
              </p>
              <button
                type="button"
                onClick={() => setWritingReview(true)}
                aria-haspopup="dialog"
                className="h-[36px] px-[14px] py-[6px] rounded-[10px] bg-star-filled flex items-center gap-[8px] cursor-pointer shrink-0 shadow-xs transition-all duration-200 hover:bg-star-filled-hover hover:shadow-sm active:scale-98"
              >
                <EditNoteIcon className="w-[20px] h-[20px] shrink-0 text-brand-black" />
                <span className="text-[15px] font-bold text-brand-ink leading-none">
                  Write a review
                </span>
              </button>
            </div>
          </div>

          <div className="lg:hidden mt-3.5 bg-white py-1">
            <div className="flex items-center justify-between sm:justify-start">
              <div className="flex flex-col items-center text-center md:items-start md:text-left shrink-0 min-w-[95px] sm:min-w-[110px]">
                <div className="w-full flex items-baseline justify-center md:justify-start">
                  <span className="text-[34px] sm:text-[38px] font-extrabold text-brand-ink leading-none tracking-tight">
                    {average.toFixed(1)}
                  </span>
                  <span className="text-[16px] sm:text-[18px] font-bold text-brand-dark/50 ml-0.5">
                    /5
                  </span>
                </div>
                <div className="w-full mt-1.5 flex justify-center md:justify-start">
                  <RatingStars value={average} size={15} gap={3} />
                </div>
                <p className="w-full text-[13px] font-bold text-brand-ink mt-2 leading-none text-center md:text-left">
                  {ratingsLabel}
                </p>
                <p className="w-full text-[11px] text-brand-dark/70 mt-1 leading-none text-center md:text-left">
                  {reviews.length.toLocaleString()} with reviews
                </p>
              </div>

              <div className="w-px self-stretch bg-muted-line/50 mx-3 sm:mx-6 shrink-0" />

              <div className="flex-1 min-w-0 md:flex-none md:w-[280px] min-[850px]:w-[310px] space-y-1.5 sm:space-y-2">
                {breakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-2 text-[12px] sm:text-[13px]">
                    <span className="w-4 shrink-0 font-medium text-brand-ink flex items-center gap-0.5">
                      {item.stars}
                      <svg viewBox="2.3 2.2 19.4 18.3" className="w-3 h-3 fill-star-filled inline-block shrink-0">
                        <path d={STAR_PATH} />
                      </svg>
                    </span>
                    <div className="flex-1 h-[7px] sm:h-[8px] bg-muted-line/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-star-filled rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="w-7 sm:w-8 shrink-0 text-right font-medium text-brand-dark text-[11px] sm:text-[12px]">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>

              <div className="hidden sm:flex ml-auto shrink-0 pl-3 sm:pl-4 flex-col items-end justify-center min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-end gap-x-3 gap-y-1.5">
                <p className="whitespace-nowrap text-[14px] font-bold text-brand-ink text-right">
                  Do you own this product?
                </p>
                <button
                  type="button"
                  onClick={() => setWritingReview(true)}
                  aria-haspopup="dialog"
                  className="h-[40px] md:h-[42px] px-4 md:px-5 rounded-[10px] bg-star-filled hover:bg-star-filled-hover flex items-center gap-2 font-bold text-[14px] text-brand-ink shadow-xs transition-all duration-200 active:scale-98 cursor-pointer shrink-0"
                >
                  <EditNoteIcon className="w-[19px] h-[19px] text-brand-black shrink-0" />
                  <span>Write a review</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setWritingReview(true)}
              aria-haspopup="dialog"
              className="mt-3.5 w-full h-[40px] rounded-[10px] bg-star-filled hover:bg-star-filled-hover flex items-center justify-center gap-2 font-bold text-[14px] text-brand-ink shadow-xs transition-all duration-200 active:scale-98 cursor-pointer sm:hidden"
            >
              <EditNoteIcon className="w-[18px] h-[18px] text-brand-black shrink-0" />
              <span>Write a review</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-start justify-start gap-[16px] lg:gap-[24px] mt-[16px]">
            {/* Desktop Rating Breakdown Section (lg & xl only) */}
            <div className="hidden lg:block w-[300px] xl:w-[320px] shrink-0 bg-white">
              <div className="flex flex-col items-start gap-2">
                {/* Score & Stars */}
                <div className="flex flex-col items-start w-full">
                  <div className="flex items-baseline">
                    <span className="text-[40px] font-extrabold text-brand-ink leading-none tracking-tight">
                      {average.toFixed(1)}
                    </span>
                    <span className="text-[18px] font-bold text-brand-dark/50 ml-0.5">
                      /5
                    </span>
                  </div>
                  <div className="mt-1">
                    <RatingStars value={average} size={15} gap={3} />
                  </div>
                  <p className="text-[13px] font-bold text-brand-ink mt-1 leading-none">
                    {ratingsLabel}
                  </p>
                  <p className="text-[11px] text-brand-dark/70 mt-1 leading-none">
                    {reviews.length.toLocaleString()} with reviews
                  </p>
                </div>

                {/* 5 Star Progress Bars */}
                <div className="w-full space-y-2 pt-2 border-t border-muted-line/60">
                  {breakdown.map((item) => (
                    <div key={item.stars} className="flex items-center gap-2 text-[13px]">
                      <span className="w-5 shrink-0 font-medium text-brand-ink flex items-center gap-0.5">
                        {item.stars}
                        <svg viewBox="2.3 2.2 19.4 18.3" className="w-3 h-3 fill-star-filled inline-block shrink-0">
                          <path d={STAR_PATH} />
                        </svg>
                      </span>
                      <div className="flex-1 h-[8px] bg-muted-line/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-star-filled rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="w-8 shrink-0 text-right font-medium text-brand-dark text-[12px]">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="hidden lg:block w-px self-stretch bg-muted-line/70 shrink-0"
            />

            {customerPhotos.length > 0 ? (
              <div className="w-full lg:hidden mt-[8px]">
                <div className="flex items-center justify-between mb-[13px] w-full">
                  <p className="text-[16px] font-bold text-brand-ink leading-none">
                    Customer Images / Videos
                  </p>
                  <ViewAllButton onClick={() => openPhotos(null)} count={customerPhotos.length} />
                </div>
                <div className="w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth no-scrollbar pb-2">
                  <div className="flex items-center gap-[12px] w-max">
                    {customerPhotos.map((photo, i) => (
                      <StripPhoto key={`${photo.review.id}-${photo.src}`} photo={photo} onOpen={() => openPhotos(i)} className="w-[160px] sm:w-[218px] shrink-0 snap-start" />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full lg:hidden mt-[12px]">
                <div className="flex items-center justify-between mb-[10px] w-full">
                  <p className="text-[15px] font-bold text-brand-ink leading-none">
                    Customer Images / Videos
                  </p>
                  <span className="flex items-center gap-[2px] text-[14px] font-bold text-muted-line select-none">
                    <span>View All</span>
                    <NotchArrow direction="right" className="w-[12px] h-[14px] ml-[2px] text-muted-line" />
                  </span>
                </div>
                <div className="w-full py-6 px-4 rounded-[8px] border border-card-border flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-coral/10 flex items-center justify-center text-brand-coral mb-2.5">
                    <CameraIcon className="w-6 h-6 text-brand-coral" />
                  </div>
                  <p className="text-[14px] font-bold text-brand-dark">
                    No customer images or videos yet
                  </p>
                  <p className="text-[12px] text-text-subtle mt-0.5">
                    Be the first to share your experience!
                  </p>
                </div>
              </div>
            )}

            {customerPhotos.length > 0 ? (
              <div className="hidden lg:block flex-1 min-w-0 max-w-[986px] mt-[2px] [--strip-vis:3] xl:[--strip-vis:4]">
                <div className="flex items-center justify-between mb-[13px]">
                  <p className="text-[16px] font-bold text-brand-ink leading-none">Customer Images / Videos</p>
                  <ViewAllButton onClick={() => openPhotos(null)} count={customerPhotos.length} />
                </div>
                <div className="flex items-center gap-[12px]">
                  <StripArrow direction="left" disabled={stripStart === 0} onClick={() => stepStrip(-1)} />
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <ul
                      className="flex gap-[16px] transition-transform duration-500 ease-(--ease-panel) motion-reduce:transition-none"
                      style={{ transform: `translateX(calc(${-stripStart} * (100% + 16px) / var(--strip-vis, 3)))` }}
                    >
                      {customerPhotos.map((photo, i) => (
                        <li
                          key={`${photo.review.id}-${photo.src}`}
                          aria-hidden={i < stripStart || i >= stripStart + 4}
                          className="shrink-0 basis-[calc((100%-32px)/3)] xl:basis-[calc((100%-48px)/4)]"
                        >
                          <StripPhoto photo={photo} onOpen={() => openPhotos(i)} tabIndex={i < stripStart || i >= stripStart + 4 ? -1 : 0} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <StripArrow direction="right" disabled={stripStart >= stripMax} onClick={() => stepStrip(1)} />
                </div>
              </div>
            ) : (
              <div className="hidden lg:block flex-1 min-w-0 max-w-[986px] mt-[2px]">
                <div className="flex items-center justify-between mb-[13px]">
                  <p className="text-[16px] font-bold text-brand-ink leading-none">Customer Images / Videos</p>
                  <span className="flex items-center gap-[2px] text-[16px] font-bold text-muted-line select-none">
                    <span>View All</span>
                    <NotchArrow direction="right" className="w-[14px] h-[16px] ml-[2px] text-muted-line" />
                  </span>
                </div>
                <div className="w-full h-[154px] rounded-[8px] border border-card-border flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-brand-coral/10 flex items-center justify-center text-brand-coral mb-2.5">
                    <CameraIcon className="w-6 h-6 text-brand-coral" />
                  </div>
                  <p className="text-[14px] sm:text-[15px] font-bold text-brand-dark leading-tight">
                    No customer images or videos yet
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-text-subtle mt-1 leading-tight">
                    Be the first to share your experience!
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-[16px] lg:mt-[28px] grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-3 md:flex md:flex-wrap md:gap-[20px]">
            <label className="flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={verifiedBuyersOnly}
                onChange={(e) => setVerifiedBuyersOnly(e.target.checked)}
                className="w-[16px] h-[16px] mr-[8px] shrink-0 border border-muted-line rounded-[2.5px] cursor-pointer accent-star-filled"
              />
              <span className="text-[14px] font-medium text-brand-ink">
                Verified Buyers
              </span>
            </label>

            <label className="flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={withMediaOnly}
                onChange={(e) => setWithMediaOnly(e.target.checked)}
                className="w-[16px] h-[16px] mr-[8px] shrink-0 border border-muted-line rounded-[2.5px] cursor-pointer accent-star-filled"
              />
              <span className="text-[14px] font-medium text-brand-ink">
                Review with images/videos
              </span>
            </label>

            <label className="flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={guestResponses}
                onChange={(e) => setGuestResponses(e.target.checked)}
                className="w-[16px] h-[16px] mr-[8px] shrink-0 border border-muted-line rounded-[2.5px] cursor-pointer accent-star-filled"
              />
              <span className="text-[14px] font-medium text-brand-ink">
                Guest Responses
              </span>
            </label>

            <label className="flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={brandResponses}
                onChange={(e) => setBrandResponses(e.target.checked)}
                className="w-[16px] h-[16px] mr-[8px] shrink-0 border border-muted-line rounded-[2.5px] cursor-pointer accent-star-filled"
              />
              <span className="text-[14px] font-medium text-brand-ink">
                BanglaShoppers Responses
              </span>
            </label>
          </div>

          <div className="w-full desk:w-[1291px] min-h-[70px] p-[10px] rounded-[8px] bg-surface-gray mt-[18px] flex flex-col md:flex-row items-center justify-between gap-3">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                setAppliedQuery(searchQuery.trim());
              }}
              className="w-full md:w-[395px] h-[50px] pl-[14px] pr-[8px] border border-muted-line rounded-[8px] bg-white flex items-center justify-between focus-within:border-brand-dark transition-colors"
            >
              <input
                type="search"
                placeholder="Keywords"
                aria-label="Search reviews"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value.trim()) setAppliedQuery("");
                }}
                className="w-full bg-transparent outline-none text-[16px] font-medium text-brand-ink placeholder-muted-line lg:text-[14px] [&::-webkit-search-cancel-button]:hidden"
              />
              {/* Inactive until there is something to search for. */}
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                aria-label="Search reviews"
                className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[6px] text-brand-dark transition-colors enabled:cursor-pointer enabled:hover:bg-brand-surface disabled:text-muted-line"
              >
                <SearchIcon className="w-[22px] h-[23px]" />
              </button>
            </form>

            <div className="flex w-full items-center justify-between gap-[8px] md:ml-auto md:w-auto md:justify-start">
              <p className="text-[14px] font-medium text-brand-ink">
                {appliedQuery
                  ? `${visibleReviews.length} result${visibleReviews.length === 1 ? "" : "s"} for “${appliedQuery}”`
                  : visibleReviews.length
                    ? `Showing 1-${visibleReviews.length} of ${Math.max(reviewCount, visibleReviews.length).toLocaleString()} Reviews`
                    : "No reviews yet"}
              </p>

              <div className="w-[166px] shrink-0">
                <Select
                  id="review-sort"
                  aria-label="Sort reviews"
                  options={REVIEW_SORTS}
                  value={reviewSort}
                  onChange={(v) => setReviewSort(v as ReviewSort)}
                  chevron={
                    <NotchArrow
                      direction="down"
                      className="w-[16px] h-[14px] mr-[1px] text-brand-dark"
                    />
                  }
                  className="h-[50px] rounded-[8px] border-muted-line pl-[20px] pr-[14px] text-[16px] font-medium [&>span:first-child]:text-brand-ink"
                />
              </div>
            </div>
          </div>

          <div id="review-list" ref={reviewListRef} className="mt-[23px]">
            {appliedQuery && visibleReviews.length === 0 && (
              <div className="py-8 px-4 text-center flex flex-col items-center justify-center">
                <p className="text-[15px] font-medium text-brand-dark">
                  No reviews mention “{appliedQuery}”.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setAppliedQuery("");
                  }}
                  className="mt-2.5 cursor-pointer text-[13px] font-semibold text-brand-coral underline-offset-2 hover:underline"
                >
                  Show all reviews
                </button>
              </div>
            )}
            {!appliedQuery && visibleReviews.length === 0 && (
              reviews.length === 0 ? (
                <div className="py-8 px-4 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-brand-coral/10 flex items-center justify-center text-brand-coral mb-3">
                    <EditNoteIcon className="w-6 h-6 text-brand-coral" />
                  </div>
                  <p className="text-[15px] sm:text-[16px] font-bold text-brand-dark">
                    No reviews yet
                  </p>
                  <p className="text-[13px] sm:text-[14px] text-text-subtle mt-1 max-w-[420px] leading-relaxed">
                    Be the first to review this product! Share your thoughts with other customers and help them make an informed choice.
                  </p>
                </div>
              ) : (
                <div className="py-8 px-4 text-center flex flex-col items-center justify-center">
                  <p className="text-[15px] font-medium text-brand-dark">
                    No reviews found in this period.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDuration("overall");
                      setWithMediaOnly(false);
                      setVerifiedBuyersOnly(false);
                    }}
                    className="mt-2.5 cursor-pointer text-[13px] font-semibold text-brand-coral underline-offset-2 hover:underline"
                  >
                    Show all reviews
                  </button>
                </div>
              )
            )}
            {listedReviews.map((review, i) => (
              <div key={review.id} id={`review-${review.id}`} className="scroll-mt-(--pdp-sticky-top,120px)">
                {i > 0 && (
                  <div className="divider-strong mb-[15px] mt-[20px] w-full" />
                )}
                <div
                  className={`-mx-2 rounded-[8px] px-2 py-1 transition-colors duration-700 ${highlightedReview === review.id ? "bg-brand-coral/6 ring-1 ring-brand-coral/30" : "ring-0"
                    }`}
                >
                  <ReviewItem review={review} onOpenPhoto={(src) => openPhotos(customerPhotos.findIndex((p) => p.review.id === review.id && p.src === src))} />
                </div>
              </div>
            ))}
          </div>
          {reviewsCollapsible && (
            <ShowMoreButton
              open={allReviews}
              onToggle={() => {
                if (allReviews) scrollBackTo(reviewListRef.current?.closest("section") ?? null);
                setAllReviews(!allReviews);
              }}
              more={`See all ${visibleReviews.length} reviews`}
              controls="review-list"
              className="mt-6"
            />
          )}
        </div>,
      )}

      {section("questions", "Questions & Answers", <QuestionsPanel questions={questions} productName={productName} sku={sku} />)}

      {section(
        "disclaimer",
        "Disclaimer",
        <p className="text-[15px] leading-relaxed text-neutral-600">
          Product packaging, specifications and color may change due to
          manufacturer updates. We strive to provide the most accurate
          representations possible. Actual product colors may vary slightly
          depending on monitor display settings.
        </p>,
      )}
      <CustomerPhotos
        photos={customerPhotos}
        productName={productName ?? ""}
        gridOpen={photosOpen}
        onGridChange={setPhotosOpen}
        photo={photoIndex}
        onPhotoChange={setPhotoIndex}
        onReadReview={readReview}
      />
      <WriteReviewDialog
        open={writingReview}
        onClose={() => setWritingReview(false)}
        sku={sku}
        productName={productName}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
}

export default ProductTabs;
