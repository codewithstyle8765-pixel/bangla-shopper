import Link from "next/link";
import clsx from "clsx";
import type { DownloadableItem, RewardPoints, RewardTierStatus } from "@/types/storefront";
import { formatDate, formatTk } from "@/utils/format";

import { ListPager } from "@/packages/module-common/ListPager";
import { RewardCoin } from "@/packages/module-common/icons/RewardCoin";
import { sanitizeHtml } from "@/utils/product-description";
import { NextImage } from "@/packages/module-common/NextImage";
import { TierProgress } from "./TierProgress";
import { AccountEmptyState, AccountIcons, AccountSection } from "./AccountUi";

const primaryButton = "inline-flex h-10 items-center rounded-[4px] bg-brand-coral px-5 text-[14px] font-semibold text-white hover:bg-brand-coral-hover";
const secondaryButton = "inline-flex h-10 items-center rounded-[4px] border-2 border-brand-black px-5 text-[14px] font-semibold text-brand-black hover:bg-brand-black hover:text-white";

/* ───────────── My Downloadable Products ───────────── */

export function DownloadsTable({ items }: { items: DownloadableItem[] }) {
  if (items.length === 0) {
    return (
      <AccountEmptyState
        icon={AccountIcons.download}
        title="No downloadable products yet"
        action={
          <>
            <Link href="/" className={primaryButton}>
              Browse Products
            </Link>
            <Link href="/customer/account/orders" className={secondaryButton}>
              View My Orders
            </Link>
          </>
        }
      >
        Digital products you buy, like e-books, beauty guides and gift cards, will appear here with their download links once your order is complete.
      </AccountEmptyState>
    );
  }

  const link = (d: DownloadableItem) =>
    d.status === "available" ? (
      <a href={d.downloadUrl} className="font-semibold text-brand-link hover:underline">
        Download
      </a>
    ) : (
      <span className="capitalize text-footer-text">{d.status}</span>
    );

  return (
    <>
      <table className="hidden w-full text-left text-[14px] md:table">
        <thead>
          <tr className="border-b-2 border-brand-dark text-[12px] uppercase tracking-[0.1em] text-brand-dark">
            <th className="py-2 font-bold">Order #</th>
            <th className="py-2 font-bold">Date</th>
            <th className="py-2 font-bold">Downloads left</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody className="divide-y divide-card-border">
          {items.map((d) => (
            <tr key={`${d.orderNumber}-${d.downloadUrl}`}>
              <td className="py-3">
                <Link href={`/customer/account/orders/${d.orderNumber}`} className="font-semibold text-brand-dark hover:text-brand-coral">
                  #{d.orderNumber}
                </Link>
              </td>
              <td className="py-3 text-footer-text">{formatDate(d.date)}</td>
              <td className="py-3 text-footer-text">{d.remainingDownloads}</td>
              <td className="py-3 text-right">{link(d)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="space-y-3 md:hidden">
        {items.map((d) => (
          <li key={`${d.orderNumber}-${d.downloadUrl}`} className="rounded-[6px] border border-card-border p-4 text-[14px]">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-brand-dark">#{d.orderNumber}</span>
              {link(d)}
            </div>
            <p className="mt-1 text-[13px] text-footer-text">
              {formatDate(d.date)} · {d.remainingDownloads} downloads left
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ───────────── My Reward Points ───────────── */

const EARN_WAYS = [
  { title: "Shop", text: "Earn 1% Cash Back on every order you place." },
  { title: "Pre-pay", text: "Get up to 5% Cash Back when you pay online at checkout." },
  { title: "Review", text: "Write a product review after your order arrives." },
];

const points = (n: number) => n.toLocaleString("en-US");

/** Points from orders that are not complete yet; they move to the balance once the order is delivered. */
function PendingRewards({ pending }: { pending: RewardTierStatus["pending"] }) {
  return (
    <AccountSection title="Pending Transactions">
      <p className="-mt-2 mb-3 text-[13px] text-footer-text">Points from these orders are added to your balance once the order is delivered.</p>
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b-2 border-brand-dark text-[12px] uppercase tracking-[0.1em] text-brand-dark">
            <th className="py-2 font-bold">Order</th>
            <th className="py-2 text-right font-bold">Points</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-card-border">
          {pending.map((p) => (
            <tr key={p.id}>
              <td className="py-3 text-brand-dark">{p.label}</td>
              <td className="py-3 text-right font-bold text-success">+{points(p.points)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AccountSection>
  );
}

interface RewardsPager {
  page: number;
  pageSize: number;
  totalPages: number;
  sizes: number[];
}

export function RewardPointsView({ rewards, tier, pager }: { rewards: RewardPoints; tier: RewardTierStatus; pager: RewardsPager }) {
  const rows = rewards.history.slice((pager.page - 1) * pager.pageSize, pager.page * pager.pageSize);
  return (
    <div className="space-y-5">
      {tier.tiers.length > 0 && (
        <TierProgress
          status={{ ...tier, tiers: tier.tiers.map((t) => ({ ...t, description: t.description && sanitizeHtml(t.description) })) }}
          earned={rewards.earned}
        />
      )}
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[10px] bg-gradient-to-br from-brand-charcoal via-brand-charcoal to-brand-black p-5 text-white shadow-card sm:p-6">
          <span aria-hidden="true" className="absolute -right-12 -top-14 h-44 w-44 rounded-full bg-brand-coral/25 blur-[2px]" />
          <span aria-hidden="true" className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/5" />
          <span aria-hidden="true" className="absolute right-16 top-20 h-16 w-16 rounded-full border border-white/10 max-sm:hidden" />

          <div className="relative flex flex-wrap items-center justify-between gap-2">
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-coral">Cash Back Reward balance</p>
            {tier.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 py-1 pl-1 pr-3 text-[12px] font-semibold text-white/90 ring-1 ring-white/15">
                {tier.current.logo && <NextImage src={tier.current.logo} alt="" width={40} height={40} className="h-5 w-5 rounded-full object-contain" />}
                {tier.current.name}
              </span>
            )}
          </div>

          <p className="relative mt-4 flex items-center gap-3 sm:mt-5">
            <RewardCoin className="h-11 w-11 shrink-0 drop-shadow sm:h-14 sm:w-14" />
            <span className="text-[40px] font-black leading-none tracking-tight tabular-nums sm:text-[48px]">{points(rewards.balance)}</span>
            <span className="self-end pb-1 text-[15px] font-semibold text-white/70 sm:text-[16px]">points</span>
          </p>

          <p className="relative mt-4 inline-flex w-fit flex-wrap items-baseline gap-x-1.5 rounded-[6px] bg-white/10 px-3 py-2 text-[14px] text-white/85 sm:text-[15px]">
            Worth <span className="text-[16px] font-bold text-white sm:text-[17px]">{formatTk(rewards.balanceValue)}</span> on your next order
          </p>

          <div className="relative mt-auto flex flex-col gap-3 border-t border-white/10 pt-4 max-sm:mt-5 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-[12px] text-white/65 sm:text-[13px]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-coral" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="13" rx="2" />
                <path d="M3 10h18M7 15h4" />
              </svg>
              Redeem points in the payment step at checkout.
            </p>
            <Link
              href="/"
              className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-[4px] bg-brand-coral px-5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-coral-hover max-sm:w-full"
            >
              Start Shopping
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded-[8px] border border-card-border p-4 text-center md:max-xl:px-2">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-footer-text md:max-xl:tracking-[0.04em]">Total earned</p>
            <p className="mt-2 text-[24px] font-black text-success">+{points(rewards.earned)}</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-[8px] border border-card-border p-4 text-center md:max-xl:px-2">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-footer-text md:max-xl:tracking-[0.04em]">Total redeemed</p>
            <p className="mt-2 text-[24px] font-black text-brand-dark">{points(rewards.spent)}</p>
          </div>
          <ul className="col-span-2 grid gap-2 rounded-[8px] bg-brand-surface/60 p-4 text-[13px] text-footer-text">
            {EARN_WAYS.map((w) => (
              <li key={w.title}>
                <span className="font-semibold text-brand-dark">{w.title}:</span> {w.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {tier.pending.length > 0 && <PendingRewards pending={tier.pending} />}

      <AccountSection title="Transactions">
        {rewards.history.length === 0 ? (
          <AccountEmptyState
            icon={AccountIcons.gift}
            title="No reward activity yet"
            action={
              <Link href="/" className={primaryButton}>
                Start Shopping
              </Link>
            }
          >
            Points you earn from orders, pre-payments and reviews, and points you redeem, will be listed here.
          </AccountEmptyState>
        ) : (
          <>
            <table className="hidden w-full text-left text-[14px] md:table">
              <thead>
                <tr className="border-b-2 border-brand-dark text-[12px] uppercase tracking-[0.1em] text-brand-dark">
                  <th className="py-2 font-bold">Date</th>
                  <th className="py-2 font-bold">Description</th>
                  <th className="py-2 text-right font-bold">Points</th>
                  <th className="py-2 text-right font-bold">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {rows.map((h) => (
                  <tr key={`${h.date}-${h.reason}`}>
                    <td className="whitespace-nowrap py-3 text-footer-text">{formatDate(h.date)}</td>
                    <td className="py-3 text-brand-dark">{h.reason}</td>
                    <td className={clsx("py-3 text-right font-bold", h.points >= 0 ? "text-success" : "text-brand-alert")}>
                      {h.points >= 0 ? "+" : "−"}
                      {points(Math.abs(h.points))}
                    </td>
                    <td className="py-3 text-right text-footer-text">{points(h.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="divide-y divide-card-border md:hidden">
              {rows.map((h) => (
                <li key={`${h.date}-${h.reason}`} className="flex items-start justify-between gap-3 py-3 text-[14px]">
                  <span className="min-w-0">
                    <span className="block text-brand-dark">{h.reason}</span>
                    <span className="text-[12px] text-footer-text">
                      {formatDate(h.date)} · Balance {points(h.balance)}
                    </span>
                  </span>
                  <span className={clsx("shrink-0 font-bold", h.points >= 0 ? "text-success" : "text-brand-alert")}>
                    {h.points >= 0 ? "+" : "−"}
                    {points(Math.abs(h.points))}
                  </span>
                </li>
              ))}
            </ul>
            <ListPager
              pathname="/customer/account/rewards"
              page={pager.page}
              pageSize={pager.pageSize}
              total={rewards.history.length}
              totalPages={pager.totalPages}
              noun="transactions"
              sizes={pager.sizes}
            />
          </>
        )}
      </AccountSection>
    </div>
  );
}
