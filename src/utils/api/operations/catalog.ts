import type { ApiResult } from "@/types/storefront";
import { submitProductReview } from "@/utils/magento/catalog";
import { defineOperation, echo, errorMessage, field, formInput, hasErrors, invalid } from "../define";

export const catalogOperations = {
  CreateProductReview: defineOperation({
    parse: formInput,
    run: async (data): Promise<ApiResult> => {
      let photos: string[] = [];
      try {
        const photosRaw = data.get("photos");
        if (typeof photosRaw === "string" && photosRaw) {
          photos = JSON.parse(photosRaw);
        }
      } catch {
        photos = [];
      }
      const review = {
        sku: field(data, "sku"),
        nickname: field(data, "nickname"),
        summary: field(data, "summary"),
        text: field(data, "text"),
        stars: Number(data.get("rating")),
        pros: field(data, "pros"),
        value: field(data, "value"),
        price: field(data, "price"),
        photos,
      };
      const fieldErrors: Record<string, string> = {};
      if (!Number.isInteger(review.stars) || review.stars < 1 || review.stars > 5) fieldErrors.rating = "Choose a star rating.";
      if (!review.nickname) fieldErrors.nickname = "Your name is required.";
      if (!review.summary) fieldErrors.summary = "Add a short title.";
      if (review.text.length < 10) fieldErrors.text = "Tell us a little more in your detailed review (at least 10 characters).";
      if (!review.sku) return { ok: false, message: "This product can't be reviewed right now." };
      if (hasErrors(fieldErrors)) return invalid(fieldErrors, data);
      try {
        await submitProductReview(review);
        return { ok: true, data: undefined };
      } catch (error) {
        return { ok: false, message: errorMessage(error), values: echo(data) };
      }
    },
  }),
};
