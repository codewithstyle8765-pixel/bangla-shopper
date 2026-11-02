"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Modal } from "@/packages/module-common/Modal";
import { FormAlert, TextareaField, TextField, useFieldErrors, useSubmitWithoutReset } from "@/packages/module-common/form";
import { useFormOperation } from "@/utils/api/client";

function AskQuestionForm({ sku, onDone }: { sku: string; onDone: () => void }) {
  const [state, action, pending] = useActionState(useFormOperation("AskProductQuestion"), null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useFieldErrors(formRef, state);
  const onSubmit = useSubmitWithoutReset(formRef, action, state);
  const values = state && !state.ok ? (state.values ?? {}) : {};

  if (state?.ok) {
    return (
      <div className="space-y-4 py-4 text-center">
        <p className="text-[18px] font-bold text-brand-dark">Thank you for your question!</p>
        <p className="mx-auto max-w-md text-[14px] leading-relaxed text-footer-text">
          Our team will answer it soon. It will appear on this page once it has been answered.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="h-11 cursor-pointer rounded-[4px] bg-brand-coral px-8 text-[15px] font-semibold text-white transition-colors hover:bg-brand-coral-hover"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-4">
      {state && !state.ok && !state.fieldErrors && <FormAlert>{state.message}</FormAlert>}
      <input type="hidden" name="sku" value={sku} />
      <TextareaField
        id="question"
        label="Your question"
        required
        rows={4}
        maxLength={1000}
        defaultValue={values.question}
        error={errors.question}
        placeholder="e.g. Is it suitable for oily skin?"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextField id="name" label="Your name" optional defaultValue={values.name} error={errors.name} />
        <TextField id="email" type="email" label="Email" optional defaultValue={values.email} error={errors.email} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full cursor-pointer rounded-[4px] bg-brand-coral text-[15px] font-semibold text-white transition-colors hover:bg-brand-coral-hover disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Sending..." : "Submit Question"}
      </button>
    </form>
  );
}

/** Q&A tab "Ask a question": sent to Magento, listed once an admin answers it. */
export function AskQuestionDialog({ open, onClose, sku, productName }: { open: boolean; onClose: () => void; sku: string; productName: string }) {
  /* A fresh form every time the dialog opens. */
  const [round, setRound] = useState(0);
  const prevOpen = useRef(open);
  useEffect(() => {
    if (open && !prevOpen.current) setRound((r) => r + 1);
    prevOpen.current = open;
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} title="Ask a Question" size="md">
      <p className="mb-4 text-[14px] text-footer-text">
        About <span className="font-semibold text-brand-dark">{productName}</span>
      </p>
      <AskQuestionForm key={round} sku={sku} onDone={onClose} />
    </Modal>
  );
}

export default AskQuestionDialog;
