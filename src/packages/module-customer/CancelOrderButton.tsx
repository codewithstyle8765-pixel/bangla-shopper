"use client";

import { useState, useTransition } from "react";
import { Modal } from "@/packages/module-common/Modal";
import { Select } from "@/packages/module-common/form/Select";
import { FormAlert } from "@/packages/module-common/form";
import { callApi, useApiFollowUp } from "@/utils/api/client";

/** Magento needs a reason; these mirror the default "Order cancellation reasons" in admin. */
const REASONS = [
  "The item(s) are no longer needed",
  "I ordered by mistake",
  "I found a better price elsewhere",
  "Delivery is taking too long",
  "Other",
].map((r) => ({ value: r, label: r }));

/** Pending orders only: confirm with a reason, then Magento `cancelOrder`. */
export function CancelOrderButton({
  orderId,
  orderNumber,
  className = "",
}: {
  orderId: string;
  orderNumber: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(REASONS[0].value);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const followUp = useApiFollowUp();

  const confirm = () =>
    start(async () => {
      const result = followUp(await callApi("CancelOrder", { orderId, reason }));
      if (result.ok) setOpen(false);
      else setError(result.message ?? "The order could not be cancelled. Please try again.");
    });

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError(null);
          setOpen(true);
        }}
        className={`flex h-9 cursor-pointer items-center justify-center rounded-[4px] border border-brand-alert px-4 text-[13px] font-semibold text-brand-alert transition-colors hover:bg-brand-alert hover:text-white ${className}`}
      >
        Cancel Order
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Cancel order"
        dismissible={!pending}
        contentClassName="pb-48"
        footer={
          <>
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={pending}
              className="h-11 cursor-pointer rounded-[4px] border-2 border-brand-black px-6 text-[14px] font-semibold text-brand-black hover:bg-brand-black hover:text-white disabled:opacity-50"
            >
              Keep Order
            </button>
            <button
              type="button"
              onClick={confirm}
              disabled={pending}
              className="h-11 cursor-pointer rounded-[4px] bg-brand-alert px-6 text-[14px] font-semibold text-white hover:bg-brand-coral-active disabled:cursor-wait disabled:opacity-70"
            >
              {pending ? "Cancelling..." : "Cancel Order"}
            </button>
          </>
        }
      >
        <p>
          Are you sure you want to cancel order <strong className="text-brand-dark">#{orderNumber}</strong>? This cannot be undone.
        </p>
        <label htmlFor="cancel-reason" className="mb-1.5 mt-4 block text-[13px] font-medium text-brand-dark">
          Reason for cancelling
        </label>
        <Select
          id="cancel-reason"
          value={reason}
          onChange={setReason}
          options={REASONS}
          aria-label="Reason for cancelling"
          direction="down"
          className="h-11"
        />
        {error && (
          <div className="mt-3">
            <FormAlert>{error}</FormAlert>
          </div>
        )}
      </Modal>
    </>
  );
}

export default CancelOrderButton;
