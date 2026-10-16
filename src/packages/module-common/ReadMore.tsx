"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ShowMoreButton, scrollBackTo } from "./ShowMoreButton";

/**
 * Clamps long content to `collapsedHeight` with a fade and a Read more / Read less toggle. The full content stays in
 * the DOM (indexable); the toggle only appears when the content is actually taller than the clamp. `pill`: the centred
 * See more / See less button (PDP sections) instead of the inline link.
 */
export function ReadMore({
  children,
  collapsedHeight = 260,
  variant = "link",
  className = "",
}: {
  children: ReactNode;
  collapsedHeight?: number;
  variant?: "link" | "pill";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setOverflows(el.scrollHeight > collapsedHeight + 24);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [collapsedHeight]);

  const clamped = overflows && !open;
  const toggle = () => {
    if (open) scrollBackTo(ref.current?.closest("section") ?? ref.current);
    setOpen((v) => !v);
  };

  return (
    <div className={className}>
      <div
        id={id}
        ref={ref}
        style={clamped ? { maxHeight: collapsedHeight } : undefined}
        className={`relative ${clamped ? "overflow-clip after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-20 after:bg-gradient-to-t after:from-white after:to-transparent" : ""}`}
      >
        {children}
      </div>
      {overflows && variant === "pill" && <ShowMoreButton open={open} onToggle={toggle} more="See more" controls={id} className="mt-4" />}
      {overflows && variant === "link" && (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={id}
          className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-[14px] font-semibold text-brand-link underline-offset-2 hover:underline"
        >
          {open ? "Read less" : "Read more"}
          <svg viewBox="0 0 12 12" aria-hidden="true" className={`h-3 w-3 transition-transform duration-(--duration-panel) ${open ? "rotate-180" : ""}`}>
            <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default ReadMore;
