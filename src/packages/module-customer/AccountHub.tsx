import Link from "next/link";
import { ACCOUNT_LINKS, HUB_ORDER } from "./accountLinks";

const tiles = HUB_ORDER.map((href) => ACCOUNT_LINKS.find((l) => l.href === href)!);

/** Phones/tablets: every account section as a tile on the dashboard (the desktop sidebar covers lg+). */
export function AccountHub() {
  return (
    <nav aria-labelledby="account-hub-title" className="lg:hidden">
      <h2 id="account-hub-title" className="text-[15px] font-black uppercase tracking-[0.1em] text-brand-dark sm:text-[16px]">
        My Account
        <span aria-hidden="true" className="mt-1.5 block h-[2px] w-[30px] bg-brand-coral" />
      </h2>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {tiles.map((link) => (
          <li key={link.href} className="max-sm:[&:last-child:nth-child(odd)]:col-span-2">
            <Link
              href={link.href}
              className="flex h-full min-h-[60px] items-center gap-3 rounded-[6px] border border-card-border bg-white p-3 text-[14px] font-semibold leading-[1.3] text-brand-dark transition-colors hover:border-brand-coral hover:text-brand-coral"
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

export default AccountHub;
