import { cookies } from "next/headers";
import type { MagentoOrder, MagentoOrderAddress } from "@/types/magento";
import { cartResolvers, clearMockCart, readMockCartForRewards } from "./cart";

const CHECKOUT_COOKIE = "bs_mock_checkout";
const ORDERS_COOKIE = "bs_mock_orders";
const COOKIE_OPTS = { httpOnly: true, sameSite: "lax" as const, path: "/", maxAge: 2592000 };

type CartAddressInput = {
  firstname: string;
  lastname: string;
  telephone: string;
  street: string[];
  city: string;
  postcode?: string;
  country_code: string;
  custom_attributes?: Array<{ attribute_code: string; value: string }>;
};

interface CheckoutState {
  shipping?: MagentoOrderAddress;
  billing?: MagentoOrderAddress;
  shippingMethod?: { carrier: string; method: string };
  payment?: string;
  note?: string;
}

/** Compact order record persisted for the mock "My Orders" pages. */
export interface MockPlacedOrder {
  number: string;
  date: string;
  lines: Array<{ sku: string; qty: number; price: number; name: string; url_key: string }>;
  shipping: number;
  discount: number;
  payment: string;
  shippingTitle: string;
  shippingAddress: MagentoOrderAddress;
  billingAddress: MagentoOrderAddress;
  note?: string;
}

/** Rates and methods as configured on the client's live store. */
const RATES = {
  inside: { carrier_code: "flatrate", method_code: "inside_dhaka", carrier_title: "Inside Dhaka City", method_title: "1-5 Business Days", amount: { value: 60 } },
  outside: { carrier_code: "tablerate", method_code: "outside_dhaka", carrier_title: "Outside Dhaka", method_title: "2-5 Business Days", amount: { value: 120 } },
};

const PAYMENT_METHODS = [
  { code: "cashondelivery", title: "Cash On Delivery - All Bangladesh" },
  { code: "banktransfer", title: "bKash Payment" },
  { code: "sslcommerz", title: "Debit & Credit Card (Visa, Master, Amex & Mobile Banking)" },
];

async function readJson<T>(name: string, fallback: T): Promise<T> {
  const raw = (await cookies()).get(name)?.value;
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function updateCheckout(change: (s: CheckoutState) => void) {
  const state = await readJson<CheckoutState>(CHECKOUT_COOKIE, {});
  change(state);
  (await cookies()).set(CHECKOUT_COOKIE, JSON.stringify(state), COOKIE_OPTS);
  return state;
}

function fromInput(a: CartAddressInput): MagentoOrderAddress {
  return {
    firstname: a.firstname,
    lastname: a.lastname,
    telephone: a.telephone,
    street: a.street,
    city: a.city,
    postcode: a.postcode ?? null,
    country_code: a.country_code,
    region: (a as { region?: string }).region ?? null,
    custom_attributesV2: (a.custom_attributes ?? []).map((c) => ({ code: c.attribute_code, value: c.value })),
  };
}

/** Resolves `{ address }` or `{ customer_address_id }` to an address. */
async function resolveAddress(input: Record<string, unknown>, token?: string | null): Promise<MagentoOrderAddress> {
  if (input.customer_address_id) {
    const { findMockCustomerAddress } = await import("./customer");
    const saved = await findMockCustomerAddress(token, Number(input.customer_address_id));
    if (!saved) throw new Error("Could not find a address with ID \"" + input.customer_address_id + "\"");
    return { ...saved, region: saved.region?.region ?? null };
  }
  return fromInput(input.address as CartAddressInput);
}

/** Standard rates are free over TK 3000 (announcement bar promise). */
function ratesFor(city: string, subtotal: number) {
  const rate = /dhaka/i.test(city) ? RATES.inside : RATES.outside;
  return [subtotal >= 3000 ? { ...rate, amount: { value: 0 } } : rate];
}

export function placedToMagento(o: MockPlacedOrder): MagentoOrder {
  const subtotal = o.lines.reduce((a, l) => a + l.price * l.qty, 0);
  return {
    id: o.number,
    number: o.number,
    order_date: o.date,
    status: "Pending",
    payment_methods: [{ name: o.payment }],
    shipping_method: o.shippingTitle,
    shipping_address: o.shippingAddress,
    billing_address: o.billingAddress,
    total: {
      subtotal: { value: subtotal },
      total_shipping: { value: o.shipping },
      discounts: o.discount ? [{ amount: { value: o.discount } }] : [],
      grand_total: { value: subtotal - o.discount + o.shipping },
    },
    items: o.lines.map((l) => ({
      product_sku: l.sku,
      product_name: l.name,
      product_url_key: l.url_key,
      product_sale_price: { value: l.price },
      quantity_ordered: l.qty,
    })),
    comments: o.note ? [{ message: o.note, timestamp: o.date }] : [],
  };
}

export async function readPlacedOrders(): Promise<MockPlacedOrder[]> {
  return readJson<MockPlacedOrder[]>(ORDERS_COOKIE, []);
}

export const checkoutResolvers = {
  SetGuestEmail: () => ({ setGuestEmailOnCart: { cart: { id: "mock" } } }),
  SetShippingAddress: async (v: Record<string, unknown>, token?: string | null) => {
    const input = v.shippingAddress as Record<string, unknown>;
    const address = await resolveAddress(input, token);
    await updateCheckout((s) => {
      s.shipping = address;
      s.note = typeof input.customer_notes === "string" && input.customer_notes.trim() ? input.customer_notes.trim() : undefined;
    });
    const { cart } = await cartResolvers.Cart();
    const subtotal = cart.prices?.subtotal_including_tax?.value ?? 0;
    return {
      setShippingAddressesOnCart: {
        cart: {
          shipping_addresses: [{ available_shipping_methods: ratesFor(address.city, subtotal) }],
          available_payment_methods: PAYMENT_METHODS,
        },
      },
    };
  },
  SetBillingAddress: async (v: Record<string, unknown>, token?: string | null) => {
    const input = v.billingAddress as Record<string, unknown>;
    const state = await readJson<CheckoutState>(CHECKOUT_COOKIE, {});
    const billing = input.same_as_shipping ? state.shipping : await resolveAddress(input, token);
    await updateCheckout((s) => void (s.billing = billing));
    return { setBillingAddressOnCart: { cart: { id: "mock" } } };
  },
  SetShippingMethod: async (v: Record<string, unknown>) => {
    await updateCheckout((s) => void (s.shippingMethod = { carrier: String(v.carrier), method: String(v.method) }));
    return { setShippingMethodsOnCart: { cart: { id: "mock" } } };
  },
  SetPaymentMethod: async (v: Record<string, unknown>) => {
    await updateCheckout((s) => void (s.payment = String(v.code)));
    return { setPaymentMethodOnCart: { cart: { id: "mock" } } };
  },
  PlaceOrder: async () => {
    const state = await readJson<CheckoutState>(CHECKOUT_COOKIE, {});
    const { cart } = await cartResolvers.Cart();
    if (!cart.items.length) return { placeOrder: { orderV2: null, errors: [{ message: "Your cart is empty." }] } };
    if (!state.shipping || !state.billing || !state.shippingMethod || !state.payment) {
      return { placeOrder: { orderV2: null, errors: [{ message: "Please complete the shipping and payment details." }] } };
    }

    const subtotal = cart.prices?.subtotal_including_tax?.value ?? 0;
    const rate = ratesFor(state.shipping.city, subtotal)[0];
    /* Reward points spent at checkout (10 points = TK 1), folded into the order discount. */
    const rewards = await readMockCartForRewards();
    const rewardAmount = Math.min(rewards.points / 10, rewards.payable);
    const number = String(12459 + Math.floor(Math.random() * 900)).padStart(9, "0");
    const order: MockPlacedOrder = {
      number,
      date: new Date().toISOString(),
      lines: cart.items.map((i) => ({
        sku: i.product.sku,
        qty: i.quantity,
        price: i.prices.price.value,
        name: i.product.name,
        url_key: i.product.url_key,
      })),
      shipping: rate.amount.value,
      discount: (cart.prices?.discounts?.[0]?.amount.value ?? 0) + rewardAmount,
      payment: PAYMENT_METHODS.find((p) => p.code === state.payment)?.title ?? state.payment,
      shippingTitle: `${rate.carrier_title} - ${rate.method_title}`,
      shippingAddress: state.shipping,
      billingAddress: state.billing,
      note: state.note,
    };

    const orders = [order, ...(await readPlacedOrders())].slice(0, 2);
    const store = await cookies();
    store.set(ORDERS_COOKIE, JSON.stringify(orders), COOKIE_OPTS);
    store.delete(CHECKOUT_COOKIE);
    await clearMockCart();
    return { placeOrder: { orderV2: placedToMagento(order), errors: [] } };
  },
};
