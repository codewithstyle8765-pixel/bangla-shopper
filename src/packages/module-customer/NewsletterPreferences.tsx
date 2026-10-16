"use client";

import { startTransition, useActionState, useState, type FormEvent } from "react";
import { Checkbox, FormAlert } from "@/packages/module-common/form";
import { useFormOperation } from "@/utils/api/client";

const PERKS = ["New arrivals and restocks first", "Members-only offers and flash sales", "Cash Back Reward updates and bonus point days"];

/** Newsletter Subscriptions: one subscription checkbox and Save. The checkbox is controlled, so it keeps the saved choice. */
export function NewsletterPreferences({ subscribed }: { subscribed: boolean }) {
  const [checked, setChecked] = useState(subscribed);
  const [state, action, pending] = useActionState(useFormOperation("UpdateNewsletter"), null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {state && (state.ok ? <FormAlert tone="success">{state.message}</FormAlert> : <FormAlert>{state.message}</FormAlert>)}

      <div className="rounded-[6px] border border-card-border p-4 sm:p-5">
        <Checkbox
          id="newsletter-subscribed"
          name="subscribed"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label={<span className="font-semibold">General Subscription</span>}
          description="Get BanglaShoppers offers and updates by email. You can unsubscribe at any time."
        />
        <ul className="mt-3 space-y-1.5 border-t border-card-border pt-3 pl-7 text-[13px] text-footer-text">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-coral" />
              {perk}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex h-11 cursor-pointer items-center justify-center rounded-[4px] bg-brand-coral px-8 text-[15px] font-semibold text-white transition-colors hover:bg-brand-coral-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

export default NewsletterPreferences;
