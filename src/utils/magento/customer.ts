import { cache } from "react";
import {
  CHANGE_PASSWORD,
  CREATE_ADDRESS,
  CREATE_CUSTOMER,
  CUSTOMER_ORDER_QUERY,
  CUSTOMER_ORDERS_QUERY,
  CUSTOMER_QUERY,
  DELETE_ADDRESS,
  GENERATE_TOKEN,
  ADD_WISHLIST_ITEMS_TO_CART,
  MERGE_CARTS,
  REMOVE_FROM_WISHLIST,
  REQUEST_PASSWORD_RESET,
  REVOKE_TOKEN,
  UPDATE_ADDRESS,
  UPDATE_CUSTOMER,
  WISHLIST_QUERY,
  ADD_TO_WISHLIST,
  CUSTOMER_REVIEWS_QUERY,
  DELETE_PAYMENT_TOKEN,
  DOWNLOADABLE_PRODUCTS_QUERY,
  PAYMENT_TOKENS_QUERY,
  REWARD_POINTS_QUERY,
  UPDATE_NEWSLETTER,
  CANCEL_ORDER,
} from "@/graphql/customer";
import { CUSTOMER_CART_QUERY } from "@/graphql/cart";
import { PRODUCT_IMAGES_BY_SKU_QUERY } from "@/graphql/catalog";
import { graphqlRequestCached } from "@/lib/cached-graphql";
import { getPageCacheConfig } from "@/utils/hooks/useCache";
import { authContext, graphqlMutate, graphqlRequestNoCache } from "@/lib/graphql-fetch";
import type {
  MagentoAddress,
  MagentoCart,
  MagentoCustomAttribute,
  MagentoCustomer,
  MagentoOrder,
  MagentoOrderAddress,
  MagentoProduct,
} from "@/types/magento";
import type {
  Address,
  AddressInput,
  Customer,
  CustomerReviewPage,
  DownloadableItem,
  Order,
  OrderStatus,
  ProductSummary,
  RewardPoints,
  StoredPaymentMethod,
} from "@/types/storefront";
import { EMPTY_ADDRESS } from "@/utils/address";
import { clearCustomerName, clearGuestCartId, getCustomerToken, getGuestCartId, setCustomerName } from "@/utils/session";
import { mapProduct } from "./catalog";

const PLACEHOLDER_IMAGE = "/assets/images/catalog/hostile.png";
const GENDERS: Record<number, Customer["gender"]> = { 1: "male", 2: "female", 3: "other" };
const GENDER_IDS: Record<string, number> = { male: 1, female: 2, other: 3 };

const thanaOf = (attrs?: MagentoCustomAttribute[] | null) => attrs?.find((a) => a.code === "thana_name")?.value ?? "";

/** Order addresses carry `region` as text, saved addresses as `{ region }`. */
function mapAddressInput(a: MagentoOrderAddress | MagentoAddress): AddressInput {
  return {
    firstName: a.firstname,
    lastName: a.lastname,
    phone: a.telephone,
    street: a.street,
    city: a.city,
    countryCode: a.country_code,
    region: (typeof a.region === "string" ? a.region : a.region?.region) || undefined,
    postcode: a.postcode ?? undefined,
    thana: thanaOf(a.custom_attributesV2),
  };
}

export function mapAddress(a: MagentoAddress): Address {
  return {
    id: String(a.id),
    ...mapAddressInput(a),
    isDefaultShipping: a.default_shipping,
    isDefaultBilling: a.default_billing,
  };
}

function mapCustomer(c: MagentoCustomer): Customer {
  const addresses = (c.addresses ?? []).map(mapAddress);
  return {
    id: String(c.id),
    firstName: c.firstname,
    lastName: c.lastname,
    email: c.email,
    phone: addresses.find((a) => a.isDefaultShipping)?.phone ?? addresses[0]?.phone,
    gender: c.gender ? GENDERS[c.gender] : undefined,
    dateOfBirth: c.date_of_birth ?? undefined,
    isSubscribed: Boolean(c.is_subscribed),
    addresses,
  };
}

function normalizeStatus(status: string): OrderStatus {
  const s = status.toLowerCase();
  if (s.includes("cancel")) return "canceled";
  if (s.includes("complete") || s.includes("deliver")) return "delivered";
  if (s.includes("ship")) return "shipped";
  if (s.includes("process")) return "processing";
  return "pending";
}

export function mapOrder(o: MagentoOrder): Order {
  return {
    id: o.id,
    number: o.number,
    createdAt: new Date(o.order_date.includes("T") ? o.order_date : `${o.order_date.replace(" ", "T")}Z`).toISOString(),
    status: normalizeStatus(o.status),
    items: o.items.map((i) => ({
      sku: i.product_sku,
      name: i.product_name,
      urlKey: i.product_url_key ?? "",
      image: PLACEHOLDER_IMAGE,
      price: i.product_sale_price.value,
      quantity: i.quantity_ordered,
    })),
    subtotal: o.total.subtotal.value,
    shipping: o.total.total_shipping.value,
    discount: Math.abs((o.total.discounts ?? []).reduce((a, d) => a + d.amount.value, 0)),
    grandTotal: o.total.grand_total.value,
    paymentMethod: o.payment_methods[0]?.name ?? "",
    shippingMethod: o.shipping_method ?? "",
    shippingAddress: o.shipping_address ? mapAddressInput(o.shipping_address) : { ...EMPTY_ADDRESS },
    billingAddress: o.billing_address ? mapAddressInput(o.billing_address) : undefined,
  };
}

async function requireToken() {
  const token = await getCustomerToken();
  if (!token) throw new Error("Your session has expired. Please log in again.");
  return token;
}

/* ───────────── Auth ───────────── */

/** Issues a Magento token and merges the guest cart into the customer cart. The session itself is stored by next-auth. */
export async function login(email: string, password: string) {
  const data = await graphqlMutate<{ generateCustomerToken: { token: string } }>(GENERATE_TOKEN, { email, password });
  const token = data.generateCustomerToken.token;
  const profile = await graphqlRequestNoCache<{ customer: MagentoCustomer }>(CUSTOMER_QUERY, undefined, {
    context: authContext(token),
  });
  await setCustomerName(profile.customer.firstname, profile.customer.lastname);

  const guestCartId = await getGuestCartId();
  if (guestCartId) {
    try {
      const { customerCart } = await graphqlRequestNoCache<{ customerCart: MagentoCart }>(CUSTOMER_CART_QUERY, undefined, {
        context: authContext(token),
      });
      await graphqlMutate(MERGE_CARTS, { source: guestCartId, destination: customerCart.id }, token);
    } finally {
      await clearGuestCartId();
    }
  }
  return { token, email: profile.customer.email, firstName: profile.customer.firstname };
}

/**
 * Exchange a social OAuth token for a Magento customer token.
 *
 * TODO: Implement when Magento social login extension is installed.
 * Expected GraphQL mutation:
 *   generateCustomerTokenWithSocial(provider: $provider, token: $token) { token }
 */
export async function socialLogin(
  provider: string,
  socialAccessToken?: string,
): Promise<{ token: string; email?: string; firstName?: string }> {
  throw new Error(`Social login not implemented yet. Provider: ${provider}, token: ${socialAccessToken ? "present" : "missing"}`);
}

export async function register(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isSubscribed: boolean;
  gender?: string;
  dateOfBirth?: string;
}) {
  await graphqlMutate(CREATE_CUSTOMER, {
    input: {
      firstname: input.firstName,
      lastname: input.lastName,
      email: input.email,
      password: input.password,
      is_subscribed: input.isSubscribed,
      ...(input.gender && GENDER_IDS[input.gender] ? { gender: GENDER_IDS[input.gender] } : {}),
      ...(input.dateOfBirth ? { date_of_birth: input.dateOfBirth, dob: input.dateOfBirth } : {}),
    },
  });
}

export async function revokeToken(token: string | undefined) {
  if (token) {
    try {
      await graphqlMutate(REVOKE_TOKEN, undefined, token);
    } catch {
      /* already invalid */
    }
  }
  await clearCustomerName();
}

export async function requestPasswordReset(email: string) {
  await graphqlMutate(REQUEST_PASSWORD_RESET, { email });
}

export async function changePassword(current: string, next: string) {
  await graphqlMutate(CHANGE_PASSWORD, { current, next }, await requireToken());
}

/* ───────────── Profile & addresses ───────────── */

/** Deduplicated per request (layout + page both call it). */
export const getCustomer = cache(async (): Promise<Customer | null> => {
  const token = await getCustomerToken();
  if (!token) return null;
  try {
    const data = await graphqlRequestNoCache<{ customer: MagentoCustomer }>(CUSTOMER_QUERY, undefined, {
      context: authContext(token),
    });
    return mapCustomer(data.customer);
  } catch {
    return null;
  }
});

export async function updateCustomer(input: { firstName: string; lastName: string; gender?: string; dateOfBirth?: string; isSubscribed: boolean }) {
  const token = await requireToken();
  await graphqlMutate(
    UPDATE_CUSTOMER,
    {
      input: {
        firstname: input.firstName,
        lastname: input.lastName,
        gender: input.gender ? GENDER_IDS[input.gender] : undefined,
        date_of_birth: input.dateOfBirth || undefined,
        is_subscribed: input.isSubscribed,
      },
    },
    token,
  );
  await setCustomerName(input.firstName, input.lastName);
}

function toAddressInput(a: AddressInput) {
  const thanaVal = [a.area, a.thana].filter(Boolean).join(", ") || a.thana;
  return {
    firstname: a.firstName,
    lastname: a.lastName,
    telephone: a.phone,
    street: a.street.filter(Boolean),
    city: a.city,
    postcode: a.postcode || undefined,
    country_code: a.countryCode,
    region: a.region ? { region: a.region } : undefined,
    default_shipping: Boolean(a.isDefaultShipping),
    default_billing: Boolean(a.isDefaultBilling),
    custom_attributesV2: [{ attribute_code: "thana_name", value: thanaVal }],
  };
}

export async function saveAddress(id: string | null, address: AddressInput) {
  const token = await requireToken();
  if (id) await graphqlMutate(UPDATE_ADDRESS, { id: Number(id), input: toAddressInput(address) }, token);
  else await graphqlMutate(CREATE_ADDRESS, { input: toAddressInput(address) }, token);
}

export async function deleteAddress(id: string) {
  await graphqlMutate(DELETE_ADDRESS, { id: Number(id) }, await requireToken());
}

/* ───────────── Orders & wishlist ───────────── */

/** Order lines carry no image: one cached catalog lookup by SKU fills them in (placeholder when a product is gone). */
export async function attachItemImages(orders: Order[]): Promise<Order[]> {
  const skus = [...new Set(orders.flatMap((o) => o.items.map((i) => i.sku)))].sort();
  if (!skus.length) return orders;
  try {
    const data = await graphqlRequestCached<{ products: { items: Array<{ sku: string; small_image?: { url: string } | null }> } }>(
      PRODUCT_IMAGES_BY_SKU_QUERY,
      { skus },
      getPageCacheConfig("category"),
    );
    const images = new Map(data.products.items.map((p) => [p.sku, p.small_image?.url]));
    return orders.map((o) => ({ ...o, items: o.items.map((i) => ({ ...i, image: images.get(i.sku) || i.image })) }));
  } catch (error) {
    console.error("[magento] order item images failed", error);
    return orders;
  }
}

export async function getOrders(): Promise<Order[]> {
  const data = await graphqlRequestNoCache<{ customer: { orders: { items: MagentoOrder[] } } }>(
    CUSTOMER_ORDERS_QUERY,
    { pageSize: 20, currentPage: 1 },
    { context: authContext(await requireToken()) },
  );
  return attachItemImages(data.customer.orders.items.map(mapOrder));
}

/** One page of the order history, newest first. */
export async function getOrdersPage(page: number, pageSize: number): Promise<{ items: Order[]; total: number; page: number; pageSize: number; totalPages: number }> {
  const data = await graphqlRequestNoCache<{
    customer: { orders: { items: MagentoOrder[]; total_count?: number; page_info?: { current_page: number; page_size: number; total_pages: number } } };
  }>(CUSTOMER_ORDERS_QUERY, { pageSize, currentPage: page }, { context: authContext(await requireToken()) });
  const { items, total_count, page_info } = data.customer.orders;
  return {
    items: await attachItemImages(items.map(mapOrder)),
    total: total_count ?? items.length,
    page: page_info?.current_page ?? page,
    pageSize: page_info?.page_size ?? pageSize,
    totalPages: Math.max(1, page_info?.total_pages ?? 1),
  };
}

export async function getOrder(number: string): Promise<Order | null> {
  const data = await graphqlRequestNoCache<{ customer: { orders: { items: MagentoOrder[] } } }>(
    CUSTOMER_ORDER_QUERY,
    { number },
    { context: authContext(await requireToken()) },
  );
  const order = data.customer.orders.items[0];
  return order ? (await attachItemImages([mapOrder(order)]))[0] : null;
}

export async function getWishlist(): Promise<{ id: string | null; items: Array<{ itemId: string; product: ProductSummary }> }> {
  const data = await graphqlRequestNoCache<{
    customer: { wishlists: Array<{ id: string; items_v2: { items: Array<{ id: string; product: MagentoProduct }> } }> };
  }>(WISHLIST_QUERY, undefined, { context: authContext(await requireToken()) });
  const list = data.customer.wishlists[0];
  return {
    id: list?.id ?? null,
    items: (list?.items_v2.items ?? []).map((i) => ({ itemId: i.id, product: mapProduct(i.product) })),
  };
}

export async function removeFromWishlist(wishlistId: string, itemId: string) {
  await graphqlMutate(REMOVE_FROM_WISHLIST, { wishlistId, itemId }, await requireToken());
}

/** Wishlist state for the header count and heart buttons; guests get `loggedIn: false` instead of an error. */
export async function getWishlistSummary(): Promise<{ loggedIn: boolean; wishlistId: string | null; items: Array<{ itemId: string; sku: string }> }> {
  if (!(await getCustomerToken())) return { loggedIn: false, wishlistId: null, items: [] };
  const list = await getWishlist();
  return { loggedIn: true, wishlistId: list.id, items: list.items.map((i) => ({ itemId: i.itemId, sku: i.product.sku })) };
}

export async function addToWishlist(sku: string) {
  const token = await requireToken();
  const { id } = await getWishlist();
  if (!id) throw new Error("Your wishlist is not available right now.");
  const data = await graphqlMutate<{ addProductsToWishlist: { user_errors: Array<{ message: string }> } }>(ADD_TO_WISHLIST, { wishlistId: id, sku }, token);
  const error = data.addProductsToWishlist.user_errors[0];
  if (error) throw new Error(error.message);
}

/** Adds wishlist items to the cart, then removes them from the wishlist ("Move to Cart"). */
export async function moveWishlistItemsToCart(wishlistId: string, itemIds: string[]) {
  const token = await requireToken();
  const data = await graphqlMutate<{
    addWishlistItemsToCart: { status: boolean; add_wishlist_items_to_cart_user_errors: Array<{ message: string }> };
  }>(ADD_WISHLIST_ITEMS_TO_CART, { wishlistId, itemIds }, token);
  const result = data.addWishlistItemsToCart;
  if (!result.status) throw new Error(result.add_wishlist_items_to_cart_user_errors[0]?.message ?? "Could not move the item to your cart.");
  for (const itemId of itemIds) await graphqlMutate(REMOVE_FROM_WISHLIST, { wishlistId, itemId }, token);
}

/* ───────────── Newsletter, reviews, downloads, payment methods, rewards ───────────── */

export async function updateNewsletter(subscribed: boolean) {
  await graphqlMutate(UPDATE_NEWSLETTER, { subscribed }, await requireToken());
}

export async function getCustomerReviews(page: number, pageSize: number): Promise<CustomerReviewPage> {
  const data = await graphqlRequestNoCache<{
    customer: {
      reviews: {
        items: Array<{
          created_at: string;
          summary: string;
          text: string;
          average_rating: number;
          ratings_breakdown: Array<{ name: string; value: string }>;
          product: { name: string; url_key: string; small_image?: { url: string } | null };
        }>;
        page_info: { current_page: number; page_size: number; total_pages: number };
      };
    };
  }>(CUSTOMER_REVIEWS_QUERY, { pageSize, currentPage: page }, { context: authContext(await requireToken()) });
  const { items, page_info } = data.customer.reviews;
  return {
    items: items.map((r) => ({
      createdAt: r.created_at,
      summary: r.summary,
      text: r.text,
      /* average_rating is a percentage (0–100). */
      rating: Math.round((r.average_rating / 20) * 10) / 10,
      ratings: r.ratings_breakdown.map((b) => ({ name: b.name, value: Number(b.value) })),
      product: { name: r.product.name, urlKey: r.product.url_key, image: r.product.small_image?.url ?? "" },
    })),
    page: page_info.current_page,
    pageSize: page_info.page_size,
    totalPages: Math.max(1, page_info.total_pages),
    total: page_info.total_pages <= 1 ? items.length : page_info.total_pages * page_info.page_size,
  };
}

export async function getDownloadableProducts(): Promise<DownloadableItem[]> {
  const data = await graphqlRequestNoCache<{
    customerDownloadableProducts: { items: Array<{ date: string; download_url: string; order_increment_id: string; remaining_downloads: string; status: string }> };
  }>(DOWNLOADABLE_PRODUCTS_QUERY, undefined, { context: authContext(await requireToken()) });
  return data.customerDownloadableProducts.items.map((d) => ({
    orderNumber: d.order_increment_id,
    date: d.date,
    status: d.status,
    remainingDownloads: d.remaining_downloads,
    downloadUrl: d.download_url,
  }));
}

const CARD_BRANDS: Record<string, string> = { VI: "Visa", MC: "Mastercard", AE: "American Express", DI: "Discover", JCB: "JCB" };

export async function getStoredPaymentMethods(): Promise<StoredPaymentMethod[]> {
  const data = await graphqlRequestNoCache<{
    customerPaymentTokens: { items: Array<{ public_hash: string; type: string; details: string | null }> };
  }>(PAYMENT_TOKENS_QUERY, undefined, { context: authContext(await requireToken()) });
  return data.customerPaymentTokens.items.map((t) => {
    /* `details` is a JSON string, e.g. {"type":"VI","maskedCC":"1111","expirationDate":"12/2027"}. */
    let details: { type?: string; maskedCC?: string; expirationDate?: string } = {};
    try {
      details = JSON.parse(t.details ?? "{}");
    } catch {
      /* keep defaults */
    }
    return {
      publicHash: t.public_hash,
      brand: CARD_BRANDS[details.type ?? ""] ?? (t.type === "account" ? "Account" : "Card"),
      last4: details.maskedCC ?? "••••",
      expires: details.expirationDate,
    };
  });
}

export async function cancelOrder(orderId: string, reason: string) {
  const data = await graphqlMutate<{ cancelOrder: { error?: string | null; errorV2?: { message: string } | null } }>(
    CANCEL_ORDER,
    { orderId, reason },
    await requireToken(),
  );
  const error = data.cancelOrder.errorV2?.message ?? data.cancelOrder.error;
  if (error) throw new Error(error);
}

export async function deletePaymentMethod(publicHash: string) {
  await graphqlMutate(DELETE_PAYMENT_TOKEN, { hash: publicHash }, await requireToken());
}

export async function getRewardPoints(): Promise<RewardPoints> {
  const data = await graphqlRequestNoCache<{
    customer: {
      reward_points: {
        balance: { points: number; money: { value: number } } | null;
        balance_history: Array<{ date: string; change_reason: string; points_change: number; balance: { points: number } }> | null;
      } | null;
    };
  }>(REWARD_POINTS_QUERY, undefined, { context: authContext(await requireToken()) });
  const rewards = data.customer.reward_points;
  const history = (rewards?.balance_history ?? []).map((h) => ({ date: h.date, reason: h.change_reason, points: h.points_change, balance: h.balance.points }));
  return {
    balance: rewards?.balance?.points ?? 0,
    balanceValue: rewards?.balance?.money.value ?? 0,
    earned: history.filter((h) => h.points > 0).reduce((sum, h) => sum + h.points, 0),
    spent: -history.filter((h) => h.points < 0).reduce((sum, h) => sum + h.points, 0),
    history,
  };
}
