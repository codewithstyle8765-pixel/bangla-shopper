"use client";

import { useEffect, useState, useTransition, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import type { FilterGroup, SortOption } from "@/types/storefront";
import { createUrl, toggleParamValue } from "@/utils/url";
import { FilterPanel } from "./FilterPanel";
import { ProductGridPlaceholder } from "./ProductListingSkeleton";
import { useScrollLock } from "@/packages/module-common/useScrollLock";
import { Select } from "@/packages/module-common/form/Select";

interface ListingLayoutProps {
  filters: FilterGroup[];
  active: Record<string, string[]>;
  sortOptions: SortOption[];
  sort: string;
  totalCount: number;
  rangeLabel: string;
  /** Shown at the top of the product column (sub-category chips), so it centres over the products. */
  top?: ReactNode;
  /** Phones/tablets: what sits right above the Filter/Sort row. Between a banner or the breadcrumb line and its own
      bottom line the row is centred (16px above and below); under chips or a title it keeps its compact spacing. */
  toolbarAfter?: "banner" | "line";
  children: ReactNode;
}

export function ListingLayout({ filters, active, sortOptions, sort, totalCount, rangeLabel, top, toolbarAfter, children }: ListingLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeCount = Object.values(active).reduce((acc, v) => acc + v.length, 0);

  const navigate = (params: URLSearchParams) =>
    startTransition(() => router.replace(createUrl(pathname, params), { scroll: false }));

  const onToggle = (code: string, value: string, single: boolean) =>
    navigate(toggleParamValue(new URLSearchParams(searchParams.toString()), code, value, single));

  const onSet = (code: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(code, value);
    else next.delete(code);
    next.delete("page");
    navigate(next);
  };

  const onSort = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value === "featured") next.delete("sort");
    else next.set("sort", value);
    next.delete("page");
    navigate(next);
  };

  const clearAll = () => {
    const next = new URLSearchParams();
    const q = searchParams.get("q");
    if (q) next.set("q", q);
    const s = searchParams.get("sort");
    if (s) next.set("sort", s);
    const limit = searchParams.get("limit");
    if (limit) next.set("limit", limit);
    navigate(next);
  };

  useScrollLock(drawerOpen);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const sortSelect = (id: string) => (
    <div className="flex items-center gap-2 text-[14px] text-brand-dark">
      <span id={`${id}-label`} className="hidden whitespace-nowrap font-medium sm:inline">
        Sort by:
      </span>
      <div className="w-full sm:w-[190px]">
        <Select id={id} value={sort} onChange={onSort} options={sortOptions} aria-label="Sort products" className="h-10" />
      </div>
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-5 desk:grid-cols-[200px_minmax(0,1fr)]">
      <aside aria-label="Product filters" className="hidden lg:block">
        <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto pr-1 no-scrollbar">
          <div className="mb-4 flex items-center justify-between border-b-2 border-brand-dark pb-2">
            <h2 className="text-[16px] font-black uppercase tracking-[0.1em] text-brand-dark">Filter by</h2>
            {activeCount > 0 && (
              <button type="button" onClick={clearAll} className="cursor-pointer text-[13px] font-medium text-brand-coral hover:underline">
                Clear all
              </button>
            )}
          </div>
          <FilterPanel filters={filters} active={active} onToggle={onToggle} onSet={onSet} idPrefix="desktop" />
        </div>
      </aside>

      <div className="min-w-0">
        {top}
        <div
          data-pin
          className={clsx(
            "sticky top-0 z-20 -mx-(--gutter) mb-2 flex items-center gap-2 border-b border-card-border bg-white px-(--gutter) py-2 lg:static lg:mx-0 lg:mb-4 lg:justify-between lg:border-b-0 lg:border-t-0 lg:bg-transparent lg:px-0 lg:py-0",
            toolbarAfter && "max-lg:pb-4",
            toolbarAfter === "banner" && "max-lg:pt-0",
          )}
        >
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[4px] border border-brand-coral bg-brand-coral text-[14px] font-semibold text-white transition-colors hover:border-brand-coral-hover hover:bg-brand-coral-hover sm:flex-none sm:px-5 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filter{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>
          <p className="hidden text-[14px] text-footer-text lg:block" aria-live="polite">
            {rangeLabel}
          </p>
          <div className="flex-1 sm:flex-none">{sortSelect("sort-select")}</div>
        </div>

        <p className="mb-4 text-[13px] text-footer-text lg:hidden" aria-live="polite">
          {rangeLabel}
        </p>

        <div aria-busy={isPending}>
          {isPending ? <ProductGridPlaceholder /> : children}
        </div>
      </div>

      <div className={clsx("fixed inset-0 z-50 transition-[visibility] duration-(--duration-panel) lg:hidden", drawerOpen ? "visible" : "invisible pointer-events-none")} aria-hidden={!drawerOpen}>
        <div
          onClick={() => setDrawerOpen(false)}
          className={clsx("absolute inset-0 bg-brand-black/50 transition-opacity duration-(--duration-panel)", drawerOpen ? "opacity-100" : "opacity-0")}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          className={clsx(
            "absolute inset-y-0 left-0 flex w-[88vw] max-w-[360px] flex-col bg-white font-sans shadow-2xl transition-transform duration-(--duration-panel) ease-(--ease-panel)",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-card-border px-4">
            <h2 className="text-[16px] font-black uppercase tracking-[0.1em] text-brand-dark">Filters</h2>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close filters"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-brand-dark hover:bg-brand-surface"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <FilterPanel filters={filters} active={active} onToggle={onToggle} onSet={onSet} idPrefix="mobile" />
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-card-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={clearAll}
              disabled={activeCount === 0}
              className="h-11 cursor-pointer rounded-[4px] border-2 border-brand-black text-[14px] font-semibold text-brand-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="h-11 cursor-pointer rounded-[4px] bg-brand-coral text-[14px] font-semibold text-white hover:bg-brand-coral-hover"
            >
              {isPending ? "Updating..." : `Show ${totalCount} results`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingLayout;
