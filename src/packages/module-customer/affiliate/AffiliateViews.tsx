import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { ListPager } from "@/packages/module-common/ListPager";
import { NextImage } from "@/packages/module-common/NextImage";
import type { AffiliateAccount, AffiliateTransaction, AffiliateWithdrawal } from "@/types/storefront";
import { formatTk } from "@/utils/format";
import { AccountEmptyState, AccountSection } from "../AccountUi";
import { AffiliateJoinForm, WithdrawForm } from "./AffiliateForms";
import {
  AFFILIATE_ROOT,
  AffiliateIcons,
  BalanceCards,
  CommissionList,
  formatDateTime,
  GroupBadge,
  IconBadge,
  primaryButton,
  secondaryButton,
  StatCard,
  WithdrawalBadge,
} from "./AffiliateUi";
import { CopyButton, CopyField, ShareButtons } from "./CopyField";
import { BannerCodeButton, ProgramGroupTabs, ReferralLinkGenerator, ReferralWidgetBuilder } from "./PromotionTools";

export interface AffiliatePager {
  page: number;
  pageSize: number;
  totalPages: number;
  sizes: number[];
}

/* ───────────── Join ───────────── */

export function AffiliateJoinView({ account, customerName, email }: { account: AffiliateAccount; customerName: string; email: string }) {
  const top = account.programs[0]?.groups.at(-1)?.commissions[0]?.value;
  const perks = [
    { icon: AffiliateIcons.link, title: "Your own referral link", text: "Plus coupons, banners and a product widget to share." },
    { icon: AffiliateIcons.wallet, title: top ? `Earn up to ${top} per order` : "Commission on every order", text: "Your rate grows as you refer more orders." },
    { icon: AffiliateIcons.chart, title: "Live statistics", text: "See your clicks, orders and earnings any time." },
    { icon: AffiliateIcons.users, title: "Free to join", text: `Get paid by ${account.paymentMethods.map((m) => m.label).slice(0, 2).join(" or ")} from ${formatTk(account.balance.minPayout)}.` },
  ];

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <AffiliateJoinForm account={account} customerName={customerName} email={email} />
      <aside className="space-y-4 lg:sticky lg:top-24">
        <div className="relative overflow-hidden rounded-[8px] bg-gradient-to-br from-brand-charcoal to-brand-black p-5 text-white">
          <span aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-coral/25" />
          <p className="relative text-[12px] font-bold uppercase tracking-[0.15em] text-brand-coral">What you get</p>
          <ul className="relative mt-4 space-y-4">
            {perks.map((perk) => (
              <li key={perk.title} className="flex gap-3">
                <IconBadge icon={perk.icon} className="h-9 w-9 bg-white/10 text-white" />
                <span>
                  <span className="block text-[14px] font-bold">{perk.title}</span>
                  <span className="text-[12px] leading-[1.45] text-white/70">{perk.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/banglashoppers-affiliate-program" className="flex items-center justify-between rounded-[8px] border border-card-border px-4 py-3 text-[14px] font-semibold text-brand-dark transition-colors hover:border-brand-coral hover:text-brand-coral">
          How the program works
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </Link>
      </aside>
    </div>
  );
}

/* ───────────── Pending / success ───────────── */

const NEXT_STEPS = [
  { icon: AffiliateIcons.clock, title: "We review your application", text: "Our team checks your details, usually within 2 working days." },
  { icon: AffiliateIcons.link, title: "Get your referral link", text: "Once approved, your personal link and coupons appear here." },
  { icon: AffiliateIcons.wallet, title: "Share and earn", text: "Earn commission on every order placed through your link." },
];

function StatusHero({ tone, title, children, actions }: { tone: "pending" | "success"; title: string; children: ReactNode; actions: ReactNode }) {
  return (
    <section className="rounded-[8px] border border-card-border bg-white px-5 py-8 text-center sm:px-8 sm:py-10">
      <span
        aria-hidden="true"
        className={clsx(
          "mx-auto grid h-16 w-16 place-items-center rounded-full [&>svg]:h-8 [&>svg]:w-8",
          tone === "success" ? "bg-success text-white shadow-[0_0_0_8px_rgba(23,116,40,0.12)]" : "bg-star-filled/20 text-brand-dark shadow-[0_0_0_8px_rgba(255,193,7,0.12)]",
        )}
      >
        {tone === "success" ? AffiliateIcons.check : AffiliateIcons.clock}
      </span>
      <h2 className="mt-5 text-[20px] font-black text-brand-dark sm:text-[24px]">{title}</h2>
      <div className="mx-auto mt-2 max-w-[520px] text-[14px] leading-[1.55] text-footer-text sm:text-[15px]">{children}</div>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">{actions}</div>
    </section>
  );
}

export function AffiliatePendingView({ submitted = false }: { submitted?: boolean }) {
  return (
    <div className="space-y-5">
      <StatusHero
        tone={submitted ? "success" : "pending"}
        title={submitted ? "Application received!" : "Your application is under review"}
        actions={
          <>
            <Link href="/customer/account" className={primaryButton}>
              Back to My Account
            </Link>
            <Link href="/" className={secondaryButton}>
              Continue Shopping
            </Link>
          </>
        }
      >
        Thank you for applying to the BanglaShoppers Affiliate Program. We&apos;ll email you as soon as your account is approved.
      </StatusHero>
      <AccountSection title="What happens next">
        <ol className="grid gap-4 md:grid-cols-3">
          {NEXT_STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <IconBadge icon={step.icon} />
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-brand-coral">Step {i + 1}</p>
                <p className="text-[15px] font-bold text-brand-dark">{step.title}</p>
                <p className="mt-0.5 text-[13px] leading-[1.5] text-footer-text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </AccountSection>
    </div>
  );
}

export function AffiliateWelcomeView({ account }: { account: AffiliateAccount }) {
  return (
    <div className="space-y-5">
      <StatusHero
        tone="success"
        title="Welcome aboard!"
        actions={
          <>
            <Link href={AFFILIATE_ROOT} className={primaryButton}>
              Go to Affiliate Dashboard
            </Link>
            <Link href={`${AFFILIATE_ROOT}/promotion`} className={secondaryButton}>
              Promotion Materials
            </Link>
          </>
        }
      >
        Your affiliate account is active. Share your personal link below and earn commission on every order it brings in.
      </StatusHero>
      <AccountSection title="Your referral link">
        <div className="space-y-3">
          <CopyField value={account.referralUrl} label="Your referral link" />
          <ShareButtons url={account.referralUrl} />
        </div>
      </AccountSection>
    </div>
  );
}

/* ───────────── Dashboard ───────────── */

function TierProgress({ account }: { account: AffiliateAccount }) {
  const tiers = [...(account.programs[0]?.groups ?? [])].sort((a, b) => a.minOrders - b.minOrders);
  const next = tiers.find((t) => t.minOrders > account.ordersReferred);
  const current = [...tiers].reverse().find((t) => t.minOrders <= account.ordersReferred);
  if (!next) return <p className="relative mt-4 text-[14px] text-white/80">You&apos;re in our top group. Thank you for being a star partner!</p>;
  const from = current?.minOrders ?? 0;
  const percent = Math.round(((account.ordersReferred - from) / (next.minOrders - from)) * 100);
  return (
    <div className="relative mt-5">
      <div className="flex items-baseline justify-between gap-3 text-[13px]">
        <span className="text-white/80">
          <strong className="text-white">{account.ordersReferred}</strong> referred orders
        </span>
        <span className="text-white/80">
          {next.minOrders - account.ordersReferred} more to <strong className="text-white">{next.name}</strong>
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={`Progress to ${next.name}`}>
        <div className="h-full rounded-full bg-brand-coral" style={{ width: `${Math.max(4, percent)}%` }} />
      </div>
    </div>
  );
}

function TransactionRows({ rows }: { rows: AffiliateTransaction[] }) {
  return (
    <>
      <table className="hidden w-full text-left text-[14px] md:table">
        <thead>
          <tr className="border-b-2 border-brand-dark text-[12px] uppercase tracking-[0.1em] text-brand-dark">
            <th className="py-2 font-bold">Date</th>
            <th className="py-2 font-bold">Details</th>
            <th className="py-2 text-right font-bold">Amount</th>
            <th className="py-2 text-right font-bold">Balance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-card-border">
          {rows.map((t) => (
            <tr key={t.id}>
              <td className="whitespace-nowrap py-3 pr-4 text-footer-text">{formatDateTime(t.date)}</td>
              <td className="py-3 text-brand-dark">{t.details}</td>
              <td className={clsx("whitespace-nowrap py-3 text-right font-bold", t.amount >= 0 ? "text-success" : "text-brand-alert")}>
                {t.amount >= 0 ? "+" : "−"}
                {formatTk(Math.abs(t.amount))}
              </td>
              <td className="whitespace-nowrap py-3 text-right text-footer-text">{formatTk(t.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="divide-y divide-card-border md:hidden">
        {rows.map((t) => (
          <li key={t.id} className="flex items-start justify-between gap-3 py-3 text-[14px]">
            <span className="min-w-0">
              <span className="block text-brand-dark">{t.details}</span>
              <span className="text-[12px] text-footer-text">
                {formatDateTime(t.date)} · Balance {formatTk(t.balance)}
              </span>
            </span>
            <span className={clsx("shrink-0 font-bold", t.amount >= 0 ? "text-success" : "text-brand-alert")}>
              {t.amount >= 0 ? "+" : "−"}
              {formatTk(Math.abs(t.amount))}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

const shareAction = (
  <Link href={`${AFFILIATE_ROOT}/promotion`} className={primaryButton}>
    Get Your Referral Link
  </Link>
);

export function AffiliateDashboardView({ account, recent }: { account: AffiliateAccount; recent: AffiliateTransaction[] }) {
  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[8px] bg-gradient-to-br from-brand-charcoal to-brand-black p-5 text-white sm:p-6">
        <span aria-hidden="true" className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-brand-coral/20" />
        <span aria-hidden="true" className="absolute -bottom-16 right-24 h-32 w-32 rounded-full bg-white/5" />
        <p className="relative text-[12px] font-bold uppercase tracking-[0.15em] text-brand-coral">BanglaShoppers Affiliate Program</p>
        <h2 className="relative mt-2 text-[20px] font-black leading-tight sm:text-[24px]">Welcome to your affiliate dashboard</h2>
        <p className="relative mt-3 flex flex-wrap items-center gap-2 text-[14px] text-white/85">
          Your account is in the <GroupBadge name={account.group} /> affiliate group
        </p>
        <TierProgress account={account} />
      </section>

      <BalanceCards balance={account.balance} />

      <AccountSection
        title="Your referral link"
        action={
          <Link href={`${AFFILIATE_ROOT}/promotion`} className="text-[13px] font-semibold text-brand-link hover:underline">
            More tools
          </Link>
        }
      >
        <div className="space-y-3">
          <CopyField value={account.referralUrl} label="Your referral link" />
          <ShareButtons url={account.referralUrl} />
        </div>
      </AccountSection>

      <AccountSection title="Your programs">
        <ul className="grid gap-3 sm:grid-cols-2">
          {account.programs.map((p) => (
            <li key={p.id} className="rounded-[8px] border border-card-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[15px] font-bold text-brand-dark">{p.name}</p>
                <span className="rounded-full bg-brand-surface px-2.5 py-0.5 text-[12px] font-semibold text-footer-text ring-1 ring-card-border">{p.type}</span>
              </div>
              {p.description && <p className="mt-1 text-[12px] leading-[1.45] text-footer-text">{p.description}</p>}
              <CommissionList commissions={p.commissions} className="mt-3" />
            </li>
          ))}
        </ul>
      </AccountSection>

      <AccountSection title="Our programs" action={<span className="text-[12px] text-footer-text">Min. payout {formatTk(account.balance.minPayout)}</span>}>
        <ProgramGroupTabs programs={account.programs} currentGroup={account.group} />
      </AccountSection>

      <AccountSection
        title="Recent activity"
        action={
          recent.length > 0 && (
            <Link href={`${AFFILIATE_ROOT}/transactions`} className="text-[13px] font-semibold text-brand-link hover:underline">
              View all
            </Link>
          )
        }
      >
        {recent.length > 0 ? (
          <TransactionRows rows={recent} />
        ) : (
          <AccountEmptyState icon={<span className="h-[30px] w-[30px] [&>svg]:h-full [&>svg]:w-full">{AffiliateIcons.chart}</span>} title="No activity yet" action={shareAction}>
            Share your referral link. Clicks and commissions will show up here.
          </AccountEmptyState>
        )}
      </AccountSection>
    </div>
  );
}

/* ───────────── Promotion materials ───────────── */

export function AffiliatePromotionView({ account }: { account: AffiliateAccount }) {
  return (
    <div className="space-y-5">
      <AccountSection title="Personal referral link">
        <ReferralLinkGenerator referralUrl={account.referralUrl} />
      </AccountSection>

      <AccountSection title="Your commissions" action={<GroupBadge name={account.group} />}>
        <ul className="divide-y divide-card-border">
          {account.programs.map((p) => (
            <li key={p.id} className="grid gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-6">
              <div>
                <p className="text-[14px] font-bold text-brand-dark">
                  {p.name} <span className="font-normal text-footer-text">({p.type})</span>
                </p>
                {p.description && <p className="mt-0.5 text-[12px] text-footer-text">{p.description}</p>}
              </div>
              <CommissionList commissions={p.commissions} />
            </li>
          ))}
        </ul>
      </AccountSection>

      {account.coupons.length > 0 && (
        <AccountSection title="Referral coupons">
          <p className="-mt-2 mb-4 text-[13px] text-footer-text">Share a coupon: your customer gets a discount and the order counts as yours.</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {account.coupons.map((c) => (
              <li key={c.code} className="relative flex overflow-hidden rounded-[8px] border border-card-border">
                <div className="grid w-[86px] shrink-0 place-items-center bg-brand-coral px-2 text-center text-white">
                  <span>
                    <span className="block text-[24px] font-black leading-none">{c.discount}</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em]">Off</span>
                  </span>
                </div>
                <span aria-hidden="true" className="absolute left-[78px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white" />
                <div className="min-w-0 flex-1 border-l-2 border-dashed border-card-border p-3 pl-4">
                  <p className="text-[13px] font-bold text-brand-dark">{c.program}</p>
                  {c.description && <p className="text-[12px] text-footer-text">{c.description}</p>}
                  <div className="mt-2 flex items-center gap-2">
                    <code className="rounded-[4px] bg-brand-surface px-2.5 py-1.5 font-mono text-[14px] font-bold tracking-[0.08em] text-brand-dark ring-1 ring-card-border">{c.code}</code>
                    <CopyButton text={c.code} className="h-9 px-3 text-[13px]" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </AccountSection>
      )}

      <AccountSection title="Referral widget">
        <p className="-mt-2 mb-4 text-[13px] text-footer-text">Show our products on your website or blog. Customise it below, then copy the code.</p>
        <ReferralWidgetBuilder referralUrl={account.referralUrl} products={account.widgetProducts} />
      </AccountSection>

      {account.banners.length > 0 && (
        <AccountSection title="Banners">
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {account.banners.map((b) => (
              <li key={b.id} className="flex flex-col overflow-hidden rounded-[8px] border border-card-border">
                <div className="relative grid aspect-[4/3] place-items-center bg-brand-surface p-3">
                  <NextImage src={b.image} alt={b.title} width={b.width} height={b.height} sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 90vw" className="max-h-full w-auto object-contain" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[14px] font-bold text-brand-dark">{b.title}</p>
                  <dl className="mt-2 grid grid-cols-3 gap-2 text-center text-[12px]">
                    {[
                      ["Size", `${b.width}×${b.height}`],
                      ["Clicks", b.clicks],
                      ["Views", b.impressions],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[4px] bg-brand-surface py-1.5">
                        <dt className="text-footer-text">{label}</dt>
                        <dd className="font-bold text-brand-dark">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <Link href={b.url} className="truncate text-[12px] text-brand-link hover:underline">
                      {b.url}
                    </Link>
                    <BannerCodeButton banner={b} referralUrl={account.referralUrl} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </AccountSection>
      )}
    </div>
  );
}

/* ───────────── Transactions ───────────── */

export function AffiliateTransactionsView({ account, transactions, pager }: { account: AffiliateAccount; transactions: AffiliateTransaction[]; pager: AffiliatePager }) {
  const rows = transactions.slice((pager.page - 1) * pager.pageSize, pager.page * pager.pageSize);
  return (
    <div className="space-y-5">
      <BalanceCards balance={account.balance} />
      <AccountSection title="Transactions history">
        {transactions.length === 0 ? (
          <AccountEmptyState icon={<span className="h-[30px] w-[30px] [&>svg]:h-full [&>svg]:w-full">{AffiliateIcons.chart}</span>} title="No transactions yet" action={shareAction}>
            Commissions for referred orders and clicks will be listed here.
          </AccountEmptyState>
        ) : (
          <>
            <TransactionRows rows={rows} />
            <ListPager
              pathname={`${AFFILIATE_ROOT}/transactions`}
              page={pager.page}
              pageSize={pager.pageSize}
              total={transactions.length}
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

/* ───────────── Withdrawals ───────────── */

export function AffiliateWithdrawalsView({ account, withdrawals, pager }: { account: AffiliateAccount; withdrawals: AffiliateWithdrawal[]; pager: AffiliatePager }) {
  const { current, openWithdrawals, minPayout } = account.balance;
  const available = Math.max(0, Math.round((current - openWithdrawals) * 100) / 100);
  const rows = withdrawals.slice((pager.page - 1) * pager.pageSize, pager.page * pager.pageSize);
  const method = account.paymentMethods.find((m) => m.value === account.profile.paymentMethod)?.label;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        <StatCard label="Current balance" value={formatTk(current)} />
        <StatCard label="Open requests" value={formatTk(openWithdrawals)} />
        <div className="col-span-2 md:col-span-1">
          <StatCard label="Available to withdraw" value={formatTk(available)} tone="brand" hint={`Minimum payout ${formatTk(minPayout)}`} />
        </div>
      </div>

      <AccountSection title="Request a withdrawal">
        {method && (
          <p className="-mt-2 mb-4 text-[13px] text-footer-text">
            Paid to your <strong className="text-brand-dark">{method}</strong> account ·{" "}
            <Link href={`${AFFILIATE_ROOT}/settings`} className="font-semibold text-brand-link hover:underline">
              Change
            </Link>
          </p>
        )}
        <WithdrawForm available={available} minPayout={minPayout} current={current} />
      </AccountSection>

      <AccountSection title="Withdrawal history">
        {withdrawals.length === 0 ? (
          <AccountEmptyState icon={<span className="h-[30px] w-[30px] [&>svg]:h-full [&>svg]:w-full">{AffiliateIcons.wallet}</span>} title="No withdrawals yet">
            Your payout requests and their status will appear here.
          </AccountEmptyState>
        ) : (
          <>
            <table className="hidden w-full text-left text-[14px] md:table">
              <thead>
                <tr className="border-b-2 border-brand-dark text-[12px] uppercase tracking-[0.1em] text-brand-dark">
                  <th className="py-2 font-bold">Date</th>
                  <th className="py-2 text-right font-bold">Amount</th>
                  <th className="py-2 text-right font-bold">Fee</th>
                  <th className="py-2 pl-6 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {rows.map((w) => (
                  <tr key={w.id}>
                    <td className="py-3 text-footer-text">{formatDateTime(w.date)}</td>
                    <td className="py-3 text-right font-bold text-brand-dark">{formatTk(w.amount)}</td>
                    <td className="py-3 text-right text-footer-text">{formatTk(w.fee)}</td>
                    <td className="py-3 pl-6">
                      <WithdrawalBadge status={w.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="divide-y divide-card-border md:hidden">
              {rows.map((w) => (
                <li key={w.id} className="flex items-center justify-between gap-3 py-3 text-[14px]">
                  <span>
                    <span className="block font-bold text-brand-dark">{formatTk(w.amount)}</span>
                    <span className="text-[12px] text-footer-text">
                      {formatDateTime(w.date)} · Fee {formatTk(w.fee)}
                    </span>
                  </span>
                  <WithdrawalBadge status={w.status} />
                </li>
              ))}
            </ul>
            <ListPager
              pathname={`${AFFILIATE_ROOT}/withdrawals`}
              page={pager.page}
              pageSize={pager.pageSize}
              total={withdrawals.length}
              totalPages={pager.totalPages}
              noun="withdrawals"
              sizes={pager.sizes}
            />
          </>
        )}
      </AccountSection>
    </div>
  );
}
