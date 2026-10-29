import { readMockCartForRewards, setMockRewardPoints } from "./cart";
import { cookies } from "next/headers";
import type { MagentoAddress, MagentoCustomer, MagentoOrder, MagentoOrderAddress } from "@/types/magento";
import { MOCK_PRODUCTS } from "./catalog";
import { placedToMagento, readPlacedOrders } from "./checkout";

const PROFILE_COOKIE = "bs_mock_customer";
const WISHLIST_COOKIE = "bs_mock_wishlist_removed";
const WISHLIST_ADDED_COOKIE = "bs_mock_wishlist_added";
const CANCELED_COOKIE = "bs_mock_canceled_orders";
const COOKIE_OPTS = { httpOnly: true, sameSite: "lax" as const, path: "/", maxAge: 2592000 };
const TOKEN_PREFIX = "mock-token:";

const DEFAULT_ADDRESSES: MagentoAddress[] = [
  {
    id: 1,
    firstname: "Nusrat",
    lastname: "Jahan",
    telephone: "8801712345678",
    street: ["House 134, Road 12", "Block E"],
    city: "Dhaka",
    postcode: "1213",
    country_code: "BD",
    custom_attributesV2: [{ code: "thana_name", value: "Banani" }],
    default_shipping: true,
    default_billing: true,
  },
  {
    id: 2,
    firstname: "Nusrat",
    lastname: "Jahan",
    telephone: "8801812987654",
    street: ["Flat 5B, 22 Agrabad C/A"],
    city: "Chattogram",
    postcode: "4100",
    country_code: "BD",
    custom_attributesV2: [{ code: "thana_name", value: "Double Mooring" }],
    default_shipping: false,
    default_billing: false,
  },
];

function emailFromToken(token?: string | null): string {
  if (!token?.startsWith(TOKEN_PREFIX)) throw new Error("The current customer isn't authorized.");
  return Buffer.from(token.slice(TOKEN_PREFIX.length), "base64url").toString("utf8");
}

async function readProfile(email: string): Promise<MagentoCustomer> {
  const raw = (await cookies()).get(PROFILE_COOKIE)?.value;
  if (raw) {
    try {
      const saved = JSON.parse(raw) as MagentoCustomer;
      if (saved.email === email) return saved;
    } catch {
      /* fall through to default profile */
    }
  }
  const local = email.split("@")[0].replace(/[^a-z]/gi, " ").trim();
  return {
    id: 1001,
    firstname: local ? local.charAt(0).toUpperCase() + local.slice(1).split(" ")[0] : "Nusrat",
    lastname: "Jahan",
    email,
    gender: 2,
    date_of_birth: "1996-04-18",
    is_subscribed: true,
    addresses: DEFAULT_ADDRESSES,
  };
}

async function writeProfile(profile: MagentoCustomer) {
  (await cookies()).set(PROFILE_COOKIE, JSON.stringify(profile), COOKIE_OPTS);
}

async function updateProfile(token: string | null | undefined, change: (p: MagentoCustomer) => void) {
  const profile = await readProfile(emailFromToken(token));
  change(profile);
  await writeProfile(profile);
  return profile;
}

function toAddress(id: number, input: Record<string, unknown>): MagentoAddress {
  const attrs = (input.custom_attributesV2 as Array<{ attribute_code: string; value: string }>) ?? [];
  return {
    id,
    firstname: String(input.firstname),
    lastname: String(input.lastname),
    telephone: String(input.telephone),
    street: input.street as string[],
    city: String(input.city),
    postcode: (input.postcode as string) ?? null,
    country_code: String(input.country_code ?? "BD"),
    region: (input.region as { region?: string } | undefined) ?? null,
    custom_attributesV2: attrs.map((a) => ({ code: a.attribute_code, value: a.value })),
    default_shipping: Boolean(input.default_shipping),
    default_billing: Boolean(input.default_billing),
  };
}

/** Saved address lookup used by the mock checkout (customer_address_id). */
export async function findMockCustomerAddress(token: string | null | undefined, id: number): Promise<MagentoAddress | undefined> {
  const profile = await readProfile(emailFromToken(token));
  return profile.addresses?.find((a) => a.id === id);
}

function applyDefaults(addresses: MagentoAddress[], changed: MagentoAddress) {
  return addresses.map((a) =>
    a.id === changed.id
      ? changed
      : {
          ...a,
          default_shipping: changed.default_shipping ? false : a.default_shipping,
          default_billing: changed.default_billing ? false : a.default_billing,
        },
  );
}

const line = (i: number, qty: number) => {
  const p = MOCK_PRODUCTS[i];
  return {
    product_sku: p.sku,
    product_name: p.name,
    product_url_key: p.url_key,
    product_sale_price: p.price_range.minimum_price.final_price,
    quantity_ordered: qty,
  };
};

const SAMPLE_ADDRESS: MagentoOrderAddress = {
  firstname: "Nusrat",
  lastname: "Jahan",
  telephone: "8801712345678",
  street: ["House 134, Road 12", "Block E"],
  city: "Dhaka",
  postcode: "1213",
  country_code: "BD",
  custom_attributesV2: [{ code: "thana_name", value: "Banani" }],
};

function sampleOrder(number: string, date: string, status: string, items: MagentoOrder["items"], payment: string): MagentoOrder {
  const subtotal = items.reduce((a, i) => a + i.product_sale_price.value * i.quantity_ordered, 0);
  const shipping = subtotal >= 3000 ? 0 : 60;
  return {
    id: number,
    number,
    order_date: date,
    status,
    payment_methods: [{ name: payment }],
    shipping_method: "Inside Dhaka City - 1-5 Business Days",
    shipping_address: SAMPLE_ADDRESS,
    billing_address: SAMPLE_ADDRESS,
    total: {
      subtotal: { value: subtotal },
      total_shipping: { value: shipping },
      discounts: [],
      grand_total: { value: subtotal + shipping },
    },
    items,
  };
}

const SAMPLE_ORDERS: MagentoOrder[] = [
  {
    ...sampleOrder("000012602", "2026-10-11 18:42:00", "Pending", [line(4, 1), line(9, 2)], "Cash On Delivery - All Bangladesh"),
    comments: [{ message: "Please call before delivery. If I'm not home, leave the parcel with the building guard.", timestamp: "2026-10-11 18:42:00" }],
  },
  sampleOrder("000012458", "2026-09-28 10:24:00", "Processing", [line(0, 2), line(5, 1)], "bKash Payment"),
  sampleOrder("000012311", "2026-09-12 15:02:00", "Shipped", [line(3, 1)], "Cash On Delivery - All Bangladesh"),
  sampleOrder("000011876", "2026-08-21 08:40:00", "Complete", [line(8, 1), line(12, 3), line(2, 1)], "Debit & Credit Card (Visa, Master, Amex & Mobile Banking)"),
  sampleOrder("000011502", "2026-07-30 19:11:00", "Complete", [line(15, 1)], "Cash On Delivery - All Bangladesh"),
  sampleOrder("000010977", "2026-06-02 12:55:00", "Canceled", [line(20, 2)], "bKash Payment"),
  sampleOrder("000010614", "2026-05-18 17:20:00", "Complete", [line(22, 1), line(25, 1)], "bKash Payment"),
  sampleOrder("000010233", "2026-04-27 11:05:00", "Complete", [line(28, 2)], "Cash On Delivery - All Bangladesh"),
  sampleOrder("000009871", "2026-03-30 20:42:00", "Complete", [line(30, 1)], "Debit & Credit Card (Visa, Master, Amex & Mobile Banking)"),
  sampleOrder("000009512", "2026-03-02 09:15:00", "Canceled", [line(33, 1)], "bKash Payment"),
  sampleOrder("000009104", "2026-02-11 14:38:00", "Complete", [line(35, 3)], "Cash On Delivery - All Bangladesh"),
  sampleOrder("000008760", "2026-01-19 16:02:00", "Complete", [line(38, 1), line(40, 1)], "bKash Payment"),
  sampleOrder("000008397", "2025-12-24 10:30:00", "Complete", [line(42, 2)], "Debit & Credit Card (Visa, Master, Amex & Mobile Banking)"),
];


async function allOrders(token?: string | null) {
  emailFromToken(token);
  const canceled = JSON.parse((await cookies()).get(CANCELED_COOKIE)?.value ?? "[]") as string[];
  return [...(await readPlacedOrders()).map(placedToMagento), ...SAMPLE_ORDERS].map((o) => (canceled.includes(o.number) ? { ...o, status: "Canceled" } : o));
}

type Vars = Record<string, unknown>;

/** Spent points are capped by the balance and the payable total; 10 points = TK 1 (same rate as the balance). */
async function mockAppliedRewards() {
  const { payable, points } = await readMockCartForRewards();
  if (!points) return null;
  const balancePoints = MOCK_REWARD_HISTORY.reduce((sum, h) => sum + h.change, 0);
  const used = Math.min(points, balancePoints, Math.floor(payable * 10));
  return used > 0 ? { money: { value: used / 10 }, points: used } : null;
}

/** Reviews the demo customer has written (three real catalogue products). */
const MOCK_REVIEWS = [
  { idx: 0, days: 3, stars: 5, summary: "Lightweight and hydrating", text: "Absorbs quickly and keeps my skin soft all day. Perfect for the Dhaka humidity, no greasy feel at all." },
  { idx: 6, days: 21, stars: 4, summary: "Good product", text: "Works well on dry patches. The tube is a bit small for the price, but it is 100% authentic and delivery was fast." },
  { idx: 12, days: 47, stars: 3, summary: "Okay for the price", text: "Does the job, though I expected a stronger scent. Packaging arrived well sealed." },
];

/** Cash Back Reward history, newest first (1 point = TK 0.10). */
const MOCK_REWARD_HISTORY = [
  { days: 2, reason: "Cash Back for order #000012458", change: 48 },
  { days: 9, reason: "Redeemed on order #000012390", change: -200 },
  { days: 16, reason: "Cash Back for order #000012311", change: 37 },
  { days: 28, reason: "Product review bonus", change: 20 },
  { days: 38, reason: "Cash Back for order #000011876", change: 112 },
  { days: 52, reason: "Pre-payment bonus (5%)", change: 165 },
  { days: 70, reason: "Cash Back for order #000011502", change: 68 },
  { days: 95, reason: "Welcome bonus", change: 1000 },
];

const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 19).replace("T", " ");

/** Mirasvit tiers as on the client's live store; the logos come from Magento (tier_logo). */
const MOCK_TIERS = [
  {
    name: "Silver Member",
    min_earn_points: 0,
    tier_logo: "/assets/images/mock/rewards/tier-silver.webp",
    description:
      "Welcome to BanglaShoppers Rewards! As a <strong>Silver Member</strong> you earn reward points on every purchase. Keep shopping to reach <strong>Gold Member</strong> status at <strong>50,000 reward points</strong>.",
  },
  {
    name: "Gold Member",
    min_earn_points: 50000,
    tier_logo: "/assets/images/mock/rewards/tier-gold.webp",
    description:
      "Congratulations! You've reached <strong>Gold Member</strong> status at BanglaShoppers! With <strong>50,000 reward points</strong>, you've unlocked a new milestone in your loyalty journey. Keep shopping, earning points, and enjoying your Gold Membership as you work toward our prestigious Platinum Member tier at 100,000 points!",
  },
  {
    name: "Platinum Member",
    min_earn_points: 100000,
    tier_logo: "/assets/images/mock/rewards/tier-platinum.webp",
    description:
      "Congratulations on becoming a <strong>Platinum Member</strong> of BanglaShoppers! With <strong>100,000 reward points</strong>, you've achieved our highest and most prestigious membership tier. Your loyalty means the world to us! Enjoy the recognition of being among our most valued shoppers and continue earning rewards with every purchase. Thank you for being part of the BanglaShoppers family!",
  },
];

/** Points from orders not delivered yet (not activated). */
const MOCK_PENDING_REWARDS = [{ transaction_id: 9101, code: "order_earn", comment: "Cash Back for order #000012602", amount: 52, is_activated: false }];

export const customerResolvers = {
  GenerateToken: (v: Vars) => {
    const email = String(v.email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || String(v.password).length < 6) {
      throw new Error("The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.");
    }
    return { generateCustomerToken: { token: TOKEN_PREFIX + Buffer.from(email).toString("base64url") } };
  },
  RevokeToken: () => ({ revokeCustomerToken: { result: true } }),
  CreateCustomer: async (v: Vars) => {
    const input = v.input as Record<string, unknown>;
    await writeProfile({
      id: 1002,
      firstname: String(input.firstname),
      lastname: String(input.lastname),
      email: String(input.email).toLowerCase(),
      gender: (input.gender as number) ?? undefined,
      date_of_birth: (input.date_of_birth as string) || (input.dob as string) || undefined,
      is_subscribed: Boolean(input.is_subscribed),
      addresses: [],
    });
    return { createCustomerV2: { customer: { email: input.email } } };
  },
  RequestPasswordReset: () => ({ requestPasswordResetEmail: true }),
  ChangePassword: (v: Vars, token?: string | null) => {
    const email = emailFromToken(token);
    if (String(v.current).length < 6) throw new Error("The password doesn't match this account. Verify the password and try again.");
    return { changeCustomerPassword: { email } };
  },
  MergeGuestCart: () => ({ mergeCarts: { id: "mock" } }),
  UpdateNewsletter: async (v: Vars, token?: string | null) => {
    const profile = await updateProfile(token, (p) => {
      p.is_subscribed = Boolean(v.subscribed);
    });
    return { updateCustomerV2: { customer: { is_subscribed: profile.is_subscribed } } };
  },
  CustomerReviews: (v: Vars) => {
    const pageSize = Number(v.pageSize) || 10;
    const currentPage = Number(v.currentPage) || 1;
    const all = MOCK_REVIEWS.map((r) => {
      const p = MOCK_PRODUCTS[r.idx];
      return {
        created_at: daysAgo(r.days),
        summary: r.summary,
        text: r.text,
        average_rating: r.stars * 20,
        ratings_breakdown: [{ name: "Rating", value: String(r.stars) }],
        product: { name: p.name, url_key: p.url_key, small_image: p.small_image },
      };
    });
    return {
      customer: {
        reviews: {
          items: all.slice((currentPage - 1) * pageSize, currentPage * pageSize),
          page_info: { current_page: currentPage, page_size: pageSize, total_pages: Math.max(1, Math.ceil(all.length / pageSize)) },
        },
      },
    };
  },
  CustomerDownloadableProducts: () => ({ customerDownloadableProducts: { items: [] } }),
  CustomerPaymentTokens: () => ({ customerPaymentTokens: { items: [] } }),
  DeletePaymentToken: () => ({ deletePaymentToken: { result: true } }),
  CartRewardPoints: async () => ({ cart: { applied_reward_points: await mockAppliedRewards() } }),
  ApplyRewardPoints: async (v: Vars) => {
    if ((await readMockCartForRewards()).payable <= 0) throw new Error("Add products to your cart to use reward points.");
    await setMockRewardPoints(Number(v.points) || 0);
    return { applyRewardPointsToCart: { cart: { applied_reward_points: await mockAppliedRewards() } } };
  },
  RemoveRewardPoints: async () => {
    await setMockRewardPoints(0);
    return { removeRewardPointsFromCart: { cart: { applied_reward_points: null } } };
  },
  CustomerRewardPoints: () => {
    let balance = MOCK_REWARD_HISTORY.reduce((sum, h) => sum + h.change, 0);
    const history = MOCK_REWARD_HISTORY.map((h) => {
      const row = { date: daysAgo(h.days), change_reason: h.reason, points_change: h.change, balance: { points: balance } };
      balance -= h.change;
      return row;
    });
    const points = MOCK_REWARD_HISTORY.reduce((sum, h) => sum + h.change, 0);
    return { customer: { reward_points: { balance: { points, money: { value: points / 10 } }, balance_history: history } } };
  },
  CustomerRewardTier: () => {
    const earned = MOCK_REWARD_HISTORY.filter((h) => h.change > 0).reduce((sum, h) => sum + h.change, 0);
    const current = [...MOCK_TIERS].reverse().find((t) => earned >= t.min_earn_points);
    return {
      mstRewardsTiers: MOCK_TIERS.map((t) => ({ ...t, is_current_tier: t === current })),
      customer: { mstRewardPointsBalance: { transactions: MOCK_PENDING_REWARDS.map((t) => ({ ...t, created_at: daysAgo(1) })) } },
    };
  },
  Customer: async (_v: Vars, token?: string | null) => ({ customer: await readProfile(emailFromToken(token)) }),
  UpdateCustomer: async (v: Vars, token?: string | null) => {
    const input = v.input as Record<string, unknown>;
    const profile = await updateProfile(token, (p) => {
      p.firstname = String(input.firstname);
      p.lastname = String(input.lastname);
      p.gender = (input.gender as number) ?? p.gender;
      p.date_of_birth = (input.date_of_birth as string) ?? p.date_of_birth;
      p.is_subscribed = Boolean(input.is_subscribed);
    });
    return { updateCustomerV2: { customer: { firstname: profile.firstname } } };
  },
  CreateAddress: async (v: Vars, token?: string | null) => {
    let id = 0;
    await updateProfile(token, (p) => {
      const list = p.addresses ?? [];
      id = Math.max(0, ...list.map((a) => a.id)) + 1;
      const created = toAddress(id, v.input as Vars);
      p.addresses = applyDefaults([...list, created], created);
    });
    return { createCustomerAddress: { id } };
  },
  UpdateAddress: async (v: Vars, token?: string | null) => {
    await updateProfile(token, (p) => {
      const updated = toAddress(Number(v.id), v.input as Vars);
      p.addresses = applyDefaults(p.addresses ?? [], updated);
    });
    return { updateCustomerAddress: { id: v.id } };
  },
  DeleteAddress: async (v: Vars, token?: string | null) => {
    await updateProfile(token, (p) => {
      p.addresses = (p.addresses ?? []).filter((a) => a.id !== Number(v.id));
    });
    return { deleteCustomerAddress: true };
  },
  CustomerOrders: async (v: Vars, token?: string | null) => {
    const all = await allOrders(token);
    const pageSize = Number(v.pageSize) || 20;
    const currentPage = Number(v.currentPage) || 1;
    return {
      customer: {
        orders: {
          items: all.slice((currentPage - 1) * pageSize, currentPage * pageSize),
          total_count: all.length,
          page_info: { current_page: currentPage, page_size: pageSize, total_pages: Math.max(1, Math.ceil(all.length / pageSize)) },
        },
      },
    };
  },
  CancelOrder: async (v: Vars, token?: string | null) => {
    const order = (await allOrders(token)).find((o) => o.id === v.orderId);
    if (!order) return { cancelOrder: { error: null, errorV2: { code: "ORDER_NOT_FOUND", message: "The order was not found." }, order: null } };
    if (order.status !== "Pending") {
      return { cancelOrder: { error: null, errorV2: { code: "INVALID_ORDER_STATUS", message: "Only pending orders can be cancelled." }, order: null } };
    }
    const store = await cookies();
    const canceled = JSON.parse(store.get(CANCELED_COOKIE)?.value ?? "[]") as string[];
    store.set(CANCELED_COOKIE, JSON.stringify([...canceled, order.number]), COOKIE_OPTS);
    return { cancelOrder: { error: null, errorV2: null, order: { status: "Canceled" } } };
  },
  CustomerOrder: async (v: Vars, token?: string | null) => ({
    customer: { orders: { items: (await allOrders(token)).filter((o) => o.number === v.number) } },
  }),
  Wishlist: async (_v: Vars, token?: string | null) => {
    emailFromToken(token);
    const removed = JSON.parse((await cookies()).get(WISHLIST_COOKIE)?.value ?? "[]") as string[];
    const added = JSON.parse((await cookies()).get(WISHLIST_ADDED_COOKIE)?.value ?? "[]") as string[];
    return {
      customer: {
        wishlists: [
          {
            id: "1",
            items_v2: {
              items: [...MOCK_PRODUCTS.slice(6, 16), ...MOCK_PRODUCTS.filter((p) => added.includes(p.uid) && !MOCK_PRODUCTS.slice(6, 16).includes(p))]
                .filter((p) => !removed.includes(p.uid))
                .map((p) => ({ id: p.uid, product: p })),
            },
          },
        ],
      },
    };
  },
  AddWishlistItemsToCart: async (v: Vars, token?: string | null) => {
    emailFromToken(token);
    const { cartResolvers } = await import("./cart");
    for (const uid of v.itemIds as string[]) {
      const product = MOCK_PRODUCTS.find((p) => p.uid === uid);
      if (!product) continue;
      if (product.stock_status === "OUT_OF_STOCK") {
        return { addWishlistItemsToCart: { status: false, add_wishlist_items_to_cart_user_errors: [{ message: `"${product.name}" is out of stock.` }] } };
      }
      await cartResolvers.AddToCart({ sku: product.sku, quantity: 1 });
    }
    return { addWishlistItemsToCart: { status: true, add_wishlist_items_to_cart_user_errors: [] } };
  },
  AddToWishlist: async (v: Vars, token?: string | null) => {
    emailFromToken(token);
    const product = MOCK_PRODUCTS.find((p) => p.sku === String(v.sku));
    if (!product) return { addProductsToWishlist: { wishlist: { id: "1" }, user_errors: [{ message: "This product can't be added to your wishlist." }] } };
    const store = await cookies();
    const added = JSON.parse(store.get(WISHLIST_ADDED_COOKIE)?.value ?? "[]") as string[];
    const removed = JSON.parse(store.get(WISHLIST_COOKIE)?.value ?? "[]") as string[];
    store.set(WISHLIST_ADDED_COOKIE, JSON.stringify([...new Set([...added, product.uid])]), COOKIE_OPTS);
    store.set(WISHLIST_COOKIE, JSON.stringify(removed.filter((id) => id !== product.uid)), COOKIE_OPTS);
    return { addProductsToWishlist: { wishlist: { id: "1" }, user_errors: [] } };
  },
  RemoveFromWishlist: async (v: Vars, token?: string | null) => {
    emailFromToken(token);
    const store = await cookies();
    const removed = JSON.parse(store.get(WISHLIST_COOKIE)?.value ?? "[]") as string[];
    store.set(WISHLIST_COOKIE, JSON.stringify([...removed, String(v.itemId)]), COOKIE_OPTS);
    return { removeProductsFromWishlist: { wishlist: { id: "1" } } };
  },
};
