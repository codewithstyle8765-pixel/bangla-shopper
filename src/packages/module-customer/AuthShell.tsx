import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { NextImage } from "@/packages/module-common/NextImage";

const PERKS = ["Up to 5% Cash Back on every order", "100% authentic international brands", "Same-day delivery inside Dhaka"];
const MOBILE_PERKS = ["5% Cash Back", "100% Authentic", "Fast Delivery"];

const TABS = [
  { id: "login", label: "Sign In", href: "/customer/account/login" },
  { id: "register", label: "Create Account", href: "/customer/account/create" },
] as const;

interface AuthShellProps {
  title: string;
  /** Shows the Sign In / Create Account switch with this tab active. */
  tab?: "login" | "register";
  subtitle?: string;
  children: ReactNode;
}

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export function AuthShell({ title, tab, subtitle, children }: AuthShellProps) {
  return (
      <div className="mx-auto mt-2 grid max-w-[980px] overflow-hidden rounded-[8px] bg-white shadow-[0_2px_18px_rgba(0,0,0,0.08)] ring-1 ring-card-border lg:grid-cols-[460px_minmax(0,1fr)]">
        <div className="relative hidden min-h-[560px] overflow-hidden bg-brand-black lg:block">
          <div className="absolute inset-x-0 top-0 h-[560px] overflow-hidden">
            <NextImage
              src="/assets/images/pdp/primary_picture.png"
              alt=""
              fill
              sizes="460px"
              priority
              className="scale-[1.22] object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/35 to-brand-black/5" />
          </div>
          <div className="absolute inset-x-0 top-0 flex h-[560px] flex-col justify-end p-9 text-white">
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-coral">BanglaShoppers Cash Back Reward</p>
            <h2 className="mt-2 text-[32px] font-black uppercase leading-[1.1] tracking-[0.06em]">
              Your beauty,
              <br />
              rewarded.
            </h2>
            <ul className="mt-5 space-y-2.5">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-[14px]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-coral">
                    <Check className="h-3 w-3" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col">
          <ul className="flex items-center justify-center gap-x-4 gap-y-1 bg-brand-coral px-4 py-2.5 text-[12px] font-medium text-white lg:hidden">
            {MOBILE_PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-1">
                <Check className="h-3 w-3" />
                {perk}
              </li>
            ))}
          </ul>

          <div className="flex flex-1 flex-col px-5 py-7 sm:px-10 sm:py-10">
            {tab ? (
              <>
                <h1 className="sr-only">{title}</h1>
                <nav aria-label="Account access" className="mb-6 grid grid-cols-2 border-b border-card-border">
                  {TABS.map((t) => (
                    <Link
                      key={t.id}
                      href={t.href}
                      aria-current={tab === t.id ? "page" : undefined}
                      className={clsx(
                        "-mb-px border-b-[3px] pb-3 text-center text-[14px] font-black uppercase tracking-[0.1em] transition-colors sm:text-[16px]",
                        tab === t.id ? "border-brand-coral text-brand-dark" : "border-transparent text-price-strikethrough hover:text-brand-dark",
                      )}
                    >
                      {t.label}
                    </Link>
                  ))}
                </nav>
              </>
            ) : (
              <>
                <h1 className="text-[20px] font-black uppercase tracking-[0.1em] text-brand-dark">{title}</h1>
                <span aria-hidden="true" className="mb-4 mt-3 block h-[3px] w-[36px] bg-brand-coral" />
              </>
            )}
            {subtitle && <p className="mb-5 text-[14px] leading-[1.5] text-footer-text">{subtitle}</p>}
            {children}
          </div>
        </div>
      </div>
  );
}

export default AuthShell;
