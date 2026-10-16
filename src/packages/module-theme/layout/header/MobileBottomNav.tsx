"use client";

import { Suspense, type ReactNode, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useCart } from "@/packages/module-quote/context/CartContext";
import { useCustomerName } from "@/packages/module-customer/session";

interface MobileBottomNavProps {
  onOpenCategories: () => void;
  categoriesOpen: boolean;
  /** Focus returns here when the categories drawer closes. */
  categoriesButtonRef: RefObject<HTMLButtonElement | null>;
}

const item = "flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-1 transition-colors";
const tone = (active: boolean) => (active ? "text-brand-coral" : "text-footer-text hover:text-brand-dark");

function Label({ children }: { children: ReactNode }) {
  return <span className="text-[11px] font-semibold leading-none">{children}</span>;
}

function Bar({ pathname, onOpenCategories, categoriesOpen, categoriesButtonRef }: MobileBottomNavProps & { pathname: string | null }) {
  const { openCart, totalCount, isCartOpen } = useCart();
  const customerName = useCustomerName(pathname);
  const onHome = pathname === "/";
  const onCategories = categoriesOpen || Boolean(pathname?.startsWith("/category"));
  const onCart = isCartOpen || pathname === "/cart";
  const onAccount = Boolean(pathname?.startsWith("/customer"));

  return (
    <nav
      aria-label="Primary"
      data-pin="hide"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-card-border bg-white pb-[env(safe-area-inset-bottom)] font-sans lg:hidden"
    >
      <ul className="grid grid-cols-4">
        <li>
          <Link href="/" aria-current={onHome ? "page" : undefined} className={clsx(item, tone(onHome))}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3.5 10.4 12 4l8.5 6.4V20a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <Label>Home</Label>
          </Link>
        </li>
        <li>
          <button
            ref={categoriesButtonRef}
            type="button"
            onClick={onOpenCategories}
            aria-expanded={categoriesOpen}
            aria-label="Browse categories"
            className={clsx(item, tone(onCategories))}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="3.5" width="7" height="7" stroke="currentColor" strokeWidth="1.6" />
              <rect x="13.5" y="3.5" width="7" height="7" stroke="currentColor" strokeWidth="1.6" />
              <rect x="3.5" y="13.5" width="7" height="7" stroke="currentColor" strokeWidth="1.6" />
              <rect x="13.5" y="13.5" width="7" height="7" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <Label>Categories</Label>
          </button>
        </li>
        <li>
          <Link
            href={customerName ? "/customer/account" : "/customer/account/login"}
            prefetch={false}
            aria-current={onAccount ? "page" : undefined}
            className={clsx(item, tone(onAccount))}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="6.6" r="3.3" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3.8 17c.6-3.3 3.1-5 6.2-5s5.6 1.7 6.2 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <Label>Account</Label>
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={openCart}
            aria-controls="cart-drawer"
            aria-expanded={isCartOpen}
            aria-label={`Open cart, ${totalCount} item${totalCount === 1 ? "" : "s"}`}
            className={clsx(item, "relative", tone(onCart))}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M2.5 3h2l1.9 9.4a1.3 1.3 0 0 0 1.3 1.05h6.6a1.3 1.3 0 0 0 1.28-1.03L17 6.2H5.3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8.4" cy="16.6" r="1.15" fill="currentColor" />
              <circle cx="14.4" cy="16.6" r="1.15" fill="currentColor" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute left-1/2 top-2 grid h-4 min-w-4 translate-x-1 place-items-center rounded-full bg-brand-coral px-1 text-[9px] font-bold leading-none text-white">
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
            <Label>Cart</Label>
          </button>
        </li>
      </ul>
    </nav>
  );
}

function BarForRoute(props: MobileBottomNavProps) {
  return <Bar {...props} pathname={usePathname()} />;
}

/** Phone / tablet app-style navigation (below lg). */
export function MobileBottomNav(props: MobileBottomNavProps) {
  return (
    <Suspense fallback={<Bar {...props} pathname={null} />}>
      <BarForRoute {...props} />
    </Suspense>
  );
}

export default MobileBottomNav;
