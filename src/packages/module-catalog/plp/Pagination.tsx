import Link from "next/link";
import clsx from "clsx";
import { createUrl, toURLSearchParams, type SearchParamsRecord } from "@/utils/url";
import { Chevron } from "@/packages/module-common/carousel/CarouselNavButtons";

interface PaginationProps {
  pathname: string;
  searchParams: SearchParamsRecord;
  currentPage: number;
  totalPages: number;
}

function pageWindow(current: number, total: number): Array<number | "gap"> {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? (["gap", p] as const) : [p]));
}

export function Pagination({ pathname, searchParams, currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const href = (page: number) => {
    const params = toURLSearchParams(searchParams);
    if (page === 1) params.delete("page");
    else params.set("page", String(page));
    return createUrl(pathname, params);
  };

  /* Phones: square chevron buttons like the product carousels; from sm: "‹ Prev" / "Next ›". */
  const arrow =
    "flex h-[41px] w-[41px] items-center justify-center rounded-[8px] border border-card-border bg-white text-[14px] font-medium sm:h-10 sm:w-auto sm:min-w-10 sm:rounded-[4px] sm:px-3";
  const label = (direction: "left" | "right") => (
    <>
      <span className="sm:hidden">
        <Chevron direction={direction} />
      </span>
      <span className="hidden sm:inline">{direction === "left" ? "‹ Prev" : "Next ›"}</span>
    </>
  );

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1.5 font-sans">
      {currentPage > 1 ? (
        <Link href={href(currentPage - 1)} rel="prev" aria-label="Previous page" className={clsx(arrow, "text-brand-black hover:bg-brand-surface sm:text-brand-dark sm:hover:border-brand-dark sm:hover:bg-white")}>
          {label("left")}
        </Link>
      ) : (
        <span className={clsx(arrow, "text-muted-line sm:text-price-strikethrough sm:opacity-50")} aria-disabled="true">
          {label("left")}
        </span>
      )}

      <span className="whitespace-nowrap px-1 text-[14px] font-medium tabular-nums text-brand-dark sm:hidden">
        {currentPage} / {totalPages}
      </span>

      {pageWindow(currentPage, totalPages).map((item, i) =>
        item === "gap" ? (
          <span key={`gap-${i}`} className="hidden px-1 text-footer-text sm:inline" aria-hidden="true">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={href(item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={clsx(
              "hidden h-10 min-w-10 items-center justify-center rounded-[4px] border text-[14px] font-semibold sm:flex",
              item === currentPage
                ? "border-brand-coral bg-brand-coral text-white"
                : "border-card-border text-brand-dark hover:border-brand-dark",
            )}
          >
            {item}
          </Link>
        ),
      )}

      {currentPage < totalPages ? (
        <Link href={href(currentPage + 1)} rel="next" aria-label="Next page" className={clsx(arrow, "text-brand-black hover:bg-brand-surface sm:text-brand-dark sm:hover:border-brand-dark sm:hover:bg-white")}>
          {label("right")}
        </Link>
      ) : (
        <span className={clsx(arrow, "text-muted-line sm:text-price-strikethrough sm:opacity-50")} aria-disabled="true">
          {label("right")}
        </span>
      )}
    </nav>
  );
}

export default Pagination;
