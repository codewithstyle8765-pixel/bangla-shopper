"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { signOutCustomer } from "@/packages/module-customer/session";
import { callApi } from "@/utils/api/client";
import { formatTk } from "@/utils/format";
import { RewardCoin } from "@/packages/module-common/icons/RewardCoin";

const LINKS = [
  { href: "/customer/account", label: "My Account" },
  { href: "/customer/account/orders", label: "My Orders" },
  { href: "/customer/account/wishlist", label: "My Wishlist" },
];

const fade = "transition-[opacity,visibility,translate] duration-(--duration-panel) ease-(--ease-panel)";

/**
 * Signed-in header greeting with a "My Account" menu (hover or click): account links, reward points balance and
 * Sign Out. The balance loads the first time the menu opens.
 */
export function AccountMenu({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [rewards, setRewards] = useState<{ points: number; value: number } | null | "loading">(null);
  const [signingOut, setSigningOut] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    if (rewards === null) {
      setRewards("loading");
      void callApi("RewardSummary").then((r) => setRewards(r.ok && r.data ? r.data : null));
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => !rootRef.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open, rewards]);

  return (
    <div ref={rootRef} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span className="block truncate">Hello {name}!</span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="account-menu"
        className="flex cursor-pointer items-center gap-1 hover:text-brand-coral"
      >
        My Account
        <svg viewBox="0 0 12 12" aria-hidden="true" className={clsx("h-[10px] w-[10px] transition-transform duration-(--duration-panel)", open && "rotate-180")}>
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        id="account-menu"
        role="menu"
        aria-label="My account"
        inert={!open}
        className={clsx(
          "absolute right-0 top-full z-50 w-[264px] pt-2",
          fade,
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-[8px] bg-white text-left shadow-card ring-1 ring-black/5">
          <Link
            href="/customer/account/rewards"
            role="menuitem"
            prefetch={false}
            className="group flex items-center gap-3 bg-brand-coral/8 px-4 py-3 transition-colors hover:bg-brand-coral/12"
          >
            <RewardCoin className="h-9 w-9" />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-brand-coral">Reward Points</span>
              {rewards === "loading" || rewards === null ? (
                <span className="mt-1 block h-4 w-24 animate-pulse rounded bg-brand-coral/15" />
              ) : (
                <span className="block text-[15px] font-bold text-brand-dark">
                  {rewards.points.toLocaleString("en-US")} pts
                  <span className="ml-1.5 text-[12px] font-medium text-footer-text">worth {formatTk(rewards.value, false)}</span>
                </span>
              )}
            </span>
          </Link>

          <ul className="py-1.5">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  role="menuitem"
                  prefetch={false}
                  className="block px-4 py-2 text-[14px] text-brand-dark transition-colors hover:bg-brand-surface hover:text-brand-coral"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-card-border p-1.5">
            <button
              type="button"
              role="menuitem"
              disabled={signingOut}
              onClick={() => {
                setSigningOut(true);
                void signOutCustomer();
              }}
              className="w-full cursor-pointer rounded-[4px] px-2.5 py-2 text-left text-[14px] font-semibold text-brand-alert transition-colors hover:bg-brand-alert/8 disabled:cursor-wait disabled:opacity-60"
            >
              {signingOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountMenu;
