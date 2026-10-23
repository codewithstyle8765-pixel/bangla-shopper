import clsx from "clsx";
import type { ReactNode } from "react";
import type { AffiliateBalance, AffiliateCommission, AffiliateWithdrawalStatus } from "@/types/storefront";
import { formatTk } from "@/utils/format";

export const AFFILIATE_ROOT = "/customer/account/affiliate";

export const primaryButton =
  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-brand-coral px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-coral-hover disabled:cursor-wait disabled:opacity-70";
export const secondaryButton =
  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[4px] border-2 border-brand-black px-6 text-[15px] font-semibold text-brand-black transition-colors hover:bg-brand-black hover:text-white";

const iconProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const AffiliateIcons = {
  link: (
    <svg {...iconProps}>
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </svg>
  ),
  wallet: (
    <svg {...iconProps}>
      <path d="M19 7V5.5A1.5 1.5 0 0 0 17.5 4h-12A2.5 2.5 0 0 0 3 6.5v11A2.5 2.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" />
      <path d="M3 6.5A2.5 2.5 0 0 0 5.5 9H20v6h-4.5a3 3 0 0 1 0-6" />
    </svg>
  ),
  chart: (
    <svg {...iconProps}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  ),
  ticket: (
    <svg {...iconProps}>
      <path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v1.5A1.5 1.5 0 0 0 4.5 19h15a1.5 1.5 0 0 0 1.5-1.5V16a2 2 0 0 1 0-4 2 2 0 0 0 0-4V6.5A1.5 1.5 0 0 0 19.5 5h-15A1.5 1.5 0 0 0 3 6.5z" />
      <path d="M14 5v2M14 11v2M14 17v2" />
    </svg>
  ),
  clock: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  check: (
    <svg {...iconProps} strokeWidth={2.4}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  ),
  users: (
    <svg {...iconProps}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8" />
    </svg>
  ),
  megaphone: (
    <svg {...iconProps}>
      <path d="M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1z" />
      <path d="M17 9a4 4 0 0 1 0 6M7 15l1.5 5" />
    </svg>
  ),
};

/** Coloured icon disc used in section headers, steps and empty states. */
export function IconBadge({ icon, className }: { icon: ReactNode; className?: string }) {
  return (
    <span aria-hidden="true" className={clsx("grid shrink-0 place-items-center rounded-full [&>svg]:h-1/2 [&>svg]:w-1/2", className ?? "h-11 w-11 bg-brand-coral/10 text-brand-coral")}>
      {icon}
    </span>
  );
}

export function StatCard({ label, value, tone = "default", hint }: { label: string; value: ReactNode; tone?: "default" | "brand" | "success"; hint?: ReactNode }) {
  return (
    <div className="rounded-[8px] border border-card-border bg-white p-4">
      <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-footer-text">{label}</p>
      <p className={clsx("mt-1.5 text-[22px] font-black leading-tight sm:text-[24px]", tone === "brand" ? "text-brand-coral" : tone === "success" ? "text-success" : "text-brand-dark")}>
        {value}
      </p>
      {hint && <p className="mt-1 text-[12px] text-footer-text">{hint}</p>}
    </div>
  );
}

export function BalanceCards({ balance }: { balance: AffiliateBalance }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      <StatCard label="Current balance" value={formatTk(balance.current)} tone="brand" />
      <StatCard label="On hold" value={formatTk(balance.onHold)} />
      <StatCard label="Lifetime earned" value={formatTk(balance.lifetime)} tone="success" />
      <StatCard label="Paid out" value={formatTk(balance.paid)} />
    </div>
  );
}

export function CommissionList({ commissions, className }: { commissions: AffiliateCommission[]; className?: string }) {
  return (
    <ul className={clsx("space-y-1 text-[14px] leading-[1.45] text-footer-text", className)}>
      {commissions.map((c) => (
        <li key={`${c.value}-${c.text}`} className="flex gap-2">
          <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-coral" />
          <span>
            <strong className="font-bold text-brand-dark">{c.value}</strong> {c.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

const WITHDRAWAL_STATUS: Record<AffiliateWithdrawalStatus, { label: string; className: string }> = {
  pending: { label: "Pending approval", className: "bg-star-filled/15 text-brand-dark" },
  completed: { label: "Completed", className: "bg-success/10 text-success" },
  denied: { label: "Denied", className: "bg-brand-alert/10 text-brand-alert" },
};

export function WithdrawalBadge({ status }: { status: AffiliateWithdrawalStatus }) {
  const { label, className } = WITHDRAWAL_STATUS[status];
  return (
    <span className={clsx("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-semibold", className)}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export function GroupBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-coral px-3 py-1 text-[12px] font-bold uppercase tracking-[0.08em] text-white">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
        <path d="m12 2.8 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2L3 9.4l6.2-.9z" />
      </svg>
      {name}
    </span>
  );
}

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
