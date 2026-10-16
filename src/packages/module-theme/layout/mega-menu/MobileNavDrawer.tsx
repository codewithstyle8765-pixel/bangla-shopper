"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { MenuBars } from "@/packages/module-common/icons/Shapes";
import { CompactBrandLogo } from "@/packages/module-theme/layout/header/BrandLogo";
import type { NavCategory } from "@/types/storefront";
import { PROMO_LINKS, REWARDS_HREF } from "./MegaMenu";
import { useScrollLock } from "@/packages/module-common/useScrollLock";
import { Collapse } from "@/packages/module-common/Collapse";
import { signOutCustomer, useCustomerName } from "@/packages/module-customer/session";
import { callApi } from "@/utils/api/client";
import { formatTk } from "@/utils/format";
import { RewardCoin } from "@/packages/module-common/icons/RewardCoin";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: NavCategory[];
}

function CategoryItem({ category, onNavigate }: { category: NavCategory; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Boolean(category.children?.length);

  return (
    <li className="border-b border-card-border last:border-b-0">
      <div className="flex items-center">
        <Link
          href={`/category/${category.urlPath}`}
          onClick={onNavigate}
          className="flex-1 py-3 text-[14px] font-medium text-brand-dark hover:text-brand-coral"
        >
          {category.name}
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={`nav-${category.urlPath}`}
            aria-label={`${expanded ? "Collapse" : "Expand"} ${category.name}`}
            className="flex h-11 w-11 cursor-pointer items-center justify-center text-brand-dark"
          >
            <svg viewBox="0 0 24 24" className={clsx("h-4 w-4 transition-transform duration-(--duration-panel) ease-(--ease-panel)", expanded && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        )}
      </div>
      {hasChildren && (
        <Collapse open={expanded} id={`nav-${category.urlPath}`}>
          <ul className="mb-2 border-l-2 border-brand-coral pl-3">
            {category.children!.map((child) => (
              <li key={child.urlPath}>
                <Link
                  href={`/category/${child.urlPath}`}
                  onClick={onNavigate}
                  className="block py-2 text-[13px] text-brand-muted hover:text-brand-coral"
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        </Collapse>
      )}
    </li>
  );
}

export function MobileNavDrawer({ isOpen, onClose, categories }: MobileNavDrawerProps) {
  useScrollLock(isOpen);
  const customerName = useCustomerName(isOpen);
  const [rewards, setRewards] = useState<{ points: number; value: number } | null>(null);

  useEffect(() => {
    if (isOpen && customerName && !rewards) void callApi("RewardSummary").then((r) => r.ok && r.data && setRewards(r.data));
  }, [isOpen, customerName, rewards]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className={clsx("fixed inset-0 z-50 transition-[visibility] duration-(--duration-panel) lg:hidden", isOpen ? "visible" : "invisible pointer-events-none")} aria-hidden={!isOpen}>
      <div
        onClick={onClose}
        className={clsx("absolute inset-0 bg-brand-black/50 transition-opacity duration-(--duration-panel)", isOpen ? "opacity-100" : "opacity-0")}
      />

      <nav
        aria-label="Mobile navigation"
        className={clsx(
          "absolute inset-y-0 left-0 flex w-[85vw] max-w-[340px] flex-col bg-white font-sans shadow-2xl transition-transform duration-(--duration-panel) ease-(--ease-panel)",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-card-border px-4">
          <Link href="/" onClick={onClose} aria-label="BanglaShoppers home">
            <CompactBrandLogo priority={false} className="block h-auto w-[150px]" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-brand-dark hover:bg-brand-surface"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="flex items-center gap-2 bg-brand-coral px-4 py-2.5 text-[14px] font-bold tracking-[0.1em] text-white">
            <MenuBars className="h-[14px] w-[20px] text-white" />
            ALL CATEGORIES
          </div>
          <ul className="px-4">
            {categories.map((category) => (
              <CategoryItem key={category.urlPath} category={category} onNavigate={onClose} />
            ))}
          </ul>

          <ul className="mt-2 border-t-4 border-brand-surface px-4 py-2">
            {PROMO_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.highlight && customerName ? REWARDS_HREF : link.href}
                  prefetch={false}
                  onClick={onClose}
                  className={clsx(
                    "block py-2.5 text-[14px] font-bold tracking-[0.1em]",
                    link.highlight ? "text-brand-coral" : "text-brand-dark hover:text-brand-coral",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-1.5 border-t-4 border-brand-surface px-4 py-4 text-[13px] text-brand-muted">
            <p className="font-bold text-brand-dark">Need help?</p>
            <a href="mailto:support@banglashoppers.com" className="block hover:text-brand-coral">
              Email: support@banglashoppers.com
            </a>
            <p>Customer Support 24/7</p>
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-card-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {customerName ? (
            <>
              <div className="col-span-2 flex items-center justify-between gap-3 text-[13px] text-brand-muted">
                <p className="min-w-0 truncate">
                  Hello, <strong className="text-brand-dark">{customerName}</strong>!
                </p>
                {rewards && (
                  <Link href={REWARDS_HREF} prefetch={false} onClick={onClose} className="flex shrink-0 items-center gap-1.5 font-semibold text-brand-coral hover:underline">
                    <RewardCoin className="h-5 w-5" />
                    {rewards.points.toLocaleString("en-US")} pts · {formatTk(rewards.value, false)}
                  </Link>
                )}
              </div>
              <Link
                href="/customer/account"
                prefetch={false}
                onClick={onClose}
                className="flex h-11 items-center justify-center rounded-[4px] bg-brand-coral text-[14px] font-semibold text-white hover:bg-brand-coral-hover"
              >
                My Account
              </Link>
              <button
                type="button"
                onClick={signOutCustomer}
                className="flex h-11 cursor-pointer items-center justify-center rounded-[4px] border-2 border-brand-black text-[14px] font-semibold text-brand-black hover:bg-brand-black hover:text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/customer/account/login"
                prefetch={false}
                onClick={onClose}
                className="flex h-11 items-center justify-center rounded-[4px] bg-brand-coral text-[14px] font-semibold text-white hover:bg-brand-coral-hover"
              >
                Login
              </Link>
              <Link
                href="/customer/account/create"
                prefetch={false}
                onClick={onClose}
                className="flex h-11 items-center justify-center rounded-[4px] border-2 border-brand-black text-[14px] font-semibold text-brand-black hover:bg-brand-black hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default MobileNavDrawer;
