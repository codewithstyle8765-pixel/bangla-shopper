"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Select } from "@/packages/module-common/form";

interface ListPagerProps {
  /** Page URL without query, e.g. "/customer/account/orders". */
  pathname: string;
  page: number;
  pageSize: number;
  /** Total rows; when unknown (some Magento lists only report pages) the summary shows "Page x of y". */
  total?: number;
  totalPages: number;
  /** Plural noun for the summary: "orders", "transactions"… */
  noun: string;
  sizes?: number[];
}

const href = (pathname: string, page: number, size: number) => `${pathname}?page=${page}&limit=${size}`;

/** Sizes worth offering: every size smaller than the list, plus the first one that shows it all. */
function usefulSizes(sizes: number[], total: number | undefined, current: number) {
  if (total === undefined) return sizes;
  const fitAll = sizes.find((s) => s >= total);
  const list = sizes.filter((s) => s < total || s === fitAll);
  return list.includes(current) ? list : [...list, current].sort((a, b) => a - b);
}

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === "prev" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
    </svg>
  );
}

/**
 * Footer for account lists: "Showing 1–5 of 8 transactions", rows per page and ‹ › page arrows.
 * State lives in the URL (?page&limit), so refresh and back/forward keep it.
 */
export function ListPager({ pathname, page, pageSize, total, totalPages, noun, sizes = [5, 10, 20, 50] }: ListPagerProps) {
  const router = useRouter();
  const options = usefulSizes(sizes, total, pageSize);
  /* Nothing to page through and nothing to resize. */
  if (totalPages <= 1 && options.length <= 1) {
    return total ? <p className="mt-4 border-t border-card-border pt-4 text-[13px] text-footer-text">{`Showing all ${total} ${noun}`}</p> : null;
  }

  const first = (page - 1) * pageSize + 1;
  const last = total === undefined ? page * pageSize : Math.min(total, page * pageSize);
  const summary = total === undefined ? `Page ${page} of ${totalPages}` : `Showing ${first}–${last} of ${total} ${noun}`;
  const arrowClass = "flex h-9 w-9 items-center justify-center rounded-[4px] border transition-colors";

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-card-border pt-4 text-[13px] text-footer-text sm:text-[14px]">
      <p aria-live="polite" className="font-medium text-brand-dark">
        {summary}
      </p>

      <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
        {options.length > 1 && (
          <div className="flex items-center gap-2">
            <span>Show</span>
            <div className="w-[72px]">
              <Select
                id={`${noun}-per-page`}
                aria-label={`${noun} per page`}
                options={options.map((s) => ({ value: String(s), label: String(s) }))}
                value={String(pageSize)}
                onChange={(size) => router.push(href(pathname, 1, Number(size)))}
                className="h-9"
              />
            </div>
            <span className="hidden min-[400px]:inline">per page</span>
          </div>
        )}

        {totalPages > 1 && (
          <nav aria-label={`${noun} pages`} className="flex items-center gap-2">
            {page > 1 ? (
              <Link href={href(pathname, page - 1, pageSize)} rel="prev" aria-label="Previous page" className={clsx(arrowClass, "border-card-border text-brand-dark hover:border-brand-dark")}>
                <Arrow direction="prev" />
              </Link>
            ) : (
              <span aria-disabled="true" className={clsx(arrowClass, "border-card-border text-price-strikethrough opacity-50")}>
                <Arrow direction="prev" />
              </span>
            )}
            <span className="min-w-[44px] text-center font-semibold tabular-nums text-brand-dark">
              {page} / {totalPages}
            </span>
            {page < totalPages ? (
              <Link href={href(pathname, page + 1, pageSize)} rel="next" aria-label="Next page" className={clsx(arrowClass, "border-brand-coral bg-brand-coral text-white hover:bg-brand-coral-hover")}>
                <Arrow direction="next" />
              </Link>
            ) : (
              <span aria-disabled="true" className={clsx(arrowClass, "border-card-border text-price-strikethrough opacity-50")}>
                <Arrow direction="next" />
              </span>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}

export default ListPager;
