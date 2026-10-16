"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Collapse } from "@/packages/module-common/Collapse";
import { NextImage } from "@/packages/module-common/NextImage";
import { RatingStars } from "@/packages/module-common/RatingStars";
import { ListPager } from "@/packages/module-common/ListPager";
import type { CustomerReview, CustomerReviewPage } from "@/types/storefront";
import { formatDate } from "@/utils/format";

function ReviewDetails({ review }: { review: CustomerReview }) {
  return (
    <div className="rounded-[6px] bg-brand-surface/60 p-4 text-[14px] leading-[1.55] text-brand-dark">
      <p className="font-semibold">{review.summary}</p>
      <p className="mt-1 whitespace-pre-line text-footer-text">{review.text}</p>
      {review.ratings.length > 0 && (
        <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {review.ratings.map((r) => (
            <div key={r.name} className="flex items-center gap-2">
              <dt className="text-[13px] font-semibold">{r.name}</dt>
              <dd>
                <RatingStars value={r.value} size={13} gap={3} />
              </dd>
            </div>
          ))}
        </dl>
      )}
      <Link href={`/product/${review.product.urlKey}#reviews`} className="mt-3 inline-block text-[13px] font-semibold text-brand-link hover:underline">
        View product
      </Link>
    </div>
  );
}

function DetailsToggle({ open, onClick, controls }: { open: boolean; onClick: () => void; controls: string }) {
  return (
    <button type="button" onClick={onClick} aria-expanded={open} aria-controls={controls} className="cursor-pointer whitespace-nowrap font-semibold text-brand-link hover:underline">
      {open ? "Hide Details" : "See Details"}
    </button>
  );
}

/** My Product Reviews: table on md+, cards on phones; "See Details" opens the full review in place. */
export function ProductReviewsList({ reviews }: { reviews: CustomerReviewPage }) {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const toggle = (i: number) => setOpenRow((cur) => (cur === i ? null : i));

  return (
    <>
      <table className="hidden w-full text-left text-[14px] md:table">
        <thead>
          <tr className="border-b-2 border-brand-dark text-[12px] uppercase tracking-[0.1em] text-brand-dark">
            <th className="py-2 pr-4 font-bold">Created</th>
            <th className="py-2 pr-4 font-bold">Product</th>
            <th className="py-2 pr-4 font-bold">Rating</th>
            <th className="py-2 pr-4 font-bold">Review</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {reviews.items.map((review, i) => (
            <Fragment key={`${review.product.urlKey}-${review.createdAt}`}>
              <tr className={clsx("border-t border-card-border first:border-t-0", openRow === i && "bg-brand-surface/30")}>
                <td className="whitespace-nowrap py-3 pr-4 text-footer-text">{formatDate(review.createdAt)}</td>
                <td className="py-3 pr-4">
                  <Link href={`/product/${review.product.urlKey}`} className="group flex items-center gap-3">
                    {review.product.image && (
                      <NextImage src={review.product.image} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-[4px] border border-card-border object-contain" />
                    )}
                    <span className="line-clamp-2 font-semibold text-brand-dark group-hover:text-brand-coral">{review.product.name}</span>
                  </Link>
                </td>
                <td className="py-3 pr-4">
                  <RatingStars value={review.rating} size={14} gap={3} />
                </td>
                <td className="max-w-[240px] py-3 pr-4 text-footer-text">
                  <span className="line-clamp-2">{review.summary}</span>
                </td>
                <td className="py-3 text-right">
                  <DetailsToggle open={openRow === i} onClick={() => toggle(i)} controls={`review-${i}`} />
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="p-0">
                  <Collapse open={openRow === i} id={`review-${i}`}>
                    <div className="pb-4">
                      <ReviewDetails review={review} />
                    </div>
                  </Collapse>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>

      <ul className="space-y-3 md:hidden">
        {reviews.items.map((review, i) => (
          <li key={`${review.product.urlKey}-${review.createdAt}`} className="rounded-[6px] border border-card-border p-4">
            <Link href={`/product/${review.product.urlKey}`} className="flex items-center gap-3">
              {review.product.image && (
                <NextImage src={review.product.image} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-[4px] border border-card-border object-contain" />
              )}
              <span className="line-clamp-2 text-[14px] font-semibold text-brand-dark">{review.product.name}</span>
            </Link>
            <div className="mt-3 flex items-center justify-between gap-3">
              <RatingStars value={review.rating} size={14} gap={3} />
              <span className="text-[13px] text-footer-text">{formatDate(review.createdAt)}</span>
            </div>
            <p className="mt-2 text-[14px] text-footer-text">{review.summary}</p>
            <div className="mt-2 text-[14px]">
              <DetailsToggle open={openRow === i} onClick={() => toggle(i)} controls={`review-m-${i}`} />
            </div>
            <Collapse open={openRow === i} id={`review-m-${i}`}>
              <div className="pt-3">
                <ReviewDetails review={review} />
              </div>
            </Collapse>
          </li>
        ))}
      </ul>

      <ListPager
        pathname="/customer/account/reviews"
        page={reviews.page}
        pageSize={reviews.pageSize}
        total={reviews.totalPages === 1 ? reviews.items.length : undefined}
        totalPages={reviews.totalPages}
        noun="reviews"
        sizes={[10, 20, 50]}
      />
    </>
  );
}

export default ProductReviewsList;
