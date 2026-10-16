"use client";

import { useId, useRef, useState } from "react";
import { ShowMoreButton, scrollBackTo } from "@/packages/module-common/ShowMoreButton";

const PREVIEW_ROWS = 6;

/** Specification table: muted label, dark value, hairline rows; two columns from md. Long tables show the first rows. */
export function SpecsTable({ specs }: { specs: Array<[string, string]> }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDListElement>(null);
  const id = useId();
  const collapsible = specs.length > PREVIEW_ROWS + 1;
  const shown = collapsible && !open ? specs.slice(0, PREVIEW_ROWS) : specs;

  return (
    <div className="font-sans">
      <dl id={id} ref={ref} className="grid gap-x-10 md:grid-cols-2">
        {shown.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 border-b border-card-border py-3 text-[14px] leading-[1.45] last:border-b-0 sm:text-[15px] md:[&:nth-last-child(2):nth-child(odd)]:border-b-0"
          >
            <dt className="text-footer-text">{label}</dt>
            <dd className="font-medium text-brand-dark">{value}</dd>
          </div>
        ))}
      </dl>
      {collapsible && (
        <ShowMoreButton
          open={open}
          onToggle={() => {
            if (open) scrollBackTo(ref.current?.closest("section") ?? null);
            setOpen(!open);
          }}
          more={`See all ${specs.length} specifications`}
          controls={id}
          className="mt-4"
        />
      )}
    </div>
  );
}

export default SpecsTable;
