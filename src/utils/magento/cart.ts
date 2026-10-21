import type { DocumentNode } from "graphql";
import {
  ADD_TO_CART,
  APPLY_COUPON,
  CART_QUERY,
  CREATE_EMPTY_CART,
  CUSTOMER_CART_QUERY,
  REMOVE_CART_ITEM,
  REMOVE_COUPON,
  UPDATE_CART_ITEM,
} from "@/graphql/cart";
import { authContext, graphqlMutate, graphqlRequestNoCache } from "@/lib/graphql-fetch";
import type { MagentoCart } from "@/types/magento";
import type { Cart } from "@/types/storefront";
import { getCustomerToken, getGuestCartId, setGuestCartId } from "@/utils/session";

const PLACEHOLDER_IMAGE = "/assets/images/placeholder.svg";

export const EMPTY_CART: Cart = { id: null, items: [], totalQuantity: 0, subtotal: 0, discount: 0 };

export function mapCart(c: MagentoCart): Cart {
  const items = c.items.map((item) => {
    const regular = (item.configured_variant ?? item.product).price_range.minimum_price.regular_price.value;
    const price = item.prices.price.value;
    return {
      id: item.uid,
      sku: item.product.sku,
      name: item.product.name,
      urlKey: item.product.url_key,
      image: item.product.small_image?.url || PLACEHOLDER_IMAGE,
      price,
      originalPrice: regular > price ? regular : undefined,
      quantity: item.quantity,
      origin: item.product.country_of_manufacture ?? undefined,
      options: item.configurable_options?.map((o) => ({ label: o.option_label, value: o.value_label })),
    };
  });
  return {
    id: c.id,
    items,
    totalQuantity: c.total_quantity,
    subtotal: c.prices?.subtotal_including_tax?.value ?? items.reduce((a, i) => a + i.price * i.quantity, 0),
    discount: Math.abs((c.prices?.discounts ?? []).reduce((a, d) => a + d.amount.value, 0)),
    couponCode: c.applied_coupons?.[0]?.code,
  };
}

/** Customer cart when logged in, otherwise the guest cart (created on demand). */
export async function resolveCartId(create: boolean): Promise<string | null> {
  const token = await getCustomerToken();
  if (token) {
    const data = await graphqlRequestNoCache<{ customerCart: MagentoCart }>(CUSTOMER_CART_QUERY, undefined, {
      context: authContext(token),
    });
    return data.customerCart.id;
  }
  const guestId = await getGuestCartId();
  if (guestId || !create) return guestId;
  const created = await graphqlMutate<{ createEmptyCart: string }>(CREATE_EMPTY_CART);
  await setGuestCartId(created.createEmptyCart);
  return created.createEmptyCart;
}

export async function getCart(): Promise<Cart> {
  const cartId = await resolveCartId(false);
  if (!cartId) return EMPTY_CART;
  const data = await graphqlRequestNoCache<{ cart: MagentoCart }>(CART_QUERY, { cartId }, {
    context: authContext(await getCustomerToken()),
  });
  return mapCart(data.cart);
}

async function cartMutation(mutation: DocumentNode, variables: Record<string, unknown>, field: string): Promise<Cart> {
  const cartId = await resolveCartId(true);
  const data = await graphqlMutate<Record<string, { cart: MagentoCart; user_errors?: Array<{ message: string }> }>>(
    mutation,
    { cartId, ...variables },
    await getCustomerToken(),
  );
  const payload = data[field];
  if (payload.user_errors?.length) throw new Error(payload.user_errors[0].message);
  return mapCart(payload.cart);
}

/** `selectedOptions`: the configurable option value uids (Size: 236 ml) of the chosen child product. */
export const addToCart = (sku: string, quantity: number, selectedOptions: string[] = []) =>
  cartMutation(ADD_TO_CART, { sku, quantity, selectedOptions }, "addProductsToCart");

export const updateCartItem = (uid: string, quantity: number) =>
  quantity > 0
    ? cartMutation(UPDATE_CART_ITEM, { uid, quantity }, "updateCartItems")
    : cartMutation(REMOVE_CART_ITEM, { uid }, "removeItemFromCart");

export const removeCartItem = (uid: string) => cartMutation(REMOVE_CART_ITEM, { uid }, "removeItemFromCart");

export const applyCoupon = (code: string) => cartMutation(APPLY_COUPON, { code }, "applyCouponToCart");

export const removeCoupon = () => cartMutation(REMOVE_COUPON, {}, "removeCouponFromCart");
