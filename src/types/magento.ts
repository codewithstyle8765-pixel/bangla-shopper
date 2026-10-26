/**
 * Raw Magento GraphQL response shapes — only the fields selected in `src/graphql/*`.
 * Mock data (`src/mocks`) produces exactly these shapes.
 */

export interface MagentoProduct {
  /** "SimpleProduct", "ConfigurableProduct"… */
  __typename?: string;
  uid: string;
  sku: string;
  name: string;
  url_key: string;
  stock_status?: "IN_STOCK" | "OUT_OF_STOCK";
  rating_summary?: number;
  review_count?: number;
  country_of_manufacture?: string | null;
  small_image?: { url: string } | null;
  price_range: {
    minimum_price: { final_price: { value: number }; regular_price: { value: number } };
  };
}

export interface MagentoProductDetail extends MagentoProduct {
  custom_attributesV2?: {
    items: Array<{ code: string; value?: string; selected_options?: Array<{ label: string }> }>;
  } | null;
  /** Images and videos; a video's `url` is its thumbnail. */
  media_gallery?: Array<{
    url: string;
    position?: number;
    disabled?: boolean;
    video_content?: { video_url?: string | null; video_title?: string | null } | null;
  }>;
  description?: { html: string } | null;
  /** Remaining quantity, only when at or below the admin "Only X left" threshold (10); null above it. */
  only_x_left_in_stock?: number | null;
  categories?: Array<{
    name: string;
    url_path: string;
    breadcrumbs?: Array<{ category_name: string; category_url_path: string }> | null;
  }>;
  related_products?: MagentoProduct[];
  upsell_products?: MagentoProduct[];
  /** Custom field: availability per stock source (online + each store). */
  live_stock?: Array<{ location: string; available: boolean }> | null;
  /** ConfigurableProduct only: the attributes a customer picks (Size, Shade) and the child product of each combination. */
  configurable_options?: Array<{
    uid: string;
    attribute_code: string;
    label: string;
    values: Array<{ uid: string; label: string; swatch_data?: { __typename?: string; value: string; thumbnail?: string } | null }>;
  }>;
  variants?: Array<{
    attributes: Array<{ code: string; uid: string }>;
    product: Pick<MagentoProduct, "sku" | "stock_status" | "price_range">;
  }>;
}

export interface MagentoAggregation {
  attribute_code: string;
  label: string;
  options: Array<{ label: string; value: string; count: number }>;
}

export interface MagentoProductsResponse {
  products: {
    total_count: number;
    page_info: { current_page: number; total_pages: number };
    aggregations: MagentoAggregation[];
    items: MagentoProduct[];
  };
}

export interface MagentoCategory {
  uid: string;
  name: string;
  description?: string | null;
  /** Category image (Catalog › Categories › Content). */
  image?: string | null;
  /** "Add CMS Block" content; the client puts the category banner(s) here. */
  cms_block?: { content?: string | null } | null;
  breadcrumbs?: Array<{ category_name: string; category_url_path: string }> | null;
  children?: Array<{ name: string; url_path: string }> | null;
}

export interface MagentoNavNode {
  name: string;
  url_path: string;
  include_in_menu?: number;
  product_count?: number;
  children?: MagentoNavNode[];
}

export interface MagentoCart {
  id: string;
  total_quantity: number;
  applied_coupons?: Array<{ code: string }> | null;
  prices?: {
    subtotal_including_tax?: { value: number };
    discounts?: Array<{ amount: { value: number } }> | null;
  };
  items: Array<{
    uid: string;
    quantity: number;
    product: {
      sku: string;
      name: string;
      url_key: string;
      country_of_manufacture?: string | null;
      small_image?: { url: string } | null;
      price_range: { minimum_price: { regular_price: { value: number } } };
    };
    prices: { price: { value: number } };
    /** ConfigurableCartItem: the picked options (Size: 236 ml) and that child's own regular price. */
    configurable_options?: Array<{ option_label: string; value_label: string }>;
    configured_variant?: { price_range: { minimum_price: { regular_price: { value: number } } } };
  }>;
}

export interface MagentoCustomAttribute {
  code: string;
  value?: string | null;
}

export interface MagentoAddress {
  id: number;
  firstname: string;
  lastname: string;
  telephone: string;
  street: string[];
  city: string;
  postcode?: string | null;
  country_code: string;
  region?: { region?: string | null } | null;
  custom_attributesV2?: MagentoCustomAttribute[] | null;
  default_shipping?: boolean;
  default_billing?: boolean;
}

export interface MagentoCustomer {
  id: number | string;
  firstname: string;
  lastname: string;
  email: string;
  gender?: number | null;
  date_of_birth?: string | null;
  is_subscribed?: boolean;
  addresses?: MagentoAddress[];
}

export interface MagentoOrder {
  id: string;
  number: string;
  order_date: string;
  status: string;
  payment_methods: Array<{ name: string }>;
  shipping_method?: string | null;
  shipping_address?: MagentoOrderAddress | null;
  billing_address?: MagentoOrderAddress | null;
  total: {
    subtotal: { value: number };
    total_shipping: { value: number };
    discounts?: Array<{ amount: { value: number } }> | null;
    grand_total: { value: number };
  };
  items: Array<{
    product_sku: string;
    product_name: string;
    product_url_key?: string | null;
    product_sale_price: { value: number };
    quantity_ordered: number;
  }>;
  /** Comments visible on the storefront; the shopper's checkout note is saved as one of them. */
  comments?: Array<{ message: string; timestamp: string }> | null;
}

export interface MagentoOrderAddress {
  firstname: string;
  lastname: string;
  telephone: string;
  street: string[];
  city: string;
  postcode?: string | null;
  country_code: string;
  region?: string | null;
  custom_attributesV2?: MagentoCustomAttribute[] | null;
}

/** Home page API (`homePage` query); field names to be confirmed against the backend schema. */
export interface MagentoHomeBanner {
  image: string;
  mobile_image?: string | null;
  alt?: string | null;
  link: string;
}

export interface MagentoHomeTile {
  name: string;
  image: string;
  link: string;
}

export interface MagentoHomePage {
  hero_layout: "GRID" | "SLIDER";
  hero_slides: MagentoHomeBanner[];
  /** Grid template: the large banner rotates when more than one is set. */
  hero_grid_main_banners: MagentoHomeBanner[];
  /** Grid template: the three small banners. */
  hero_grid_side_banners: MagentoHomeBanner[];
  /** Which category section the admin turned on. */
  category_layout: "SHOP_BY_CATEGORY" | "POPULAR_CATEGORY";
  shop_by_category: MagentoHomeTile[];
  popular_categories: MagentoHomeTile[];
  shop_by_concern: MagentoHomeTile[];
  /** Sections to show and their order; sections not listed are hidden. */
  sort_order: Array<{ section_id: string; sort_order: number }>;
}
