import type { Order, ApiResult } from "@/types/storefront";
import * as checkoutApi from "@/utils/magento/checkout";
import type { CheckoutAddressRef, PlaceOrderInput } from "@/utils/magento/checkout";
import { prefixErrors, readAddress, validateAddress } from "@/utils/address";
import { getCustomerToken } from "@/utils/session";
import { attempt, defineOperation, echo, EMAIL_PATTERN, errorMessage, field, formInput, hasErrors, invalid, object } from "../define";

type Estimate = Awaited<ReturnType<typeof checkoutApi.estimateCheckout>>;

export const checkoutOperations = {
  EstimateCheckout: defineOperation({
    parse: (raw) => ({ shipping: object<CheckoutAddressRef>(raw, "shipping") }),
    run: ({ shipping }) => attempt<Estimate>(() => checkoutApi.estimateCheckout(shipping)),
  }),

  /**
   * Form fields: email (guests) · shippingAddressId ("new" | saved id) · shipping_* · save_shipping
   * · billingSame · billingAddressId · billing_* · shippingMethod · paymentMethod
   */
  PlaceOrder: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult<{ orderNumber: string; order: Order | null }>> => {
      const isGuest = !(await getCustomerToken());
      const fieldErrors: Record<string, string> = {};

      const email = field(data, "email");
      if (isGuest && !EMAIL_PATTERN.test(email)) fieldErrors.email = "Enter a valid email address.";

      const resolveRef = (kind: "shipping" | "billing"): CheckoutAddressRef => {
        const savedId = field(data, `${kind}AddressId`) || "new";
        if (savedId !== "new") return { customerAddressId: savedId };
        const address = readAddress(data, `${kind}_`);
        Object.assign(fieldErrors, prefixErrors(validateAddress(address), `${kind}_`));
        return { address, saveInAddressBook: data.get(`save_${kind}`) === "on" };
      };

      const shipping = resolveRef("shipping");
      const billing: PlaceOrderInput["billing"] =
        data.get("billingSame") === "on" ? { sameAsShipping: true } : { sameAsShipping: false, ...resolveRef("billing") };
      const shippingMethod = field(data, "shippingMethod");
      const paymentMethod = field(data, "paymentMethod");
      const orderNote = field(data, "orderNote");
      if (!shippingMethod) fieldErrors.shippingMethod = "Choose a shipping method.";
      if (!paymentMethod) fieldErrors.paymentMethod = "Choose a payment method.";
      if (hasErrors(fieldErrors)) return invalid(fieldErrors, data);

      try {
        const placed = await checkoutApi.placeOrder({
          email: isGuest ? email : undefined,
          shipping,
          billing,
          shippingMethod,
          paymentMethod,
          orderNote: orderNote || undefined,
        });
        return { ok: true, data: { orderNumber: placed.number, order: placed.order } };
      } catch (error) {
        return { ok: false, message: errorMessage(error), values: echo(data) };
      }
    },
  }),
};
