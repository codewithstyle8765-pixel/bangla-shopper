"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Container } from "@/packages/module-common/Container";
import type { NavCategory } from "@/types/storefront";
import { useCustomerName } from "@/packages/module-customer/session";

/** Merchandising links (mobile drawer). */
export const PROMO_LINKS: Array<{ label: string; href: string; highlight?: boolean }> = [
  { label: "SALE ITEMS", href: "/category/sale-items" },
  { label: "OUTLET CENTER", href: "/category/outlet-center" },
  { label: "GIFT GUIDES", href: "/category/gift-guides" },
  { label: "CASH BACK REWARD SIGNUP", href: "/customer/account/create", highlight: true },
];

const REWARD_LINK = { label: "Cash Back Reward Signup", href: "/customer/account/create" };
/** Customers already have the reward programme: send them to their points instead of the sign-up page. */
export const REWARDS_HREF = "/customer/account/rewards";

const href = (c: NavCategory) => `/category/${c.urlPath}`;
const count = (n?: number) => (n ?? 0).toLocaleString("en-US");
const fade = "transition-[opacity,visibility] duration-(--duration-panel) ease-(--ease-panel)";
/** Links shown per sub-category column before "View all". */
const COLUMN_LIMIT = 8;
/** Top-bar items rendered before the bar is measured (server render). */
const INITIAL_VISIBLE = 6;
const topItem = "flex h-12 items-center gap-1 whitespace-nowrap px-1 text-[11px] font-bold uppercase transition-colors xl:px-2 xl:text-[13px] 2xl:text-[13.5px]";

function Chevron({ className }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Caret() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M1.5 3.2h7L5 7.4z" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M7.5 2.5 4 6l3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Closes on Escape and on a click outside `ref`. */
function useDismiss(open: boolean, ref: React.RefObject<HTMLElement | null>, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && close();
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open, ref, close]);
}

/** Hover opens after a short pause and closes with a grace delay, so passing the pointer over the bar does not flash panels. */
function useHoverOpen() {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const schedule = (value: boolean, ms: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(value), ms);
  };
  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);
  return {
    open,
    setOpen: (value: boolean) => {
      if (timer.current) clearTimeout(timer.current);
      setOpen(value);
    },
    hoverProps: { onMouseEnter: () => schedule(true, 120), onMouseLeave: () => schedule(false, 150) },
  };
}

/** Touch: the first tap on a link that has a panel opens the panel, the second tap follows the link. */
function useTouchFirstTap(isOpen: boolean, open: () => void) {
  const touch = useRef(false);
  return {
    onPointerDown: (e: PointerEvent) => (touch.current = e.pointerType === "touch"),
    onClickCapture: (e: React.MouseEvent) => {
      if (touch.current && !isOpen) {
        e.preventDefault();
        open();
      }
    },
  };
}

/**
 * Sub-categories as columns: each level-2 heading links to its category, level-3 links below it (first COLUMN_LIMIT,
 * then "View all"), level-4 links indented under their parent. A category whose children have no children of
 * their own (e.g. Top Brands) is shown as a plain multi-column list.
 */
function CategoryColumns({ category, columns, onNavigate }: { category: NavCategory; columns: number; onNavigate: () => void }) {
  const children = category.children ?? [];
  const flat = children.every((c) => !c.children?.length);
  const link = "text-[14px] text-brand-charcoal/75 transition-colors hover:text-brand-coral";

  if (flat) {
    const cols = Math.min(columns, Math.max(1, Math.ceil(children.length / COLUMN_LIMIT)));
    return (
      <ul className="gap-x-8 space-y-1.5" style={{ columnCount: cols }}>
        {children.map((c) => (
          <li key={c.urlPath} className="break-inside-avoid">
            <Link href={href(c)} onClick={onNavigate} className={link}>
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="grid gap-x-8 gap-y-6" style={{ gridTemplateColumns: `repeat(${Math.min(columns, children.length)}, minmax(0, 1fr))` }}>
      {children.map((column) => {
        const leaves = column.children ?? [];
        return (
          <div key={column.urlPath} className="min-w-0">
            <Link
              href={href(column)}
              onClick={onNavigate}
              className="mb-2 block border-b-2 border-brand-coral/25 pb-2 text-[14px] font-bold text-brand-charcoal transition-colors hover:text-brand-coral"
            >
              {column.name}
            </Link>
            <ul className="space-y-1.5">
              {leaves.slice(0, COLUMN_LIMIT).map((leaf) => (
                <li key={leaf.urlPath}>
                  <Link href={href(leaf)} onClick={onNavigate} className={link}>
                    {leaf.name}
                  </Link>
                  {leaf.children?.length ? (
                    <ul className="mt-1 space-y-1 border-l border-card-border pl-3">
                      {leaf.children.map((sub) => (
                        <li key={sub.urlPath}>
                          <Link href={href(sub)} onClick={onNavigate} className="text-[13px] text-brand-charcoal/65 transition-colors hover:text-brand-coral">
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
            {leaves.length > COLUMN_LIMIT && (
              <Link href={href(column)} onClick={onNavigate} className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold text-brand-coral hover:text-brand-coral-hover">
                View all ({leaves.length}) <ArrowRight />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Title row of a category panel with its "Shop all" link. */
function PanelHeading({ category, onNavigate }: { category: NavCategory; onNavigate: () => void }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h3 className="text-[22px] font-bold leading-[1.2] text-brand-charcoal">{category.name}</h3>
      <Link
        href={href(category)}
        onClick={onNavigate}
        className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-bold text-brand-coral transition-colors hover:text-brand-coral-hover"
      >
        Shop all{category.productCount !== undefined ? ` ${count(category.productCount)}` : ""}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}

/** Body of a department without sub-categories: product count and a button to it. */
function ShopDepartment({ category, onNavigate }: { category: NavCategory; onNavigate: () => void }) {
  return (
    <>
      {category.productCount !== undefined && (
        <p className="mb-5 text-[15px] leading-[1.6] text-brand-charcoal/75">{count(category.productCount)} products in this department.</p>
      )}
      <Link
        href={href(category)}
        onClick={onNavigate}
        className="inline-flex h-11 items-center rounded-lg bg-brand-coral px-6 text-[14px] font-bold text-white transition-colors hover:bg-brand-coral-hover"
      >
        Shop {category.name}
      </Link>
    </>
  );
}

/** Left list + right panel, used by "All Categories" and "More". Each department is a link; hovering it previews its sub-categories. */
function DepartmentBrowser({ departments, onNavigate }: { departments: NavCategory[]; onNavigate: () => void }) {
  const [active, setActive] = useState(0);
  const current = departments[Math.min(active, departments.length - 1)];
  const touch = useRef(false);

  return (
    <div className="grid grid-cols-[15rem_1fr]">
      <ul className="thin-scrollbar max-h-[30rem] overflow-y-auto bg-brand-coral/8 py-2">
        {departments.map((d, i) => (
          <li key={d.urlPath}>
            <Link
              href={href(d)}
              onMouseOver={() => setActive(i)}
              onFocus={() => setActive(i)}
              onPointerDown={(e) => (touch.current = e.pointerType === "touch")}
              onClick={(e) => {
                /* Touch: the first tap shows the sub-categories, a second tap opens the department. */
                if (touch.current && i !== active && d.children?.length) {
                  e.preventDefault();
                  setActive(i);
                  return;
                }
                onNavigate();
              }}
              className={clsx(
                "flex w-full items-center justify-between gap-2 px-5 py-2.5 text-left text-[14px] font-semibold transition-colors",
                i === active ? "bg-white text-brand-coral" : "text-brand-charcoal hover:bg-white/60",
              )}
            >
              <span>{d.name}</span>
              <span className="flex items-center gap-2">
                {d.productCount !== undefined && <span className="text-[12px] font-bold tabular-nums text-footer-text">{count(d.productCount)}</span>}
                <ArrowRight />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {current && (
        <div className="thin-scrollbar max-h-[30rem] overflow-y-auto p-6">
          <PanelHeading category={current} onNavigate={onNavigate} />
          {current.children?.length ? (
            <CategoryColumns category={current} columns={3} onNavigate={onNavigate} />
          ) : (
            <ShopDepartment category={current} onNavigate={onNavigate} />
          )}
        </div>
      )}
    </div>
  );
}

function AllCategories({ departments }: { departments: NavCategory[] }) {
  const { open, setOpen, hoverProps } = useHoverOpen();
  const rootRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), [setOpen]);
  useDismiss(open, rootRef, close);

  return (
    <div ref={rootRef} className="relative shrink-0" {...hoverProps}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="allcat-panel"
        className="flex h-12 cursor-pointer items-center gap-1.5 bg-brand-coral px-3 text-[13px] font-bold text-white transition-colors hover:bg-brand-coral-hover xl:gap-2.5 xl:px-5 xl:text-[14px]"
      >
        <svg width="17" height="17" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="shrink-0">
          <rect x="2" y="3.2" width="16" height="2.2" rx="1.1" />
          <rect x="2" y="8.9" width="16" height="2.2" rx="1.1" />
          <rect x="2" y="14.6" width="16" height="2.2" rx="1.1" />
        </svg>
        <span className="whitespace-nowrap">All Categories</span>
        <Chevron className={clsx("shrink-0 transition-transform duration-(--duration-panel)", open && "rotate-180")} />
      </button>

      <div
        id="allcat-panel"
        aria-hidden={!open}
        inert={!open}
        className={clsx(
          "absolute left-0 top-full z-50 w-[min(62rem,88vw)] overflow-hidden rounded-b-xl bg-white shadow-card",
          fade,
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <DepartmentBrowser departments={departments} onNavigate={close} />
      </div>
    </div>
  );
}

/** Dropdown panel under the bar, kept inside the bar's width (`bounds`). */
function BarPanel({ open, id, bounds, anchor, width, children }: { open: boolean; id: string; bounds: HTMLElement | null; anchor: React.RefObject<HTMLElement | null>; width: number; children: ReactNode }) {
  const [left, setLeft] = useState(0);
  useLayoutEffect(() => {
    if (!open || !bounds || !anchor.current) return;
    const b = bounds.getBoundingClientRect();
    const a = anchor.current.getBoundingClientRect();
    const w = Math.min(width, b.width);
    setLeft(Math.max(0, Math.min(a.left - b.left, b.width - w)));
  }, [open, bounds, anchor, width]);

  return (
    <div
      id={id}
      aria-hidden={!open}
      inert={!open}
      style={{ left, width: `min(${width}px, 100%)` }}
      className={clsx("absolute top-full z-50 overflow-hidden rounded-b-xl bg-white shadow-card", fade, open ? "visible opacity-100" : "invisible opacity-0")}
    >
      {children}
    </div>
  );
}

/** Panel width for a category: about 14rem per column, up to 4 columns. */
const panelWidth = (c: NavCategory) => {
  const children = c.children ?? [];
  const flat = children.every((x) => !x.children?.length);
  const cols = flat ? Math.min(4, Math.max(1, Math.ceil(children.length / COLUMN_LIMIT))) : Math.min(4, children.length);
  return Math.max(320, cols * 224 + 48);
};

/** One top-bar category; one with sub-categories opens its panel on hover, focus or a first tap. */
function TopCategory({ category, bounds }: { category: NavCategory; bounds: HTMLElement | null }) {
  const hasPanel = Boolean(category.children?.length);
  const { open, setOpen, hoverProps } = useHoverOpen();
  const ref = useRef<HTMLLIElement>(null);
  const close = useCallback(() => setOpen(false), [setOpen]);
  useDismiss(open, ref, close);
  const tap = useTouchFirstTap(open, () => setOpen(true));
  const id = `menu-${category.urlPath.replace(/\W+/g, "-")}`;

  return (
    <li
      ref={ref}
      className="shrink-0"
      {...(hasPanel ? hoverProps : {})}
      onFocus={hasPanel ? () => setOpen(true) : undefined}
      onBlur={hasPanel ? (e) => !ref.current?.contains(e.relatedTarget as Node) && close() : undefined}
    >
      <Link
        href={href(category)}
        onClick={close}
        {...(hasPanel ? { ...tap, "aria-expanded": open, "aria-controls": id } : {})}
        className={clsx(topItem, open ? "text-brand-coral" : "text-brand-charcoal hover:text-brand-coral")}
      >
        {category.name}
        {hasPanel ? <Caret /> : null}
      </Link>
      {hasPanel && (
        <BarPanel open={open} id={id} bounds={bounds} anchor={ref} width={panelWidth(category)}>
          <div className="thin-scrollbar max-h-[30rem] overflow-y-auto p-6">
            <PanelHeading category={category} onNavigate={close} />
            <CategoryColumns category={category} columns={4} onNavigate={close} />
          </div>
        </BarPanel>
      )}
    </li>
  );
}

/**
 * "More ▾": a compact list of the categories that do not fit in the bar. Hovering (or a first tap on) one with
 * sub-categories opens its columns in a fly-out beside the list.
 */
function MoreMenu({ categories }: { categories: NavCategory[] }) {
  const { open, setOpen, hoverProps } = useHoverOpen();
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLLIElement>(null);
  const touch = useRef(false);
  const close = useCallback(() => {
    setOpen(false);
    setActive(null);
  }, [setOpen]);
  useDismiss(open, ref, close);
  const current = active === null ? null : categories[active];
  const flyout = current?.children?.length ? current : null;

  return (
    <li ref={ref} className="relative shrink-0" {...hoverProps}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="menu-more"
        className={clsx(topItem, "cursor-pointer", open ? "text-brand-coral" : "text-brand-charcoal hover:text-brand-coral")}
      >
        More
        <Caret />
      </button>
      <div
        id="menu-more"
        aria-hidden={!open}
        inert={!open}
        onMouseLeave={() => setActive(null)}
        className={clsx(
          "absolute right-0 top-full z-50 w-64 rounded-b-xl bg-white py-2 shadow-card",
          /* Joined to the fly-out: the list's bottom-left corner goes square while it is open. */
          flyout && "rounded-bl-none",
          fade,
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <ul>
          {categories.map((c, i) => (
            <li key={c.urlPath}>
              <Link
                href={href(c)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onPointerDown={(e) => (touch.current = e.pointerType === "touch")}
                onClick={(e) => {
                  if (touch.current && active !== i && c.children?.length) {
                    e.preventDefault();
                    setActive(i);
                    return;
                  }
                  close();
                }}
                className={clsx(
                  "flex items-center gap-2 py-2 pl-3 pr-4 text-[14px] font-semibold transition-colors",
                  active === i ? "bg-brand-coral/8 text-brand-coral" : "text-brand-charcoal hover:bg-brand-coral/8 hover:text-brand-coral",
                )}
              >
                {/* The sub-categories open to the left, so the arrow points there. */}
                <span className="grid w-3 shrink-0 place-items-center">{c.children?.length ? <ArrowLeft /> : null}</span>
                <span className="min-w-0 truncate">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* At least as tall as the list, so moving left from any row lands inside it. */}
        {flyout && (
          <div
            className="thin-scrollbar absolute right-full top-0 max-h-[30rem] min-h-full overflow-y-auto rounded-bl-xl border-r border-card-border bg-white p-6 shadow-card"
            style={{ width: `min(${Math.min(panelWidth(flyout), 520)}px, calc(100vw - 20rem))` }}
          >
            <PanelHeading category={flyout} onNavigate={close} />
            <CategoryColumns category={flyout} columns={2} onNavigate={close} />
          </div>
        )}
      </div>
    </li>
  );
}

/**
 * How many categories fit: every item is measured once in a hidden row, then the bar's width decides how many
 * show; the rest go into "More". Re-runs whenever the bar resizes.
 */
function useFitCount(total: number, barRef: React.RefObject<HTMLElement | null>, measureRef: React.RefObject<HTMLElement | null>) {
  const [fit, setFit] = useState(Math.min(INITIAL_VISIBLE, total));
  useLayoutEffect(() => {
    const bar = barRef.current;
    const measure = measureRef.current;
    if (!bar || !measure) return;
    const update = () => {
      const widths = [...measure.children].map((el) => (el as HTMLElement).offsetWidth);
      const more = widths.pop() ?? 0;
      const available = bar.clientWidth;
      let used = 0;
      let n = 0;
      while (n < total && used + widths[n] + (n + 1 < total ? more : 0) <= available) used += widths[n++];
      setFit(n);
    };
    update();
    /* The bar resizes with the window; the hidden row changes width once the web font has loaded. */
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    observer.observe(measure);
    return () => observer.disconnect();
  }, [total, barRef, measureRef]);
  return fit;
}

export function MegaMenu({ categories }: { categories: NavCategory[] }) {
  const signedIn = Boolean(useCustomerName());
  const navRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLUListElement>(null);
  const [bounds, setBounds] = useState<HTMLElement | null>(null);
  const fit = useFitCount(categories.length, barRef, measureRef);
  const visible = categories.slice(0, fit);
  const hidden = categories.slice(fit);

  useEffect(() => setBounds(navRef.current), []);

  return (
    <nav aria-label="Product categories" className="hidden border-b-2 border-brand-coral bg-white font-sans lg:block">
      <Container className="px-2 xl:px-4">
        <div ref={navRef} className="relative flex min-w-0 items-stretch">
          <AllCategories departments={categories} />

          {/* Takes the space left between "All Categories" and the fixed links; measured to fit the categories. */}
          <div ref={barRef} className="ml-1 min-w-0 flex-1">
            <ul className="flex items-stretch gap-0.5">
              {visible.map((category) => (
                <TopCategory key={category.urlPath} category={category} bounds={bounds} />
              ))}
              {hidden.length > 0 && <MoreMenu categories={hidden} />}
            </ul>
            {/* Same items, invisible, so their widths can be measured. */}
            <ul ref={measureRef} aria-hidden="true" className="pointer-events-none invisible absolute left-0 top-0 flex h-0 w-max overflow-hidden">
              {categories.map((category) => (
                <li key={category.urlPath} className={clsx(topItem, "mr-0.5 shrink-0")}>
                  {category.name}
                  {category.children?.length ? <Caret /> : null}
                </li>
              ))}
              <li className={clsx(topItem, "mr-0.5 shrink-0")}>
                More
                <Caret />
              </li>
            </ul>
          </div>

          <ul className="flex shrink-0 items-stretch gap-0.5">
            <li className="shrink-0 2xl:hidden">
              <Link
                href={signedIn ? REWARDS_HREF : REWARD_LINK.href}
                prefetch={false}
                className={clsx(topItem, "text-brand-coral hover:text-brand-coral-hover hover:underline")}
              >
                CASH BACK
              </Link>
            </li>
          </ul>

          <Link
            href={signedIn ? REWARDS_HREF : REWARD_LINK.href}
            prefetch={false}
            className="hidden shrink-0 self-center whitespace-nowrap pl-3 text-[13px] font-extrabold uppercase text-brand-coral transition-colors hover:text-brand-coral-hover hover:underline 2xl:block"
          >
            {REWARD_LINK.label}
          </Link>
        </div>
      </Container>
    </nav>
  );
}

export default MegaMenu;
