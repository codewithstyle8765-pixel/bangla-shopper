"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NextImage } from "@/packages/module-common/NextImage";
import { RewardCoin } from "@/packages/module-common/icons/RewardCoin";
import type { SelectOption } from "@/packages/module-common/form";
import { readLastOrder } from "@/packages/module-quote/checkout/lastOrder";
import { AddressBlock } from "@/packages/module-customer/AccountUi";
import { PrintInvoiceHeader } from "@/packages/module-customer/PrintInvoiceHeader";
import type { Order } from "@/types/storefront";
import { formatTk } from "@/utils/format";
import { estimateEarnPoints } from "@/utils/rewards";

interface OrderConfirmationProps {
  number: string | null;
  /** Signed-in customers: the order from Magento; guests: read from the checkout tab (sessionStorage). */
  initialOrder: Order | null;
  signedIn: boolean;
  countries: SelectOption[];
}

const NEXT_STEPS = [
  { title: "Confirmation call", text: "Our team calls you to confirm the order and delivery address." },
  { title: "Packed & shipped", text: "We pack your products with care and hand them to the courier." },
  { title: "Delivered", text: "Pay on delivery or relax, it's already paid. Enjoy your products!" },
];

const button = "flex h-11 items-center justify-center gap-2 rounded-[4px] px-5 text-[14px] font-semibold transition-colors";

function placedOn(iso: string) {
  return new Date(iso).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
}

/** Order confirmation: header + actions, items ordered, summary with delivery/payment, what happens next. Printable. */
export function OrderConfirmation({ number, initialOrder, signedIn, countries }: OrderConfirmationProps) {
  const [order, setOrder] = useState<Order | null>(initialOrder);
  useEffect(() => {
    if (!initialOrder && number) setOrder(readLastOrder(number));
  }, [initialOrder, number]);

  const country = (code: string) => countries.find((c) => c.value === code)?.label ?? code;
  const earn = order ? estimateEarnPoints(order.subtotal - order.discount) : 0;
  const itemCount = order?.items.reduce((n, i) => n + i.quantity, 0) ?? 0;

  return (
    <div className="mx-auto max-w-[1100px]">
      {order && (
        <PrintInvoiceHeader
          orderNumber={number ?? order.number}
          createdAt={order.createdAt}
          status="Confirmed"
        />
      )}

      <div data-print-hide className="flex flex-col items-center text-center">
        <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-coral/12">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-coral text-white">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
        </span>
        <h1 className="mt-4 text-[22px] font-black uppercase tracking-[0.1em] text-brand-dark sm:text-[26px]">Thank you for your order!</h1>
        {number && (
          <p className="mt-2 text-[15px] text-footer-text">
            Order{" "}
            {signedIn ? (
              <Link href={`/customer/account/orders/${number}`} className="font-bold text-brand-link hover:underline">
                #{number}
              </Link>
            ) : (
              <strong className="text-brand-dark">#{number}</strong>
            )}
            {order && <> · placed {placedOn(order.createdAt)}</>}
          </p>
        )}
        <p className="mt-1.5 max-w-[540px] text-[14px] leading-[1.5] text-footer-text">
          We&apos;ve emailed your order confirmation. Our team will call you to confirm before dispatch.
        </p>

        <div data-print-hide className="mt-6 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <Link href="/" className={`${button} bg-brand-coral text-white hover:bg-brand-coral-hover`}>
            Continue Shopping
          </Link>
          {signedIn ? (
            <Link href="/customer/account/orders" className={`${button} border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white`}>
              View My Orders
            </Link>
          ) : (
            <Link href="/customer/account/create" className={`${button} border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white`}>
              Create Account &amp; Earn Cash Back
            </Link>
          )}
          {order && (
            <button type="button" onClick={() => window.print()} className={`${button} cursor-pointer border-2 border-card-border text-brand-dark hover:border-brand-dark`}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z" />
              </svg>
              Print Order
            </button>
          )}
        </div>
      </div>

      {earn > 0 && (
        <div className="mx-auto mt-6 flex max-w-[640px] items-center gap-3 rounded-[8px] bg-brand-coral/8 px-4 py-3 text-left">
          <RewardCoin className="h-9 w-9" />
          <p className="text-[14px] leading-[1.45] text-brand-dark">
            {signedIn ? (
              <>
                You&apos;ll earn <strong className="text-brand-coral">{earn.toLocaleString("en-US")} Reward Points</strong> when this order is
                delivered.
              </>
            ) : (
              <>
                Customers with an account earn <strong className="text-brand-coral">{earn.toLocaleString("en-US")} Reward Points</strong> on an
                order like this.{" "}
                <Link href="/customer/account/create" data-print-hide className="font-semibold text-brand-link hover:underline">
                  Create an account
                </Link>
              </>
            )}
          </p>
        </div>
      )}

      {order && (
        <div className="mt-8 grid items-start gap-5 text-left lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6">
          <section aria-labelledby="ordered-items" className="rounded-[8px] border border-card-border bg-white">
            <h2 id="ordered-items" className="border-b border-card-border px-4 py-3.5 text-[14px] font-black uppercase tracking-[0.1em] text-brand-dark sm:px-5">
              Items Ordered <span className="font-semibold normal-case tracking-normal text-footer-text">({itemCount})</span>
            </h2>
            <ul className="divide-y divide-card-border px-4 sm:px-5">
              {order.items.map((item) => (
                <li key={item.sku} className="flex items-center gap-3 py-3.5 sm:gap-4">
                  <NextImage src={item.image} alt="" width={72} height={72} className="h-16 w-16 shrink-0 rounded-[6px] border border-card-border object-contain sm:h-[72px] sm:w-[72px]" />
                  <div className="min-w-0 flex-1">
                    {item.urlKey ? (
                      <Link href={`/product/${item.urlKey}`} className="line-clamp-2 text-[14px] font-medium leading-[1.35] text-brand-dark hover:text-brand-coral">
                        {item.name}
                      </Link>
                    ) : (
                      <p className="line-clamp-2 text-[14px] font-medium leading-[1.35] text-brand-dark">{item.name}</p>
                    )}
                    <p className="mt-1 text-[12px] text-footer-text">
                      SKU: {item.sku} · Qty {item.quantity} × {formatTk(item.price)}
                    </p>
                  </div>
                  <p className="shrink-0 text-[14px] font-bold text-brand-dark">{formatTk(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
          </section>

          <aside aria-label="Order summary" className="space-y-5 rounded-[8px] border border-card-border bg-white p-4 sm:p-5">
            <div>
              <h2 className="text-[14px] font-black uppercase tracking-[0.1em] text-brand-dark">Order Summary</h2>
              <dl className="mt-3 space-y-2 text-[14px]">
                <div className="flex justify-between">
                  <dt className="text-footer-text">Subtotal</dt>
                  <dd className="text-brand-dark">{formatTk(order.subtotal)}</dd>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-footer-text">Discount</dt>
                    <dd className="text-brand-coral">− {formatTk(order.discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-footer-text">Shipping</dt>
                  <dd className="text-brand-dark">{order.shipping ? formatTk(order.shipping) : "FREE"}</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-card-border pt-3">
                  <dt className="font-bold uppercase tracking-[0.1em] text-brand-dark">Total</dt>
                  <dd className="text-[20px] font-bold text-brand-alert">{formatTk(order.grandTotal)}</dd>
                </div>
              </dl>
            </div>
            <div className="border-t border-card-border pt-4">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-footer-text">Payment</h3>
              <p className="mt-1 text-[14px] text-brand-dark">{order.paymentMethod}</p>
            </div>
            <div className="border-t border-card-border pt-4">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-footer-text">Delivery</h3>
              <p className="mb-2 mt-1 text-[14px] text-brand-dark">{order.shippingMethod}</p>
              <AddressBlock address={order.shippingAddress} countryName={country(order.shippingAddress.countryCode)} />
            </div>
          </aside>
        </div>
      )}

      <section data-print-hide aria-label="What happens next" className="mt-8 rounded-[8px] bg-brand-surface p-4 text-left sm:p-5">
        <h2 className="text-[14px] font-black uppercase tracking-[0.1em] text-brand-dark">What happens next</h2>
        <ol className="mt-3 grid gap-4 sm:grid-cols-3">
          {NEXT_STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-coral text-[13px] font-bold text-white">{i + 1}</span>
              <span>
                <span className="block text-[14px] font-semibold text-brand-dark">{step.title}</span>
                <span className="mt-0.5 block text-[13px] leading-[1.45] text-footer-text">{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default OrderConfirmation;
