import type { Cart } from "@/types/storefront";
import * as cartApi from "@/utils/magento/cart";
import { attempt, defineOperation, integer, noInput, text, textList } from "../define";

export const cartOperations = {
  Cart: defineOperation({
    parse: noInput,
    run: () => attempt<Cart>(() => cartApi.getCart()),
  }),
  AddToCart: defineOperation({
    parse: (raw) => ({ sku: text(raw, "sku"), quantity: integer(raw, "quantity", 1), selectedOptions: textList(raw, "selectedOptions", { optional: true }) }),
    run: ({ sku, quantity, selectedOptions }) => attempt<Cart>(() => cartApi.addToCart(sku, Math.max(1, quantity), selectedOptions)),
  }),
  UpdateCartItem: defineOperation({
    parse: (raw) => ({ itemId: text(raw, "itemId"), quantity: integer(raw, "quantity") }),
    run: ({ itemId, quantity }) => attempt<Cart>(() => cartApi.updateCartItem(itemId, Math.max(0, quantity))),
  }),
  RemoveCartItem: defineOperation({
    parse: (raw) => ({ itemId: text(raw, "itemId") }),
    run: ({ itemId }) => attempt<Cart>(() => cartApi.removeCartItem(itemId)),
  }),
  ApplyCoupon: defineOperation({
    parse: (raw) => ({ code: text(raw, "code", { optional: true }) }),
    run: async ({ code }) => (code ? attempt<Cart>(() => cartApi.applyCoupon(code)) : { ok: false, message: "Please enter a coupon code." }),
  }),
  RemoveCoupon: defineOperation({
    parse: noInput,
    run: () => attempt<Cart>(() => cartApi.removeCoupon()),
  }),
};
