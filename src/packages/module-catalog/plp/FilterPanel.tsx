"use client";

import { useState } from "react";
import clsx from "clsx";
import { Collapse } from "@/packages/module-common/Collapse";
import { RatingStars } from "@/packages/module-common/RatingStars";
import type { FilterGroup } from "@/types/storefront";
import { PriceRangeFilter } from "./PriceRangeFilter";

interface FilterPanelProps {
  filters: FilterGroup[];
  active: Record<string, string[]>;
  onToggle: (code: string, value: string, single: boolean) => void;
  /** Replaces a filter's value (null removes it); used by the price slider. */
  onSet: (code: string, value: string | null) => void;
  idPrefix: string;
}

function FilterSection({
  group,
  selected,
  onToggle,
  onSet,
  idPrefix,
}: {
  group: FilterGroup;
  selected: string[];
  onToggle: FilterPanelProps["onToggle"];
  onSet: FilterPanelProps["onSet"];
  idPrefix: string;
}) {
  const [open, setOpen] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const single = group.type !== "checkbox";
  const options = showAll ? group.options : group.options.slice(0, 6);

  return (
    <section className="border-b border-card-border py-4 first:pt-0 last:border-b-0">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full cursor-pointer items-center justify-between text-left text-[14px] font-bold uppercase tracking-[0.1em] text-brand-dark"
        >
          {group.label}
          <svg viewBox="0 0 24 24" className={clsx("h-4 w-4 transition-transform duration-(--duration-panel)", open ? "rotate-180" : "")} fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>
      <span aria-hidden="true" className="mt-2 block h-[2px] w-[30px] bg-brand-coral" />

      <Collapse open={open}>
        {group.type === "range" ? (
          <div className="mt-3">
            <PriceRangeFilter group={group} value={selected[0]} idPrefix={idPrefix} onChange={(value) => onSet(group.code, value)} />
          </div>
        ) : (
          <>
        <ul className="mt-3 space-y-0.5">
          {options.map((option) => {
            const id = `${idPrefix}-${group.code}-${option.value}`;
            const checked = selected.includes(option.value);
            return (
              <li key={option.value}>
                <label
                  htmlFor={id}
                  className={clsx(
                    "flex min-h-11 lg:min-h-9 cursor-pointer items-center gap-2.5 rounded-[4px] px-1 text-[14px] transition-colors hover:bg-brand-surface",
                    checked ? "font-medium text-brand-dark" : "text-footer-text",
                  )}
                >
                  <input
                    id={id}
                    type={single ? "radio" : "checkbox"}
                    name={`${idPrefix}-${group.code}`}
                    checked={checked}
                    onChange={() => onToggle(group.code, option.value, single)}
                    onClick={(e) => {
                      if (single && checked) {
                        e.preventDefault();
                        onToggle(group.code, option.value, single);
                      }
                    }}
                    className="h-4 w-4 shrink-0 cursor-pointer accent-brand-coral"
                  />
                  <span className="flex-1 min-w-0 truncate">
                    {group.type === "rating" ? (
                      <span className="inline-flex items-center gap-1.5">
                        <RatingStars value={Number(option.value)} size={14} gap={2} />
                        <span>&amp; up</span>
                      </span>
                    ) : (
                      option.label
                    )}
                  </span>
                  <span className="shrink-0 rounded-full bg-brand-surface px-2 text-[12px] leading-5 text-price-strikethrough">
                    {option.count}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        {group.options.length > 6 && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="mt-2 cursor-pointer text-[13px] font-medium text-brand-link hover:underline"
          >
            {showAll ? "Show less" : `Show all ${group.options.length}`}
          </button>
        )}
          </>
        )}
      </Collapse>
    </section>
  );
}

/** Price slider first (client requirement), then the other facets in API order. */
export function FilterPanel({ filters, active, onToggle, onSet, idPrefix }: FilterPanelProps) {
  const groups = filters.filter((group) => group.options.length > 0);
  return (
    <div>
      {[...groups.filter((g) => g.type === "range"), ...groups.filter((g) => g.type !== "range")]
        .map((group) => (
          <FilterSection
            key={group.code}
            group={group}
            selected={active[group.code] ?? []}
            onToggle={onToggle}
            onSet={onSet}
            idPrefix={idPrefix}
          />
        ))}
    </div>
  );
}

export default FilterPanel;
