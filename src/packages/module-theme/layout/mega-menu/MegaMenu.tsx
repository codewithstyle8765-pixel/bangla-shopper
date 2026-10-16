"use client";

import { useEffect, useRef, useState } from "react";
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

const OFFERS_LINK = { label: "Sale Items", href: "/category/sale-items" };
const REWARD_LINK = { label: "Cash Back Reward Signup", href: "/customer/account/create" };
/** Customers already have the reward programme: send them to their points instead of the sign-up page. */
export const REWARDS_HREF = "/customer/account/rewards";

const href = (c: NavCategory) => `/category/${c.urlPath}`;
const count = (n?: number) => (n ?? 0).toLocaleString("en-US");
const fade = "transition-[opacity,visibility] duration-(--duration-panel) ease-(--ease-panel)";

function Chevron({ className }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AllCategories({ departments }: { departments: NavCategory[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = departments[active];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => !rootRef.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
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
        <div className="grid grid-cols-[15rem_1fr]">
          <ul className="max-h-[30rem] overflow-y-auto bg-brand-coral/8 py-2">
            {departments.map((d, i) => (
              <li key={d.urlPath}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseOver={() => setActive(i)}
                  className={clsx(
                    "flex w-full cursor-pointer items-center justify-between gap-2 px-5 py-2.5 text-left text-[14px] font-semibold transition-colors",
                    i === active ? "bg-white text-brand-coral" : "text-brand-charcoal hover:bg-white/60",
                  )}
                >
                  <span>{d.name}</span>
                  <span className="flex items-center gap-2">
                    {d.productCount !== undefined && <span className="text-[12px] font-bold tabular-nums text-footer-text">{count(d.productCount)}</span>}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {current && (
            <div className="max-h-[30rem] overflow-y-auto p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-[22px] font-bold leading-[1.2] text-brand-charcoal">{current.name}</h3>
                {current.children?.length ? (
                  <Link
                    href={href(current)}
                    onClick={() => setOpen(false)}
                    className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-bold text-brand-coral transition-colors hover:text-brand-coral-hover"
                  >
                    Shop all{current.productCount !== undefined ? ` ${count(current.productCount)}` : ""}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ) : null}
              </div>
              {current.children?.length ? (
                <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                  {current.children.map((column) => (
                    <div key={column.urlPath}>
                      <Link
                        href={href(column)}
                        onClick={() => setOpen(false)}
                        className="mb-2 block border-b-2 border-brand-coral/25 pb-2 text-[14px] font-bold text-brand-charcoal transition-colors hover:text-brand-coral"
                      >
                        {column.name}
                      </Link>
                      <ul className="space-y-1.5">
                        {column.children?.map((leaf) => (
                          <li key={leaf.urlPath}>
                            <Link href={href(leaf)} onClick={() => setOpen(false)} className="text-[14px] text-brand-charcoal/75 transition-colors hover:text-brand-coral">
                              {leaf.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {current.productCount !== undefined && (
                    <p className="mb-5 text-[15px] leading-[1.6] text-brand-charcoal/75">{count(current.productCount)} products in this department.</p>
                  )}
                  <Link
                    href={href(current)}
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 items-center rounded-lg bg-brand-coral px-6 text-[14px] font-bold text-white transition-colors hover:bg-brand-coral-hover"
                  >
                    Shop {current.name}
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MegaMenu({ categories }: { categories: NavCategory[] }) {
  const signedIn = Boolean(useCustomerName());
  return (
    <nav aria-label="Product categories" className="hidden border-b-2 border-brand-coral bg-white font-sans lg:block">
      <Container className="px-2 xl:px-4">
        <div className="flex min-w-0 items-stretch">
          <AllCategories departments={categories} />

          <ul className="no-scrollbar ml-1 flex min-w-0 items-stretch gap-0.5 overflow-x-auto">
            {categories.map((category) => (
              <li key={category.urlPath} className="shrink-0">
                <Link
                  href={href(category)}
                  className="flex h-12 items-center gap-1 whitespace-nowrap px-1 text-[11px] font-bold uppercase text-brand-charcoal transition-colors hover:text-brand-coral xl:px-2 xl:text-[13px] 2xl:text-[13.5px]"
                >
                  {category.name}
                  {category.children?.length ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true" className="shrink-0">
                      <path d="M1.5 3.2h7L5 7.4z" />
                    </svg>
                  ) : null}
                </Link>
              </li>
            ))}
            <li className="shrink-0">
              <Link
                href={OFFERS_LINK.href}
                className="flex h-12 items-center whitespace-nowrap px-1 text-[11px] font-bold uppercase text-brand-coral xl:px-2 xl:text-[13px] 2xl:text-[13.5px]"
              >
                {OFFERS_LINK.label}
              </Link>
            </li>
            <li className="shrink-0 2xl:hidden">
              <Link
                href={signedIn ? REWARDS_HREF : REWARD_LINK.href}
                prefetch={false}
                className="flex h-12 items-center whitespace-nowrap px-1 text-[11px] font-bold uppercase text-brand-coral transition-colors hover:text-brand-coral-hover hover:underline xl:px-2 xl:text-[13px]"
              >
                CASH BACK
              </Link>
            </li>
          </ul>

          <Link
            href={signedIn ? REWARDS_HREF : REWARD_LINK.href}
            prefetch={false}
            className="ml-auto hidden shrink-0 self-center whitespace-nowrap pl-3 text-[13px] font-extrabold uppercase text-brand-coral transition-colors hover:text-brand-coral-hover hover:underline 2xl:block"
          >
            {REWARD_LINK.label}
          </Link>
        </div>
      </Container>
    </nav>
  );
}

export default MegaMenu;
