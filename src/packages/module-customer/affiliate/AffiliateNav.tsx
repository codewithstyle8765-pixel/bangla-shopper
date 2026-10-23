"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { AFFILIATE_LINKS } from "./affiliateLinks";
import { AFFILIATE_ROOT } from "./AffiliateUi";

const backClass = "flex w-fit items-center gap-1.5 text-[14px] font-semibold text-brand-coral transition-colors hover:text-brand-coral-hover";

function BackArrow() {
  return (
    <svg viewBox="7.6 4 8.8 16" aria-hidden="true" className="h-4 w-[9px]" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

/**
 * lg+: the affiliate sidebar, with a way back to the account menu. Below lg the dashboard lists the sections as
 * tiles (AffiliateHub), so every other page only needs a link back, as on the other account pages.
 */
function AffiliateNavView({ group, pathname }: { group: string; pathname: string | null }) {
  const onDashboard = pathname === AFFILIATE_ROOT;
  const back = onDashboard ? { href: "/customer/account", label: "My Account" } : { href: AFFILIATE_ROOT, label: "Affiliate Dashboard" };

  return (
    <nav aria-label="Affiliate program" className="font-sans max-lg:-mb-2">
      {pathname !== null && (
        <Link href={back.href} className={clsx(backClass, "lg:hidden")}>
          <BackArrow />
          {back.label}
        </Link>
      )}

      <div className="hidden lg:block">
        <Link href="/customer/account" className={clsx(backClass, "mb-3")}>
          <BackArrow />
          Back to My Account
        </Link>
        <div className="mb-4 rounded-[6px] bg-brand-navy p-4 text-white">
          <p className="text-[12px] uppercase tracking-[0.1em] text-white/70">Affiliate Program</p>
          <p className="mt-0.5 flex items-center gap-2 text-[18px] font-bold">
            {group}
            <span className="text-[13px] font-medium text-white/70">group</span>
          </p>
        </div>
        <ul className="rounded-[6px] border border-card-border">
          {AFFILIATE_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="border-b border-card-border last:border-b-0">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "flex h-12 items-center gap-3 border-l-[3px] px-4 text-[14px] font-medium transition-colors",
                    active ? "border-brand-coral bg-brand-coral/5 font-semibold text-brand-coral" : "border-transparent text-brand-dark hover:text-brand-coral",
                  )}
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {link.icon}
                  </svg>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/banglashoppers-affiliate-program"
          className="mt-4 flex items-center justify-between rounded-[6px] bg-brand-surface px-4 py-3 text-[13px] font-semibold text-brand-dark ring-1 ring-card-border transition-colors hover:text-brand-coral"
        >
          How the program works
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}

function AffiliateNavForRoute({ group }: { group: string }) {
  return <AffiliateNavView group={group} pathname={usePathname()} />;
}

export function AffiliateNav({ group }: { group: string }) {
  return (
    <Suspense fallback={<AffiliateNavView group={group} pathname={null} />}>
      <AffiliateNavForRoute group={group} />
    </Suspense>
  );
}
