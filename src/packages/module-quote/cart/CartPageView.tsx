"use client";

import Link from "next/link";
import { CartIcon } from "@/packages/module-common/icons/UiIcons";
import clsx from "clsx";
import { NextImage } from "@/packages/module-common/NextImage";
import { CartLineOptions } from "./CartLineOptions";
import { useCart } from "@/packages/module-quote/context/CartContext";
import { formatTk } from "@/utils/format";
import { CartTotals, CouponForm, FreeShippingProgress, TrustBadges } from "./CartSummary";
import { CartPageSkeleton } from "./CartSkeletons";
import { QuantitySelector } from "@/packages/module-common/QuantitySelector";
import { EarnPointsNote } from "@/packages/module-quote/checkout/EarnPointsNote";
import { useCustomerName } from "@/packages/module-customer/session";

export function CartPageView() {
  const { cart, isLoaded, isUpdating, updateQuantity, removeItem, error } = useCart();
  const signedIn = Boolean(useCustomerName());

  if (!isLoaded) return <CartPageSkeleton />;

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-[8px] border border-card-border px-6 py-16 text-center">
        <CartIcon className="h-12 w-12 text-footer-text" />
        <h2 className="mt-4 text-[18px] font-bold text-brand-dark">Your cart is empty</h2>
        <p className="mt-1 text-[14px] text-footer-text">Discover authentic beauty products and add them to your cart.</p>
        <Link href="/" className="mt-6 flex h-11 items-center rounded-[4px] bg-brand-coral px-8 text-[15px] font-semibold text-white hover:bg-brand-coral-hover">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const savings = cart.items.reduce((acc, i) => acc + (i.originalPrice ? (i.originalPrice - i.price) * i.quantity : 0), 0);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section aria-label="Cart items" className={clsx("transition-opacity", isUpdating && "opacity-60")}>
        <div className="mb-3 hidden grid-cols-[minmax(0,1fr)_120px_130px_120px] gap-4 border-b-2 border-brand-dark pb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-dark md:grid">
          <span>Product</span>
          <span className="text-right">Price</span>
          <span className="text-center">Quantity</span>
          <span className="text-right">Total</span>
        </div>

        {error && (
          <p role="alert" className="mb-3 rounded-[4px] bg-brand-alert/10 px-3 py-2 text-[13px] text-brand-alert">
            {error}
          </p>
        )}

        <ul className="divide-y divide-card-border">
          {cart.items.map((item) => (
            <li key={item.id} className="grid grid-cols-[88px_minmax(0,1fr)] gap-x-3 gap-y-3 py-4 md:grid-cols-[minmax(0,1fr)_120px_130px_120px] md:items-center md:gap-4">
              <div className="row-span-2 md:row-span-1 md:flex md:items-center md:gap-4">
                <Link href={`/product/${item.urlKey}`} className="block h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[4px] border border-card-border bg-white">
                  <NextImage src={item.image} alt={item.name} width={88} height={88} className="h-full w-full object-contain" />
                </Link>
                <div className="hidden min-w-0 md:block">
                  <Link href={`/product/${item.urlKey}`} className="line-clamp-2 text-[14px] font-medium leading-[1.35] text-brand-dark hover:text-brand-coral">
                    {item.name}
                  </Link>
                  <CartLineOptions options={item.options} className="mt-1" />
                  {item.origin && (
                    <p className="mt-1 text-[12px] text-brand-dark">
                      Product Origin: <span className="text-brand-link">{item.origin}</span>
                    </p>
                  )}
                  <button type="button" onClick={() => removeItem(item.id)} className="mt-2 cursor-pointer text-[13px] font-medium text-brand-alert hover:underline">
                    Remove
                  </button>
                </div>
              </div>

              <div className="min-w-0 md:hidden">
                <div className="flex items-start gap-2">
                  <Link href={`/product/${item.urlKey}`} className="line-clamp-2 flex-1 text-[13px] font-medium leading-[1.35] text-brand-dark">
                    {item.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="-mr-2 -mt-2 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center text-price-strikethrough hover:text-brand-alert"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    </svg>
                  </button>
                </div>
                <CartLineOptions options={item.options} className="mt-0.5" />
                <p className="mt-1 text-[13px] font-bold text-brand-alert">{formatTk(item.price)}</p>
              </div>

              <div className="hidden text-right md:block">
                <p className="text-[15px] font-semibold text-brand-dark">{formatTk(item.price)}</p>
                {item.originalPrice && <p className="text-[12px] text-price-strikethrough line-through">{formatTk(item.originalPrice)}</p>}
              </div>

              <div className="col-start-2 flex items-center justify-between md:col-start-auto md:justify-center">
                <QuantitySelector
                  value={item.quantity}
                  onChange={(q) => updateQuantity(item.id, q)}
                  disabled={isUpdating}
                  label={`Quantity for ${item.name}`}
                />
                <p className="text-[15px] font-bold text-brand-dark md:hidden">{formatTk(item.price * item.quantity)}</p>
              </div>

              <p className="hidden text-right text-[16px] font-bold text-brand-dark md:block">{formatTk(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-card-border pt-4">
          <Link href="/" className="text-[14px] font-semibold text-brand-dark hover:text-brand-coral">
            ‹ Continue Shopping
          </Link>
          {savings > 0 && (
            <p className="text-[14px] text-brand-dark">
              You are saving <strong className="text-brand-coral">{formatTk(savings)}</strong> on this order
            </p>
          )}
        </div>
      </section>

      <aside aria-label="Order summary" className="space-y-5 rounded-[6px] border border-card-border bg-white p-5 lg:sticky lg:top-4">
        <h2 className="text-[16px] font-black uppercase tracking-[0.1em] text-brand-dark">Order Summary</h2>
        <FreeShippingProgress subtotal={cart.subtotal} />
        <CouponForm />
        <CartTotals />
        <EarnPointsNote amount={cart.subtotal - cart.discount} signedIn={signedIn} />
        <Link
          href="/checkout"
          className="hidden h-12 w-full items-center justify-center rounded-[4px] bg-brand-coral text-[17px] font-semibold text-white transition-colors hover:bg-brand-coral-hover lg:flex"
        >
          Proceed to Checkout
        </Link>
        <div className="hidden lg:block">
          <TrustBadges />
        </div>
        <div className="lg:hidden">
          <TrustBadges centered />
        </div>
      </aside>

      <div data-sticky-cta="cart" className="fixed inset-x-0 bottom-[calc(4rem+1px+env(safe-area-inset-bottom))] z-30 flex items-center gap-3 border-t border-card-border bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="text-[12px] text-footer-text">Total ({cart.totalQuantity} items)</p>
          <p className="text-[18px] font-bold text-brand-alert">{formatTk(Math.max(0, cart.subtotal - cart.discount))}</p>
        </div>
        <Link href="/checkout" className="flex h-12 items-center rounded-[4px] bg-brand-coral px-6 text-[16px] font-semibold text-white">
          Checkout
        </Link>
      </div>
    </div>
  );
}

export default CartPageView;
