"use client";

import { useActionState, useCallback, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Checkbox, FormAlert, SelectField, TextareaField, TextField, useFieldErrors, useSubmitWithoutReset } from "@/packages/module-common/form";
import type { AffiliateAccount, AffiliateProfile } from "@/types/storefront";
import { callApi, useFormOperation } from "@/utils/api/client";
import { formatTk } from "@/utils/format";
import { primaryButton } from "./AffiliateUi";

type Errors = Record<string, string>;
type Values = Record<string, string>;

function FormCard({ step, title, description, children }: { step?: number; title: string; description?: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-[8px] border border-card-border bg-white p-4 sm:p-5">
      <legend className="contents">
        <span className="flex items-center gap-3">
          {step && <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-coral text-[13px] font-bold text-white">{step}</span>}
          <span className="text-[15px] font-black uppercase tracking-[0.1em] text-brand-dark sm:text-[16px]">{title}</span>
        </span>
      </legend>
      {description && <p className="mt-1.5 text-[13px] leading-[1.5] text-footer-text">{description}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </fieldset>
  );
}

function SourceChips({ sources, defaultValue, error }: { sources: string[]; defaultValue: string; error?: string }) {
  return (
    <div role="radiogroup" aria-labelledby="source-label" aria-describedby={error ? "source-error" : undefined}>
      <p id="source-label" className="mb-2 text-[13px] font-medium text-brand-dark">
        How did you find out about our affiliate program?<span className="text-brand-alert"> *</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => (
          <label
            key={source}
            className={clsx(
              "cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-medium text-brand-dark transition-colors has-[:checked]:border-brand-coral has-[:checked]:bg-brand-coral has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-coral/30",
              error ? "border-brand-alert" : "border-card-border hover:border-brand-dark",
            )}
          >
            <input type="radio" name="source" value={source} defaultChecked={defaultValue === source} className="sr-only" />
            {source}
          </label>
        ))}
      </div>
      {error && (
        <p id="source-error" className="mt-1.5 text-[12px] text-brand-alert">
          {error}
        </p>
      )}
    </div>
  );
}

function PromotionFields({ account, profile, values, errors }: { account: AffiliateAccount; profile: AffiliateProfile; values: Values; errors: Errors }) {
  return (
    <>
      <TextField
        id="website"
        label="Website or social page"
        required
        placeholder="facebook.com/yourpage"
        defaultValue={values.website ?? profile.website}
        error={errors.website}
        hint="Where you'll share your BanglaShoppers links."
        autoComplete="url"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="instagram" label="Instagram account" optional placeholder="username" defaultValue={values.instagram ?? profile.instagram} autoCapitalize="none" />
        <TextField id="twitter" label="Twitter/X account" optional placeholder="username" defaultValue={values.twitter ?? profile.twitter} autoCapitalize="none" />
      </div>
      <SourceChips sources={account.sources} defaultValue={values.source ?? profile.source} error={errors.source} />
    </>
  );
}

function PaymentFields({ account, profile, values, errors }: { account: AffiliateAccount; profile: AffiliateProfile; values: Values; errors: Errors }) {
  return (
    <>
      <SelectField
        id="paymentMethod"
        label="Payment method"
        required
        placeholder="Select"
        options={account.paymentMethods}
        defaultValue={values.paymentMethod ?? profile.paymentMethod}
        error={errors.paymentMethod}
      />
      <TextareaField
        id="paymentDetails"
        label="Payment information"
        required
        rows={3}
        placeholder="e.g. bKash personal number 01XXXXXXXXX"
        defaultValue={values.paymentDetails ?? profile.paymentDetails}
        error={errors.paymentDetails}
        hint="Your wallet number, or bank name, branch and account number."
      />
    </>
  );
}

export function AffiliateJoinForm({ account, customerName, email }: { account: AffiliateAccount; customerName: string; email: string }) {
  /* A full load after joining, so the account frame swaps to the affiliate sidebar. */
  const join = useCallback(async (_prev: unknown, formData: FormData) => {
    const result = await callApi("JoinAffiliateProgram", formData);
    if (!result.ok || !result.redirect) return result;
    window.location.assign(result.redirect);
    /* Keeps "Submitting..." until the new page replaces this one. */
    return new Promise<never>(() => {});
  }, []);
  const [state, action, pending] = useActionState(join, null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useFieldErrors(formRef, state);
  const submit = useSubmitWithoutReset(formRef, action, state);
  const values = state && !state.ok ? (state.values ?? {}) : {};
  const fieldProps = { account, profile: account.profile, values, errors };

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-4">
      {state && !state.ok && !state.fieldErrors && <FormAlert>{state.message}</FormAlert>}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 rounded-[8px] bg-brand-surface px-4 py-3 text-[14px]">
        <span className="text-footer-text">
          Applying as <strong className="font-semibold text-brand-dark">{customerName}</strong>
        </span>
        <span className="text-footer-text">{email}</span>
      </div>
      <FormCard step={1} title="Where you'll promote" description="Tell us about the website, page or channel where you'll share BanglaShoppers.">
        <PromotionFields {...fieldProps} />
      </FormCard>
      <FormCard step={2} title="How we pay you" description={`Commission is paid once your balance reaches ${formatTk(account.balance.minPayout)}.`}>
        <PaymentFields {...fieldProps} />
      </FormCard>
      <FormCard step={3} title="Confirm">
        <div className="space-y-1">
          <Checkbox id="adult" name="adult" label={<>I&apos;m 18 or older <span className="text-brand-alert">*</span></>} defaultChecked={values.adult === "on"} aria-invalid={Boolean(errors.adult)} />
          {errors.adult && <p className="pl-7 text-[12px] text-brand-alert">{errors.adult}</p>}
          <Checkbox
            id="terms"
            name="terms"
            defaultChecked={values.terms === "on"}
            aria-invalid={Boolean(errors.terms)}
            label={
              <>
                I agree to the{" "}
                <Link href="/terms-condition" target="_blank" className="font-semibold text-brand-link hover:underline">
                  affiliate terms and conditions
                </Link>{" "}
                <span className="text-brand-alert">*</span>
              </>
            }
          />
          {errors.terms && <p className="pl-7 text-[12px] text-brand-alert">{errors.terms}</p>}
          <Checkbox id="notifications" name="notifications" defaultChecked={values.notifications ? values.notifications === "on" : account.profile.notifications} label="Email me about new commissions, payouts and promotions" />
        </div>
        <button type="submit" disabled={pending} className={clsx(primaryButton, "w-full sm:w-auto")}>
          {pending ? "Submitting..." : "Submit Application"}
        </button>
      </FormCard>
    </form>
  );
}

export function AffiliateSettingsForm({ account }: { account: AffiliateAccount }) {
  const [state, action, pending] = useActionState(useFormOperation("UpdateAffiliateProfile"), null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useFieldErrors(formRef, state);
  const submit = useSubmitWithoutReset(formRef, action, state);
  const values = state && !state.ok ? (state.values ?? {}) : {};
  const fieldProps = { account, profile: account.profile, values, errors };

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-4">
      {state && (state.ok ? <FormAlert tone="success">{state.message}</FormAlert> : !state.fieldErrors && <FormAlert>{state.message}</FormAlert>)}
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <FormCard title="Promotion">
          <PromotionFields {...fieldProps} />
        </FormCard>
        <FormCard title="Payment">
          <PaymentFields {...fieldProps} />
          <Checkbox id="notifications" name="notifications" defaultChecked={account.profile.notifications} label="Subscribe to email notifications" />
        </FormCard>
      </div>
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}

export function WithdrawForm({ available, minPayout, current }: { available: number; minPayout: number; current: number }) {
  const [state, action, pending] = useActionState(useFormOperation("RequestAffiliateWithdrawal"), null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useFieldErrors(formRef, state);
  const submit = useSubmitWithoutReset(formRef, action, state);
  const tooLow = current < minPayout;

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-3">
      {state && (state.ok ? <FormAlert tone="success">{state.message}</FormAlert> : !state.fieldErrors && <FormAlert>{state.message}</FormAlert>)}
      {tooLow ? (
        <FormAlert tone="info">
          You need at least <strong>{formatTk(minPayout)}</strong> to request a withdrawal. Keep sharing your link to reach it.
        </FormAlert>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <TextField
            id="amount"
            label="Amount (TK)"
            type="number"
            inputMode="decimal"
            min={1}
            step="0.01"
            max={available}
            placeholder={available.toFixed(2)}
            error={errors.amount}
            hint={`Up to ${formatTk(available)} available.`}
            wrapperClassName="sm:w-[260px]"
          />
          <button type="submit" disabled={pending} className={clsx(primaryButton, "sm:mt-[22px]")}>
            {pending ? "Requesting..." : "Request Withdrawal"}
          </button>
        </div>
      )}
    </form>
  );
}
