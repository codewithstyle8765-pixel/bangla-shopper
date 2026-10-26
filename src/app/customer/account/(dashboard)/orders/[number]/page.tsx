import { Suspense } from "react";
import { OrderDetailSkeleton } from "@/packages/module-customer/AccountSkeletons";
import type { Metadata } from "next";
import { PageTitle } from "@/packages/module-common/PageTitle";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NextImage } from "@/packages/module-common/NextImage";
import { AccountSection, AddressBlock } from "@/packages/module-customer/AccountUi";
import { OrderComments } from "@/packages/module-customer/OrderComments";
import { CancelOrderButton } from "@/packages/module-customer/CancelOrderButton";
import { ReorderAction, PrintOrderAction } from "@/packages/module-customer/OrderDetailActions";
import { PrintInvoiceHeader } from "@/packages/module-customer/PrintInvoiceHeader";
import type { OrderStatus } from "@/types/storefront";
import { getOrder } from "@/utils/magento/customer";
import { countryName, getCountries } from "@/utils/magento/directory";
import { formatDate, formatTk } from "@/utils/format";

export const metadata: Metadata = { title: "Order Details | BanglaShoppers", robots: { index: false } };

const TRACK: OrderStatus[] = ["pending", "processing", "shipped", "delivered"];

async function OrderDetailPageContent({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const [order, countries] = await Promise.all([getOrder(number), getCountries()]);
  if (!order) notFound();
  const step = TRACK.indexOf(order.status);

  return (
    <>
      <PrintInvoiceHeader
        orderNumber={order.number}
        createdAt={order.createdAt}
        status={order.status}
      />

      <div data-print-hide>
        <PageTitle
          description={`Placed on ${formatDate(order.createdAt)}`}
          action={
            <div data-print-hide className="flex items-center justify-center sm:justify-end gap-2.5 w-full sm:w-auto mt-2 sm:mt-0">
              <ReorderAction items={order.items} className="flex-1 sm:flex-initial sm:w-auto" />
              {order.status === "pending" && (
                <CancelOrderButton orderId={order.id} orderNumber={order.number} className="flex-1 sm:flex-initial sm:w-auto" />
              )}
            </div>
          }
        >
          Order #{order.number}
        </PageTitle>
      </div>

      {order.status !== "canceled" && (
        <ol data-print-hide className="grid grid-cols-4 rounded-[6px] border border-card-border bg-white p-4" aria-label="Order progress">
          {TRACK.map((s, i) => (
            <li key={s} className="relative flex flex-col items-center text-center">
              {i > 0 && <span aria-hidden="true" className={`absolute right-1/2 top-3 h-[2px] w-full ${i <= step ? "bg-brand-coral" : "bg-card-border"}`} />}
              <span className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold ${i <= step ? "bg-brand-coral text-white" : "bg-card-border text-footer-text"}`}>
                {i < step ? "✓" : i + 1}
              </span>
              <span className={`mt-2 text-[11px] font-medium capitalize sm:text-[13px] ${i <= step ? "text-brand-dark" : "text-footer-text"}`}>{s}</span>
            </li>
          ))}
        </ol>
      )}

      <AccountSection title="Items Ordered">
        <ul className="divide-y divide-card-border">
          {order.items.map((item) => (
            <li key={item.sku} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 print:break-inside-avoid print:page-break-inside-avoid">
              <NextImage src={item.image} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-[4px] border border-card-border object-contain" />
              <div className="min-w-0 flex-1">
                {item.urlKey ? (
                  <Link href={`/product/${item.urlKey}`} className="line-clamp-2 text-[14px] font-medium text-brand-dark hover:text-brand-coral">
                    {item.name}
                  </Link>
                ) : (
                  <p className="line-clamp-2 text-[14px] font-medium text-brand-dark">{item.name}</p>
                )}
                <p className="mt-0.5 text-[12px] text-footer-text">
                  SKU: {item.sku} · Qty {item.quantity} × {formatTk(item.price)}
                </p>
              </div>
              <p className="shrink-0 text-[14px] font-bold text-brand-dark">{formatTk(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>
      </AccountSection>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 print:block">
        <div className="contents print:grid print:grid-cols-2 print:gap-4 print:break-inside-avoid print:mb-4">
          <AccountSection title="Shipping Address">
            <AddressBlock address={order.shippingAddress} countryName={countryName(countries, order.shippingAddress.countryCode)} />
          </AccountSection>
          {order.billingAddress && (
            <AccountSection title="Billing Address">
              <AddressBlock address={order.billingAddress} countryName={countryName(countries, order.billingAddress.countryCode)} />
            </AccountSection>
          )}
        </div>
        <div className="contents print:grid print:grid-cols-2 print:gap-4 print:break-inside-avoid">
          <AccountSection title="Shipping & Payment">
            <p className="text-[14px] leading-[1.6] text-footer-text">
              <span className="font-semibold text-brand-dark">Delivery:</span> {order.shippingMethod}
              <br />
              <span className="font-semibold text-brand-dark">Payment:</span> {order.paymentMethod}
            </p>
          </AccountSection>
          <AccountSection title="Order Total">
            <dl className="space-y-2 text-[14px]">
              <div className="flex justify-between"><dt className="text-footer-text">Subtotal</dt><dd>{formatTk(order.subtotal)}</dd></div>
              {order.discount > 0 && <div className="flex justify-between"><dt className="text-footer-text">Discount</dt><dd className="text-brand-coral">− {formatTk(order.discount)}</dd></div>}
              <div className="flex justify-between"><dt className="text-footer-text">Shipping</dt><dd>{order.shipping ? formatTk(order.shipping) : "FREE"}</dd></div>
              <div className="flex justify-between border-t border-card-border pt-2 font-bold text-brand-dark"><dt>Grand Total</dt><dd className="text-brand-alert">{formatTk(order.grandTotal)}</dd></div>
            </dl>
          </AccountSection>
        </div>
      </div>

      {!!order.comments?.length && (
        <AccountSection title={order.comments.length > 1 ? "Order Comments" : "Order Comment"} className="print:mt-4">
          <OrderComments comments={order.comments} />
        </AccountSection>
      )}

      <div data-print-hide className="flex justify-end pt-1">
        <PrintOrderAction className="w-full sm:w-auto" />
      </div>
    </>
  );
}

export default function OrderDetailPage(props: { params: Promise<{ number: string }> }) {
  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
      <OrderDetailPageContent {...props} />
    </Suspense>
  );
}
