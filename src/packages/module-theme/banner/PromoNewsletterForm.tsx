"use client";

import { useActionState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useSubmitWithoutReset } from "@/packages/module-common/form";
import { useFormOperation } from "@/utils/api/client";
import { MailIcon } from "@/packages/module-theme/layout/footer/FooterIcons";

interface PromoNewsletterFormProps {
  buttonLabel?: string;
  privacyNote?: string;
  onSubscribed: () => void;
}

/** Popup newsletter signup: the same SubscribeNewsletter operation as the footer form. */
export function PromoNewsletterForm({ buttonLabel = "Subscribe", privacyNote, onSubscribed }: PromoNewsletterFormProps) {
  const [state, formAction, pending] = useActionState(useFormOperation("SubscribeNewsletter"), null);
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmitWithoutReset(formRef, formAction, state);

  useEffect(() => {
    if (state?.ok) onSubscribed();
  }, [state, onSubscribed]);

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="mt-3 w-full lg:mt-[22px]">
      <div className="flex h-11 items-center gap-2.5 rounded-full border border-card-border px-4 transition-colors focus-within:border-brand-coral lg:h-12">
        <MailIcon className="h-[18px] w-[18px] shrink-0 text-footer-text" />
        <label htmlFor="promo-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="promo-newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email address"
          className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-brand-dark outline-none placeholder:text-footer-text lg:text-[14px]"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-2 h-11 w-full cursor-pointer rounded-full bg-brand-coral text-[13px] font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-brand-coral-hover active:bg-brand-coral-active disabled:opacity-70 lg:mt-3 lg:h-12 lg:text-[14px]"
      >
        {pending ? "Subscribing..." : buttonLabel}
      </button>
      {state ? (
        <p role="status" className={clsx("mt-2.5 text-[12.5px] font-medium", state.ok ? "text-success" : "text-brand-alert")}>
          {state.message}
        </p>
      ) : (
        privacyNote && (
          <p className="mt-2 flex items-center justify-center gap-1.5 text-[11.5px] text-text-subtle lg:mt-3 lg:text-[12px]">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-brand-coral" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6z" />
            </svg>
            {privacyNote}
          </p>
        )
      )}
    </form>
  );
}
