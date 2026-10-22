"use client";

import { useState, type KeyboardEvent } from "react";
import clsx from "clsx";

interface QuantitySelectorProps {
  /** Controlled quantity (cart lines); omit to let the selector keep its own (PDP). */
  value?: number;
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  /** md: PDP size (132×40, the Add to Cart height). sm: same design, compact for the cart drawer. */
  size?: "md" | "sm";
  label?: string;
  className?: string;
}

const SIZES = {
  md: { box: "w-[132px] h-[40px]", button: "w-[40px]", input: "w-[50px] text-[16px]" },
  sm: { box: "w-[110px] h-[36px]", button: "w-[34px]", input: "w-[40px] text-[16px] lg:text-[15px]" },
};

export function QuantitySelector({
  value,
  initialValue = 1,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
  size = "md",
  label = "Product quantity",
  className = "",
}: QuantitySelectorProps) {
  const [own, setOwn] = useState(initialValue);
  const current = value ?? own;
  /* What the customer is typing; committed on blur / Enter so a cart line is not updated per keystroke. */
  const [draft, setDraft] = useState<string | null>(null);
  const s = SIZES[size];

  const commit = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    setDraft(null);
    if (clamped === current) return;
    if (value === undefined) setOwn(clamped);
    onChange?.(clamped);
  };

  const commitDraft = () => {
    if (draft === null) return;
    const parsed = parseInt(draft, 10);
    if (Number.isNaN(parsed)) setDraft(null);
    else commit(parsed);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitDraft();
    }
  };

  const button = clsx(
    s.button,
    "h-full flex items-center justify-center text-price-strikethrough hover:bg-brand-surface hover:text-brand-dark disabled:cursor-default disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-price-strikethrough cursor-pointer transition-colors",
  );

  return (
    <div role="group" aria-label={label} className={clsx(s.box, "border border-divider rounded-[4px] bg-white flex items-center select-none overflow-hidden", className)}>
      <button type="button" onClick={() => commit(current - 1)} disabled={disabled || current <= min} className={button} aria-label="Decrease quantity">
        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
          <path d="M1 8h14" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={draft ?? current}
        disabled={disabled}
        onChange={(e) => setDraft(e.target.value.replace(/\D/g, "").slice(0, 2))}
        onBlur={commitDraft}
        onKeyDown={onKeyDown}
        aria-label="Quantity"
        className={clsx(s.input, "h-full text-center font-normal text-brand-dark border-x border-divider outline-none bg-transparent focus-visible:bg-brand-surface disabled:opacity-60")}
      />

      <button type="button" onClick={() => commit(current + 1)} disabled={disabled || current >= max} className={button} aria-label="Increase quantity">
        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
          <path d="M1 8h14M8 1v14" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}

export default QuantitySelector;
