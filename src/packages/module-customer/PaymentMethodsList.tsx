"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ConfirmDialog } from "@/packages/module-common/Modal";
import type { StoredPaymentMethod } from "@/types/storefront";
import { callApi, useApiFollowUp } from "@/utils/api/client";
import { AccountEmptyState, AccountIcons } from "./AccountUi";

function RemoveCardButton({ method }: { method: StoredPaymentMethod }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const followUp = useApiFollowUp();
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="cursor-pointer text-[13px] font-semibold text-brand-alert hover:underline">
        Remove
      </button>
      <ConfirmDialog
        open={open}
        title="Remove saved card"
        message={`Remove the ${method.brand} card ending in ${method.last4}? You can save a card again at checkout.`}
        confirmLabel="Remove Card"
        tone="danger"
        pending={pending}
        onCancel={() => setOpen(false)}
        onConfirm={() =>
          start(async () => {
            followUp(await callApi("DeletePaymentMethod", { publicHash: method.publicHash }));
            setOpen(false);
          })
        }
      />
    </>
  );
}

/** Saved cards (Magento vault tokens), or a friendly explanation when there are none. */
export function PaymentMethodsList({ methods }: { methods: StoredPaymentMethod[] }) {
  if (methods.length === 0) {
    return (
      <AccountEmptyState
        icon={AccountIcons.card}
        title="No saved payment methods"
        action={
          <Link href="/" className="inline-flex h-10 items-center rounded-[4px] bg-brand-coral px-5 text-[14px] font-semibold text-white hover:bg-brand-coral-hover">
            Continue Shopping
          </Link>
        }
      >
        Pay by card at checkout and tick <span className="font-semibold text-brand-dark">“Save for later use”</span> to check out faster next time. Cards you save will appear here.
        <span className="mx-auto mt-3 flex max-w-[340px] items-start justify-center gap-1.5 text-left text-[12px] text-footer-text">
          <span className="mt-px shrink-0 text-brand-coral">{AccountIcons.shield}</span>
          <span>Card details are stored securely by our payment provider, never on BanglaShoppers.</span>
        </span>
      </AccountEmptyState>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {methods.map((m) => (
        <li key={m.publicHash} className="flex flex-col justify-between rounded-[8px] border border-card-border p-4">
          <div className="flex items-start justify-between gap-3">
            <span className="flex h-9 w-12 items-center justify-center rounded-[4px] bg-brand-surface text-brand-dark">{AccountIcons.card}</span>
            <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-brand-dark">{m.brand}</span>
          </div>
          <p className="mt-4 font-mono text-[16px] tracking-[0.15em] text-brand-dark">•••• •••• •••• {m.last4}</p>
          <div className="mt-3 flex items-center justify-between text-[13px] text-footer-text">
            <span>{m.expires ? `Expires ${m.expires}` : "Saved card"}</span>
            <RemoveCardButton method={m} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PaymentMethodsList;
