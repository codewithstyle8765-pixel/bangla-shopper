"use client";

import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { signOutCustomer } from "./session";
import { ACCOUNT_LINKS, backLinkFor, isDashboard } from "./accountLinks";

const linkClass = "flex items-center text-[14px] font-medium transition-colors";
const signOutClass = "w-full cursor-pointer text-left text-[14px] font-medium text-brand-alert";

/**
 * lg+: sidebar. Below lg the dashboard shows every section as tiles (AccountHub), so other pages only need a way
 * back, aligned with the page title.
 */
function AccountNavView({ name, pathname }: { name: ReactNode; pathname: string | null }) {
  const isActive = (href: string, exact?: boolean) => pathname !== null && (exact ? pathname === href : pathname.startsWith(href));
  const back = pathname && !isDashboard(pathname) ? backLinkFor(pathname) : null;

  return (
    <nav aria-label="My account" className={clsx("font-sans", back ? "max-lg:-mb-2" : "max-lg:hidden")}>
      {back && (
        <Link
          href={back.href}
          className="flex w-fit items-center gap-1.5 text-[14px] font-semibold text-brand-coral transition-colors hover:text-brand-coral-hover lg:hidden"
        >
          <svg viewBox="7.6 4 8.8 16" aria-hidden="true" className="h-4 w-[9px]" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 6-6 6 6 6" />
          </svg>
          {back.label}
        </Link>
      )}

      <div className="hidden lg:block">
        <div className="mb-4 rounded-[6px] bg-brand-navy p-4 text-white">
          <p className="text-[12px] uppercase tracking-[0.1em] text-white/70">Hello,</p>
          <p className="truncate text-[18px] font-bold">{name}</p>
        </div>
        <ul className="rounded-[6px] border border-card-border">
          {ACCOUNT_LINKS.map((link) => {
            const active = isActive(link.href, link.exact);
            return (
              <li key={link.href} className="border-b border-card-border">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    linkClass,
                    "h-12 border-l-[3px] px-4",
                    active ? "border-brand-coral bg-brand-coral/5 font-semibold text-brand-coral" : "border-transparent text-brand-dark hover:text-brand-coral",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button type="button" onClick={signOutCustomer} className={clsx(signOutClass, "h-12 border-l-[3px] border-transparent px-4")}>
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function AccountNavForRoute({ name }: { name: ReactNode }) {
  return <AccountNavView name={name} pathname={usePathname()} />;
}

/** `name` may be streamed (e.g. a Suspense-wrapped server component); the links render immediately. */
export function AccountNav({ name }: { name: ReactNode }) {
  return (
    <Suspense fallback={<AccountNavView name={name} pathname={null} />}>
      <AccountNavForRoute name={name} />
    </Suspense>
  );
}
