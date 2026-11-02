import { DEMO_PRODUCTS } from "./products";
import type { MagentoProduct } from "@/types/magento";

/*
 * Mock catalog for the pages still on mocks (cart, wishlist, orders, affiliate widget). Menu, category,
 * search and product pages read the real Magento catalog (LIVE_OPERATIONS), so they have no mock data here.
 */

const IMG_PRIMARY = "/assets/images/pdp/primary_picture.png";

function seeded(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/** Extra mock-only facets that a real catalog exposes as product attributes. */
interface MockProduct extends MagentoProduct {
  brand: string;
  /** Root category url_path. */
  category: string;
}

/** Real products from the live home page, so listings show a varied, full catalogue. */
export const MOCK_PRODUCTS: MockProduct[] = DEMO_PRODUCTS.map((p, i) => {
  /* Give around 55-60% of mock items a discount, and the rest full regular price. */
  const hasDiscount = (i % 7 < 4);
  const regularPrice = hasDiscount && p.regular > p.price ? p.regular : p.price;

  return {
    uid: `p-${i + 1}`,
    sku: `BS-${String(1000 + i)}`,
    name: p.name,
    url_key: p.slug,
    stock_status: i % 9 === 4 ? "OUT_OF_STOCK" : "IN_STOCK",
    /* Live items without reviews yet get demo values so the rating row is visible. */
    rating_summary: p.rating ?? Math.round((3.6 + seeded(i + 100) * 1.4) * 20),
    review_count: p.reviews || 12 + Math.round(seeded(i + 200) * 900),
    country_of_manufacture: p.origin,
    small_image: { url: `/assets/images/mock/products/${p.slug}.jpg` },
    price_range: {
      minimum_price: {
        final_price: { value: p.price },
        regular_price: { value: regularPrice },
        discount: { percent_off: regularPrice > p.price ? ((regularPrice - p.price) / regularPrice) * 100 : 0 },
      },
    },
    brand: p.brand,
    category: p.category,
  };
});

/** Demo product. */
const DEMO_PRODUCT: MockProduct = {
  uid: "p-demo",
  sku: "888432939323",
  name: "Absolute New York Supreme Slim Demi Matte Lipstick - Night Shade - MLSS60 - 1.3gm, Imported from the USA.",
  url_key: "absolute-new-york-matte-lipstick",
  stock_status: "OUT_OF_STOCK",
  rating_summary: 84,
  review_count: 721,
  country_of_manufacture: "China",
  small_image: { url: IMG_PRIMARY },
  price_range: { minimum_price: { final_price: { value: 365 }, regular_price: { value: 650 } } },
  brand: "Absolute New York",
  category: "makeup",
};

interface MockConfigurable {
  options: Array<{ code: string; label: string; values: Array<{ label: string; swatch?: string }> }>;
  /** One child product per combination; `values` follow the option order. */
  variants: Array<{ values: string[]; price: number; regular: number; inStock?: boolean }>;
}

const sizesOnly = (rows: Array<[label: string, price: number, regular: number, inStock?: boolean]>): MockConfigurable => ({
  options: [{ code: "size", label: "Size", values: rows.map(([label]) => ({ label })) }],
  variants: rows.map(([label, price, regular, inStock]) => ({ values: [label], price, regular, inStock })),
});

const BRA_COLORS = [
  { label: "Rose Pink", swatch: "#c9577a" },
  { label: "Nude", swatch: "#e2bc9c" },
  { label: "Black", swatch: "#1f1f1f" },
  { label: "White", swatch: "#f7f7f7" },
];
const BRA_SIZES = ["32B", "34B", "36B", "38C"];
const BRA_SOLD_OUT = ["Black 32B", "White 38C", "Nude 36B"];

/** Demo configurable products: options whose combinations are child products with their own price and stock. */
const MOCK_CONFIGURABLE: Record<string, MockConfigurable> = {
  "cerave-moisturising-lotion-for-dry-to-very-dry-skin-236ml": sizesOnly([
    ["88 ml", 1150, 1450],
    ["236 ml", 2150, 2650],
    ["473 ml", 3650, 4200],
  ]),
  "aveeno-baby-daily-care-baby-moisturising-lotion-150ml": sizesOnly([
    ["150 ml", 950, 1200],
    ["227 ml", 1350, 1600, false],
    ["354 ml", 1890, 2250],
  ]),
  "everyday-lace-t-shirt-bra": {
    options: [
      { code: "color", label: "Color", values: BRA_COLORS },
      { code: "size", label: "Size", values: BRA_SIZES.map((label) => ({ label })) },
    ],
    variants: BRA_COLORS.flatMap((c) =>
      BRA_SIZES.map((size) => ({
        values: [c.label, size],
        price: size === "38C" ? 950 : 890,
        regular: size === "38C" ? 1250 : 1190,
        inStock: !BRA_SOLD_OUT.includes(`${c.label} ${size}`),
      })),
    ),
  },
};

/* Listing cards need the product type, as Magento returns it, to know which products need options first. */
for (const p of [DEMO_PRODUCT, ...MOCK_PRODUCTS]) p.__typename = p.url_key in MOCK_CONFIGURABLE ? "ConfigurableProduct" : "SimpleProduct";

const optionUid = (code: string, label: string) => `${code}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/** The child picked for a demo configurable product (its option value uids), for the mock cart line. */
export function findMockVariant(urlKey: string, optionUids: string[]) {
  const config = MOCK_CONFIGURABLE[urlKey];
  const variant = config?.variants.find((v) => v.values.every((label, i) => optionUids.includes(optionUid(config.options[i].code, label))));
  if (!config || !variant) return undefined;
  return { ...variant, labels: config.options.map((o, i) => ({ option_label: o.label, value_label: variant.values[i] })) };
}


export function findMockProductBySku(sku: string): MockProduct | undefined {
  return [DEMO_PRODUCT, ...MOCK_PRODUCTS].find((p) => p.sku === sku);
}
