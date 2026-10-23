import clsx from "clsx";
import { controlClass } from "@/packages/module-common/form";
import type { AffiliateStatistics } from "@/types/storefront";
import { formatTk } from "@/utils/format";
import { AccountEmptyState, AccountSection } from "../AccountUi";
import { AFFILIATE_ROOT, AffiliateIcons, formatDateTime, primaryButton, StatCard } from "./AffiliateUi";

const PAD = { top: 16, right: 12, bottom: 30, left: 48 };

const shortDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

function niceMax(value: number) {
  if (value <= 0) return 10;
  const step = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / step) * step;
}

/** One drawing at a fixed width, so labels keep a readable size (phones get a narrower one). */
function ChartSvg({ chart, max, W, H }: { chart: AffiliateStatistics["chart"]; max: number; W: number; H: number }) {
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const slot = innerW / chart.length;
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH;
  const x = (i: number) => PAD.left + slot * i + slot / 2;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const labelEvery = Math.ceil(chart.length / Math.max(2, Math.floor(innerW / 90)));
  const line = chart.map((c, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(c.balance).toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Balance and earnings over the selected period">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="stroke-card-border" strokeWidth={1} />
          <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" className="fill-footer-text text-[11px]">
            {t.toLocaleString("en-US")}
          </text>
        </g>
      ))}
      {chart.map((c, i) => {
        const barW = Math.min(36, slot * 0.6);
        return (
          <g key={c.date}>
            <rect x={x(i) - barW / 2} y={y(c.earned)} width={barW} height={Math.max(0, y(0) - y(c.earned))} rx={2} className="fill-brand-coral">
              <title>{`${shortDate(c.date)}: earned ${formatTk(c.earned)}`}</title>
            </rect>
            {i % labelEvery === 0 && (
              <text x={x(i)} y={H - 10} textAnchor="middle" className="fill-footer-text text-[11px]">
                {shortDate(c.date)}
              </text>
            )}
          </g>
        );
      })}
      <path d={line} fill="none" className="stroke-brand-navy" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {chart.map((c, i) => (
        <circle key={c.date} cx={x(i)} cy={y(c.balance)} r={3.5} className="fill-white stroke-brand-navy" strokeWidth={2}>
          <title>{`${shortDate(c.date)}: balance ${formatTk(c.balance)}`}</title>
        </circle>
      ))}
    </svg>
  );
}

/** Earned per period as bars, balance at the end of each period as a line, on one Taka scale. */
function StatsChart({ chart }: { chart: AffiliateStatistics["chart"] }) {
  const max = niceMax(Math.max(...chart.map((c) => Math.max(c.balance, c.earned))));
  return (
    <figure>
      <figcaption className="mb-3 flex flex-wrap justify-end gap-4 text-[12px] text-footer-text">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-0.5 w-5 rounded-full bg-brand-navy" />
          Balance
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-3 w-3 rounded-[2px] bg-brand-coral" />
          Earned
        </span>
      </figcaption>
      <div className="sm:hidden">
        <ChartSvg chart={chart} max={max} W={340} H={230} />
      </div>
      <div className="hidden sm:block">
        <ChartSvg chart={chart} max={max} W={760} H={280} />
      </div>
    </figure>
  );
}

export function AffiliateStatisticsView({ stats }: { stats: AffiliateStatistics }) {
  const hasActivity = stats.clicks + stats.orders > 0;
  return (
    <div className="space-y-5">
      <form action={`${AFFILIATE_ROOT}/statistics`} className="flex flex-col gap-3 rounded-[8px] bg-brand-surface p-4 ring-1 ring-card-border sm:flex-row sm:items-end">
        {(
          [
            ["from", "From", stats.from],
            ["to", "To", stats.to],
          ] as const
        ).map(([name, label, value]) => (
          <label key={name} className="flex-1 sm:max-w-[220px]">
            <span className="mb-1 block text-[13px] font-medium text-brand-dark">{label}</span>
            <input type="date" name={name} defaultValue={value} max={new Date().toISOString().slice(0, 10)} className={clsx(controlClass, "h-11 border-card-border")} />
          </label>
        ))}
        <button type="submit" className={primaryButton}>
          Apply
        </button>
      </form>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        <StatCard label="Clicks" value={stats.clicks} hint={`${stats.uniqueClicks} unique`} />
        <StatCard label="Views" value={stats.views} />
        <StatCard label="Leads" value={stats.leads} />
        <StatCard label="Orders" value={stats.orders} />
        <div className="col-span-2 md:col-span-1">
          <StatCard label="Earned" value={formatTk(stats.earned)} tone="brand" />
        </div>
      </div>

      <AccountSection title="Performance">
        {hasActivity ? (
          <StatsChart chart={stats.chart} />
        ) : (
          <AccountEmptyState icon={<span className="h-[30px] w-[30px] [&>svg]:h-full [&>svg]:w-full">{AffiliateIcons.chart}</span>} title="No activity in this period">
            Try a wider date range, or share your referral link to start getting clicks.
          </AccountEmptyState>
        )}
      </AccountSection>

      <AccountSection title="Events">
        {stats.events.length === 0 ? (
          <p className="rounded-[6px] bg-star-filled/10 px-4 py-3 text-[14px] text-brand-dark">There have been no events yet.</p>
        ) : (
          <ul className="divide-y divide-card-border">
            {stats.events.map((e) => (
              <li key={`${e.date}-${e.details}`} className="flex items-start gap-3 py-3 text-[14px]">
                <span
                  className={clsx(
                    "mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em]",
                    e.type === "Order" ? "bg-success/10 text-success" : "bg-brand-link/10 text-brand-link",
                  )}
                >
                  {e.type}
                </span>
                <span className="min-w-0">
                  <span className="block text-brand-dark">{e.details}</span>
                  <span className="text-[12px] text-footer-text">{formatDateTime(e.date)}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </AccountSection>
    </div>
  );
}
