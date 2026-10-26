import {
  PLACE_ORDER,
  SET_BILLING_ADDRESS,
  SET_GUEST_EMAIL,
  SET_PAYMENT_METHOD,
  SET_SHIPPING_ADDRESS,
  SET_SHIPPING_METHOD,
} from "@/graphql/checkout";
import { graphqlMutate } from "@/lib/graphql-fetch";
import type { AddressInput, Order, PaymentMethod, ShippingMethod } from "@/types/storefront";
import type { MagentoOrder } from "@/types/magento";
import { attachItemImages, mapOrder } from "./customer";
import { clearGuestCartId, getCustomerToken } from "@/utils/session";
import { resolveCartId } from "./cart";

/** Either a saved customer address or a newly entered one. */
export type CheckoutAddressRef =
  | { customerAddressId: string; address?: never; saveInAddressBook?: never }
  | { address: AddressInput; customerAddressId?: never; saveInAddressBook?: boolean };

export interface PlaceOrderInput {
  email?: string;
  shipping: CheckoutAddressRef;
  billing: { sameAsShipping: true } | ({ sameAsShipping: false } & CheckoutAddressRef);
  shippingMethod: string;
  paymentMethod: string;
  orderNote?: string;
}

/** Local copy for payment codes used by the client store. */
const PAYMENT_COPY: Record<string, Pick<PaymentMethod, "description" | "badge">> = {
  cashondelivery: { description: "Pay with cash when your order is delivered." },
  banktransfer: { description: "Pay instantly from your bKash wallet.", badge: "5% Cash Back" },
  sslcommerz: { description: "Pay securely via SSLCommerz.", badge: "5% Cash Back" },
};

/** Magento `CartAddressInput` (thana is the `thana_name` custom address attribute). */
export function toCartAddress(a: AddressInput, saveInAddressBook = false) {
  const thanaVal = [a.area, a.thana].filter(Boolean).join(", ") || a.thana;
  return {
    firstname: a.firstName,
    lastname: a.lastName,
    street: a.street.filter(Boolean),
    city: a.city,
    postcode: a.postcode || undefined,
    country_code: a.countryCode,
    region: a.region || undefined,
    telephone: a.phone,
    save_in_address_book: saveInAddressBook,
    custom_attributes: [{ attribute_code: "thana_name", value: thanaVal }],
  };
}

function toShippingInput(ref: CheckoutAddressRef) {
  return ref.customerAddressId
    ? { customer_address_id: Number(ref.customerAddressId) }
    : { address: toCartAddress(ref.address!, Boolean(ref.saveInAddressBook)) };
}

function toBillingInput(billing: PlaceOrderInput["billing"]) {
  if (billing.sameAsShipping) return { same_as_shipping: true };
  return billing.customerAddressId
    ? { customer_address_id: Number(billing.customerAddressId) }
    : { address: toCartAddress(billing.address!, Boolean(billing.saveInAddressBook)) };
}

/** Sets the shipping address on the cart and returns what Magento offers for it. */
export async function estimateCheckout(shipping: CheckoutAddressRef) {
  const cartId = await resolveCartId(true);
  const token = await getCustomerToken();
  const data = await graphqlMutate<{
    setShippingAddressesOnCart: {
      cart: {
        shipping_addresses: Array<{
          available_shipping_methods: Array<{
            carrier_code: string;
            method_code: string;
            carrier_title: string;
            method_title: string;
            amount: { value: number };
          }>;
        }>;
        available_payment_methods: Array<{ code: string; title: string }>;
      };
    };
  }>(SET_SHIPPING_ADDRESS, { cartId, shippingAddress: toShippingInput(shipping) }, token);

  const { cart } = data.setShippingAddressesOnCart;
  const shippingMethods: ShippingMethod[] = (cart.shipping_addresses[0]?.available_shipping_methods ?? []).map((m) => ({
    code: `${m.carrier_code}|${m.method_code}`,
    label: m.carrier_title,
    description: m.method_title,
    amount: m.amount.value,
  }));
  const paymentMethods: PaymentMethod[] = cart.available_payment_methods.map((p) => ({
    code: p.code,
    label: p.title,
    description: PAYMENT_COPY[p.code]?.description ?? "",
    badge: PAYMENT_COPY[p.code]?.badge,
  }));
  return { shippingMethods, paymentMethods };
}

/** Places the order; `order` is Magento 2.4.7+ `placeOrder.orderV2` (null on older versions), for the confirmation page. */
export async function placeOrder(input: PlaceOrderInput): Promise<{ number: string; order: Order | null }> {
  const cartId = await resolveCartId(false);
  if (!cartId) throw new Error("Your cart is empty.");
  const token = await getCustomerToken();
  const [carrier, method] = input.shippingMethod.split("|");

  if (!token && input.email) await graphqlMutate(SET_GUEST_EMAIL, { cartId, email: input.email });
  const shippingAddress = { ...toShippingInput(input.shipping), ...(input.orderNote && { customer_notes: input.orderNote }) };
  await graphqlMutate(SET_SHIPPING_ADDRESS, { cartId, shippingAddress }, token);
  await graphqlMutate(SET_BILLING_ADDRESS, { cartId, billingAddress: toBillingInput(input.billing) }, token);
  await graphqlMutate(SET_SHIPPING_METHOD, { cartId, carrier, method }, token);
  await graphqlMutate(SET_PAYMENT_METHOD, { cartId, code: input.paymentMethod }, token);

  const data = await graphqlMutate<{
    placeOrder: { orderV2: MagentoOrder | null; errors?: Array<{ message: string }> };
  }>(PLACE_ORDER, { cartId }, token);
  if (!data.placeOrder.orderV2) throw new Error(data.placeOrder.errors?.[0]?.message ?? "Unable to place the order.");

  if (!token) await clearGuestCartId();
  const placed = data.placeOrder.orderV2;
  const order = placed.items ? (await attachItemImages([mapOrder(placed)]))[0] : null;
  /* Until the order returns it, the confirmation still shows what the shopper wrote. */
  if (order && input.orderNote && !order.comments?.length) order.comments = [{ message: input.orderNote, date: order.createdAt }];
  return { number: placed.number, order };
}
