"use client";

import { useRef, useState, type ReactNode } from "react";
import {
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
  /** Product the "Write a review" form submits for. */
  sku?: string;
  productName?: string;
  description?: ReactNode;
  /** Shown in the sticky strip / bottom bar once the summary's Add to Cart has scrolled away. */
  product: PdpBuyProduct;
}

/** Sample reviews until Magento `product.reviews` is wired. */
const SAMPLE_REVIEWS: ProductReviewData[] = [
  {
    id: "r1",
    author: "Anisha Rozen",
    verified: true,
    firstPurchase: "31/12/2021",
    totalPurchased: 5,
    rating: 5,
    title: "Excellent pigmentation with great fragrance!",
    date: "01/07/2022",
    time: "6:01:23 PM",
    sections: [
      {
        label: "Pros",
        text: "Absolutely New York Demi Matte Lipstick-এর কালার ভীষণ সুন্দর ও elegant। লিপে smooth ও comfortable feel দেয়, finish-টা matte হলেও অতিরিক্ত dry লাগে না। Long-lasting এবং everyday look-এর জন্য দারুণ! ❤️",
      },
      { label: "Value", text: "Value for money is absolutely spot on!" },
      { label: "Price", text: "Jusified....." },
    ],
    photos: [
      "/assets/images/pdp/layer_9.png",
      "/assets/images/pdp/layer_10.png",
    ],
    response: {
      before: "আপনার সুন্দর রিভিউয়ের জন্য অনেক ধন্যবাদ! ❤️",
      highlight: "Absolutely New York Demi Matte Lipstick",
      after:
        "আপনার পছন্দ হয়েছে জেনে আমরা সত্যিই আনন্দিত। আপনাদের ভালোবাসাই আমাদের আরও ভালো সেবা দিতে অনুপ্রাণিত করে। 💕",
    },
  },
  {
    id: "r2",
    author: "Faria Islam",
    verified: true,
    firstPurchase: "12/12/2021",
    totalPurchased: 1,
    rating: 5,
    title: "Excellent pigmentation with great fragrance!",
    date: "25/12/2022",
    time: "10:47:13 AM",
    sections: [
      {
        label: "Pros",
        text: "Absolutely New York Demi Matte Lipstick-এর শেডটা খুবই সুন্দর! 💄 লিপে সহজে apply হয়, texture creamy এবং finish-টা বেশ classy। অনেকক্ষণ সুন্দর থাকে, আর ঠোঁটও বেশি dry করে না। Overall, খুবই ভালো একটি lipstick! ❤️",
      },
      { label: "Value", text: "Value for money is absolutely spot on!" },
      { label: "Price", text: "Jusified....." },
    ],
    photos: [
      "/assets/images/pdp/layer_11.png",
      "/assets/images/pdp/layer_12.png",
    ],
    response: {
      before: "আপনার সুন্দর রিভিউয়ের জন্য অসংখ্য ধন্যবাদ! ❤️",
      highlight: "Absolutely New York Demi Matte Lipstick",
      after:
        "আপনার এতটা পছন্দ হয়েছে জেনে আমরা আনন্দিত। আপনার সন্তুষ্টিই আমাদের সবচেয়ে বড় অনুপ্রেরণা। আবারও আমাদের সঙ্গে থাকার জন্য ধন্যবাদ! 💕",
    },
  },
  {
    id: "r3",
    author: "Nusrat Jahan",
    verified: true,
    firstPurchase: "04/03/2022",
    totalPurchased: 3,
    rating: 4,
    title: "Lovely shade, lasts through lunch",
    date: "18/02/2023",
    time: "2:15:40 PM",
    sections: [
      { label: "Pros", text: "Rich colour in one swipe and it does not feel heavy. I reapply once after meals." },
      { label: "Value", text: "Good for the price." },
    ],
    photos: ["/assets/images/pdp/rectangle_10.png", "/assets/images/pdp/rectangle_10_copy.png"],
  },
  {
    id: "r4",
    author: "Tahmina Akter",
    verified: false,
    firstPurchase: "22/08/2022",
    totalPurchased: 1,
    rating: 5,
    title: "Authentic and quickly delivered",
    date: "02/05/2023",
    time: "11:08:02 AM",
    sections: [{ label: "Pros", text: "Original product, well packed and delivered in Dhaka the next day." }],
    photos: ["/assets/images/pdp/rectangle_10_copy_2.png", "/assets/images/pdp/rectangle_10_copy_3.png"],
  },
];

/** Sample specification and Q&A content until Magento attributes / Q&A are wired. */
const SPECS: Array<[string, string]> = [
  ["Brand", "Absolute New York"],
  ["Item Weight", "1.3 gm"],
  ["Finish", "Demi Matte"],
  ["Country of Origin", "China"],
  ["Shade", "Night Shade - MLSS60"],
  ["Formulation", "Slim Stick"],
  ["Skin Type", "All skin types"],
  ["Coverage", "Full"],
  ["Shelf Life", "36 months"],
  ["Net Quantity", "1 unit"],
];

const QUESTIONS = [
  {
    question: "Is this authentic?",
    answer: "Yes, all products on BanglaShoppers are 100% genuine and imported directly from the authorized brand distributors.",
  },
  {
    question: "How long does this lipstick stay on?",
    answer: "It offers a long-lasting wear of up to 6-8 hours with minimal touch-ups.",
  },
  {
    question: "Does it dry out the lips?",
    answer: "The demi-matte formula is enriched with moisturising oils, so it feels comfortable and does not crack through the day.",
  },
  {
    question: "Is it transfer-proof?",
    answer: "It is transfer-resistant once set. Blot lightly after applying for the best result.",
  },
  {
    question: "Can I return it if the shade does not suit me?",
    answer: "Unopened products can be returned within 7 days. Please see our return policy for details.",
  },
  {
    question: "When will it be delivered in Dhaka?",
    answer: "Orders inside Dhaka are usually delivered within 1-2 working days, outside Dhaka within 3-5 working days.",
  },
];

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

const RATING_BREAKDOWN = [
  { stars: 5, percentage: 66 },
  { stars: 4, percentage: 13 },
  { stars: 3, percentage: 6 },
  { stars: 2, percentage: 5 },
  { stars: 1, percentage: 10 },
] as const;

export function ProductTabs({
  className = "",
  reviewCount = 1045,
  sku = "",
  productName = "",
  description,
  product,
}: ProductTabsProps) {
  const sections = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specs" },
    { id: "reviews", label: `Reviews (${reviewCount.toLocaleString()})` },
    { id: "questions", label: `Q&A (${QUESTIONS.length})` },
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

  const [reviews, setReviews] = useState<ProductReviewData[]>(SAMPLE_REVIEWS);
  const [selectedDuration, setSelectedDuration] = useState<(typeof DURATIONS)[number][0]>("overall");
  const [verifiedBuyersOnly, setVerifiedBuyersOnly] = useState(true);
  const [withMediaOnly, setWithMediaOnly] = useState(false);
  const [guestResponses, setGuestResponses] = useState(false);
  const [brandResponses, setBrandResponses] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewSort, setReviewSort] = useState<ReviewSort>("helpful");
  const [appliedQuery, setAppliedQuery] = useState("");
  const visibleReviews = sortReviews(
    searchReviews(reviews, appliedQuery).filter(
      (r) => !withMediaOnly || r.photos.length > 0,
    ),
    reviewSort,
  );
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
  const reviewsCollapsible = !appliedQuery && !withMediaOnly && visibleReviews.length > REVIEWS_PREVIEW;
  const listedReviews = reviewsCollapsible && !allReviews ? visibleReviews.slice(0, REVIEWS_PREVIEW) : visibleReviews;

  const handleReviewSubmitted = (newReview: {
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
  };

  return (
    <div className={`w-full desk:w-[1291px] font-sans leading-none desk:ml-px ${className}`}>
      <PdpSectionNav sections={sections} product={product} />

      {section("description", "Description", <ReadMore variant="pill" collapsedHeight={420}>{description}</ReadMore>)}

      {section("specifications", "Specifications", <SpecsTable specs={SPECS} />)}

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
                    4.2
                  </span>
                  <span className="text-[16px] sm:text-[18px] font-bold text-brand-dark/50 ml-0.5">
                    /5
                  </span>
                </div>
                <div className="w-full mt-1.5 flex justify-center md:justify-start">
                  <RatingStars value={4.2} size={15} gap={3} />
                </div>
                <p className="w-full text-[13px] font-bold text-brand-ink mt-2 leading-none text-center md:text-left">
                  1,045 ratings
                </p>
                <p className="w-full text-[11px] text-brand-dark/70 mt-1 leading-none text-center md:text-left">
                  721 with reviews
                </p>
              </div>

              <div className="w-px self-stretch bg-muted-line/50 mx-3 sm:mx-6 shrink-0" />

              <div className="flex-1 min-w-0 md:flex-none md:w-[280px] min-[850px]:w-[310px] space-y-1.5 sm:space-y-2">
                {RATING_BREAKDOWN.map((item) => (
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
                      4.2
                    </span>
                    <span className="text-[18px] font-bold text-brand-dark/50 ml-0.5">
                      /5
                    </span>
                  </div>
                  <div className="mt-1">
                    <RatingStars value={4.2} size={15} gap={3} />
                  </div>
                  <p className="text-[13px] font-bold text-brand-ink mt-1 leading-none">
                    1,045 ratings
                  </p>
                  <p className="text-[11px] text-brand-dark/70 mt-1 leading-none">
                    721 with reviews
                  </p>
                </div>

                {/* 5 Star Progress Bars */}
                <div className="w-full space-y-2 pt-2 border-t border-muted-line/60">
                  {RATING_BREAKDOWN.map((item) => (
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

            {customerPhotos.length > 0 && (
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
            )}

            {customerPhotos.length > 0 && (
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
                  : "Showing 1-25 of 721 Reviews"}
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
              <p className="py-6 text-center text-[15px] text-brand-ink">
                No reviews mention “{appliedQuery}”.{" "}
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setAppliedQuery("");
                  }}
                  className="cursor-pointer font-semibold text-brand-coral underline-offset-2 hover:underline"
                >
                  Show all reviews
                </button>
              </p>
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

      {section("questions", "Questions & Answers", <QuestionsPanel questions={QUESTIONS} productName={productName} />)}

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
