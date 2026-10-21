"use client";

import { useActionState, useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { NextImage } from "@/packages/module-common/NextImage";
import { CartLineOptions } from "@/packages/module-quote/cart/CartLineOptions";
import { Collapse } from "@/packages/module-common/Collapse";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { CheckoutSkeleton } from "./CheckoutSkeleton";
import { AddressFields, Checkbox, FormAlert, RadioCard, TextField, useSubmitWithoutReset, type SelectOption } from "@/packages/module-common/form";
import { CartTotals, CouponForm, TrustBadges } from "@/packages/module-quote/cart/CartSummary";
import { useCart } from "@/packages/module-quote/context/CartContext";
import type { Address, BdDivision, CheckoutRewards, PaymentMethod, ShippingMethod } from "@/types/storefront";
import { RewardPointsPanel } from "./RewardPointsPanel";
import { EarnPointsNote } from "./EarnPointsNote";
import { OrderNoteForm } from "./OrderNoteForm";
import { saveLastOrder } from "./lastOrder";
import { callApi, useFormOperation } from "@/utils/api/client";
import { DEFAULT_COUNTRY, formatAddressLines, type AddressField } from "@/utils/address";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import { formatTk } from "@/utils/format";

export interface CheckoutCustomer {
  email: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
}

interface CheckoutViewProps {
  countries: SelectOption[];
  /** Bangladesh Division → City → Area lists for the address forms. */
  locations: BdDivision[];
  customer: CheckoutCustomer | null;
}

function Step({ index, title, children, aside }: { index: number; title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="rounded-[6px] border border-card-border bg-white p-4 sm:p-5" aria-labelledby={`step-${index}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 id={`step-${index}`} className="flex items-center gap-3 text-[15px] font-black uppercase tracking-[0.1em] text-brand-dark sm:text-[16px]">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-coral text-[14px] tracking-normal text-white">{index}</span>
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

/** Field errors for one address block ("shipping_city" → "city"). */
function scoped(errors: Record<string, string>, prefix: string): Partial<Record<AddressField, string>> {
  return Object.fromEntries(Object.entries(errors).filter(([k]) => k.startsWith(prefix)).map(([k, v]) => [k.slice(prefix.length), v]));
}

function SavedAddressOptions({
  name,
  addresses,
  value,
  onChange,
  countries,
}: {
  name: string;
  addresses: Address[];
  value: string;
  onChange: (id: string) => void;
  countries: SelectOption[];
}) {
  const country = (code: string) => countries.find((c) => c.value === code)?.label ?? code;
  return (
    <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
      {addresses.map((a) => (
        <RadioCard
          key={a.id}
          name={name}
          value={a.id}
          checked={value === a.id}
          onChange={() => onChange(a.id)}
          title={`${a.firstName} ${a.lastName}`}
          description={
            <>
              {formatAddressLines(a, country(a.countryCode)).join(", ")}
              <br />
              {a.phone}
            </>
          }
          trailing={a.isDefaultShipping ? <span className="shrink-0 rounded-full bg-brand-coral/10 px-2 py-0.5 text-[11px] font-semibold text-brand-coral">Default</span> : null}
        />
      ))}
      <RadioCard name={name} value="new" checked={value === "new"} onChange={() => onChange("new")} title="+ Add a new address" description="Deliver to a different address" />
    </div>
  );
}

export function CheckoutView({ countries, locations, customer }: CheckoutViewProps) {
  const router = useRouter();
  const { cart, isLoaded, refreshCart } = useCart();
  const [state, formAction, isPlacing] = useActionState(useFormOperation("PlaceOrder"), null);
  const errors = state && !state.ok ? (state.fieldErrors ?? {}) : {};

  const saved = customer?.addresses ?? [];
  const defaultSaved = saved.find((a) => a.isDefaultShipping) ?? saved[0];
  const [shippingAddressId, setShippingAddressId] = useState(defaultSaved?.id ?? "new");
  const [billingAddressId, setBillingAddressId] = useState(saved.find((a) => a.isDefaultBilling)?.id ?? defaultSaved?.id ?? "new");
  const [billingSame, setBillingSame] = useState(true);
  const [destination, setDestination] = useState({ countryCode: DEFAULT_COUNTRY, city: "" });

  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [estimateError, setEstimateError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [shippingValid, setShippingValid] = useState(false);
  const [billingValid, setBillingValid] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [rewards, setRewards] = useState<CheckoutRewards | null>(null);
  const [rewardPending, startReward] = useTransition();
  const [rewardError, setRewardError] = useState<string | null>(null);

  /* Each checkout visit starts without points: any left applied from an earlier visit are removed on the first read. */
  const rewardsReset = useRef(false);

  /* Signed-in only; re-read when the payable amount changes (items, coupon), since Magento caps the points applied. */
  useEffect(() => {
    if (!customer || !isLoaded || cart.items.length === 0) return;
    void callApi("CheckoutRewards").then(async (r) => {
      if (!r.ok || !r.data) return;
      if (!rewardsReset.current) {
        rewardsReset.current = true;
        if (r.data.applied) {
          const removed = await callApi("RemoveRewardPoints");
          setRewards(removed.ok && removed.data ? removed.data : r.data);
          return;
        }
      }
      setRewards(r.data);
    });
  }, [customer, isLoaded, cart.items.length, cart.subtotal, cart.discount]);

  const updateRewards = (points: number) =>
    startReward(async () => {
      setRewardError(null);
      const r = points > 0 ? await callApi("ApplyRewardPoints", { points }) : await callApi("RemoveRewardPoints");
      if (r.ok && r.data) setRewards(r.data);
      else setRewardError(r.message ?? "Reward points could not be updated. Please try again.");
    });
  const [isEstimating, startEstimate] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const submitOrder = useSubmitWithoutReset(formRef, formAction, state);
  const cityTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const usingSavedShipping = shippingAddressId !== "new";

  useEffect(() => {
    if (!isLoaded || cart.items.length === 0) return;
    if (!usingSavedShipping && !destination.city) return;
    startEstimate(async () => {
      const result = await callApi("EstimateCheckout", {
        shipping: usingSavedShipping
          ? { customerAddressId: shippingAddressId }
          : {
            address: {
              firstName: customer?.firstName || "Guest",
              lastName: customer?.lastName || "Customer",
              phone: "8801700000000",
              street: ["-"],
              city: destination.city,
              countryCode: destination.countryCode,
              thana: "-",
            },
          },
      });
      if (!result.ok) {
        setEstimateError(result.message);
        return;
      }
      setEstimateError(null);
      setShippingMethods(result.data.shippingMethods);
      setPaymentMethods(result.data.paymentMethods);
      setShippingMethod((cur) => (result.data.shippingMethods.some((m) => m.code === cur) ? cur : (result.data.shippingMethods[0]?.code ?? "")));
      setPaymentMethod((cur) => (result.data.paymentMethods.some((m) => m.code === cur) ? cur : (result.data.paymentMethods[0]?.code ?? "")));
    });
  }, [isLoaded, cart.items.length, cart.subtotal, usingSavedShipping, shippingAddressId, destination, customer?.firstName, customer?.lastName]);

  useEffect(() => {
    if (state?.ok) {
      if (state.data.order) saveLastOrder(state.data.order);
      void refreshCart().then(() => router.push(`/checkout/success?order=${encodeURIComponent(state.data.orderNumber)}`));
    } else if (state && !state.ok) {
      const first = Object.keys(state.fieldErrors ?? {})[0];
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }, [state, refreshCart, router]);

  const onShippingField = (field: AddressField, value: string) => {
    if (field === "countryCode") setDestination((d) => ({ ...d, countryCode: value }));
    if (field === "city") {
      clearTimeout(cityTimer.current);
      cityTimer.current = setTimeout(() => setDestination((d) => ({ ...d, city: value.trim() })), 600);
    }
  };

  if (!isLoaded) return <CheckoutSkeleton />;

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center rounded-[8px] border border-card-border px-6 py-16 text-center" role="status">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-card-border border-t-brand-coral" aria-hidden="true" />
        <p className="mt-4 text-[16px] font-semibold text-brand-dark">Order #{state.data.orderNumber} placed!</p>
        <p className="mt-1 text-[14px] text-footer-text">Taking you to your order confirmation…</p>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-[8px] border border-card-border px-6 py-16 text-center">
        <h2 className="text-[18px] font-bold text-brand-dark">Your cart is empty</h2>
        <p className="mt-1 text-[14px] text-footer-text">Add some products before checking out.</p>
        <Link href="/" className="mt-6 flex h-11 items-center rounded-[4px] bg-brand-coral px-8 text-[15px] font-semibold text-white hover:bg-brand-coral-hover">
          Return to Shop
        </Link>
      </div>
    );
  }

  const selectedShipping = shippingMethods.find((m) => m.code === shippingMethod);
  const rewardApplied = rewards?.applied ?? null;
  const total = Math.max(0, cart.subtotal - cart.discount - (rewardApplied?.amount ?? 0) + (selectedShipping?.amount ?? 0));
  const newShippingDefaults = customer ? { firstName: customer.firstName, lastName: customer.lastName } : undefined;

  const emailValid = EMAIL_PATTERN.test(email.trim());
  const emailError = (emailTouched && !emailValid ? (email ? "Enter a valid email address." : "Email address is required.") : undefined) ?? errors.email;
  const missing = [
    !customer && !emailValid && "email",
    !usingSavedShipping && !shippingValid && "shipping address",
    !shippingMethod && "shipping method",
    !paymentMethod && "payment method",
    !billingSame && (saved.length === 0 || billingAddressId === "new") && !billingValid && "billing address",
    !agreeTerms && "accept terms",
  ].filter(Boolean) as string[];
  const canPlaceOrder = missing.length === 0 && !isEstimating && !isPlacing;

  const summary = (
    <>
      <ul className="no-scrollbar max-h-[320px] space-y-3 overflow-y-auto pt-2">
        {cart.items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 rounded-[4px] border border-card-border bg-white">
              <NextImage src={item.image} alt="" width={56} height={56} className="h-full w-full object-contain" />
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-dark px-1 text-[11px] font-bold text-white">{item.quantity}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-[13px] leading-[1.3] text-brand-dark">{item.name}</p>
              <CartLineOptions options={item.options} className="mt-0.5" />
            </div>
            <p className="shrink-0 text-[13px] font-semibold text-brand-dark">{formatTk(item.price * item.quantity)}</p>
          </li>
        ))}
      </ul>
      <CouponForm />
      {rewards && rewards.balance > 0 && (
        <RewardPointsPanel rewards={rewards} pending={rewardPending} error={rewardError} onApply={updateRewards} onCancel={() => updateRewards(0)} />
      )}
      <CartTotals shipping={selectedShipping ? selectedShipping.amount : undefined} reward={rewardApplied} />
      <EarnPointsNote amount={cart.subtotal - cart.discount - (rewardApplied?.amount ?? 0)} signedIn={Boolean(customer)} />
      <OrderNoteForm />
    </>
  );

  return (
    <form ref={formRef} onSubmit={submitOrder} noValidate className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-4">
        {!customer && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[6px] border border-brand-coral/30 bg-brand-coral/5 px-4 py-3 text-[13px] text-brand-dark">
            <span>
              <strong className="text-brand-coral">Earn up to 5% Cash Back</strong> on this order — available to registered customers.
            </span>
            <Link href="/customer/account/login?redirect=/checkout" className="font-semibold text-brand-link hover:underline">
              Log in
            </Link>
          </div>
        )}

        {state && !state.ok && !state.fieldErrors && <FormAlert>{state.message}</FormAlert>}

        <Step index={1} title="Shipping Address">
          {customer ? (
            <p className="mb-4 text-[13px] text-footer-text">
              Signed in as <strong className="text-brand-dark">{customer.email}</strong>
            </p>
          ) : (
            <TextField
              id="checkout-email"
              name="email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              error={emailError}
              hint="You can create an account after checkout."
              reserveErrorSpace
              wrapperClassName="mb-3"
            />
          )}

          {saved.length > 0 ? (
            <SavedAddressOptions name="shippingAddressId" addresses={saved} value={shippingAddressId} onChange={setShippingAddressId} countries={countries} />
          ) : (
            <input type="hidden" name="shippingAddressId" value="new" />
          )}

          {!usingSavedShipping && (
            <div className={clsx(saved.length > 0 && "mt-4 border-t border-card-border pt-4")}>
              <AddressFields
                idPrefix="shipping"
                namePrefix="shipping_"
                defaultValue={newShippingDefaults}
                errors={scoped(errors, "shipping_")}
                countries={countries}
                locations={locations}
                onFieldChange={onShippingField}
                onValidityChange={setShippingValid}
              />
              {customer && <Checkbox id="save_shipping" name="save_shipping" defaultChecked label="Save in address book" className="mt-3" />}
            </div>
          )}
        </Step>

        <Step
          index={2}
          title="Shipping Method"
          aside={
            <Link href="/delivery-return-policy" className="text-[13px] font-medium text-brand-link hover:underline">
              See our Shipping Policy
            </Link>
          }
        >
          {estimateError && <FormAlert>{estimateError}</FormAlert>}
          {!usingSavedShipping && !destination.city ? (
            <p className="text-[14px] text-footer-text">Enter your city to see available shipping methods.</p>
          ) : isEstimating && shippingMethods.length === 0 ? (
            <Shimmer height={64} rounded="rounded-[6px]" />
          ) : (
            <div className={clsx("grid gap-3 sm:grid-cols-2", isEstimating && "opacity-60")} role="radiogroup" aria-label="Shipping method">
              {shippingMethods.map((m) => (
                <RadioCard
                  key={m.code}
                  name="shippingMethod"
                  value={m.code}
                  checked={shippingMethod === m.code}
                  onChange={() => setShippingMethod(m.code)}
                  title={m.label}
                  description={m.description}
                  trailing={<span className="text-[14px] font-bold text-brand-dark">{m.amount === 0 ? "FREE" : formatTk(m.amount, false)}</span>}
                />
              ))}
            </div>
          )}
          {errors.shippingMethod && <p className="mt-2 text-[12px] text-brand-alert">{errors.shippingMethod}</p>}
        </Step>

        <Step index={3} title="Payment Method">
          {paymentMethods.length === 0 ? (
            <p className="text-[14px] text-footer-text">Payment methods appear once your shipping address is set.</p>
          ) : (
            <div className="grid gap-3" role="radiogroup" aria-label="Payment method">
              {paymentMethods.map((m) => (
                <RadioCard
                  key={m.code}
                  name="paymentMethod"
                  value={m.code}
                  checked={paymentMethod === m.code}
                  onChange={() => setPaymentMethod(m.code)}
                  title={m.label}
                  description={m.description}
                  trailing={m.badge && <span className="shrink-0 rounded-full bg-brand-coral px-2 py-0.5 text-[11px] font-bold text-white">{m.badge}</span>}
                />
              ))}
            </div>
          )}
          {errors.paymentMethod && <p className="mt-2 text-[12px] text-brand-alert">{errors.paymentMethod}</p>}

          <div className="mt-4 border-t border-card-border pt-3">
            <Checkbox
              id="billingSame"
              name="billingSame"
              checked={billingSame}
              onChange={(e) => setBillingSame(e.target.checked)}
              label="My billing and shipping address are the same"
            />
            <Collapse open={!billingSame}>
              <div className="mt-3 space-y-4">
                <h3 className="text-[14px] font-bold uppercase tracking-[0.1em] text-brand-dark">Billing Address</h3>
                {saved.length > 0 ? (
                  <SavedAddressOptions name="billingAddressId" addresses={saved} value={billingAddressId} onChange={setBillingAddressId} countries={countries} />
                ) : (
                  <input type="hidden" name="billingAddressId" value="new" />
                )}
                {(saved.length === 0 || billingAddressId === "new") && (
                  <>
                    <AddressFields
                      idPrefix="billing"
                      namePrefix="billing_"
                      errors={scoped(errors, "billing_")}
                      countries={countries}
                      locations={locations}
                      onValidityChange={setBillingValid}
                    />
                    {customer && <Checkbox id="save_billing" name="save_billing" label="Save in address book" />}
                  </>
                )}
              </div>
            </Collapse>
          </div>

          <Checkbox
            id="agreeTerms"
            name="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-3 text-[13px]"
            label={
              <>
                I agree to the{" "}
                <Link href="/terms-condition" className="text-brand-link hover:underline">Terms &amp; Conditions</Link> and{" "}
                <Link href="/delivery-return-policy" className="text-brand-link hover:underline">Delivery &amp; Return Policy</Link>
              </>
            }
          />
        </Step>

        <section aria-label="Order summary" className="rounded-[6px] border border-card-border bg-white lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-[14px] font-black uppercase tracking-[0.1em] text-brand-dark">
              Order Summary <span className="font-semibold normal-case tracking-normal text-footer-text">({cart.totalQuantity} {cart.totalQuantity === 1 ? "item" : "items"})</span>
            </h2>
            <span className="text-[15px] font-bold text-brand-alert">{formatTk(total)}</span>
          </div>
          <div className="space-y-4 border-t border-card-border p-4">
            {summary}
            <TrustBadges />
          </div>
        </section>
      </div>

      <aside aria-label="Order summary" className="hidden space-y-5 rounded-[6px] border border-card-border bg-white p-5 lg:sticky lg:top-4 lg:block">
        <h2 className="text-[16px] font-black uppercase tracking-[0.1em] text-brand-dark">Order Summary</h2>
        {summary}
        <button
          type="submit"
          disabled={!canPlaceOrder}
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[4px] bg-brand-coral text-[17px] font-semibold text-white transition-colors hover:bg-brand-coral-hover disabled:cursor-not-allowed disabled:bg-price-strikethrough/40"
        >
          {isPlacing ? "Placing order..." : `Place Order · ${formatTk(total)}`}
        </button>
        <TrustBadges />
      </aside>

      <div data-sticky-cta="checkout" className="fixed inset-x-0 bottom-[calc(4rem+1px+env(safe-area-inset-bottom))] z-30 flex items-center gap-3 border-t border-card-border bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="text-[18px] font-bold leading-tight text-brand-alert">{formatTk(total)}</p>
          <p className="text-[11px] leading-[14px] text-footer-text">Total incl. shipping</p>
        </div>
        <button
          type="submit"
          disabled={!canPlaceOrder}
          className="flex h-12 shrink-0 cursor-pointer items-center rounded-[4px] bg-brand-coral px-6 text-[16px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-price-strikethrough/40"
        >
          {isPlacing ? "Placing..." : "Place Order"}
        </button>
      </div>
    </form>
  );
}

export default CheckoutView;
