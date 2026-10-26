"use client";

import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { Collapse } from "@/packages/module-common/Collapse";

/** The checkout summary renders twice (phone and desktop), so the note lives in CheckoutView and both copies share it. */
export function OrderNoteForm({ note, onChange }: { note: string; onChange: (note: string) => void }) {
  const [open, setOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isFirstRender = useRef(true);
  const uid = useId();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (open) {
      textareaRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <div className="pt-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${uid}-panel`}
        className="group inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-brand-coral hover:text-brand-coral-hover"
      >
        <span className="underline-offset-2 group-hover:underline">Add order note</span>
        <svg
          viewBox="0 0 12 12"
          className={clsx("h-[11px] w-[11px] transition-transform duration-(--duration-panel)", open && "rotate-180")}
          fill="none"
          aria-hidden="true"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {note.trim() && !open && (
          <span className="ml-1 inline-flex items-center rounded-full bg-brand-coral/10 px-2 py-0.5 text-[11px] font-semibold text-brand-coral">
            Note added
          </span>
        )}
      </button>

      <Collapse open={open} id={`${uid}-panel`}>
        <div className="pt-2.5">
          <textarea
            ref={textareaRef}
            id={`${uid}-note`}
            rows={3}
            value={note}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Notes about your order, e.g. special delivery instructions"
            className="w-full resize-y rounded-[4px] border border-card-border bg-white px-3 py-2 text-[13px] text-brand-dark placeholder:text-footer-text/70 focus:border-brand-coral focus:outline-none focus:ring-1 focus:ring-brand-coral"
          />
        </div>
      </Collapse>
    </div>
  );
}

export default OrderNoteForm;
