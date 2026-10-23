import Link from "next/link";
import { AFFILIATE_LINKS } from "./affiliateLinks";

/** Phones/tablets: the affiliate sections as tiles on the affiliate dashboard (the sidebar covers lg+). */
export function AffiliateHub() {
  return (
    <nav aria-label="Affiliate sections" className="lg:hidden">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {AFFILIATE_LINKS.slice(1).map((link) => (
          <li key={link.href} className="max-sm:[&:last-child:nth-child(odd)]:col-span-2">
            <Link
              href={link.href}
              className="flex h-full min-h-[56px] items-center gap-3 rounded-[6px] border border-card-border bg-white p-3 text-[14px] font-semibold leading-[1.3] text-brand-dark transition-colors hover:border-brand-coral hover:text-brand-coral"
            >
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-coral/10 text-brand-coral">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  {link.icon}
                </svg>
              </span>
              <span className="min-w-0">{link.short ?? link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
