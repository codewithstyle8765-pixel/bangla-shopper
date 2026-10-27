/**
 * Runtime data-source switch.
 *
 * FALLBACK_MODE=true  → every service resolves from `src/mocks/*` (design review, no backend needed)
 * FALLBACK_MODE=false → every service talks to Magento GraphQL, mocks are never imported at runtime
 *
 * Components never read this flag. Only `src/services/*` branch on it, so the
 * same UI renders identical shapes from either source.
 */
export const FALLBACK_MODE: boolean = process.env.FALLBACK_MODE !== "false";

/**
 * Page-by-page Magento integration: while FALLBACK_MODE is on, these GraphQL operations already go to the real
 * endpoint and every other one is still answered by the mocks. Add an operation once its page is integrated.
 */
export const LIVE_OPERATIONS: ReadonlySet<string> = new Set([
  "HomeCategoryProducts",
  "MegaMenu",
  "CategoryByPath",
  "ProductListing",
  "ProductDetail",
  "CartById",
  "CustomerCartId",
  "NewGuestCart",
  "AddItemsToCart",
  "UpdateCartItemQty",
  "DeleteCartItem",
  "ApplyCartCoupon",
  "RemoveCartCoupon",
  "MergeGuestCart",
]);

/** Help channels until the admin footer block (`headless-footer`) provides them; its values win when present. */
export const SUPPORT_CONTACT = {
  hotline: "01879 222 444",
  whatsapp: "01879 222 444",
  facebook: "https://www.facebook.com/banglashoppers",
} as const;

/** Magento category (url_path) that feeds each Home page product row. */
export const HOME_PRODUCT_ROWS = {
  trends: "hot-offers",
  cashback: "fatafati-combos",
  "beauty-tech": "editors-choice",
} as const;

export type HomeProductRow = keyof typeof HOME_PRODUCT_ROWS;

export const CUSTOMER_NAME_COOKIE = "bs_customer_name";
/** Full name for the account sidebar greeting, so it renders instantly on reload. */
export const CUSTOMER_FULL_NAME_COOKIE = "bs_customer_full_name";
export const CART_ID_COOKIE = "bs_cart_id";

/** Magento "Customer Token Lifetime" (Stores › Configuration › Services › OAuth, default 1 hour). Sessions end with the token. */
export const CUSTOMER_TOKEN_LIFETIME_SECONDS = Number(process.env.MAGENTO_TOKEN_LIFETIME_HOURS || 1) * 60 * 60;

export const FREE_SHIPPING_THRESHOLD = 3000;

/**
 * Reward points (Cash Back Reward) rules, mirrored from the backend until its API returns them:
 * customers earn REWARD_EARN_PERCENT of the order value (products, after discounts, without shipping) as points,
 * and REWARD_POINTS_PER_TAKA points are worth TK 1 at checkout. 1% on TK 7,500 = TK 75 = 750 points.
 */
export const REWARD_EARN_PERCENT = 1;
export const REWARD_POINTS_PER_TAKA = 10;
/** Products per page on category/search listings (`?limit=`); the first is the default. */
export const PLP_PAGE_SIZES = [24, 48, 96] as const;
export const PLP_PAGE_SIZE: number = PLP_PAGE_SIZES[0];

/** Page sizes worth offering for `total` products: each size up to the first that fits everything (46 → 24, 48). */
export function usefulPageSizes(total: number, current: number): number[] {
  const sizes = PLP_PAGE_SIZES.filter((_, i) => i === 0 || PLP_PAGE_SIZES[i - 1] < total);
  return sizes.includes(current as (typeof PLP_PAGE_SIZES)[number]) ? sizes : [...sizes, current].sort((a, b) => a - b);
}

/**
 * Product attribute (text, "Visible on Catalog Pages on Storefront" = Yes) holding the product's YouTube link(s);
 * several links may be separated by commas or new lines. Each becomes a video slide after the main image.
 */
export const PRODUCT_VIDEO_ATTRIBUTE = "youtube_video_url";

/**
 * Magento needs an email on every guest order. Guests who skip the optional email get `<phone>@GUEST_EMAIL_DOMAIN`;
 * the domain should not receive mail (Magento's order emails to it bounce).
 */
export const GUEST_EMAIL_DOMAIN = "guest.banglashoppers.com";

/** Public storefront origin (canonical URLs, structured data). */
export const SITE_URL: string = process.env.NEXT_PUBLIC_SITE_URL || "https://www.banglashoppers.com";
