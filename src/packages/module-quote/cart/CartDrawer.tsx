"use client";

import { useEffect, useRef } from "react";
import { CartIcon } from "@/packages/module-common/icons/UiIcons";
import Link from "next/link";
import { NextImage } from "@/packages/module-common/NextImage";
import { CartLineOptions } from "./CartLineOptions";
import { useCart } from "@/packages/module-quote/context/CartContext";
import { formatTk } from "@/utils/format";
import { FreeShippingProgress } from "./CartSummary";
import { CartDrawerSkeleton } from "./CartSkeletons";
import { QuantitySelector } from "@/packages/module-common/QuantitySelector";
import { useScrollLock } from "@/packages/module-common/useScrollLock";

export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    items,
    totalCount,
    subtotal,
    removeItem,
    updateQuantity,
    isUpdating,
    isLoaded,
    cart,
  } = useCart();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useScrollLock(isCartOpen);

  useEffect(() => {
    if (!isCartOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);

    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
    };
  }, [isCartOpen, closeCart]);

  const totalSavings = items.reduce(
    (acc, item) =>
      acc +
      (item.originalPrice && item.originalPrice > item.price
        ? (item.originalPrice - item.price) * item.quantity
        : 0),
    0
  );

  return (
    <div
      className={`fixed inset-0 z-[60] transition-[visibility] duration-(--duration-panel) ${isCartOpen ? "visible" : "invisible pointer-events-none"}`}
      aria-hidden={!isCartOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-brand-black/50 transition-opacity duration-(--duration-panel) ease-out ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute top-0 right-0 h-full w-full sm:w-[400px] lg:w-[420px] bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.15)] flex flex-col font-sans transform transition-transform duration-(--duration-panel) ease-(--ease-panel) will-change-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-5 h-[60px] border-b border-card-border shrink-0">
          <div className="flex items-center gap-2.5">
            <CartIcon className="w-[22px] h-[22px] text-brand-dark" />
            <h2 className="text-[18px] font-bold text-brand-dark leading-none">My Cart</h2>
            <span className="min-w-[26px] h-[18px] px-1.5 bg-brand-black text-white text-[12px] leading-[18px] rounded-[9px] text-center">
              {totalCount}
            </span>
          </div>
          <button
            ref={closeBtnRef}
            id="cart-drawer-close"
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="w-9 h-9 rounded-full flex items-center justify-center text-brand-dark hover:bg-neutral-100 hover:rotate-90 transition-all duration-200 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length > 0 && (
          <div className="px-4 sm:px-5 py-3 bg-brand-surface border-b border-card-border shrink-0">
            <FreeShippingProgress subtotal={subtotal} />
          </div>
        )}
        {!isLoaded ? (
          <CartDrawerSkeleton />
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-brand-surface flex items-center justify-center mb-4">
              <CartIcon className="w-10 h-10 text-footer-text" />
            </div>
            <p className="text-[17px] font-semibold text-brand-dark">Your cart is empty</p>
            <p className="text-[14px] text-neutral-500 mt-1">
              Looks like you haven&apos;t added anything yet.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="mt-5 h-[42px] px-6 bg-brand-coral hover:bg-brand-coral-hover text-white text-[15px] font-semibold rounded-[4px] transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <ul className={`flex-1 overflow-y-auto transition-opacity ${isUpdating ? "opacity-60" : ""} overscroll-contain divide-y divide-card-border px-4 sm:px-5`}>
            {items.map((item) => (
              <li key={item.id} className="py-4 flex gap-3">
                <Link
                  href={item.urlKey ? `/product/${item.urlKey}` : "#"}
                  onClick={closeCart}
                  className="w-[80px] h-[80px] sm:w-[88px] sm:h-[88px] shrink-0 border border-card-border rounded-[4px] bg-white overflow-hidden"
                >
                  <NextImage
                    src={item.image}
                    alt={item.name}
                    width={88}
                    height={88}
                    className="w-full h-full object-contain"
                  />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start gap-2">
                    <Link
                      href={item.urlKey ? `/product/${item.urlKey}` : "#"}
                      onClick={closeCart}
                      className="flex-1 text-[13px] font-medium leading-[1.3] text-brand-dark line-clamp-2 hover:text-brand-coral transition-colors"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="shrink-0 w-7 h-7 -mt-1 -mr-1 rounded-full flex items-center justify-center text-neutral-400 hover:text-brand-alert hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      </svg>
                    </button>
                  </div>

                  <CartLineOptions options={item.options} className="mt-0.5" />
                  {item.origin && (
                    <p className="text-[11px] text-brand-dark mt-0.5">
                      Origin: <span className="text-brand-link">{item.origin}</span>
                    </p>
                  )}

                  <div className="mt-auto pt-2 flex items-end justify-between gap-2">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.id, q)}
                      disabled={isUpdating}
                      label={`Quantity for ${item.name}`}
                      size="sm"
                    />

                    <div className="text-right leading-tight">
                      <p className="text-brand-alert text-[15px] font-bold">
                        {formatTk(item.price * item.quantity)}
                      </p>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <p className="text-price-strikethrough text-[11px] line-through">
                          {formatTk(item.originalPrice * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-card-border px-4 sm:px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-white">
            {totalSavings > 0 && (
              <div className="flex justify-between text-[13px] text-brand-coral mb-1">
                <span>You save</span>
                <span className="font-semibold">{formatTk(totalSavings)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[15px] font-semibold text-brand-dark">Subtotal</span>
              <span className="text-[19px] font-bold text-brand-dark">{formatTk(subtotal - cart.discount)}</span>
            </div>
            <p className="text-[12px] text-neutral-500 mb-3">
              Shipping &amp; taxes calculated at checkout.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                id="cart-drawer-view-cart"
                href="/cart"
                onClick={closeCart}
                className="h-[44px] flex items-center justify-center border-2 border-brand-black text-brand-black text-[15px] font-semibold rounded-[4px] hover:bg-brand-black hover:text-white transition-colors"
              >
                View Cart
              </Link>
              <Link
                id="cart-drawer-checkout"
                href="/checkout"
                onClick={closeCart}
                className="h-[44px] flex items-center justify-center bg-brand-coral hover:bg-brand-coral-hover active:scale-[0.98] text-white text-[15px] font-semibold rounded-[4px] transition-all"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
