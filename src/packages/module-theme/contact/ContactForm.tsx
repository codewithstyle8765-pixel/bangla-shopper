"use client";

import { useActionState, useRef, useState } from "react";
import { EmailField, FormAlert, TextareaField, TextField, useFieldErrors, useSubmitWithoutReset } from "@/packages/module-common/form";
import { useFormOperation } from "@/utils/api/client";

/** "Write to Us": sent to Magento's contactUs, which emails the store's contact address. */
export function ContactForm() {
  const [state, action, pending] = useActionState(useFormOperation("ContactUs"), null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useFieldErrors(formRef, state);
  const submit = useSubmitWithoutReset(formRef, action, state);
  const values = state && !state.ok ? (state.values ?? {}) : {};
  /* After a successful send the fields mount again, empty. */
  const [sent, setSent] = useState<{ state: typeof state; count: number }>({ state, count: 0 });
  if (sent.state !== state) setSent({ state, count: sent.count + (state?.ok ? 1 : 0) });

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-4">
      {state?.ok && <FormAlert tone="success">{state.message}</FormAlert>}
      {state && !state.ok && !state.fieldErrors && <FormAlert>{state.message}</FormAlert>}
      <div key={sent.count} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="contact-name" name="name" label="Name" autoComplete="name" required defaultValue={values.name} error={errors.name} />
        <EmailField id="contact-email" name="email" label="Email" autoComplete="email" required defaultValue={values.email} error={errors.email} />
      </div>
      <TextField id="contact-phone" name="telephone" type="tel" label="Phone number" autoComplete="tel" inputMode="tel" optional defaultValue={values.telephone} error={errors.telephone} />
      <TextareaField id="contact-comment" name="comment" label="What’s on your mind?" rows={5} required defaultValue={values.comment} error={errors.comment} />
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-brand-coral px-8 text-[16px] font-semibold text-white transition-colors hover:bg-brand-coral-hover disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;
