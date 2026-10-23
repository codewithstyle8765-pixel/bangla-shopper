"use client";

import { useState } from "react";
import clsx from "clsx";
import { Modal } from "@/packages/module-common/Modal";
import { NextImage } from "@/packages/module-common/NextImage";
import { Checkbox, controlClass, TextField } from "@/packages/module-common/form";
import type { AffiliateBanner, AffiliateProgram, AffiliateWidgetProduct } from "@/types/storefront";
import { formatTk } from "@/utils/format";
import { CopyButton, CopyField, ShareButtons } from "./CopyField";
import { primaryButton } from "./AffiliateUi";

/** Adds the affiliate's `acc` key to any page of this store; null for other sites or unreadable input. */
function referralLinkFor(input: string, referralUrl: string): string | null {
  const base = new URL(referralUrl);
  const key = base.searchParams.get("acc");
  if (!key) return null;
  try {
    const target = new URL(input.trim().startsWith("/") ? input.trim() : /^https?:\/\//i.test(input.trim()) ? input.trim() : `https://${input.trim()}`, base.origin);
    if (target.hostname.replace(/^www\./, "") !== base.hostname.replace(/^www\./, "")) return null;
    target.protocol = base.protocol;
    target.host = base.host;
    target.searchParams.set("acc", key);
    return target.toString();
  } catch {
    return null;
  }
}

export function ReferralLinkGenerator({ referralUrl }: { referralUrl: string }) {
  const origin = new URL(referralUrl).origin;
  const [page, setPage] = useState(`${origin}/`);
  const link = page.trim() ? referralLinkFor(page, referralUrl) : null;

  return (
    <div className="space-y-4">
      <TextField
        id="referral-page"
        label="Any page from our store"
        value={page}
        onChange={(e) => setPage(e.target.value)}
        placeholder={`${origin}/category/makeup`}
        inputMode="url"
        autoCapitalize="none"
        hint="Paste a product, category or sale page link to create a referral link for it."
        error={page.trim() && !link ? `Enter a link from ${new URL(origin).hostname}.` : undefined}
      />
      <div>
        <p className="mb-1 text-[13px] font-medium text-brand-dark">Your referral link</p>
        <CopyField value={link ?? referralUrl} label="Your referral link" />
      </div>
      <ShareButtons url={link ?? referralUrl} />
    </div>
  );
}

function CodeDialog({ open, onClose, title, code }: { open: boolean; onClose: () => void; title: string; code: string }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="md" center footer={<CopyButton text={code} label="Copy Code" className="w-full sm:w-auto" />}>
      <p className="mb-3 text-[14px] text-footer-text">Paste this code into your website or blog where you want it to appear.</p>
      <textarea readOnly value={code} rows={5} onFocus={(e) => e.currentTarget.select()} className={clsx(controlClass, "border-card-border py-2.5 font-mono text-[13px]! leading-[1.5]")} />
    </Modal>
  );
}

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function BannerCodeButton({ banner, referralUrl }: { banner: AffiliateBanner; referralUrl: string }) {
  const [open, setOpen] = useState(false);
  const origin = new URL(referralUrl).origin;
  const href = referralLinkFor(banner.url, referralUrl) ?? referralUrl;
  const image = banner.image.startsWith("http") ? banner.image : `${origin}${banner.image}`;
  const code = `<a href="${escape(href)}" target="_blank"><img src="${escape(image)}" width="${banner.width}" height="${banner.height}" alt="${escape(banner.title)}" /></a>`;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={clsx(primaryButton, "h-10 px-5 text-[14px]")}>
        Get Code
      </button>
      <CodeDialog open={open} onClose={() => setOpen(false)} title={banner.title} code={code} />
    </>
  );
}

const numberIn = (value: string, min: number, max: number, fallback: number) => {
  const n = Math.round(Number(value));
  return Number.isFinite(n) && n >= min ? Math.min(max, n) : fallback;
};

export function ReferralWidgetBuilder({ referralUrl, products }: { referralUrl: string; products: AffiliateWidgetProduct[] }) {
  const [title, setTitle] = useState("Related Products");
  const [count, setCount] = useState("6");
  const [width, setWidth] = useState("250");
  const [height, setHeight] = useState("365");
  const [source, setSource] = useState<"bestsellers" | "new">("bestsellers");
  const [names, setNames] = useState(true);
  const [prices, setPrices] = useState(true);
  const [open, setOpen] = useState(false);

  const n = numberIn(count, 1, 12, 6);
  const w = numberIn(width, 160, 600, 250);
  const h = numberIn(height, 200, 900, 365);
  const shown = (source === "new" ? [...products].reverse() : products).slice(0, n);
  const base = new URL(referralUrl);
  const params = new URLSearchParams({ acc: base.searchParams.get("acc") ?? "", title, limit: String(n), type: source, names: names ? "1" : "0", prices: prices ? "1" : "0" });
  const code = `<iframe src="${escape(`${base.origin}/affiliate/widget/?${params}`)}" width="${w}" height="${h}" style="border:0" loading="lazy" title="${escape(title)}"></iframe>`;

  return (
    <div className="grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        <TextField id="widget-title" label="Widget title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="grid grid-cols-3 gap-3">
          <TextField id="widget-count" label="Products" type="number" inputMode="numeric" min={1} max={12} value={count} onChange={(e) => setCount(e.target.value)} />
          <TextField id="widget-width" label="Width (px)" type="number" inputMode="numeric" min={160} value={width} onChange={(e) => setWidth(e.target.value)} />
          <TextField id="widget-height" label="Height (px)" type="number" inputMode="numeric" min={200} value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div role="radiogroup" aria-label="Products to show" className="flex flex-wrap gap-2">
          {(
            [
              ["bestsellers", "Bestsellers"],
              ["new", "New products"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={source === value}
              onClick={() => setSource(value)}
              className={clsx(
                "cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors",
                source === value ? "border-brand-coral bg-brand-coral text-white" : "border-card-border text-brand-dark hover:border-brand-dark",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-6">
          <Checkbox id="widget-names" checked={names} onChange={(e) => setNames(e.target.checked)} label="Show product names" />
          <Checkbox id="widget-prices" checked={prices} onChange={(e) => setPrices(e.target.checked)} label="Show prices" />
        </div>
        <button type="button" onClick={() => setOpen(true)} className={primaryButton}>
          Get Code
        </button>
      </div>

      <div className="flex justify-center overflow-hidden rounded-[8px] bg-brand-surface p-4 sm:p-6">
        <div className="flex max-w-full flex-col overflow-hidden rounded-[6px] border border-card-border bg-white shadow-[0_4px_18px_rgba(0,0,0,0.06)]" style={{ width: w, height: Math.min(h, 520) }}>
          <p className="truncate border-b border-card-border px-3 py-2.5 text-[14px] font-bold text-brand-dark">{title || " "}</p>
          <ul className="grid flex-1 grid-cols-2 content-start gap-3 overflow-y-auto p-3">
            {shown.map((p) => (
              <li key={p.name} className="text-center">
                <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-[4px] bg-placeholder">
                  <NextImage src={p.image} alt="" fill sizes="120px" className="object-contain" />
                </div>
                {names && <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.35] text-brand-dark">{p.name}</p>}
                {prices && <p className="mt-0.5 text-[12px] font-bold text-brand-coral">{formatTk(p.price, false)}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CodeDialog open={open} onClose={() => setOpen(false)} title="Referral widget code" code={code} />
    </div>
  );
}

/** "Our programs": one tab per program, each listing what every affiliate group earns. */
export function ProgramGroupTabs({ programs, currentGroup }: { programs: AffiliateProgram[]; currentGroup: string }) {
  const [active, setActive] = useState(0);
  const program = programs[active] ?? programs[0];
  if (!program) return null;

  return (
    <div>
      <div role="tablist" aria-label="Programs" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {programs.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={clsx(
              "shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors",
              i === active ? "border-brand-dark bg-brand-dark text-white" : "border-card-border text-brand-dark hover:border-brand-dark",
            )}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-4">
        {program.description && <p className="mb-3 text-[13px] text-footer-text">{program.description}</p>}
        <ul className="grid gap-3 sm:grid-cols-2">
          {program.groups.map((g) => {
            const mine = g.name === currentGroup;
            return (
              <li key={g.name} className={clsx("rounded-[8px] border p-4", mine ? "border-brand-coral bg-brand-coral/5" : "border-card-border")}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[15px] font-bold text-brand-dark">{g.name}</p>
                  {mine && <span className="rounded-full bg-brand-coral px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em] text-white">Your group</span>}
                </div>
                <p className="mt-1 text-[12px] leading-[1.45] text-footer-text">{g.description}</p>
                <ul className="mt-3 space-y-1 text-[13px] text-footer-text">
                  {g.commissions.map((c) => (
                    <li key={c.text}>
                      <strong className="text-[15px] font-black text-brand-coral">{c.value}</strong> {c.text}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
