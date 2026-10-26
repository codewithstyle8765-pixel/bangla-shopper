"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NextImage } from "@/packages/module-common/NextImage";
import { RewardCoin } from "@/packages/module-common/icons/RewardCoin";
import type { SelectOption } from "@/packages/module-common/form";
import { readLastOrder } from "@/packages/module-quote/checkout/lastOrder";
import { AddressBlock } from "@/packages/module-customer/AccountUi";
import { PrintInvoiceHeader } from "@/packages/module-customer/PrintInvoiceHeader";
import { CommentIcon, OrderComments } from "@/packages/module-customer/OrderComments";
import type { Order } from "@/types/storefront";
import { formatDateTime, formatTk } from "@/utils/format";
import { estimateEarnPoints } from "@/utils/rewards";

interface OrderConfirmationProps {
  number: string | null;
  /** Signed-in customers: the order from Magento; guests: read from the checkout tab (sessionStorage). */
  initialOrder: Order | null;
  signedIn: boolean;
  countries: SelectOption[];
  /** Customer care number from the admin footer block. */
  hotline?: string;
}

const NEXT_STEPS = [
  { title: "Confirmation call", text: "Our team calls you to confirm the order and delivery address." },
  { title: "Packed & shipped", text: "We pack your products with care and hand them to the courier." },
  { title: "Delivered", text: "Pay on delivery or relax, it's already paid. Enjoy your products!" },
];

const lineIcon = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

const MAIL_ICON = (
  <svg {...lineIcon} className="h-[18px] w-[18px]">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="m21.5 6.5-9.5 7-9.5-7" />
  </svg>
);

const PACKAGE_ICON = (
  <svg {...lineIcon} className="h-5 w-5">
    <path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8M7.5 5.5l9 5" />
  </svg>
);

const PHONE_ICON = (
  <svg {...lineIcon} className="h-[18px] w-[18px]" strokeWidth={2}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/** Bangla first, English under it, as the client wrote the copy. */
function Bilingual({ bn, en, className, enClassName }: { bn: string; en: string; className?: string; enClassName?: string }) {
  return (
    <span className={className}>
      <span lang="bn" className="block leading-[1.7]">
        {bn}
      </span>
      <span className={enClassName ?? "mt-0.5 block text-footer-text"}>{en}</span>
    </span>
  );
}

const button = "flex h-11 items-center justify-center gap-2 rounded-[4px] px-5 text-[14px] font-semibold transition-colors";

/** Order confirmation: header + actions, items ordered, summary with delivery/payment, what happens next. Printable. */
export function OrderConfirmation({ number, initialOrder, signedIn, countries, hotline }: OrderConfirmationProps) {
  const [order, setOrder] = useState<Order | null>(initialOrder);
  useEffect(() => {
    if (!number) return;
    const saved = readLastOrder(number);
    if (!initialOrder) setOrder(saved);
    /* Until Magento returns the checkout note on the order, show the one kept from checkout. */
    else if (!initialOrder.comments?.length && saved?.comments?.length) setOrder({ ...initialOrder, comments: saved.comments });
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

      <div data-print-hide className="mx-auto flex flex-col items-center text-center lg:max-w-[780px]">
        <span aria-hidden="true" className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand-coral/10 ring-8 ring-brand-coral/5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-coral text-white shadow-[0_6px_18px_rgba(240,86,88,0.35)]">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
        </span>
        <h1 className="mt-5">
          <span lang="bn" className="block text-[22px] font-bold leading-[1.45] text-brand-dark sm:text-[28px]">
            আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!
          </span>
          <span className="mt-1 block text-[14px] font-black uppercase tracking-[0.14em] text-brand-coral sm:text-[16px]">Thank you for your order!</span>
        </h1>
        <Bilingual
          className="mt-3 block text-[14px] sm:text-[15px]"
          bn="BanglaShoppers-এর উপর আস্থা রাখার জন্য আপনাকে আন্তরিক ধন্যবাদ।"
          en="Thank you for trusting BanglaShoppers."
          enClassName="block text-[13px] text-footer-text sm:text-[14px]"
        />

        <div className="mt-6 w-full overflow-hidden rounded-[10px] border border-card-border bg-white text-left shadow-[0_6px_24px_rgba(0,0,0,0.05)]">
          <dl className="grid divide-y divide-dashed divide-card-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {number && (
              <div className="px-5 py-4">
                <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-footer-text">
                  <span lang="bn" className="normal-case tracking-normal">অর্ডার নম্বর</span> · Order number
                </dt>
                <dd className="mt-1 text-[18px] font-black text-brand-dark">
                  {signedIn ? (
                    <Link href={`/customer/account/orders/${number}`} className="text-brand-link hover:underline">
                      #{number}
                    </Link>
                  ) : (
                    <>#{number}</>
                  )}
                </dd>
              </div>
            )}
            {order && (
              <div className="px-5 py-4">
                <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-footer-text">
                  <span lang="bn" className="normal-case tracking-normal">অর্ডারের সময়</span> · Placed on
                </dt>
                <dd className="mt-1 text-[18px] font-black text-brand-dark">{formatDateTime(order.createdAt)}</dd>
              </div>
            )}
          </dl>
          <div className="flex items-start gap-3 border-t border-card-border bg-success/5 px-5 py-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-success/10 text-success">{MAIL_ICON}</span>
            <Bilingual
              className="block text-[14px] text-brand-dark"
              bn="আপনার অর্ডারের কনফার্মেশন ইমেইল পাঠানো হয়েছে। পণ্য পাঠানোর আগে অর্ডারটি নিশ্চিত করতে আমাদের টিম আপনাকে ফোন করবে।"
              en="We've emailed your order confirmation. Our team will call you to confirm before dispatch."
              enClassName="mt-1 block text-[13px] leading-[1.5] text-footer-text"
            />
          </div>
        </div>

        <section aria-labelledby="delivery-reminder" className="mt-4 w-full overflow-hidden rounded-[10px] border border-brand-coral/25 bg-white text-left">
          <div className="flex items-center gap-3 bg-brand-coral/[0.06] px-5 py-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-coral text-white">{PACKAGE_ICON}</span>
            <h2 id="delivery-reminder">
              <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-brand-coral">Important delivery reminder</span>
              <span lang="bn" className="block text-[17px] font-bold leading-[1.45] text-brand-dark sm:text-[19px]">
                ডেলিভারির সময় একটি বিশেষ অনুরোধ
              </span>
            </h2>
          </div>
          <div className="grid gap-4 px-5 py-4 md:grid-cols-2 md:gap-6">
            <p lang="bn" className="text-[15px] leading-[1.85] text-brand-dark">
              পণ্য গ্রহণের সময় অনুগ্রহ করে ডেলিভারি প্রতিনিধির উপস্থিতিতে অর্ডারের পণ্যগুলো সঠিক ও অক্ষত আছে কি না যাচাই করে নিন। কোনো সমস্যা বা অসংগতি দেখতে পেলে সঙ্গে সঙ্গে
              আমাদের কাস্টমার কেয়ারে যোগাযোগ করুন।
            </p>
            <p className="border-t border-card-border pt-4 text-[14px] leading-[1.7] text-footer-text md:border-l md:border-t-0 md:pl-6 md:pt-0">
              When receiving your order, please check that all items are correct and in good condition in the presence of the delivery representative. If you notice any
              missing, incorrect or damaged items, please contact our customer care team immediately.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 border-t border-card-border bg-brand-surface px-5 py-4 sm:flex-row sm:justify-between">
            <Bilingual
              className="block text-center text-[13px] text-brand-dark sm:text-left"
              bn="আপনার সন্তুষ্টি ও নিরাপদ কেনাকাটাই আমাদের অগ্রাধিকার।"
              en="Your satisfaction and a safe shopping experience are our priorities."
              enClassName="block text-[12px] text-footer-text"
            />
            {hotline && (
              <a
                href={`tel:${hotline.replace(/\s+/g, "")}`}
                className="flex shrink-0 items-center gap-2.5 rounded-full border-2 border-brand-coral bg-white py-1.5 pl-1.5 pr-4 text-brand-coral transition-colors hover:bg-brand-coral hover:text-white"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-coral text-white">{PHONE_ICON}</span>
                <span className="text-left leading-tight">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.08em]">
                    <span lang="bn" className="normal-case tracking-normal">কাস্টমার কেয়ার</span> · Customer care
                  </span>
                  <span className="block text-[17px] font-black">{hotline}</span>
                </span>
              </a>
            )}
          </div>
        </section>

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
        <div className="mx-auto mt-6 flex items-center gap-3 lg:max-w-[640px] rounded-[8px] bg-brand-coral/8 px-4 py-3 text-left">
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
            {!!order.comments?.length && (
              <div className="border-t border-card-border pt-4">
                <h3 className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-footer-text">
                  <CommentIcon className="h-4 w-4" />
                  Your order comment
                </h3>
                <OrderComments comments={order.comments} showDate={false} className="mt-2" />
              </div>
            )}
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
