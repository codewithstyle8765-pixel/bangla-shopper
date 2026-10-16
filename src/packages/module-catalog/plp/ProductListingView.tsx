import Link from "next/link";
import clsx from "clsx";
import { usefulPageSizes } from "@/lib/config";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { ProductCard } from "@/packages/module-catalog/product/ProductCard";
import type { ProductListing } from "@/types/storefront";
import { createUrl, toURLSearchParams, type SearchParamsRecord } from "@/utils/url";
import { formatPriceRange } from "@/utils/format";
import { ListingLayout } from "./ListingLayout";
import { Pagination } from "./Pagination";
import { PerPageSelect } from "./PerPageSelect";
import { CategoryContent } from "./CategoryContent";
import { CategoryBanner } from "./CategoryBanner";

interface ProductListingViewProps {
  listing: ProductListing;
  pathname: string;
  searchParams: SearchParamsRecord;
  active: Record<string, string[]>;
  sort: string;
  pageSize: number;
  /** Category pages: title + description sit after the products and pagination (as on the client's store). */
  titleAtEnd?: boolean;
}

export function ProductListingView({ listing, pathname, searchParams, active, sort, pageSize, titleAtEnd = false }: ProductListingViewProps) {
  const from = listing.totalCount ? (listing.currentPage - 1) * pageSize + 1 : 0;
  const to = Math.min(listing.currentPage * pageSize, listing.totalCount);
  const rangeLabel = listing.totalCount
    ? `Showing ${from}–${to} of ${listing.totalCount} products`
    : "No products found";

  const labelFor = (code: string, value: string) => {
    const group = listing.filters.find((g) => g.code === code);
    const option = group?.options.find((o) => o.value === value);
    return { group: group?.label ?? code, option: group?.type === "range" ? formatPriceRange(value) : (option?.label ?? value) };
  };

  const removeHref = (code: string, value: string) => {
    const params = toURLSearchParams(searchParams);
    const rest = (active[code] ?? []).filter((v) => v !== value);
    if (rest.length) params.set(code, rest.join(","));
    else params.delete(code);
    params.delete("page");
    return createUrl(pathname, params);
  };

  const kept = new URLSearchParams();
  for (const key of ["q", "limit"]) if (typeof searchParams[key] === "string") kept.set(key, searchParams[key]);
  const clearHref = createUrl(pathname, kept);
  const showPerPage = usefulPageSizes(listing.totalCount, pageSize).length > 1;
  const chips = Object.entries(active).flatMap(([code, values]) => values.map((value) => ({ code, value })));

  const subcategoryChips = listing.subcategories.length > 0 && (
    <ul className="no-scrollbar -mx-(--gutter) mb-2 flex gap-2 overflow-x-auto px-(--gutter) lg:mx-0 lg:mb-5 lg:flex-wrap lg:justify-center lg:px-0">
      {listing.subcategories.map((sub) => (
        <li key={sub.urlPath} className="shrink-0">
          <Link
            href={`/category/${sub.urlPath}`}
            className="flex h-9 items-center rounded-full border border-card-border bg-white px-4 text-[13px] font-medium text-brand-dark transition-colors hover:border-brand-coral hover:text-brand-coral"
          >
            {sub.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {!titleAtEnd && <PageTitle description={listing.description} className="max-lg:mt-4 max-lg:mb-2">{listing.title}</PageTitle>}

      <ListingLayout
        filters={listing.filters}
        active={active}
        sortOptions={listing.sortOptions}
        sort={sort}
        totalCount={listing.totalCount}
        rangeLabel={rangeLabel}
        toolbarAfter={listing.subcategories.length > 0 || !titleAtEnd ? undefined : listing.banners.length > 0 ? "banner" : "line"}
        top={
          <>
            <CategoryBanner banners={listing.banners} title={listing.title} />
            {subcategoryChips}
          </>
        }
      >
        {chips.length > 0 && (
          <ul className="mb-4 flex flex-wrap gap-2" aria-label="Active filters">
            {chips.map(({ code, value }) => {
              const label = labelFor(code, value);
              return (
                <li key={`${code}-${value}`}>
                  <Link
                    href={removeHref(code, value)}
                    scroll={false}
                    className="flex h-8 items-center gap-1.5 rounded-full bg-brand-coral/10 pl-3 pr-2 text-[13px] text-brand-dark hover:bg-brand-coral/20"
                    aria-label={`Remove filter ${label.group}: ${label.option}`}
                  >
                    <span className="text-footer-text">{label.group}:</span>
                    <span className="font-medium">{code === "rating" ? `${label.option.replace(" & up", "")}★ & up` : label.option}</span>
                    <span aria-hidden="true" className="ml-0.5 text-[16px] leading-none text-brand-coral">
                      ×
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {listing.products.length > 0 ? (
          <ul className="grid grid-cols-2 gap-[11px] sm:grid-cols-3 xl:grid-cols-5 desk:grid-cols-[repeat(5,207px)] desk:justify-between desk:gap-x-0">
            {listing.products.map((product) => (
              <li key={product.id} className="flex min-w-0">
                <ProductCard {...product} layout="fluid" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center border border-dashed border-card-border px-4 py-16 text-center">
            <p className="text-[18px] font-bold text-brand-dark">No products match your selection</p>
            <p className="mt-1 text-[14px] text-footer-text">Try removing some filters or searching for something else.</p>
            <Link
              href={clearHref}
              className="mt-5 flex h-11 items-center rounded-[4px] bg-brand-coral px-6 text-[15px] font-semibold text-white hover:bg-brand-coral-hover"
            >
              Clear all filters
            </Link>
          </div>
        )}

        {(showPerPage || listing.totalPages > 1) && (
          <div className={clsx("mt-8 flex items-center gap-3", showPerPage && listing.totalPages > 1 ? "justify-between" : "justify-center")}>
            <Pagination pathname={pathname} searchParams={searchParams} currentPage={listing.currentPage} totalPages={listing.totalPages} />
            <PerPageSelect id="per-page" pageSize={pageSize} total={listing.totalCount} />
          </div>
        )}

        {titleAtEnd && <CategoryContent title={listing.title} html={listing.description} />}
      </ListingLayout>
    </>
  );
}

export default ProductListingView;
