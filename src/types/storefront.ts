/**
 * Normalized storefront domain types.
 *
 * Services map both mock data and Magento GraphQL responses into these shapes,
 * so UI components are agnostic of the data source.
 */

export interface ProductSummary {
  id: string;
  sku: string;
  name: string;
  urlKey: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  origin?: string;
  brand?: string;
  inStock: boolean;
  createdAt?: string;
}

export interface ProductDetail extends ProductSummary {
  gallery: string[];
  shade?: string;
  ratingCount: number;
  breadcrumbs: Array<{ label: string; href?: string }>;
  related: ProductSummary[];
  recommended: ProductSummary[];
  /** Availability per stock source, shown in the Live Stock dialog. */
  liveStock: Array<{ location: string; available: boolean }>;
  /** Magento `description.html` (admin content); empty when the product has none. */
  descriptionHtml: string;
  /** Listing of the product's most specific category (child, else parent); "similar products" links go here. */
  categoryHref?: string;
  /** Units left when low (Magento `only_x_left_in_stock`); undefined when plenty are available. */
  stockLeft?: number;
  /** Configurable products: what the customer picks (Size: 88 ml / 236 ml) and the child product per combination. */
  options?: ProductOption[];
  variants?: ProductVariant[];
}

export interface ProductOption {
  code: string;
  label: string;
  values: Array<{ uid: string; label: string; swatch?: { kind: "color" | "image"; value: string } }>;
}

export interface ProductVariant {
  sku: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  /** Option code → chosen value uid. */
  attributes: Record<string, string>;
}

export interface NavCategory {
  name: string;
  urlPath: string;
  productCount?: number;
  children?: NavCategory[];
}

export interface FilterOption {
  label: string;
  value: string;
  count: number;
}

export interface FilterGroup {
  code: string;
  label: string;
  type: "checkbox" | "range" | "rating";
  options: FilterOption[];
}

export interface SortOption {
  value: string;
  label: string;
}

export interface ProductListingParams {
  category?: string;
  search?: string;
  filters: Record<string, string[]>;
  sort: string;
  page: number;
  pageSize: number;
}

export interface CategoryBanner {
  image: string;
  alt: string;
  href?: string;
}

export interface ProductListing {
  title: string;
  description?: string;
  /** Banner(s) above the products: images from the category CMS block, else the category image. */
  banners: CategoryBanner[];
  breadcrumbs: Array<{ label: string; href?: string }>;
  products: ProductSummary[];
  filters: FilterGroup[];
  sortOptions: SortOption[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  subcategories: NavCategory[];
}

export interface CartLine {
  id: string;
  sku: string;
  name: string;
  urlKey: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  origin?: string;
  brand?: string;
  /** Configurable products: what was picked, e.g. [{ label: "Size", value: "236 ml" }]. */
  options?: Array<{ label: string; value: string }>;
}

export interface Cart {
  id: string | null;
  items: CartLine[];
  totalQuantity: number;
  subtotal: number;
  discount: number;
  couponCode?: string;
}

export interface Address {
  id: string;
  fullName?: string;
  firstName: string;
  lastName: string;
  phone: string;
  /** Street address (Magento `street[]`). */
  street: string[];
  city: string;
  countryCode: string;
  /** Division for Bangladesh (Magento address `region`). */
  region?: string;
  postcode?: string;
  /** Custom address attribute `thana_name` (Thana / Upazila). */
  thana: string;
  /** Area / Post Office. */
  area?: string;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
}

/** Address as entered in a form (no id). */
export type AddressInput = Omit<Address, "id">;

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string;
  isSubscribed: boolean;
  addresses: Address[];
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "canceled";

export interface OrderLine {
  sku: string;
  name: string;
  urlKey: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  number: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderLine[];
  subtotal: number;
  shipping: number;
  discount: number;
  grandTotal: number;
  paymentMethod: string;
  shippingMethod: string;
  shippingAddress: AddressInput;
  billingAddress?: AddressInput;
  orderNote?: string;
}

export interface ShippingMethod {
  code: string;
  label: string;
  description: string;
  amount: number;
}

export interface PaymentMethod {
  code: string;
  label: string;
  description: string;
  badge?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

/** A showroom on the Store Locations page (Magento CMS block `headless-store-locations`, JSON). */
export interface StoreLocation {
  id: string;
  name: string;
  /** Neighbourhood shown as the card's eyebrow, e.g. "Banani". */
  area: string;
  image?: string;
  /** Opening hours as shown, e.g. "Everyday 11AM - 9PM". */
  hours: string;
  /** Weekdays (0 = Sunday) the store is closed. */
  closedDays?: number[];
  /** Opening time range in 24h "HH:MM", for the open-now badge. */
  opens?: string;
  closes?: string;
  phone: string;
  email: string;
  address: string[];
  landmark?: string;
  /** Google Maps embed URL. */
  mapEmbed: string;
  /** Google Maps link for "Get directions". */
  directions: string;
}

/** A Magento CMS page (About, Terms, Delivery policy...): admin-managed HTML. */
export interface CmsPage {
  identifier: string;
  title: string;
  /** Sanitised, normalised content HTML. */
  html: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface FooterData {
  newsletterTitle: string;
  newsletterText: string;
  contact: {
    title: string;
    address: string;
    hotline: string;
    email: string;
    hours: string;
    /** Google Maps embed URL for the Contact Us page. */
    mapEmbed?: string;
  };
  columns: Array<{ title: string; links: FooterLink[] }>;
  social: Array<{ network: "facebook" | "youtube" | "twitter" | "instagram" | "linkedin" | "tiktok" | "pinterest"; href: string }>;
  apps: { ios: string; android: string };
  /** Promise row above the app badges and payment logos (authentic products, secure payments, delivery). */
  highlights: Array<{ icon: "secure" | "delivery" | "support" | "authentic"; title: string; text: string }>;
  copyright: string;
  legalLinks: FooterLink[];
}

export type ActionResult<T = void> =
  | { ok: true; data: T; message?: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string>; values?: Record<string, string> };

/** `/api/graphql` response: `redirect` and `refresh` tell the client what to do after a change. */
export type ApiResult<T = void> = ActionResult<T> & { redirect?: string; refresh?: boolean };

/* ───────────── Home (admin-managed content) ───────────── */

export interface HomeBanner {
  image: string;
  /** Optional portrait/mobile artwork. */
  mobileImage?: string;
  alt: string;
  href: string;
}

export interface HomeTile {
  name: string;
  image: string;
  href: string;
}

/** Which hero template the admin selected: the 4-banner grid or the full-width slider. */
export type HeroLayout = "grid" | "slider";

/** Which category section the admin turned on. */
export type CategoryLayout = "shopByCategory" | "popularCategory";

/** Home sections the admin can order and show/hide (home page API `sort_order`). */
export type HomeSectionId =
  | "hero"
  | "wide_banner"
  | "vip_offers"
  | "categories"
  | "premium_brands"
  | "shop_by_concern"
  | "shoppers_trends"
  | "double_cashback"
  | "beauty_tech"
  | "landed_just_now"
  | "seo_about";

export interface HomeContent {
  /** Sections to render, in display order. */
  sections: HomeSectionId[];
  /** Grid template: `gridMain` rotates in the large slot, `gridSide` fills the three small ones. */
  hero: { layout: HeroLayout; slides: HomeBanner[]; gridMain: HomeBanner[]; gridSide: HomeBanner[] };
  categoryLayout: CategoryLayout;
  shopByCategory: HomeTile[];
  popularCategories: HomeTile[];
  shopByConcern: HomeTile[];
}

/* ───────────── Account extras ───────────── */

export interface DownloadableItem {
  orderNumber: string;
  date: string;
  status: string;
  /** "Unlimited" or a count, as Magento returns it. */
  remainingDownloads: string;
  downloadUrl: string;
}

export interface StoredPaymentMethod {
  publicHash: string;
  brand: string;
  last4: string;
  /** MM/YYYY */
  expires?: string;
}

export interface CustomerReview {
  createdAt: string;
  summary: string;
  text: string;
  /** 0–5 */
  rating: number;
  ratings: Array<{ name: string; value: number }>;
  product: { name: string; urlKey: string; image: string };
}

export interface CustomerReviewPage {
  items: CustomerReview[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
}

export interface RewardTransaction {
  date: string;
  reason: string;
  /** Positive when earned, negative when spent. */
  points: number;
  balance: number;
}

export interface RewardPoints {
  balance: number;
  /** Balance worth in Taka. */
  balanceValue: number;
  earned: number;
  spent: number;
  history: RewardTransaction[];
}

/** Reward points at checkout: balance, and what is applied to the current cart. */
export interface CheckoutRewards {
  balance: number;
  balanceValue: number;
  /** Most points this cart can take (balance, capped by the payable amount). */
  maxPoints: number;
  applied: { points: number; amount: number } | null;
}

/** Bangladesh address picker data: Division → City/District → Area/Thana. */
export interface BdDivision {
  name: string;
  cities: Array<{ name: string; areas: string[] }>;
}
