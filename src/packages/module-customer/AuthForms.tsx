"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { Checkbox, EmailField, FormAlert, TextField, useFieldErrors, useSubmitWithoutReset } from "@/packages/module-common/form";
import type { ApiResult } from "@/types/storefront";
import { callApi, useFormOperation } from "@/utils/api/client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Only same-site relative paths are allowed after login. */
const safeRedirect = (target: string) => (target.startsWith("/") && !target.startsWith("//") ? target : "/customer/account");

/** next-auth is loaded only when a customer actually signs in. */
async function signInWithPassword(email: string, password: string): Promise<string | null> {
  const { signIn } = await import("next-auth/react");
  const result = await signIn("credentials", { email, password, redirect: false });
  if (result?.ok && !result.error) return null;
  return result?.error && result.error !== "CredentialsSignin" ? result.error : "Invalid email or password.";
}

function SubmitButton({ pending, children }: { pending: boolean; children: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-brand-coral text-[16px] font-semibold text-white transition-colors hover:bg-brand-coral-hover disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Please wait..." : children}
    </button>
  );
}

function PasswordField({ id, label, error, autoComplete }: { id: string; label: string; error?: string; autoComplete: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <TextField id={id} label={label} type={visible ? "text" : "password"} autoComplete={autoComplete} required error={error} className="pr-16" />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-2 top-[30px] h-9 cursor-pointer px-2 text-[12px] font-semibold uppercase text-brand-link"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export function LoginForm({ redirectTo, expired = false }: { redirectTo: string; expired?: boolean }) {
  const [state, action, pending] = useActionState(async (_prev: ApiResult | null, formData: FormData): Promise<ApiResult> => {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const fieldErrors: Record<string, string> = {};
    if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "Enter a valid email address.";
    if (!password) fieldErrors.password = "Password is required.";
    if (Object.keys(fieldErrors).length) return { ok: false, message: "Please fix the highlighted fields.", fieldErrors, values: { email } };

    const error = await signInWithPassword(email, password);
    if (error) return { ok: false, message: error, values: { email } };
    /* Full load: the client router cache still holds guest data and the guest→login redirects. */
    window.location.assign(safeRedirect(redirectTo));
    return { ok: true, data: undefined };
  }, null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useFieldErrors(formRef, state);
  const submit = useSubmitWithoutReset(formRef, action, state);
  const values = state && !state.ok ? (state.values ?? {}) : {};

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-4">
      {state && !state.ok && !state.fieldErrors && <FormAlert>{state.message}</FormAlert>}
      {expired && !state && <FormAlert tone="info">Your session has expired. Please sign in again.</FormAlert>}
      <EmailField id="email" defaultValue={values.email} label="Email" autoComplete="email" required error={errors.email} />
      <PasswordField id="password" label="Password" autoComplete="current-password" error={errors.password} />
      <div className="flex items-center justify-between text-[13px]">
        <Checkbox id="remember" name="remember" defaultChecked label="Keep me signed in" className="text-[13px] text-footer-text" />
        <Link href="/customer/account/forgot-password" className="font-medium text-brand-link hover:underline">
          Forgot password?
        </Link>
      </div>
      <SubmitButton pending={pending}>Sign In</SubmitButton>
      <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.1em] text-price-strikethrough" aria-hidden="true">
        <span className="h-px flex-1 bg-card-border" />
        or
        <span className="h-px flex-1 bg-card-border" />
      </div>
      <Link
        href={redirectTo === "/checkout" ? "/checkout" : "/"}
        className="btn-dark flex h-12 w-full items-center justify-center text-[15px] font-semibold"
      >
        {redirectTo === "/checkout" ? "Continue as Guest" : "Continue Shopping"}
      </Link>
    </form>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(async (_prev: ApiResult | null, formData: FormData): Promise<ApiResult> => {
    const created = await callApi("CreateCustomer", formData);
    if (!created.ok) return created;
    const error = await signInWithPassword(String(formData.get("email") ?? "").trim(), String(formData.get("password") ?? ""));
    if (error) return { ok: false, message: error };
    window.location.assign("/customer/account");
    return created;
  }, null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useFieldErrors(formRef, state);
  const submit = useSubmitWithoutReset(formRef, action, state);
  const values = state && !state.ok ? (state.values ?? {}) : {};

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-4">
      {state && !state.ok && !state.fieldErrors && <FormAlert>{state.message}</FormAlert>}
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="firstName" defaultValue={values.firstName} label="First name" autoComplete="given-name" required error={errors.firstName} />
        <TextField id="lastName" defaultValue={values.lastName} label="Last name" autoComplete="family-name" required error={errors.lastName} />
      </div>
      <EmailField id="email" defaultValue={values.email} label="Email" autoComplete="email" required error={errors.email} />
      <PasswordField id="password" label="Password" autoComplete="new-password" error={errors.password} />
      <PasswordField id="confirmPassword" label="Confirm password" autoComplete="new-password" error={errors.confirmPassword} />
      <Checkbox id="newsletter" name="newsletter" defaultChecked label="Sign up for exclusive offers and the Cash Back Reward program." className="text-[13px] text-footer-text" />
      <SubmitButton pending={pending}>Create Account</SubmitButton>
      <p className="text-[12px] text-footer-text">
        By creating an account you agree to our{" "}
        <Link href="/terms-condition" className="text-brand-link hover:underline">
          Terms &amp; Conditions
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy-cookie-restriction-mode" className="text-brand-link hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(useFormOperation("RequestPasswordReset"), null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useFieldErrors(formRef, state);
  const submit = useSubmitWithoutReset(formRef, action, state);
  const values = state && !state.ok ? (state.values ?? {}) : {};

  if (state?.ok) return <FormAlert tone="success">{state.message}</FormAlert>;

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-4">
      <EmailField id="email" defaultValue={values.email} label="Email" autoComplete="email" required error={errors.email} />
      <SubmitButton pending={pending}>Reset My Password</SubmitButton>
    </form>
  );
}
