"use client";

import { useState } from "react";
import clsx from "clsx";
import { Modal } from "@/packages/module-common/Modal";
import { NextImage } from "@/packages/module-common/NextImage";
import { RatingStars } from "@/packages/module-common/RatingStars";
import { VerifiedIcon } from "@/packages/module-common/icons/UiIcons";
import { GalleryLightbox } from "./GalleryLightbox";
import type { ProductReviewData } from "./ReviewItem";

export interface CustomerPhoto {
  src: string;
  review: ProductReviewData;
}

/** Every review photo, newest review order kept, each tied to the review it came from. */
export const customerPhotosOf = (reviews: ProductReviewData[]): CustomerPhoto[] =>
  reviews.flatMap((review) => review.photos.map((src) => ({ src, review })));

interface CustomerPhotosProps {
  photos: CustomerPhoto[];
  productName: string;
  /** "View All" grid. */
  gridOpen: boolean;
  onGridChange: (open: boolean) => void;
  /** Photo in the viewer: an index into the grid's filtered list when the grid is open, else into `photos`. */
  photo: number | null;
  onPhotoChange: (photo: number | null) => void;
  /** "Read full review": closes the gallery and shows that review in the list. */
  onReadReview: (reviewId: string) => void;
}

/**
 * "View All" customer photos: a grid filtered by stars. Any photo (grid, strip or inside a review) opens the same
 * full-screen viewer as the product gallery, with the same fade in and out; × closes only the viewer.
 */
export function CustomerPhotos({ photos, productName, gridOpen, onGridChange, photo, onPhotoChange, onReadReview }: CustomerPhotosProps) {
  const [stars, setStars] = useState<number | null>(null);
  const filtered = stars ? photos.filter((p) => p.review.rating === stars) : photos;
  const shown = gridOpen ? filtered : photos;
  const ratings = [...new Set(photos.map((p) => p.review.rating))].sort((a, b) => b - a);
  const current = photo !== null ? shown[photo] : undefined;
  /* While the viewer fades out it keeps the last photo and list, so closing never slides back to photo 1. */
  const listKey = shown.map((p) => `${p.review.id}:${p.src}`).join("|");
  const [last, setLast] = useState({ photo: photo ?? 0, list: shown, key: listKey });
  if (photo !== null && (photo !== last.photo || listKey !== last.key)) setLast({ photo, list: shown, key: listKey });
  const viewerList = photo !== null ? shown : last.list;

  const chip = (label: string, value: number | null, count: number) => (
    <button
      key={label}
      type="button"
      aria-pressed={stars === value}
      onClick={() => setStars(value)}
      className={clsx(
        "flex h-8 shrink-0 cursor-pointer items-center gap-1 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
        stars === value ? "border-brand-coral bg-brand-coral text-white" : "border-card-border bg-white text-brand-dark hover:border-brand-coral hover:text-brand-coral",
      )}
    >
      {label}
      <span className={stars === value ? "text-white/80" : "text-footer-text"}>({count})</span>
    </button>
  );

  return (
    <>
      <Modal open={gridOpen} onClose={() => onGridChange(false)} title={`Customer Photos (${photos.length})`} size="lg">
        <div className="no-scrollbar -mx-5 mb-4 flex gap-2 overflow-x-auto px-5">
          {chip("All", null, photos.length)}
          {ratings.map((r) => chip(`${r} ★`, r, photos.filter((p) => p.review.rating === r).length))}
        </div>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
          {filtered.map((p, i) => (
            <li key={`${p.review.id}-${p.src}`}>
              <button
                type="button"
                onClick={() => onPhotoChange(i)}
                aria-label={`Photo ${i + 1} from ${p.review.author}'s ${p.review.rating}-star review`}
                className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-[6px] bg-brand-surface"
              >
                <NextImage
                  src={p.src}
                  alt=""
                  width={200}
                  height={200}
                  sizes="(min-width: 640px) 180px, 33vw"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 rounded-full bg-brand-black/60 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
                  ★ {p.review.rating}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Modal>

      <GalleryLightbox
        open={current !== undefined}
        images={viewerList.map((p) => p.src)}
        index={photo ?? last.photo}
        productName={productName}
        onIndexChange={onPhotoChange}
        onBack={() => {
          if (!gridOpen) setStars(null);
          onGridChange(true);
          onPhotoChange(null);
        }}
        onClose={() => onPhotoChange(null)}
        caption={(i) => {
          const review = viewerList[i]?.review;
          if (!review) return null;
          return (
            <div className="rounded-[8px] bg-white/8 px-4 py-3 text-left text-white">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <RatingStars value={review.rating} size={13} gap={3} />
                <p className="text-[14px] font-semibold">{review.author}</p>
                {review.verified && (
                  <p className="flex items-center gap-1 text-[12px] text-white/75">
                    <VerifiedIcon className="h-3.5 w-3.5" />
                    Verified Buyer
                  </p>
                )}
                <p className="ml-auto text-[12px] text-white/60">{review.date}</p>
              </div>
              <p className="mt-1.5 text-[14px] font-semibold">{review.title}</p>
              {review.sections[0] && <p className="mt-0.5 line-clamp-2 text-[13px] leading-[1.5] text-white/80">{review.sections[0].text}</p>}
              <button
                type="button"
                onClick={() => onReadReview(review.id)}
                className="mt-1.5 cursor-pointer text-[13px] font-semibold text-brand-coral underline-offset-2 hover:underline"
              >
                Read full review →
              </button>
            </div>
          );
        }}
      />
    </>
  );
}

export default CustomerPhotos;
