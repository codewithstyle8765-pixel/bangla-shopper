"use client";

import { useEffect, useRef, useState } from "react";
import type { FilterGroup } from "@/types/storefront";
import { formatTk } from "@/utils/format";

/** Magento price buckets ("300_500", last one open: "2000_" or "2000_*") → slider bounds; an open top bucket means the far right is "and above". */
export function priceBounds(group: FilterGroup) {
  const edges = group.options.flatMap((o) => o.value.split("_")).filter((v) => v && v !== "*").map(Number).filter(Number.isFinite);
  const min = edges.length ? Math.min(...edges) : 0;
  const last = group.options.at(-1)?.value.split("_")[1];
  const open = !last || last === "*";
  const top = edges.length ? Math.max(...edges) : 0;
  const max = open ? Math.max(top * 2, min + 100) : top;
  const raw = (max - min) / 100;
  const step = raw <= 10 ? 10 : raw <= 50 ? 50 : 100;
  return { min, max, step, open };
}

const THUMB =
  "pointer-events-none absolute top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-brand-coral shadow-[0_0_0_1px_var(--color-brand-coral),0_1px_3px_rgb(0_0_0/0.25)] transition-shadow";

interface PriceRangeFilterProps {
  group: FilterGroup;
  /** Current `price` value ("from_to") or undefined. */
  value?: string;
  idPrefix: string;
  /** null clears the price filter. */
  onChange: (value: string | null) => void;
}

/** Dragging uses pointer capture on the track (touch inside the scrolling drawer, iOS); hidden range inputs keep keyboard and screen-reader control. */
export function PriceRangeFilter({ group, value, idPrefix, onChange }: PriceRangeFilterProps) {
  const { min, max, step, open } = priceBounds(group);
  const parse = (v?: string): [number, number] => {
    const [from, to] = (v ?? "").split("_");
    const lo = from ? Math.max(min, Math.min(max, Number(from))) : min;
    const hi = to && to !== "*" ? Math.max(lo, Math.min(max, Number(to))) : max;
    return [lo, hi];
  };
  const [[lo, hi], setRangeState] = useState(() => parse(value));
  const [draft, setDraft] = useState<[string, string]>(() => [String(lo), String(hi)]);
  const [focused, setFocused] = useState<0 | 1 | null>(null);
  const range = useRef<[number, number]>([lo, hi]);
  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef<0 | 1 | null>(null);

  const setRange = (next: [number, number]) => {
    range.current = next;
    setRangeState(next);
  };

  /* Follow the URL (chip removed, Clear all, back button). */
  useEffect(() => {
    const next = parse(value);
    range.current = next;
    setRangeState(next);
    setDraft([String(next[0]), String(next[1])]);
  }, [value, min, max]);

  const commit = (a: number, b: number) => {
    const from = Math.max(min, Math.min(a, b));
    const to = Math.min(max, Math.max(a, b));
    setRange([from, to]);
    setDraft([String(from), String(to)]);
    if (from <= min && to >= max) return value ? onChange(null) : undefined;
    const next = `${from > min ? from : 0}_${to >= max && open ? "" : to}`;
    if (next !== value) onChange(next);
  };

  const pct = (v: number) => ((v - min) / (max - min || 1)) * 100;
  const label = (v: number) => (v >= max && open ? `${formatTk(max, false)}+` : formatTk(v, false));

  const valueAt = (clientX: number) => {
    const rect = track.current!.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / (rect.width || 1)));
    return Math.round((min + ratio * (max - min)) / step) * step;
  };

  /** Moves one handle, keeping at least one step between them. */
  const move = (which: 0 | 1, v: number) => {
    const [a, b] = range.current;
    setRange(which === 0 ? [Math.max(min, Math.min(v, b - step)), b] : [a, Math.min(max, Math.max(v, a + step))]);
  };

  return (
    <div className="pt-1">
      <p className="mb-3 text-[14px] font-medium text-brand-dark" aria-live="polite">
        {label(lo)} – {label(hi)}
      </p>

      <div
        ref={track}
        onPointerDown={(e) => {
          const v = valueAt(e.clientX);
          const [a, b] = range.current;
          const which = v <= a ? 0 : v >= b ? 1 : v - a <= b - v ? 0 : 1;
          dragging.current = which;
          e.currentTarget.setPointerCapture(e.pointerId);
          move(which, v);
        }}
        onPointerMove={(e) => dragging.current !== null && move(dragging.current, valueAt(e.clientX))}
        onPointerUp={() => {
          if (dragging.current === null) return;
          dragging.current = null;
          commit(...range.current);
        }}
        onPointerCancel={() => {
          if (dragging.current === null) return;
          dragging.current = null;
          commit(...range.current);
        }}
        className="relative mx-[9px] h-[30px] cursor-pointer touch-none select-none"
      >
        <div className="absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-card-border" />
        <div className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-brand-coral" style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }} />
        {[lo, hi].map((v, i) => (
          <span key={i} aria-hidden="true" className={`${THUMB} ${focused === i ? "ring-4 ring-brand-coral/25" : ""}`} style={{ left: `${pct(v)}%` }} />
        ))}
        {(["Minimum", "Maximum"] as const).map((name, i) => (
          <input
            key={name}
            type="range"
            aria-label={`${name} price`}
            aria-valuetext={label(i === 0 ? lo : hi)}
            min={min}
            max={max}
            step={step}
            value={i === 0 ? lo : hi}
            onChange={(e) => move(i as 0 | 1, Number(e.target.value))}
            onKeyUp={() => commit(...range.current)}
            onFocus={() => setFocused(i as 0 | 1)}
            onBlur={() => setFocused(null)}
            className="sr-only"
          />
        ))}
      </div>

      <form
        className="mt-4 flex items-center gap-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          commit(Number(draft[0]) || min, Number(draft[1]) || max);
        }}
      >
        {(["Min", "Max"] as const).map((name, i) => (
          <label key={name} htmlFor={`${idPrefix}-price-${name}`} className="flex h-10 min-w-0 flex-1 items-center rounded-[4px] border border-card-border bg-white px-2 text-[12px] text-footer-text focus-within:border-brand-dark">
            <span className="mr-0.5 shrink-0">TK</span>
            <input
              id={`${idPrefix}-price-${name}`}
              inputMode="numeric"
              aria-label={`${name}imum price`}
              value={draft[i]}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "");
                setDraft((d) => (i === 0 ? [v, d[1]] : [d[0], v]));
              }}
              onBlur={(e) => e.currentTarget.form?.requestSubmit()}
              className="w-full min-w-0 bg-transparent text-[16px] tabular-nums text-brand-dark outline-none lg:text-[13px]"
            />
          </label>
        ))}
        <button type="submit" aria-label="Apply price" className="flex h-10 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[4px] bg-brand-dark text-white transition-colors hover:bg-brand-coral">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default PriceRangeFilter;
