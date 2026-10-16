"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import { ConfirmDialog } from "@/packages/module-common/Modal";
import { AddressFields, Checkbox, FormAlert, SelectField, TextField, useFieldErrors, useSubmitWithoutReset, type SelectOption } from "@/packages/module-common/form";
import { readAddress } from "@/utils/address";
import type { Address, BdDivision, Customer } from "@/types/storefront";
import { callApi, useApiFollowUp, useFormOperation } from "@/utils/api/client";
import { useWishlist } from "@/packages/module-quote/context/WishlistContext";

const submitClass =
  "flex h-11 cursor-pointer items-center justify-center rounded-[4px] bg-brand-coral px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-coral-hover disabled:cursor-wait disabled:opacity-70";

export function ProfileForm({ customer }: { customer: Customer }) {
  const [state, action, pending] = useActionState(useFormOperation("UpdateCustomer"), null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useFieldErrors(formRef, state);
  const submit = useSubmitWithoutReset(formRef, action, state);
  const v = state && !state.ok ? (state.values ?? {}) : {};

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-4">
      {state && (state.ok ? <FormAlert tone="success">{state.message}</FormAlert> : !state.fieldErrors && <FormAlert>{state.message}</FormAlert>)}
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="firstName" label="First name" required defaultValue={v.firstName ?? customer.firstName} error={errors.firstName} autoComplete="given-name" />
        <TextField id="lastName" label="Last name" required defaultValue={v.lastName ?? customer.lastName} error={errors.lastName} autoComplete="family-name" />
        <TextField id="email" label="Email" type="email" defaultValue={customer.email} disabled hint="Contact support to change your email address." />
        <TextField id="dateOfBirth" label="Date of birth" type="date" defaultValue={v.dateOfBirth ?? customer.dateOfBirth ?? ""} />
        <SelectField
          id="gender"
          label="Gender"
          defaultValue={v.gender ?? customer.gender ?? ""}
          placeholder="Select"
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
            { value: "other", label: "Prefer not to say" },
          ]}
        />
      </div>
      <Checkbox id="newsletter" name="newsletter" defaultChecked={customer.isSubscribed} label="Subscribe to offers and Cash Back Reward updates" />
      <button type="submit" disabled={pending} className={submitClass}>
        {pending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(useFormOperation("ChangePassword"), null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useFieldErrors(formRef, state);
  const submit = useSubmitWithoutReset(formRef, action, state);

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-4">
      {state && (state.ok ? <FormAlert tone="success">{state.message}</FormAlert> : !state.fieldErrors && <FormAlert>{state.message}</FormAlert>)}
      <div className="grid gap-4 sm:grid-cols-3">
        <TextField id="currentPassword" label="Current password" type="password" autoComplete="current-password" required error={errors.currentPassword} />
        <TextField id="newPassword" label="New password" type="password" autoComplete="new-password" required error={errors.newPassword} />
        <TextField id="confirmNewPassword" label="Confirm new password" type="password" autoComplete="new-password" required error={errors.confirmNewPassword} />
      </div>
      <button type="submit" disabled={pending} className={submitClass}>
        {pending ? "Updating..." : "Change Password"}
      </button>
    </form>
  );
}

export function AddressForm({ address, countries, locations }: { address?: Address; countries: SelectOption[]; locations: BdDivision[] }) {
  const [state, action, pending] = useActionState(useFormOperation("SaveAddress"), null);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = useFieldErrors(formRef, state);
  const submit = useSubmitWithoutReset(formRef, action, state);
  const v = state && !state.ok ? state.values : undefined;
  const defaults = v ? readAddress(toFormData(v)) : address;

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-4">
      {state && !state.ok && !state.fieldErrors && <FormAlert>{state.message}</FormAlert>}
      {address && <input type="hidden" name="id" value={address.id} />}
      <AddressFields key={JSON.stringify(v ?? {})} idPrefix="address" defaultValue={defaults} errors={errors} countries={countries} locations={locations} />
      <div className="flex flex-col sm:flex-row sm:gap-6">
        <Checkbox id="defaultShipping" name="defaultShipping" defaultChecked={address?.isDefaultShipping} label="Use as my default shipping address" />
        <Checkbox id="defaultBilling" name="defaultBilling" defaultChecked={address?.isDefaultBilling} label="Use as my default billing address" />
      </div>
      <button type="submit" disabled={pending} className={submitClass}>
        {pending ? "Saving..." : "Save Address"}
      </button>
    </form>
  );
}

export function DeleteAddressButton({ id, summary }: { id: string; summary: string }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const followUp = useApiFollowUp();
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="cursor-pointer text-[13px] font-semibold text-brand-alert hover:underline">
        Delete
      </button>
      <ConfirmDialog
        open={open}
        title="Delete address"
        message={
          <>
            Are you sure you want to delete this address?
            <span className="mt-2 block font-medium text-brand-dark">{summary}</span>
          </>
        }
        confirmLabel="Delete Address"
        tone="danger"
        pending={pending}
        onCancel={() => setOpen(false)}
        onConfirm={() =>
          start(async () => {
            followUp(await callApi("DeleteAddress", { id }));
            setOpen(false);
          })
        }
      />
    </>
  );
}

export function RemoveWishlistButton({ wishlistId, itemId, name }: { wishlistId: string; itemId: string; name: string }) {
  const [pending, start] = useTransition();
  const followUp = useApiFollowUp();
  const { refresh: refreshWishlist } = useWishlist();
  return (
    <>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            followUp(await callApi("RemoveWishlistItem", { wishlistId, itemId }));
            void refreshWishlist();
          })
        }
        aria-label={`Remove ${name} from wishlist`}
        className="absolute right-2 top-2 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-brand-alert shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-[opacity,background-color,color] duration-(--duration-panel) hover:bg-brand-alert hover:text-white focus-visible:opacity-100 disabled:opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
      >
        {pending ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-alert/30 border-t-brand-alert" aria-hidden="true" />
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        )}
      </button>
      {pending && <span className="absolute inset-0 z-[5] rounded-[4px] bg-white/60" aria-hidden="true" />}
    </>
  );
}

function toFormData(values: Record<string, string>) {
  const fd = new FormData();
  for (const [k, val] of Object.entries(values)) fd.set(k, val);
  return fd;
}
