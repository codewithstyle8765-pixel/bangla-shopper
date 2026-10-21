"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { GuaranteeIcon, ReturnPolicyIcon } from "@/packages/module-common/icons/TrustIcons";
import clsx from "clsx";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/config";
import { NextImage } from "@/packages/module-common/NextImage";
import { Collapse } from "@/packages/module-common/Collapse";
import { useCart } from "@/packages/module-quote/context/CartContext";
import { formatTk } from "@/utils/format";

export function FreeShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  return (
    <div>
      <p className="text-[13px] text-brand-dark">
        {remaining > 0 ? (
          <>
            Add <strong className="text-brand-coral">{formatTk(remaining)}</strong> more for <strong>FREE shipping</strong>
          </>
        ) : (
          <strong className="text-brand-link">You&apos;ve unlocked FREE shipping!</strong>
        )}
      </p>
      <div className="mt-2 h-[6px] w-full overflow-hidden rounded-full bg-card-border" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Free shipping progress">
        <div className="h-full rounded-full bg-brand-coral transition-[width] duration-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export function CouponForm() {
  const { cart, applyCoupon, removeCoupon, isUpdating } = useCart();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = useId();

  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open]);

  if (cart.couponCode) {
    return (
      <div>
        <div className="flex items-center justify-between rounded-[4px] border border-dashed border-brand-coral bg-brand-coral/5 px-3 py-2 text-[13px]">
          <span>
            Coupon <strong className="uppercase text-brand-coral">{cart.couponCode}</strong> applied
          </span>
          <button
            type="button"
            onClick={async () => setMessage((await removeCoupon()) ? null : { ok: false, text: "Could not remove the coupon. Please try again." })}
            disabled={isUpdating}
            className="cursor-pointer font-medium text-brand-link hover:underline"
          >
            Remove
          </button>
        </div>
        {message && !message.ok && (
          <p role="alert" className="mt-1.5 text-[12px] text-brand-alert">
            {message.text}
          </p>
        )}
      </div>
    );
  }

  const submit = async () => {
    const result = await applyCoupon(code);
    setMessage(result.ok ? { ok: true, text: "Coupon applied." } : { ok: false, text: result.message });
    if (result.ok) setCode("");
  };

  const error = message && !message.ok;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${uid}-panel`}
        className="group inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-brand-link"
      >
        <span className="underline-offset-2 group-hover:underline">Have a coupon code?</span>
        <svg viewBox="0 0 12 12" className={clsx("h-[11px] w-[11px] transition-transform duration-(--duration-panel)", open && "rotate-180")} fill="none" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <Collapse open={open} id={`${uid}-panel`}>
        <div className="flex h-10 pt-2 box-content">
          <input
            ref={inputRef}
            id={`${uid}-code`}
            aria-label="Coupon code"
            aria-invalid={error || undefined}
            aria-describedby={message ? `${uid}-message` : undefined}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (message) setMessage(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (code.trim()) void submit();
              }
            }}
            placeholder="Enter code (try BANGLA10)"
            className={clsx(
              "min-w-0 flex-1 rounded-l-[4px] border border-r-0 px-3 text-[14px] uppercase outline-none placeholder:normal-case",
              error ? "border-brand-alert" : "border-card-border focus:border-brand-dark",
            )}
          />
          <button type="button" onClick={() => void submit()} disabled={isUpdating || !code.trim()} className="btn-dark !rounded-l-none px-4 text-[14px] font-semibold disabled:opacity-60">
            Apply
          </button>
        </div>
        {message && (
          <p id={`${uid}-message`} role={message.ok ? "status" : "alert"} className={clsx("mt-1.5 text-[12px]", message.ok ? "text-brand-link" : "text-brand-alert")}>
            {message.text}
          </p>
        )}
      </Collapse>
    </div>
  );
}

interface CartTotalsProps {
  shipping?: number | null;
  /** Reward points applied at checkout. */
  reward?: { points: number; amount: number } | null;
  children?: ReactNode;
}

/** `shipping` undefined renders "Calculated at checkout". */
export function CartTotals({ shipping, reward, children }: CartTotalsProps) {
  const { cart } = useCart();
  const shippingAmount = shipping ?? 0;
  const total = Math.max(0, cart.subtotal - cart.discount - (reward?.amount ?? 0) + shippingAmount);

  return (
    <dl className="space-y-2.5 text-[14px]">
      <div className="flex justify-between">
        <dt className="text-footer-text">Subtotal ({cart.totalQuantity} {cart.totalQuantity === 1 ? "item" : "items"})</dt>
        <dd className="font-medium text-brand-dark">{formatTk(cart.subtotal)}</dd>
      </div>
      {cart.discount > 0 && (
        <div className="flex justify-between">
          <dt className="text-footer-text">Discount</dt>
          <dd className="font-medium text-brand-coral">− {formatTk(cart.discount)}</dd>
        </div>
      )}
      {reward && (
        <div className="flex justify-between">
          <dt className="text-footer-text">Reward points ({reward.points.toLocaleString("en-US")} pts)</dt>
          <dd className="font-medium text-brand-coral">− {formatTk(reward.amount)}</dd>
        </div>
      )}
      <div className="flex justify-between">
        <dt className="text-footer-text">Shipping</dt>
        <dd className="font-medium text-brand-dark">
          {shipping === undefined ? "Calculated at checkout" : shipping === 0 ? "FREE" : formatTk(shippingAmount)}
        </dd>
      </div>
      {children}
      <div className="flex items-baseline justify-between border-t border-card-border pt-3">
        <dt className="text-[16px] font-bold uppercase tracking-[0.1em] text-brand-dark">Total</dt>
        <dd className="text-[22px] font-bold text-brand-alert">{formatTk(total)}</dd>
      </div>
    </dl>
  );
}

export function TrustBadges({ centered = false }: { centered?: boolean }) {
  return (
    <div className={clsx("space-y-3 text-[12px] text-footer-text", centered && "flex flex-col items-center")}>
      <div className="space-y-3 text-left">
        <div className="flex items-center gap-2.5 text-left">
          <GuaranteeIcon className="h-8 w-8 shrink-0" />
          <span className="text-left">
            <strong className="text-brand-dark">100% Authentic</strong> brand products, guaranteed
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-left">
          <ReturnPolicyIcon className="h-8 w-8 shrink-0" />
          <span className="text-left">
            <strong className="text-brand-dark">7-day</strong> easy returns &amp; exchanges
          </span>
        </div>
      </div>
      <div className={clsx("flex w-full", centered ? "justify-center" : "justify-start")}>
        <NextImage
          src="/assets/images/footer/payment-logos.webp"
          alt="Accepted payments: Visa, Mastercard, American Express, bKash, Nagad, Rocket, City Bank, upay and more via SSLCommerz"
          width={1851}
          height={416}
          sizes="(max-width: 640px) 100vw, 340px"
          className="h-auto w-full max-w-full sm:max-w-[340px] pt-1"
        />
      </div>
    </div>
  );
}
