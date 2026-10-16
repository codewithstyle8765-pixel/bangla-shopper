import Link from "next/link";
import clsx from "clsx";
import type { DownloadableItem, RewardPoints } from "@/types/storefront";
import { formatDate, formatTk } from "@/utils/format";
import { ListPager } from "@/packages/module-common/ListPager";
import { RewardCoin } from "@/packages/module-common/icons/RewardCoin";
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

interface RewardsPager {
  page: number;
  pageSize: number;
  totalPages: number;
  sizes: number[];
}

export function RewardPointsView({ rewards, pager }: { rewards: RewardPoints; pager: RewardsPager }) {
  const rows = rewards.history.slice((pager.page - 1) * pager.pageSize, pager.page * pager.pageSize);
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="relative overflow-hidden rounded-[8px] bg-gradient-to-br from-brand-charcoal to-brand-black p-5 text-white sm:p-6">
          <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-coral/20" />
          <p className="relative text-[12px] font-bold uppercase tracking-[0.15em] text-brand-coral">Cash Back Reward balance</p>
          <p className="relative mt-2 flex items-center gap-3 text-[36px] font-black leading-none sm:text-[42px]">
            <RewardCoin className="h-10 w-10 sm:h-12 sm:w-12" />
            <span>
              {points(rewards.balance)} <span className="text-[16px] font-semibold text-white/70">points</span>
            </span>
          </p>
          <p className="relative mt-2 text-[15px] text-white/85">
            Worth <span className="font-bold text-white">{formatTk(rewards.balanceValue)}</span> on your next order
          </p>
          <p className="relative mt-4 text-[12px] text-white/60">Redeem points in the payment step at checkout.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-[8px] border border-card-border p-4">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-footer-text">Total earned</p>
            <p className="mt-2 text-[24px] font-black text-success">+{points(rewards.earned)}</p>
          </div>
          <div className="rounded-[8px] border border-card-border p-4">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-footer-text">Total redeemed</p>
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
