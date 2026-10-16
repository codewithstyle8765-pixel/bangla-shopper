"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  EditNoteIcon,
  SearchIcon,
} from "@/packages/module-common/icons/UiIcons";
import { NextImage } from "@/packages/module-common/NextImage";
import { RatingStars } from "@/packages/module-common/RatingStars";
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

/** Desktop strip: photos in view at once; the arrows slide it one photo at a time. */
const STRIP_VISIBLE = 4;

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
  const stripMax = Math.max(0, customerPhotos.length - STRIP_VISIBLE);
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
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start gap-0">
            <div className="flex h-[35px] w-full shrink-0 select-none items-center gap-[2px] overflow-x-auto rounded-[10px] bg-muted-line p-[5px] no-scrollbar sm:w-fit">
              {DURATIONS.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedDuration(value)}
                  aria-pressed={selectedDuration === value}
                  className={`h-[25px] flex-1 shrink-0 cursor-pointer whitespace-nowrap rounded-[7.5px] px-[6px] text-center text-[13px] font-medium leading-[25px] transition-colors min-[390px]:text-[14px] sm:flex-none sm:px-[10px] ${
                    selectedDuration === value ? "bg-white text-brand-ink" : "text-brand-dark hover:text-black"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <p className="ml-0 lg:ml-[22px] lg:w-[181px] whitespace-nowrap text-[16px] font-bold text-brand-ink shrink-0 mt-[10px] lg:mt-0">
              Do you own this product?
            </p>

            <button
              type="button"
              onClick={() => setWritingReview(true)}
              aria-haspopup="dialog"
              className="ml-0 lg:ml-[11px] w-[164px] h-[35px] px-[7px] py-[6px] rounded-[10px] bg-star-filled flex items-center cursor-pointer shrink-0 mt-[6px] lg:mt-0 shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:bg-star-filled-hover hover:shadow-md active:scale-98"
            >
              <EditNoteIcon className="w-[23px] h-[22px] mr-[13px] shrink-0 self-start text-brand-black" />
              <span className="text-[16px] font-bold text-brand-ink leading-none">
                Write a review
              </span>
            </button>
          </div>

          <div className="flex flex-col xl:flex-row items-start justify-start gap-[7px] mt-[15px] mx-[3px]">
            <div className="w-[286px] shrink-0">
              <div className="flex items-start">
                <div className="w-[148px] mr-[5px] flex items-center gap-[10px]">
                  <RatingStars value={4} size={21} gap={10} />
                </div>
                <p className="w-[133px] text-[16px] font-bold text-brand-ink text-center mt-[2px]">
                  4.2 out of 5 stars
                </p>
              </div>

              <p className="mt-[12px] text-[14px] font-medium text-brand-ink">
                1,045 customer ratings, 721 with reviews
              </p>

              <div className="flex items-center gap-[7px] mt-[12px]">
                <RatingStars value={5} size={15} gap={7} />
                <div className="w-[137px] h-[15px] rounded-[7.5px] bg-muted-line overflow-hidden mt-[1px]">
                  <div className="w-[83px] h-[15px] rounded-[7.5px] bg-star-filled" />
                </div>
                <p className="text-[14px] font-medium text-brand-ink mt-[2px]">
                  66%
                </p>
              </div>

              <div className="flex items-center gap-[7px] mt-[10px]">
                <RatingStars value={4} size={15} gap={7} />
                <div className="w-[137px] h-[15px] rounded-[7.5px] bg-muted-line overflow-hidden mt-[1px]">
                  <div className="w-[22px] h-[15px] rounded-[7.5px] bg-star-filled" />
                </div>
                <p className="text-[14px] font-medium text-brand-ink mt-[2px]">
                  13%
                </p>
              </div>

              <div className="flex items-center mt-[9px] w-[286px]">
                <div className="flex items-center gap-[6px]">
                  <RatingStars value={3} size={15} gap={6} />
                </div>
                <div className="ml-[10px] w-[137px] h-[15px] rounded-[7.5px] bg-muted-line overflow-hidden mt-[1px]">
                  <div className="w-[11px] h-[15px] rounded-[5px] bg-star-filled" />
                </div>
                <p className="ml-auto text-[14px] font-medium text-brand-ink mt-[2px]">
                  6%
                </p>
              </div>

              <div className="flex items-center mt-[10px] w-[286px]">
                <div className="flex items-center gap-[6px]">
                  <RatingStars value={2} size={15} gap={6} />
                </div>
                <div className="ml-[10px] w-[137px] h-[15px] rounded-[7.5px] bg-muted-line overflow-hidden mt-[1px]">
                  <div className="w-[9px] h-[15px] rounded-[4px] bg-star-filled" />
                </div>
                <p className="ml-auto text-[14px] font-medium text-brand-ink mt-[2px]">
                  5%
                </p>
              </div>

              <div className="flex items-center gap-[7px] mt-[9px]">
                <RatingStars value={1} size={15} gap={7} />
                <div className="w-[137px] h-[15px] rounded-[7.5px] bg-muted-line overflow-hidden mt-[1px]">
                  <div className="w-[17px] h-[15px] rounded-[7.5px] bg-star-filled" />
                </div>
                <p className="text-[14px] font-medium text-brand-ink mt-[2px]">
                  10%
                </p>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="hidden xl:block w-[3px] h-[197px] shrink-0 bg-surface-soft"
            />

            {customerPhotos.length > 0 && (
              <div className="w-full xl:hidden mt-[15px]">
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
              <div className="hidden xl:block flex-1 min-w-0 max-w-[986px] mt-[2px]">
                <div className="flex items-center justify-between mb-[13px]">
                  <p className="text-[16px] font-bold text-brand-ink leading-none">Customer Images / Videos</p>
                  <ViewAllButton onClick={() => openPhotos(null)} count={customerPhotos.length} />
                </div>
                <div className="flex items-center gap-[12px]">
                  <StripArrow direction="left" disabled={stripStart === 0} onClick={() => stepStrip(-1)} />
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <ul
                      className="flex gap-[16px] transition-transform duration-500 ease-(--ease-panel) motion-reduce:transition-none"
                      style={{ transform: `translateX(calc(${-stripStart} * (100% + 16px) / ${STRIP_VISIBLE}))` }}
                    >
                      {customerPhotos.map((photo, i) => (
                        <li
                          key={`${photo.review.id}-${photo.src}`}
                          aria-hidden={i < stripStart || i >= stripStart + STRIP_VISIBLE}
                          className="shrink-0 basis-[calc((100%-48px)/4)]"
                        >
                          <StripPhoto photo={photo} onOpen={() => openPhotos(i)} tabIndex={i < stripStart || i >= stripStart + STRIP_VISIBLE ? -1 : 0} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <StripArrow direction="right" disabled={stripStart >= stripMax} onClick={() => stepStrip(1)} />
                </div>
              </div>
            )}
          </div>

          <div className="mt-[8px] grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-3 md:flex md:flex-wrap md:gap-[20px]">
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
                  className={`-mx-2 rounded-[8px] px-2 py-1 transition-colors duration-700 ${
                    highlightedReview === review.id ? "bg-brand-coral/6 ring-1 ring-brand-coral/30" : "ring-0"
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
