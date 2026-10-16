"use client";

import { useActionState, useRef } from "react";
import { useSubmitWithoutReset } from "@/packages/module-common/form";
import clsx from "clsx";
import { useFormOperation } from "@/utils/api/client";
import { ArrowRightIcon, MailIcon } from "./FooterIcons";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(useFormOperation("SubscribeNewsletter"), null);
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmitWithoutReset(formRef, formAction, state);

  return (
    <form ref={formRef} onSubmit={submit} className="w-full" noValidate>
      <div className="flex h-12 items-center rounded-full border border-card-border bg-white p-1 pl-4 transition-colors focus-within:border-brand-coral sm:h-[52px]">
        <MailIcon className="h-5 w-5 shrink-0 text-footer-text" />
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-[16px] text-brand-dark outline-none placeholder:text-footer-text lg:text-[14px]"
        />
        <button
          type="submit"
          disabled={pending}
          className="flex h-full shrink-0 cursor-pointer items-center gap-2 rounded-full bg-brand-coral px-4 text-[13px] font-semibold uppercase tracking-[0.04em] text-white transition-colors hover:bg-brand-coral-hover disabled:opacity-70 sm:px-7"
        >
          {pending ? "Subscribing..." : "Subscribe"}
          <ArrowRightIcon className="hidden h-4 w-4 min-[400px]:block" />
        </button>
      </div>
      {state && (
        <p role="status" className={clsx("mt-2 pl-4 text-[12px]", state.ok ? "text-success" : "text-brand-alert")}>
          {state.message}
        </p>
      )}
    </form>
  );
}

export default NewsletterForm;
