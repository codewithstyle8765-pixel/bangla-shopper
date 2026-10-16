"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Full INCI list, clamped to three lines with a "Show full list" toggle only when it actually overflows. */
export function IngredientList({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el || open) return;
    const measure = () => setOverflows(el.scrollHeight > el.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [open, text]);

  return (
    <div className="mt-3">
      <p ref={ref} id={id} className={`text-[14px] leading-[1.7] text-footer-text ${open ? "" : "line-clamp-3"}`}>
        {text}
      </p>
      {(overflows || open) && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="mt-2 cursor-pointer text-[13px] font-semibold text-brand-link underline-offset-2 hover:underline"
        >
          {open ? "Show less" : "Show full list"}
        </button>
      )}
    </div>
  );
}

export default IngredientList;
