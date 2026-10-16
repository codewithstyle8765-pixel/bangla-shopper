import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { AddressInput, Order, OrderStatus } from "@/types/storefront";
import { formatAddressLines } from "@/utils/address";
import { formatDate, formatTk } from "@/utils/format";

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "text-brand-dark",
  processing: "text-brand-link",
  shipped: "text-brand-navy",
  delivered: "text-brand-coral",
  canceled: "text-price-strikethrough",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold capitalize", STATUS_COLOR[status])}>
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function AccountSection({ title, action, children, className }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={clsx("rounded-[6px] border border-card-border bg-white p-4 sm:p-5 print:break-inside-avoid print:page-break-inside-avoid", className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-black uppercase tracking-[0.1em] text-brand-dark sm:text-[16px]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function AddressBlock({ address, countryName }: { address: AddressInput; countryName?: string }) {
  return (
    <address className="text-[14px] not-italic leading-[1.6] text-footer-text">
      <span className="font-semibold text-brand-dark">
        {address.firstName} {address.lastName}
      </span>
      {formatAddressLines(address, countryName ?? (address.countryCode === "BD" ? "Bangladesh" : address.countryCode)).map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
      Phone:{" "}
      <a href={`tel:+${address.phone}`} className="text-brand-link">
        {address.phone}
      </a>
    </address>
  );
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-[6px] border border-dashed border-card-border px-4 py-10 text-center">
        <p className="text-[15px] font-semibold text-brand-dark">You have placed no orders yet.</p>
        <Link href="/" className="mt-3 inline-flex h-10 items-center rounded-[4px] bg-brand-coral px-5 text-[14px] font-semibold text-white">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <table className="hidden w-full text-left text-[14px] md:table">
        <thead>
          <tr className="border-b-2 border-brand-dark text-[12px] uppercase tracking-[0.1em] text-brand-dark">
            <th className="py-2 font-bold">Order #</th>
            <th className="py-2 font-bold">Date</th>
            <th className="py-2 font-bold">Items</th>
            <th className="py-2 font-bold">Total</th>
            <th className="py-2 font-bold">Status</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody className="divide-y divide-card-border">
          {orders.map((o) => (
            <tr key={o.number}>
              <td className="py-3 font-semibold text-brand-dark">#{o.number}</td>
              <td className="py-3 text-footer-text">{formatDate(o.createdAt)}</td>
              <td className="py-3 text-footer-text">{o.items.reduce((a, i) => a + i.quantity, 0)}</td>
              <td className="py-3 font-semibold text-brand-dark">{formatTk(o.grandTotal)}</td>
              <td className="py-3">
                <StatusBadge status={o.status} />
              </td>
              <td className="py-3 text-right">
                <Link href={`/customer/account/orders/${o.number}`} className="font-semibold text-brand-link hover:underline">
                  View Order
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="space-y-3 md:hidden">
        {orders.map((o) => (
          <li key={o.number}>
            <Link href={`/customer/account/orders/${o.number}`} className="block rounded-[6px] border border-card-border p-4 active:bg-brand-surface">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-brand-dark">#{o.number}</span>
                <StatusBadge status={o.status} />
              </div>
              <div className="mt-2 flex items-center justify-between text-[13px] text-footer-text">
                <span>
                  {formatDate(o.createdAt)} · {o.items.reduce((a, i) => a + i.quantity, 0)} items
                </span>
                <span className="font-bold text-brand-dark">{formatTk(o.grandTotal)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Friendly "nothing here yet" panel for account lists. */
export function AccountEmptyState({ icon, title, children, action }: { icon: ReactNode; title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-[6px] border border-dashed border-card-border bg-brand-surface/40 px-5 py-10 text-center sm:py-12">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-coral shadow-[0_2px_10px_rgba(0,0,0,0.06)] ring-1 ring-card-border">
        {icon}
      </span>
      <p className="mt-4 text-[16px] font-bold text-brand-dark">{title}</p>
      <div className="mt-1.5 max-w-[420px] text-[14px] leading-[1.5] text-footer-text">{children}</div>
      {action && <div className="mt-5 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}

const iconProps = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const AccountIcons = {
  download: (
    <svg {...iconProps}>
      <path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5" />
      <path d="M4 15v3.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V15" />
    </svg>
  ),
  card: (
    <svg {...iconProps}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19M6 15h4" />
    </svg>
  ),
  review: (
    <svg {...iconProps}>
      <path d="m12 3.5 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8Z" />
    </svg>
  ),
  gift: (
    <svg {...iconProps}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M5 12v8h14v-8M12 8v12M12 8S10.5 3.5 8 4.2C6 4.8 7 8 12 8Zm0 0s1.5-4.5 4-3.8C18 4.8 17 8 12 8Z" />
    </svg>
  ),
  shield: (
    <svg {...iconProps} width={16} height={16}>
      <path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
};
