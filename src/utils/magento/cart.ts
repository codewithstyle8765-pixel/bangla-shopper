import type { TypedDocumentNode } from "@apollo/client";
import { AddItemsToCartDocument } from "@/graphql/cart/mutations/__generated__/AddItemsToCart.generated";
import { ApplyCartCouponDocument } from "@/graphql/cart/mutations/__generated__/ApplyCartCoupon.generated";
import { DeleteCartItemDocument } from "@/graphql/cart/mutations/__generated__/DeleteCartItem.generated";
import { NewGuestCartDocument, type NewGuestCartMutation } from "@/graphql/cart/mutations/__generated__/NewGuestCart.generated";
import { RemoveCartCouponDocument } from "@/graphql/cart/mutations/__generated__/RemoveCartCoupon.generated";
import { UpdateCartItemQtyDocument } from "@/graphql/cart/mutations/__generated__/UpdateCartItemQty.generated";
import { CartByIdDocument, type CartByIdQuery, type CartByIdQueryVariables } from "@/graphql/cart/queries/__generated__/CartById.generated";
import { CustomerCartIdDocument, type CustomerCartIdQuery } from "@/graphql/cart/queries/__generated__/CustomerCartId.generated";
import { authContext, graphqlMutate, graphqlRequestNoCache } from "@/lib/graphql-fetch";
import type { MagentoCart } from "@/types/magento";
import type { Cart } from "@/types/storefront";
import { clearGuestCartId, getCustomerToken, getGuestCartId, setGuestCartId } from "@/utils/session";

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

/** Magento's answer for a guest cart id that expired, was ordered or belongs to someone else. */
const STALE_CART = /could not find a cart|cart isn't active|cannot perform operations on cart/i;
const isStaleCart = (error: unknown) => error instanceof Error && STALE_CART.test(error.message);

/** Customer cart when logged in, otherwise the guest cart (created on demand). */
export async function resolveCartId(create: boolean): Promise<string | null> {
  const token = await getCustomerToken();
  if (token) {
    const data = await graphqlRequestNoCache<CustomerCartIdQuery>(CustomerCartIdDocument, undefined, { context: authContext(token) });
    return data.customerCart.id;
  }
  const guestId = await getGuestCartId();
  if (guestId || !create) return guestId;
  const created = await graphqlMutate<NewGuestCartMutation>(NewGuestCartDocument);
  if (!created.createEmptyCart) throw new Error("Could not create a cart. Please try again.");
  await setGuestCartId(created.createEmptyCart);
  return created.createEmptyCart;
}

export async function getCart(): Promise<Cart> {
  const cartId = await resolveCartId(false);
  if (!cartId) return EMPTY_CART;
  const token = await getCustomerToken();
  try {
    const data = await graphqlRequestNoCache<CartByIdQuery, CartByIdQueryVariables>(CartByIdDocument, { cartId }, { context: authContext(token) });
    return data.cart ? mapCart(data.cart as MagentoCart) : EMPTY_CART;
  } catch (error) {
    if (token || !isStaleCart(error)) throw error;
    await clearGuestCartId();
    return EMPTY_CART;
  }
}

type CartPayload = { cart?: unknown; user_errors?: Array<{ message: string } | null> } | null | undefined;

/** Runs a cart mutation; a stale guest cart is replaced by a new one and the change retried once. */
async function cartMutation<TData, TVariables extends { cartId: string }>(
  mutation: TypedDocumentNode<TData, TVariables>,
  variables: Omit<TVariables, "cartId">,
  payloadOf: (data: TData) => CartPayload,
  retry = true,
): Promise<Cart> {
  const cartId = await resolveCartId(true);
  const token = await getCustomerToken();
  try {
    const payload = payloadOf(await graphqlMutate<TData, TVariables>(mutation, { ...variables, cartId } as TVariables, token));
    const userError = payload?.user_errors?.find(Boolean);
    if (userError) throw new Error(userError.message);
    return payload?.cart ? mapCart(payload.cart as MagentoCart) : EMPTY_CART;
  } catch (error) {
    if (!retry || token || !isStaleCart(error)) throw error;
    await clearGuestCartId();
    return cartMutation(mutation, variables, payloadOf, false);
  }
}

/** `selectedOptions`: the configurable option value uids (Size: 236 ml) of the chosen child product. */
export const addToCart = (sku: string, quantity: number, selectedOptions: string[] = []) =>
  cartMutation(AddItemsToCartDocument, { sku, quantity, selectedOptions }, (d) => d.addProductsToCart);

export const updateCartItem = (uid: string, quantity: number) =>
  quantity > 0
    ? cartMutation(UpdateCartItemQtyDocument, { uid, quantity }, (d) => d.updateCartItems)
    : removeCartItem(uid);

export const removeCartItem = (uid: string) => cartMutation(DeleteCartItemDocument, { uid }, (d) => d.removeItemFromCart);

export const applyCoupon = (code: string) => cartMutation(ApplyCartCouponDocument, { code }, (d) => d.applyCouponToCart);

export const removeCoupon = () => cartMutation(RemoveCartCouponDocument, {}, (d) => d.removeCouponFromCart);
