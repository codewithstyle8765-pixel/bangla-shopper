"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import type { DownloadableItem, RewardPoints, RewardTierStatus } from "@/types/storefront";
import { formatDate } from "@/utils/format";
import { Money } from "@/packages/module-common/currency/Currency";
import { ListPager } from "@/packages/module-common/ListPager";
import { sanitizeHtml } from "@/utils/product-description";
import { NextImage } from "@/packages/module-common/NextImage";
import { TierProgress } from "./TierProgress";
import { AccountEmptyState, AccountIcons, AccountSection } from "./AccountUi";
import { CopyField } from "./affiliate/CopyField";

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
  const [activeTab, setActiveTab] = useState<"history" | "refer" | "referrals">("history");
  const rows = rewards.history.slice((pager.page - 1) * pager.pageSize, pager.page * pager.pageSize);

  const referralsData = rewards.referralsData ?? {
    referralLink: "https://www.banglashoppers.com/r/HBXyAwXU/",
    invitedCount: 2,
    referrals: [
      { name: "Sunny", email: "sunny@banglashoppers.com", status: "Made Order", points: null },
      { name: "Imran", email: "imran@banglashoppers.com", status: "Made Order", points: null },
    ],
  };

  const [inviteRows, setInviteRows] = useState([
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
  ]);
  const [inviteMessage, setInviteMessage] = useState("");
  const [inviteSent, setInviteSent] = useState(false);

  const updateInviteRow = (index: number, field: "name" | "email", value: string) => {
    setInviteRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    if (inviteSent) setInviteSent(false);
  };

  const handleSendInvitations = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSent(true);
    setInviteRows([
      { name: "", email: "" },
      { name: "", email: "" },
      { name: "", email: "" },
      { name: "", email: "" },
      { name: "", email: "" },
    ]);
    setInviteMessage("");
    window.setTimeout(() => setInviteSent(false), 4000);
  };

  return (
    <div className="space-y-5">
      {tier.tiers.length > 0 && (
        <TierProgress
          status={{ ...tier, tiers: tier.tiers.map((t) => ({ ...t, description: t.description && sanitizeHtml(t.description) })) }}
          earned={rewards.earned}
        />
      )}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[10px] bg-gradient-to-br from-brand-charcoal via-brand-charcoal to-brand-black p-5 text-white shadow-card sm:p-6">
          <span aria-hidden="true" className="absolute -right-12 -top-14 h-44 w-44 rounded-full bg-brand-coral/25 blur-[2px]" />
          <span aria-hidden="true" className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/5" />
          <span aria-hidden="true" className="absolute right-16 top-20 h-16 w-16 rounded-full border border-white/10 max-sm:hidden" />

          {/* Small screen (< md): Image centered on top, content below in center */}
          <div className="relative flex flex-col md:hidden items-center text-center">
            <NextImage
              src="/assets/images/reward_point.webp"
              alt="Reward Points"
              width={260}
              height={170}
              priority
              className="h-auto w-[200px] sm:w-[230px] max-w-full object-contain drop-shadow-md mb-3"
            />
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-coral">
              Cash Back Reward balance
            </p>
            {tier.current && (
              <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/10 py-0.5 px-3 text-[11px] font-semibold text-white/90 ring-1 ring-white/15">
                {tier.current.logo && (
                  <NextImage src={tier.current.logo} alt="" width={32} height={32} className="h-4 w-4 rounded-full object-contain" />
                )}
                <span>{tier.current.name}</span>
              </div>
            )}

            <div className="mt-3 flex items-baseline justify-center gap-1.5">
              <span className="text-[40px] sm:text-[46px] font-black leading-none tracking-tight tabular-nums">
                {points(rewards.balance)}
              </span>
              <span className="text-[15px] font-semibold text-white/70">points</span>
            </div>

            <div className="mt-2.5">
              <p className="inline-flex flex-wrap items-baseline justify-center gap-x-1.5 rounded-[6px] bg-white/10 px-3.5 py-1.5 text-[13px] text-white/90">
                Worth <span className="text-[15px] font-bold text-white"><Money value={rewards.balanceValue} /></span> on your next order
              </p>
            </div>

            <div className="mt-4 w-full border-t border-white/10 pt-3 space-y-1.5 text-[12px]">
              <p className="flex items-center justify-center gap-2 text-white/75">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-coral" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="18" height="13" rx="2" />
                  <path d="M3 10h18M7 15h4" />
                </svg>
                <span>Redeem points in the payment step at checkout.</span>
              </p>
              <p className="flex items-center justify-center gap-2 text-white/85 font-medium">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-coral" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>
                  Only <strong className="font-bold text-brand-coral">{rewards.expirationDays ?? 355} days</strong> left until your <strong className="font-bold text-white">{points(rewards.expiringPoints ?? rewards.balance)} Reward Points</strong> expire!
                </span>
              </p>
            </div>

            <Link
              href="/"
              className="mt-4 inline-flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-[4px] bg-brand-coral px-6 text-[14px] font-bold text-white transition-all hover:bg-brand-coral-hover shadow-xs active:scale-98"
            >
              Start Shopping
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" />
              </svg>
            </Link>
          </div>

          {/* Medium and Large screens (md:): Left column details, Right column image + Start Shopping button */}
          <div className="relative hidden md:flex items-center justify-between gap-6">
            {/* Left Column: Title, Member Badge below title, Points (NO LOGO), Value & Expiration */}
            <div className="flex flex-1 flex-col justify-between min-w-0 space-y-3.5">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-coral">
                  Cash Back Reward balance
                </p>
                {tier.current && (
                  <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/10 py-0.5 pl-1.5 pr-2.5 text-[11px] font-semibold text-white/90 ring-1 ring-white/15">
                    {tier.current.logo && (
                      <NextImage src={tier.current.logo} alt="" width={32} height={32} className="h-4 w-4 rounded-full object-contain" />
                    )}
                    <span>{tier.current.name}</span>
                  </div>
                )}

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-[44px] lg:text-[48px] font-black leading-none tracking-tight tabular-nums">
                    {points(rewards.balance)}
                  </span>
                  <span className="text-[15px] lg:text-[16px] font-semibold text-white/70">points</span>
                </div>

                <div className="mt-2.5">
                  <p className="inline-flex flex-wrap items-baseline gap-x-1.5 rounded-[6px] bg-white/10 px-3.5 py-1.5 text-[13px] text-white/90 sm:text-[14px]">
                    Worth <span className="text-[15px] sm:text-[16px] font-bold text-white"><Money value={rewards.balanceValue} /></span> on your next order
                  </p>
                </div>
              </div>

              {/* Redeem line & Expiration section below it */}
              <div className="border-t border-white/10 pt-3 space-y-1.5 text-[12px]">
                <p className="flex items-center gap-2 text-white/75 whitespace-nowrap">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-coral" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="6" width="18" height="13" rx="2" />
                    <path d="M3 10h18M7 15h4" />
                  </svg>
                  <span>Redeem points in the payment step at checkout.</span>
                </p>
                <p className="flex items-center gap-2 text-white/85 font-medium">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-coral" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>
                    Only <strong className="font-bold text-brand-coral">{rewards.expirationDays ?? 355} days</strong> left until your <strong className="font-bold text-white">{points(rewards.expiringPoints ?? rewards.balance)} Reward Points</strong> expire!
                  </span>
                </p>
              </div>
            </div>

            {/* Right Column: Hero Image + Center Button */}
            <div className="flex shrink-0 flex-col items-center justify-center text-center w-[220px] lg:w-[250px]">
              <NextImage
                src="/assets/images/reward_point.webp"
                alt="Reward Points"
                width={250}
                height={165}
                priority
                className="h-auto w-[210px] lg:w-[240px] max-w-full object-contain drop-shadow-lg"
              />
              <Link
                href="/"
                className="mt-3.5 inline-flex h-10 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-[4px] bg-brand-coral px-6 text-[14px] font-bold text-white transition-all hover:bg-brand-coral-hover shadow-xs active:scale-98"
              >
                Start Shopping
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Right side stats */}
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

      {/* Tabs Layout: Transactions, Share & Save, My Referrals */}
      <div className="rounded-[8px] border border-card-border bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex border-b border-card-border gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={clsx(
              "pb-3 text-[14px] sm:text-[15px] font-bold transition-colors border-b-2 whitespace-nowrap cursor-pointer",
              activeTab === "history"
                ? "border-brand-coral text-brand-dark"
                : "border-transparent text-footer-text hover:text-brand-dark"
            )}
          >
            Transactions
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("refer")}
            className={clsx(
              "pb-3 text-[14px] sm:text-[15px] font-bold transition-colors border-b-2 whitespace-nowrap cursor-pointer",
              activeTab === "refer"
                ? "border-brand-coral text-brand-dark"
                : "border-transparent text-footer-text hover:text-brand-dark"
            )}
          >
            Share & Save
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("referrals")}
            className={clsx(
              "pb-3 text-[14px] sm:text-[15px] font-bold transition-colors border-b-2 whitespace-nowrap cursor-pointer",
              activeTab === "referrals"
                ? "border-brand-coral text-brand-dark"
                : "border-transparent text-footer-text hover:text-brand-dark"
            )}
          >
            My Referrals
          </button>
        </div>

        {/* Tab 1: Transactions */}
        {activeTab === "history" && (
          <div className="pt-4">
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
                      <th className="py-2.5 font-bold">Date</th>
                      <th className="py-2.5 font-bold">Description</th>
                      <th className="py-2.5 text-right font-bold">Points</th>
                      <th className="py-2.5 text-right font-bold">Balance</th>
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
          </div>
        )}

        {/* Tab 2: Share & Save */}
        {activeTab === "refer" && (
          <div className="space-y-4 pt-5">
            <div className="rounded-[8px] border border-card-border/60 bg-brand-surface/30 p-5 sm:p-6 space-y-4">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-footer-text">
                  My Reward Points
                </p>
                <h3 className="mt-1 text-[16px] sm:text-[17px] font-bold text-brand-dark">
                  You may send this link in your messages to anyone
                </h3>
              </div>
              <CopyField value={referralsData.referralLink} label="Your referral link" />
            </div>
          </div>
        )}

        {/* Tab 3: My Referrals */}
        {activeTab === "referrals" && (
          <div className="space-y-6 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-[6px] border border-card-border/60 bg-brand-surface/30 px-4 py-3">
              <span className="text-[14px] font-medium text-brand-dark">
                You have invited <strong className="font-bold text-brand-coral">{referralsData.invitedCount}</strong> friends
              </span>
            </div>

            {/* Send Invitations Form */}
            <form onSubmit={handleSendInvitations} className="rounded-[8px] border border-card-border/60 p-4 sm:p-5 space-y-4">
              <div>
                <h3 className="text-[15px] sm:text-[16px] font-bold text-brand-dark">Send Invitations</h3>
                <p className="text-[13px] text-footer-text mt-0.5">Enter contacts of your friends to invite them.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-card-border/50 text-[12px] uppercase tracking-[0.08em] text-footer-text font-bold">
                      <th className="w-10 py-2.5 pl-2">#</th>
                      <th className="py-2.5 px-3">Name</th>
                      <th className="py-2.5 px-3">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border/40">
                    {inviteRows.map((row, i) => (
                      <tr key={i}>
                        <td className="py-2 pl-2 text-footer-text font-medium text-[13px]">{i + 1}</td>
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            placeholder="Friend's Name"
                            value={row.name}
                            onChange={(e) => updateInviteRow(i, "name", e.target.value)}
                            className="h-10 w-full rounded-[4px] border border-card-border bg-white px-3 text-[14px] text-brand-dark placeholder:text-muted-line focus:border-brand-coral outline-none transition-colors"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="email"
                            placeholder="Friend's Email"
                            value={row.email}
                            onChange={(e) => updateInviteRow(i, "email", e.target.value)}
                            className="h-10 w-full rounded-[4px] border border-card-border bg-white px-3 text-[14px] text-brand-dark placeholder:text-muted-line focus:border-brand-coral outline-none transition-colors"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <label htmlFor="invite-message" className="block text-[13px] font-semibold text-brand-dark mb-1">
                  Message
                </label>
                <textarea
                  id="invite-message"
                  rows={3}
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  placeholder="Hey, check out BanglaShoppers! Register with my link and get Cash Back on authentic beauty products."
                  className="w-full rounded-[4px] border border-card-border bg-white p-3 text-[14px] text-brand-dark placeholder:text-muted-line focus:border-brand-coral outline-none transition-colors resize-y"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {inviteSent && (
                  <p className="text-[13px] font-semibold text-success flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Invitations sent successfully!
                  </p>
                )}
                <button
                  type="submit"
                  className="ml-auto inline-flex h-10 items-center justify-center rounded-[4px] bg-brand-coral px-6 text-[14px] font-semibold text-white transition-colors hover:bg-brand-coral-hover shadow-xs active:scale-98 cursor-pointer"
                >
                  Send Invitations
                </button>
              </div>
            </form>

            {/* Referrals Table */}
            <div className="space-y-3 pt-2">
              <h3 className="text-[15px] sm:text-[16px] font-bold text-brand-dark">Referrals</h3>

              {referralsData.referrals.length === 0 ? (
                <div className="py-8 text-center rounded-[8px] border border-card-border/50">
                  <p className="text-[15px] font-bold text-brand-dark">No referrals yet</p>
                  <p className="text-[13px] text-footer-text mt-1">Share your link or invite friends to earn rewards when they order.</p>
                </div>
              ) : (
                <>
                  <table className="hidden w-full text-left text-[14px] md:table">
                    <thead>
                      <tr className="border-b-2 border-brand-dark text-[12px] uppercase tracking-[0.1em] text-brand-dark">
                        <th className="py-2.5 font-bold">Name</th>
                        <th className="py-2.5 font-bold">Email</th>
                        <th className="py-2.5 font-bold">Status</th>
                        <th className="py-2.5 text-right font-bold">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-card-border/50">
                      {referralsData.referrals.map((r) => (
                        <tr key={r.email}>
                          <td className="py-3 font-semibold text-brand-dark">{r.name}</td>
                          <td className="py-3 text-footer-text">{r.email}</td>
                          <td className="py-3">
                            <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-[12px] font-semibold text-success">
                              {r.status}
                            </span>
                          </td>
                          <td className="py-3 text-right text-footer-text font-medium">
                            {r.points ? `+${r.points}` : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <ul className="divide-y divide-card-border/50 md:hidden">
                    {referralsData.referrals.map((r) => (
                      <li key={r.email} className="py-3 text-[14px] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-brand-dark">{r.name}</span>
                          <span className="inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                            {r.status}
                          </span>
                        </div>
                        <p className="text-[13px] text-footer-text">{r.email}</p>
                        <p className="text-[12px] text-footer-text">Points: {r.points ? `+${r.points}` : "—"}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
