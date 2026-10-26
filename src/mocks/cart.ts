import { cookies } from "next/headers";
import type { MagentoCart } from "@/types/magento";
import { findMockProductBySku, findMockVariant } from "./catalog";

const COOKIE = "bs_mock_cart";
export const MOCK_CART_ID = "mock-masked-cart-id";

interface MockCartState {
  /** `options`: picked configurable value uids; the same product in another size is its own line. */
  lines: Array<{ sku: string; qty: number; options?: string[] }>;
  coupon?: string;
  /** Reward points spent on this cart (cleared with the cart). */
  rewards?: number;
}

/** Percentage (< 1) or fixed TK amount. */
export const MOCK_COUPONS: Record<string, number> = { BANGLA10: 0.1, WELCOME50: 50 };

async function read(): Promise<MockCartState> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return { lines: [] };
  try {
    return JSON.parse(raw) as MockCartState;
  } catch {
    return { lines: [] };
  }
}

async function write(state: MockCartState) {
  (await cookies()).set(COOKIE, JSON.stringify(state), { httpOnly: true, sameSite: "lax", path: "/", maxAge: 2592000 });
}

const lineUid = (sku: string, options?: string[]) => (options?.length ? `${sku}:${options.join(",")}` : sku);

function toMagentoCart(state: MockCartState): MagentoCart {
  const items: MagentoCart["items"] = state.lines.flatMap(({ sku, qty, options }) => {
    const p = findMockProductBySku(sku);
    if (!p) return [];
    const variant = options?.length ? findMockVariant(p.url_key, options) : undefined;
    return [
      {
        uid: lineUid(sku, options),
        quantity: qty,
        product: {
          sku,
          name: p.name,
          url_key: p.url_key,
          country_of_manufacture: p.country_of_manufacture,
          small_image: p.small_image,
          price_range: { minimum_price: { regular_price: p.price_range.minimum_price.regular_price } },
        },
        prices: { price: variant ? { value: variant.price } : p.price_range.minimum_price.final_price },
        ...(variant && {
          configurable_options: variant.labels,
          configured_variant: { price_range: { minimum_price: { regular_price: { value: variant.regular } } } },
        }),
      },
    ];
  });
  const subtotal = items.reduce((acc, i) => acc + i.prices.price.value * i.quantity, 0);
  const rule = state.coupon ? MOCK_COUPONS[state.coupon] : undefined;
  const discount = rule ? (rule < 1 ? Math.round(subtotal * rule) : Math.min(rule, subtotal)) : 0;

  return {
    id: MOCK_CART_ID,
    total_quantity: items.reduce((acc, i) => acc + i.quantity, 0),
    applied_coupons: rule ? [{ code: state.coupon! }] : null,
    prices: {
      subtotal_including_tax: { value: subtotal },
      discounts: discount ? [{ amount: { value: discount } }] : [],
    },
    items,
  };
}

async function mutate(change: (state: MockCartState) => void) {
  const state = await read();
  change(state);
  await write(state);
  return { cart: toMagentoCart(state) };
}

/** Subtotal after coupon and whether reward points are applied, for the reward mocks. */
export async function readMockCartForRewards() {
  const state = await read();
  const cart = toMagentoCart(state);
  const subtotal = cart.prices?.subtotal_including_tax?.value ?? 0;
  const discount = Math.abs((cart.prices?.discounts ?? []).reduce((a, d) => a + d.amount.value, 0));
  return { payable: Math.max(0, subtotal - discount), points: state.rewards ?? 0 };
}

export async function setMockRewardPoints(points: number) {
  await mutate((s) => {
    if (points > 0) s.rewards = points;
    else delete s.rewards;
  });
}

export async function clearMockCart() {
  await write({ lines: [] });
}

export const cartResolvers = {
  CreateEmptyCart: () => ({ createEmptyCart: MOCK_CART_ID }),
  Cart: async () => ({ cart: toMagentoCart(await read()) }),
  CustomerCart: async () => ({ customerCart: toMagentoCart(await read()) }),
  AddToCart: async (v: Record<string, unknown>) => {
    const sku = String(v.sku);
    const product = findMockProductBySku(sku);
    if (!product) throw new Error("The product that was requested doesn't exist.");
    const options = Array.isArray(v.selectedOptions) && v.selectedOptions.length ? v.selectedOptions.map(String) : undefined;
    /* Magento refuses a configurable product without its options. */
    if (product.__typename === "ConfigurableProduct" && !options) throw new Error("You need to choose options for your item.");
    const uid = lineUid(sku, options);
    const result = await mutate((s) => {
      const line = s.lines.find((l) => lineUid(l.sku, l.options) === uid);
      if (line) line.qty += Number(v.quantity);
      else s.lines.unshift({ sku, qty: Number(v.quantity), ...(options && { options }) });
    });
    return { addProductsToCart: { ...result, user_errors: [] } };
  },
  UpdateCartItem: async (v: Record<string, unknown>) => ({
    updateCartItems: await mutate((s) => {
      s.lines = s.lines.map((l) => (lineUid(l.sku, l.options) === v.uid ? { ...l, qty: Number(v.quantity) } : l)).filter((l) => l.qty > 0);
    }),
  }),
  RemoveCartItem: async (v: Record<string, unknown>) => ({
    removeItemFromCart: await mutate((s) => {
      s.lines = s.lines.filter((l) => lineUid(l.sku, l.options) !== v.uid);
    }),
  }),
  ApplyCoupon: async (v: Record<string, unknown>) => {
    const code = String(v.code).trim().toUpperCase();
    if (!MOCK_COUPONS[code]) throw new Error(`The coupon code "${v.code}" is not valid.`);
    return { applyCouponToCart: await mutate((s) => void (s.coupon = code)) };
  },
  RemoveCoupon: async () => ({ removeCouponFromCart: await mutate((s) => void delete s.coupon) }),
};
