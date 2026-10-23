import type { AffiliateProfile, ApiResult } from "@/types/storefront";
import * as affiliateApi from "@/utils/magento/affiliate";
import { attempt, defineOperation, echo, errorMessage, field, formInput, hasErrors, invalid } from "../define";

/** A site or social page: "facebook.com/mypage", "www.example.com" or a full URL. */
const WEBSITE_PATTERN = /^(https?:\/\/)?[^\s/.]+\.[^\s]{2,}$/i;

function readProfile(data: FormData): { profile: AffiliateProfile; fieldErrors: Record<string, string> } {
  const profile: AffiliateProfile = {
    website: field(data, "website"),
    instagram: field(data, "instagram").replace(/^@/, ""),
    twitter: field(data, "twitter").replace(/^@/, ""),
    source: field(data, "source"),
    paymentMethod: field(data, "paymentMethod"),
    paymentDetails: field(data, "paymentDetails"),
    notifications: data.get("notifications") === "on",
  };
  const fieldErrors: Record<string, string> = {};
  if (!WEBSITE_PATTERN.test(profile.website)) fieldErrors.website = "Enter your website or social page link.";
  if (!profile.source) fieldErrors.source = "Please tell us how you found us.";
  if (!profile.paymentMethod) fieldErrors.paymentMethod = "Choose how you would like to be paid.";
  if (!profile.paymentDetails) fieldErrors.paymentDetails = "Enter your payment details.";
  return { profile, fieldErrors };
}

export const affiliateOperations = {
  JoinAffiliateProgram: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult> => {
      const { profile, fieldErrors } = readProfile(data);
      if (data.get("adult") !== "on") fieldErrors.adult = "You must be 18 or older to join.";
      if (data.get("terms") !== "on") fieldErrors.terms = "Please accept the affiliate terms.";
      if (hasErrors(fieldErrors)) return invalid(fieldErrors, data);
      try {
        await affiliateApi.joinAffiliateProgram(profile);
        return { ok: true, data: undefined, redirect: "/customer/account/affiliate/success" };
      } catch (error) {
        return { ok: false, message: errorMessage(error), values: echo(data) };
      }
    },
  }),

  UpdateAffiliateProfile: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult> => {
      const { profile, fieldErrors } = readProfile(data);
      if (hasErrors(fieldErrors)) return invalid(fieldErrors, data);
      return attempt(() => affiliateApi.updateAffiliateProfile(profile), { message: "Your affiliate settings have been saved.", refresh: true });
    },
  }),

  RequestAffiliateWithdrawal: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult> => {
      const amount = Number(field(data, "amount"));
      if (!Number.isFinite(amount) || amount <= 0) return invalid({ amount: "Enter the amount you want to withdraw." }, data);
      return attempt(() => affiliateApi.requestAffiliateWithdrawal(Math.round(amount * 100) / 100), {
        message: "Withdrawal request has been submitted.",
        refresh: true,
      });
    },
  }),
};
