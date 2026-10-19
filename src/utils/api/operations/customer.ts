import { CONTACT_US, SUBSCRIBE_NEWSLETTER } from "@/graphql/cms";
import { graphqlMutate } from "@/lib/graphql-fetch";
import type { ApiResult } from "@/types/storefront";
import * as customerApi from "@/utils/magento/customer";
import * as rewardsApi from "@/utils/magento/rewards";
import { prefixErrors, readAddress, validateAddress } from "@/utils/address";
import {
  attempt,
  defineOperation,
  echo,
  EMAIL_PATTERN,
  errorMessage,
  field,
  formInput,
  hasErrors,
  integer,
  invalid,
  noInput,
  strongPassword,
  text,
  textList,
} from "../define";

const WEAK_PASSWORD = "Use at least 8 characters with letters and numbers.";

export const customerOperations = {
  /** Creates the account only; the form then signs in through next-auth. */
  CreateCustomer: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult> => {
      const customer = {
        firstName: field(data, "firstName"),
        lastName: field(data, "lastName"),
        email: field(data, "email"),
        password: String(data.get("password") ?? ""),
        gender: field(data, "gender") || undefined,
        dateOfBirth: field(data, "dateOfBirth") || undefined,
        isSubscribed: data.get("newsletter") === "on",
      };
      const fieldErrors: Record<string, string> = {};
      if (!customer.firstName) fieldErrors.firstName = "First name is required.";
      if (!customer.lastName) fieldErrors.lastName = "Last name is required.";
      if (!EMAIL_PATTERN.test(customer.email)) fieldErrors.email = "Enter a valid email address.";
      if (!strongPassword(customer.password)) fieldErrors.password = WEAK_PASSWORD;
      if (String(data.get("confirmPassword") ?? "") !== customer.password) fieldErrors.confirmPassword = "Passwords do not match.";
      if (hasErrors(fieldErrors)) return invalid(fieldErrors, data);
      try {
        await customerApi.register(customer);
        return { ok: true, data: undefined };
      } catch (error) {
        return { ok: false, message: errorMessage(error), values: echo(data) };
      }
    },
  }),

  RequestPasswordReset: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult> => {
      const email = field(data, "email");
      if (!EMAIL_PATTERN.test(email)) return { ok: false, message: "Enter a valid email address.", fieldErrors: { email: "Enter a valid email address." } };
      try {
        await customerApi.requestPasswordReset(email);
      } catch {
        /* Never reveal whether an account exists. */
      }
      return { ok: true, data: undefined, message: `If an account exists for ${email}, you will receive an email with a link to reset your password.` };
    },
  }),

  UpdateCustomer: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult> => {
      const customer = {
        firstName: field(data, "firstName"),
        lastName: field(data, "lastName"),
        gender: field(data, "gender") || undefined,
        dateOfBirth: field(data, "dateOfBirth") || undefined,
        isSubscribed: data.get("newsletter") === "on",
      };
      const fieldErrors: Record<string, string> = {};
      if (!customer.firstName) fieldErrors.firstName = "First name is required.";
      if (!customer.lastName) fieldErrors.lastName = "Last name is required.";
      if (hasErrors(fieldErrors)) return invalid(fieldErrors, data);
      try {
        await customerApi.updateCustomer(customer);
        return { ok: true, data: undefined, message: "Your account information has been saved.", refresh: true };
      } catch (error) {
        return { ok: false, message: errorMessage(error), values: echo(data) };
      }
    },
  }),

  ChangePassword: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult> => {
      const current = String(data.get("currentPassword") ?? "");
      const next = String(data.get("newPassword") ?? "");
      const fieldErrors: Record<string, string> = {};
      if (!current) fieldErrors.currentPassword = "Enter your current password.";
      if (!strongPassword(next)) fieldErrors.newPassword = WEAK_PASSWORD;
      if (String(data.get("confirmNewPassword") ?? "") !== next) fieldErrors.confirmNewPassword = "Passwords do not match.";
      if (hasErrors(fieldErrors)) return invalid(fieldErrors);
      return attempt(() => customerApi.changePassword(current, next), { message: "Your password has been changed." });
    },
  }),

  SaveAddress: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult> => {
      const address = {
        ...readAddress(data),
        isDefaultShipping: data.get("defaultShipping") === "on",
        isDefaultBilling: data.get("defaultBilling") === "on",
      };
      const fieldErrors = prefixErrors(validateAddress(address), "");
      if (hasErrors(fieldErrors)) return invalid(fieldErrors, data);
      try {
        await customerApi.saveAddress(field(data, "id") || null, address);
        return { ok: true, data: undefined, redirect: "/customer/account/addresses" };
      } catch (error) {
        return { ok: false, message: errorMessage(error), values: echo(data) };
      }
    },
  }),

  UpdateNewsletter: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult> => {
      const subscribed = data.get("subscribed") === "on";
      try {
        await customerApi.updateNewsletter(subscribed);
        return {
          ok: true,
          data: undefined,
          message: subscribed ? "You're subscribed to offers and Cash Back Reward updates." : "You have been unsubscribed from our newsletter.",
        };
      } catch (error) {
        return { ok: false, message: errorMessage(error) };
      }
    },
  }),

  /** Points balance for the header account menu. */
  RewardSummary: defineOperation({
    parse: noInput,
    run: () => attempt(async () => {
      const r = await customerApi.getRewardPoints();
      return { points: r.balance, value: r.balanceValue };
    }),
  }),

  CheckoutRewards: defineOperation({
    parse: noInput,
    run: () => attempt(() => rewardsApi.getCheckoutRewards()),
  }),

  ApplyRewardPoints: defineOperation({
    parse: (raw) => ({ points: integer(raw, "points") }),
    run: ({ points }) =>
      points > 0 ? attempt(() => rewardsApi.setRewardPoints(points)) : Promise.resolve({ ok: false as const, message: "Enter the number of points to spend." }),
  }),

  RemoveRewardPoints: defineOperation({
    parse: noInput,
    run: () => attempt(() => rewardsApi.setRewardPoints(0)),
  }),

  CancelOrder: defineOperation({
    parse: (raw) => ({ orderId: text(raw, "orderId"), reason: text(raw, "reason") }),
    run: ({ orderId, reason }) => attempt(() => customerApi.cancelOrder(orderId, reason), { refresh: true }),
  }),

  DeletePaymentMethod: defineOperation({
    parse: (raw) => ({ publicHash: text(raw, "publicHash") }),
    run: ({ publicHash }) => attempt(() => customerApi.deletePaymentMethod(publicHash), { refresh: true }),
  }),

  DeleteAddress: defineOperation({
    parse: (raw) => ({ id: text(raw, "id") }),
    run: ({ id }) => attempt(() => customerApi.deleteAddress(id), { refresh: true }),
  }),

  WishlistSummary: defineOperation({
    parse: noInput,
    run: () => attempt(() => customerApi.getWishlistSummary()),
  }),

  AddToWishlist: defineOperation({
    parse: (raw) => ({ sku: text(raw, "sku") }),
    run: ({ sku }) => attempt(() => customerApi.addToWishlist(sku)),
  }),

  RemoveWishlistItem: defineOperation({
    parse: (raw) => ({ wishlistId: text(raw, "wishlistId"), itemId: text(raw, "itemId") }),
    run: ({ wishlistId, itemId }) => attempt(() => customerApi.removeFromWishlist(wishlistId, itemId), { refresh: true }),
  }),

  MoveWishlistToCart: defineOperation({
    parse: (raw) => ({ wishlistId: text(raw, "wishlistId"), itemIds: textList(raw, "itemIds") }),
    run: ({ wishlistId, itemIds }) => attempt(() => customerApi.moveWishlistItemsToCart(wishlistId, itemIds), { refresh: true }),
  }),

  ClearWishlist: defineOperation({
    parse: (raw) => ({ wishlistId: text(raw, "wishlistId"), itemIds: textList(raw, "itemIds") }),
    run: ({ wishlistId, itemIds }) =>
      attempt(
        async () => {
          for (const itemId of itemIds) await customerApi.removeFromWishlist(wishlistId, itemId);
        },
        { refresh: true },
      ),
  }),

  ContactUs: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult> => {
      /* Honeypot: people never see this field, bots fill it. Pretend it worked. */
      if (field(data, "website")) return { ok: true, data: undefined, message: "Thank you! We will get back to you soon." };
      const values = { name: field(data, "name"), email: field(data, "email"), telephone: field(data, "telephone"), comment: field(data, "comment") };
      const fieldErrors: Record<string, string> = {};
      if (!values.name) fieldErrors.name = "Please enter your name.";
      if (!EMAIL_PATTERN.test(values.email)) fieldErrors.email = values.email ? "Enter a valid email address." : "Please enter your email address.";
      if (values.telephone && !/^[+\d][\d\s()-]{6,19}$/.test(values.telephone)) fieldErrors.telephone = "Enter a valid phone number.";
      if (values.comment.length < 5) fieldErrors.comment = "Please tell us a little more.";
      if (Object.keys(fieldErrors).length) return { ok: false, message: "Please fix the highlighted fields.", fieldErrors, values };
      const result = await attempt(
        async () => {
          await graphqlMutate(CONTACT_US, { input: { ...values, telephone: values.telephone || undefined } });
        },
        { message: "Thank you! We will get back to you soon." },
      );
      return result.ok ? result : { ...result, values };
    },
  }),

  SubscribeNewsletter: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult> => {
      const email = field(data, "email");
      if (!EMAIL_PATTERN.test(email)) return { ok: false, message: "Please enter a valid email address." };
      return attempt(
        async () => {
          await graphqlMutate(SUBSCRIBE_NEWSLETTER, { email });
        },
        { message: "Thank you for subscribing!" },
      );
    },
  }),
};
