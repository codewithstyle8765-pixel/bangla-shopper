import { DEMO_PRODUCTS } from "./products";
import { MOCK_DESCRIPTIONS } from "./descriptions";
import { PRODUCT_VIDEO_ATTRIBUTE } from "@/lib/config";
import type {
  MagentoAggregation,
  MagentoCategory,
  MagentoNavNode,
  MagentoProduct,
  MagentoProductDetail,
  MagentoProductsResponse,
} from "@/types/magento";

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
    price_range: { minimum_price: { final_price: { value: p.price }, regular_price: { value: regularPrice } } },
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

export const MOCK_NAVIGATION: MagentoNavNode[] = [
  {
    name: "Makeup",
    url_path: "makeup",
    product_count: 623,
    children: [
      {
        name: "Face Makeup",
        url_path: "makeup/face",
        children: [{ name: "Foundation", url_path: "makeup/face/foundation" }, { name: "Concealer", url_path: "makeup/face/concealer" }, { name: "Compact & Powder", url_path: "makeup/face/compact-powder" }, { name: "Blush", url_path: "makeup/face/blush" }, { name: "Highlighter", url_path: "makeup/face/highlighter" }],
      },
      {
        name: "Eye Makeup",
        url_path: "makeup/eye",
        children: [{ name: "Eyeshadow", url_path: "makeup/eye/eyeshadow" }, { name: "Eyeliner", url_path: "makeup/eye/eyeliner" }, { name: "Mascara", url_path: "makeup/eye/mascara" }, { name: "Kajal", url_path: "makeup/eye/kajal" }, { name: "Eyebrow", url_path: "makeup/eye/eyebrow" }],
      },
      {
        name: "Lip Makeup",
        url_path: "makeup/lip",
        children: [{ name: "Lipstick", url_path: "makeup/lip/lipstick" }, { name: "Liquid Lipstick", url_path: "makeup/lip/liquid-lipstick" }, { name: "Lip Gloss", url_path: "makeup/lip/lip-gloss" }, { name: "Lip Liner", url_path: "makeup/lip/lip-liner" }, { name: "Lip Balm", url_path: "makeup/lip/lip-balm" }],
      },
      {
        name: "Nail",
        url_path: "makeup/nail",
        children: [{ name: "Nail Polish", url_path: "makeup/nail/nail-polish" }, { name: "Nail Care", url_path: "makeup/nail/nail-care" }, { name: "Nail Remover", url_path: "makeup/nail/nail-remover" }],
      },
      {
        name: "Tools & Brushes",
        url_path: "makeup/tools",
        children: [{ name: "Makeup Brushes", url_path: "makeup/tools/brushes" }, { name: "Sponges & Puffs", url_path: "makeup/tools/sponges" }, { name: "Eyelash Curlers", url_path: "makeup/tools/eyelash-curlers" }, { name: "Mirrors", url_path: "makeup/tools/mirrors" }],
      },
      {
        name: "Makeup Remover",
        url_path: "makeup/remover",
        children: [{ name: "Micellar Water", url_path: "makeup/remover/micellar-water" }, { name: "Cleansing Balm", url_path: "makeup/remover/cleansing-balm" }, { name: "Remover Wipes", url_path: "makeup/remover/wipes" }],
      },
      {
        name: "Palettes & Kits",
        url_path: "makeup/kits",
        children: [{ name: "Eyeshadow Palettes", url_path: "makeup/kits/eyeshadow-palettes" }, { name: "Face Palettes", url_path: "makeup/kits/face-palettes" }, { name: "Gift Sets", url_path: "makeup/kits/gift-sets" }],
      },
    ],
  },
  {
    name: "Skin Care",
    url_path: "skin-care",
    product_count: 1067,
    children: [
      {
        name: "Cleansers",
        url_path: "skin-care/cleansers",
        children: [{ name: "Face Wash", url_path: "skin-care/cleansers/face-wash" }, { name: "Cleansing Oil", url_path: "skin-care/cleansers/cleansing-oil" }, { name: "Micellar Water", url_path: "skin-care/cleansers/micellar-water" }, { name: "Scrub & Exfoliator", url_path: "skin-care/cleansers/scrub-exfoliator" }],
      },
      {
        name: "Moisturizers",
        url_path: "skin-care/moisturizers",
        children: [{ name: "Day Cream", url_path: "skin-care/moisturizers/day-cream" }, { name: "Night Cream", url_path: "skin-care/moisturizers/night-cream" }, { name: "Gel Moisturizer", url_path: "skin-care/moisturizers/gel-moisturizer" }],
      },
      {
        name: "Serums",
        url_path: "skin-care/serums",
        children: [{ name: "Vitamin C", url_path: "skin-care/serums/vitamin-c" }, { name: "Niacinamide", url_path: "skin-care/serums/niacinamide" }, { name: "Hyaluronic Acid", url_path: "skin-care/serums/hyaluronic-acid" }, { name: "Retinol", url_path: "skin-care/serums/retinol" }],
      },
      {
        name: "Sunscreen",
        url_path: "skin-care/sunscreen",
        children: [{ name: "Face Sunscreen", url_path: "skin-care/sunscreen/face-sunscreen" }, { name: "Body Sunscreen", url_path: "skin-care/sunscreen/body-sunscreen" }],
      },
    ],
  },
  {
    name: "Hair Care",
    url_path: "hair-care",
    product_count: 782,
    children: [
      {
        name: "Wash & Condition",
        url_path: "hair-care/wash-condition",
        children: [{ name: "Shampoo", url_path: "hair-care/wash-condition/shampoo" }, { name: "Conditioner", url_path: "hair-care/wash-condition/conditioner" }, { name: "Hair Mask", url_path: "hair-care/wash-condition/hair-mask" }],
      },
      {
        name: "Treat & Style",
        url_path: "hair-care/treat-style",
        children: [{ name: "Hair Oil", url_path: "hair-care/treat-style/hair-oil" }, { name: "Hair Serum", url_path: "hair-care/treat-style/hair-serum" }, { name: "Styling", url_path: "hair-care/treat-style/styling" }],
      },
      {
        name: "Hair Colour",
        url_path: "hair-care/colour",
        children: [{ name: "Hair Dye", url_path: "hair-care/colour/hair-dye" }, { name: "Henna", url_path: "hair-care/colour/henna" }],
      },
    ],
  },
  {
    name: "Fragrance",
    url_path: "fragrance",
    product_count: 180,
    children: [
      {
        name: "For Women",
        url_path: "fragrance/women",
        children: [{ name: "Eau de Parfum", url_path: "fragrance/women/eau-de-parfum" }, { name: "Eau de Toilette", url_path: "fragrance/women/eau-de-toilette" }, { name: "Body Mist", url_path: "fragrance/women/body-mist" }],
      },
      {
        name: "For Men",
        url_path: "fragrance/men",
        children: [{ name: "Eau de Parfum", url_path: "fragrance/men/eau-de-parfum" }, { name: "Deodorant", url_path: "fragrance/men/deodorant" }],
      },
      {
        name: "Home",
        url_path: "fragrance/home",
        children: [{ name: "Candles", url_path: "fragrance/home/candles" }, { name: "Diffusers", url_path: "fragrance/home/diffusers" }],
      },
    ],
  },
  { name: "K-Beauty", url_path: "k-beauty", product_count: 243 },
  { name: "Mom & Baby", url_path: "mom-and-baby", product_count: 184 },
  { name: "Accessories", url_path: "accessories", product_count: 96 },
  { name: "Undergarments", url_path: "undergarments", product_count: 25 },
];

/** Merchandising categories linked from the menu and home banners (not shown in the menu tree). */
const PROMO_CATEGORIES: MagentoNavNode[] = [
  { name: "Sale Items", url_path: "sale-items" },
  { name: "Outlet Center", url_path: "outlet-center" },
  { name: "Gift Guides", url_path: "gift-guides" },
  { name: "Shoppers Trends", url_path: "trends" },
  { name: "Double Cashback", url_path: "cashback" },
  { name: "Beauty Tech", url_path: "beauty-tech" },
  { name: "New Arrivals", url_path: "new-arrivals" },
  { name: "Similar Products", url_path: "lip-makeup" },
  { name: "Recommended For You", url_path: "recommended" },
];

/** Client's category banners (990×331), served from mock images; delete with src/mocks. */
const MOCK_CATEGORY_BANNERS: Record<string, string> = {
  makeup: "makeup-oct-2026.jpg",
  "hair-care": "hair-care-oct-2026.jpg",
  "k-beauty": "kbeauty-oct-2026.jpg",
  "skin-care": "skincare-oct-2026.jpg",
  "mom-and-baby": "baby-oct-2026.jpg",
};

/** Same markup as the client's category CMS block (an image slider of <a><img></a> slides). */
const bannerBlock = (name: string, file: string) =>
  `<div class="slider-show"><div class="owl-carousel owl-theme"><div class="item"><a title="${name} in Bangladesh" href="#"><img src="/assets/images/mock/categories/${file}" alt="${name} in Bangladesh" width="990" height="331"></a></div></div></div>`;

/** Demo long-form category copy (Magento category description HTML), shaped like the client's Makeup Shop text. */
const MOCK_CATEGORY_CONTENT: Record<string, string> = {
  "k-beauty": `<h2>Discover the World of K-Beauty</h2>
<p>K-Beauty, short for Korean Beauty, has transformed skincare worldwide with its focus on gentle ingredients, layered routines and healthy, glowing skin. At BanglaShoppers you will find authentic Korean skincare and makeup, imported directly and delivered across Bangladesh.</p>
<p>From gentle cleansers and hydrating toners to nourishing serums and lightweight sunscreens, every product is chosen for real results without harsh ingredients.</p>
<h2>What Is K-Beauty?</h2>
<p>Korean Beauty refers to skincare, makeup and beauty products developed in South Korea. One of its defining characteristics is prevention: keeping skin hydrated, protected and balanced every day rather than fixing problems later.</p>
<h2>Popular K-Beauty Categories</h2>
<ul>
  <li><strong>Cleansers:</strong> oil cleansers and low-pH foam cleansers for a gentle double cleanse</li>
  <li><strong>Toners and essences:</strong> lightweight hydration that preps skin for the next steps</li>
  <li><strong>Serums and ampoules:</strong> targeted care with niacinamide, vitamin C and centella</li>
  <li><strong>Sunscreens:</strong> comfortable daily SPF that sits well under makeup</li>
</ul>
<h2>Why Shop K-Beauty at BanglaShoppers?</h2>
<p>Every product is <strong>100% authentic</strong>, sourced from authorised distributors and stored correctly. Enjoy fast delivery, easy returns and Cash Back Reward points on every order.</p>`,
  makeup: `<p>Have you been looking for a <strong>name brand makeup shop in Bangladesh</strong> that you can rely on for quality and value? BanglaShoppers brings authentic international makeup to your doorstep, imported directly from the United States, Canada, the United Kingdom, Germany and other manufacturing countries, at prices that make everyday beauty affordable.</p>
<p>Every beauty and cosmetic line we carry comes with a product guarantee. We source from authorised distributors only, so you can shop with confidence knowing each product is 100% genuine. Free delivery is available on orders over TK 3,000.</p>
<p><strong>What do we offer?</strong></p>
<p>From primers and foundations to eyeshadows, mascaras and setting sprays, we stock everything you need for a natural look or a full glam finish. Looking for lipstick in a specific shade, a long-wear liner or a brush set? You will find it here alongside skin care, hair care and fragrance.</p>
<ul>
  <li>Face makeup: primers, foundations, concealers, powders and highlighters</li>
  <li>Eye makeup: eyeshadow palettes, liners, mascaras and brow products</li>
  <li>Lip makeup: matte and creamy lipsticks, liners, glosses and tints</li>
  <li>Tools: brushes, sponges and makeup removers</li>
</ul>
<p><strong>Cosmetics for every skin type</strong></p>
<p>We offer products for sensitive, oily, dry and combination skin, in shades that suit every skin tone. Brands include Absolute New York, W7, Technic, Maybelline, L'Oréal Paris and many more, with new arrivals added every week.</p>
<p><strong>Come see for yourself!</strong></p>
<p>Browse the collection above, add your favourites to your <a href="/customer/account/wishlist">wishlist</a>, and enjoy fast delivery across Bangladesh. Questions about a product? Our support team is happy to help.</p>`,
};

export function resolveCategory(urlPath: string): MagentoCategory | null {
  const walk = (nodes: MagentoNavNode[], parents: MagentoNavNode[]): MagentoCategory | null => {
    for (const node of nodes) {
      if (node.url_path === urlPath) {
        return {
          uid: `cat-${node.url_path}`,
          name: node.name,
          description: MOCK_CATEGORY_CONTENT[node.url_path] ?? `Shop 100% authentic ${node.name.toLowerCase()} products online in Bangladesh at the best price.`,
          cms_block: MOCK_CATEGORY_BANNERS[node.url_path] ? { content: bannerBlock(node.name, MOCK_CATEGORY_BANNERS[node.url_path]) } : null,
          breadcrumbs: parents.map((p) => ({ category_name: p.name, category_url_path: p.url_path })),
          children: (node.children ?? []).map((c) => ({ name: c.name, url_path: c.url_path })),
        };
      }
      const hit = node.children && walk(node.children, [...parents, node]);
      if (hit) return hit;
    }
    return null;
  };
  return walk([...MOCK_NAVIGATION, ...PROMO_CATEGORIES], []);
}

/** The category's own products first, then the rest of the catalogue so every listing fills its grid. */
function productsForCategory(uid: string): MockProduct[] {
  const root = uid.replace(/^cat-/, "").split("/")[0];
  const own = MOCK_PRODUCTS.filter((p) => p.category === root);
  const offset = uid.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % MOCK_PRODUCTS.length;
  const rest = [...MOCK_PRODUCTS.slice(offset), ...MOCK_PRODUCTS.slice(0, offset)].filter((p) => p.category !== root);
  return [...own, ...rest];
}

type FilterInput = Record<string, { eq?: string; in?: string[]; from?: string; to?: string; match?: string }>;

const finalPrice = (p: MagentoProduct) => p.price_range.minimum_price.final_price.value;

const PRICE_BUCKETS = [
  { label: "Under TK 300", from: 0, to: 300 },
  { label: "TK 300 - TK 500", from: 300, to: 500 },
  { label: "TK 500 - TK 1,000", from: 500, to: 1000 },
  { label: "TK 1,000 - TK 2,000", from: 1000, to: 2000 },
  { label: "Above TK 2,000", from: 2000, to: undefined },
];

function matches(p: MockProduct, code: string, cond: FilterInput[string]): boolean {
  const values = cond.in ?? (cond.eq !== undefined ? [cond.eq] : []);
  switch (code) {
    case "category_uid":
    case "url_key":
      return true;
    case "brand":
      return values.includes(p.brand);
    case "country_of_manufacture":
      return values.includes(p.country_of_manufacture ?? "");
    case "stock_status":
      return values.includes(p.stock_status ?? "");
    case "rating":
      return (p.rating_summary ?? 0) / 20 >= Math.min(...values.map(Number));
    case "price": {
      const price = finalPrice(p);
      return price >= Number(cond.from ?? 0) && (cond.to === undefined || price < Number(cond.to));
    }
    default:
      return true;
  }
}

function applyFilter(pool: MockProduct[], filter: FilterInput, skip?: string) {
  return pool.filter((p) => Object.entries(filter).every(([code, cond]) => code === skip || matches(p, code, cond)));
}

function aggregations(pool: MockProduct[], filter: FilterInput): MagentoAggregation[] {
  const facet = (code: string, label: string, key: (p: MockProduct) => string) => {
    const counts = new Map<string, number>();
    for (const p of applyFilter(pool, filter, code)) counts.set(key(p), (counts.get(key(p)) ?? 0) + 1);
    return {
      attribute_code: code,
      label,
      options: [...counts.entries()].sort().map(([value, count]) => ({ label: value, value, count })),
    };
  };
  const priceBase = applyFilter(pool, filter, "price");
  const ratingBase = applyFilter(pool, filter, "rating");
  const stockBase = applyFilter(pool, filter, "stock_status");

  return [
    facet("brand", "Brand", (p) => p.brand),
    {
      attribute_code: "price",
      label: "Price",
      options: PRICE_BUCKETS.map((b) => ({
        label: b.label,
        value: `${b.from}_${b.to ?? ""}`,
        count: priceBase.filter((p) => finalPrice(p) >= b.from && (b.to === undefined || finalPrice(p) < b.to)).length,
      })).filter((o) => o.count > 0),
    },
    {
      attribute_code: "rating",
      label: "Customer Rating",
      options: [4, 3, 2].map((r) => ({
        label: `${r} & up`,
        value: String(r),
        count: ratingBase.filter((p) => (p.rating_summary ?? 0) / 20 >= r).length,
      })),
    },
    facet("country_of_manufacture", "Product Origin", (p) => p.country_of_manufacture ?? ""),
    {
      attribute_code: "stock_status",
      label: "Availability",
      options: [
        { label: "In Stock", value: "IN_STOCK", count: stockBase.filter((p) => p.stock_status === "IN_STOCK").length },
      ],
    },
  ];
}

/** The PSD product page keeps its designed gallery. */
const PSD_GALLERY = [
  IMG_PRIMARY,
  "/assets/images/pdp/layer_3.jpg",
  "/assets/images/pdp/layer_2.jpg",
  "/assets/images/pdp/layer_4.jpg",
  "/assets/images/pdp/layer_2.jpg",
  "/assets/images/pdp/layer_4.jpg",
];

/**
 * DEMO ONLY (remove once Magento returns real galleries): the product's own image, then five images of
 * other products (same category first) so the gallery swiper and thumbnails have something to show.
 */
function demoGallery(product: MockProduct): string[] {
  const own = product.small_image?.url ?? IMG_PRIMARY;
  const others = [...MOCK_PRODUCTS.filter((p) => p.category === product.category), ...MOCK_PRODUCTS.filter((p) => p.category !== product.category)]
    .map((p) => p.small_image?.url)
    .filter((url): url is string => Boolean(url) && url !== own);
  return [own, ...others.slice(0, 5)];
}

/** Client videos from the live site (same YouTube links), sent in the product's YouTube attribute. */
const MOCK_PRODUCT_VIDEOS: Record<string, string> = {
  "absolute-new-york-supreme-slim-demi-matte-lipstick-peony-mlss59-1-3gm": "https://www.youtube.com/watch?v=48FKkYnXYKk",
  "absolute-new-york-dual-ended-brow-brush-for-eyes-abmb31": "https://www.youtube.com/watch?v=vBjeZMONUxk",
};

/** Demo low-stock levels ("Only N left"); most products have plenty (null). */
function mockStockLeft(uid: string): number | null {
  const n = uid.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return n % 3 === 0 ? (n % 9) + 1 : null;
}

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

const optionUid = (code: string, label: string) => `${code}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

/** The child picked for a demo configurable product (its option value uids), for the mock cart line. */
export function findMockVariant(urlKey: string, optionUids: string[]) {
  const config = MOCK_CONFIGURABLE[urlKey];
  const variant = config?.variants.find((v) => v.values.every((label, i) => optionUids.includes(optionUid(config.options[i].code, label))));
  if (!config || !variant) return undefined;
  return { ...variant, labels: config.options.map((o, i) => ({ option_label: o.label, value_label: variant.values[i] })) };
}

function mockConfigurable(product: MockProduct): Pick<MagentoProductDetail, "configurable_options" | "variants"> {
  const config = MOCK_CONFIGURABLE[product.url_key];
  if (!config) return {};
  return {
    configurable_options: config.options.map((o) => ({
      uid: o.code,
      attribute_code: o.code,
      label: o.label,
      values: o.values.map((v) => ({
        uid: optionUid(o.code, v.label),
        label: v.label,
        swatch_data: v.swatch ? { __typename: "ColorSwatchData", value: v.swatch } : null,
      })),
    })),
    variants: config.variants.map((v) => ({
      attributes: v.values.map((label, i) => ({ code: config.options[i].code, uid: optionUid(config.options[i].code, label) })),
      product: {
        sku: `${product.sku}-${v.values.map((l) => l.replace(/[^A-Za-z0-9]/g, "")).join("-")}`,
        stock_status: v.inStock === false ? "OUT_OF_STOCK" : "IN_STOCK",
        price_range: { minimum_price: { final_price: { value: v.price }, regular_price: { value: v.regular } } },
      },
    })),
  };
}

function productCategory(product: MockProduct) {
  if (product === DEMO_PRODUCT) {
    return {
      name: "Lipstick",
      url_path: "makeup/lip/lipstick",
      breadcrumbs: [
        { category_name: "Makeup Shop", category_url_path: "makeup" },
        { category_name: "Lip Makeup", category_url_path: "makeup/lip" },
      ],
    };
  }
  const root = MOCK_NAVIGATION.find((n) => n.url_path === product.category);
  return { name: root?.name ?? "Shop", url_path: product.category, breadcrumbs: [] };
}

export function resolveProducts(vars: {
  search?: string;
  filter?: FilterInput;
  sort?: Record<string, "ASC" | "DESC">;
  pageSize?: number;
  currentPage?: number;
}): MagentoProductsResponse | { products: { items: MagentoProductDetail[] } } {
  const filter = vars.filter ?? {};

  const urlKey = filter.url_key?.eq;
  if (urlKey) {
    const product = [DEMO_PRODUCT, ...MOCK_PRODUCTS].find((p) => p.url_key === urlKey);
    if (!product) return { products: { items: [] } };
    const others = MOCK_PRODUCTS.filter((p) => p.url_key !== urlKey);
    return {
      products: {
        items: [
          {
            ...product,
            media_gallery: (product === DEMO_PRODUCT ? PSD_GALLERY : demoGallery(product)).map((url, position) => ({ url, position })),
            description: { html: MOCK_DESCRIPTIONS[product.url_key] ?? "" },
            only_x_left_in_stock: product.stock_status === "OUT_OF_STOCK" ? null : mockStockLeft(product.uid),
            custom_attributesV2: {
              items: [
                { code: "brand", selected_options: [{ label: product.brand }] },
                { code: "color", selected_options: [{ label: product.name.split(" - ")[1] ?? "" }] },
                ...(MOCK_PRODUCT_VIDEOS[product.url_key] ? [{ code: PRODUCT_VIDEO_ATTRIBUTE, value: MOCK_PRODUCT_VIDEOS[product.url_key] }] : []),
              ],
            },
            categories: [productCategory(product)],
            live_stock: [
              { location: "Online Stock", available: product.stock_status !== "OUT_OF_STOCK" },
              { location: "Banani Store", available: true },
              { location: "Dhanmondi Store", available: product.uid.length % 2 === 0 },
            ],
            related_products: [...others.filter((p) => p.category === product.category), ...others.filter((p) => p.category !== product.category)].slice(0, 8),
            upsell_products: others.filter((p) => p.category !== product.category).slice(0, 8),
            ...mockConfigurable(product),
          },
        ],
      },
    };
  }

  let pool: MockProduct[] = MOCK_PRODUCTS;
  if (filter.category_uid?.eq) {
    pool = productsForCategory(filter.category_uid.eq);
  } else if (vars.search) {
    const terms = vars.search.toLowerCase().split(/\s+/).filter(Boolean);
    pool = MOCK_PRODUCTS.filter((p) => terms.every((t) => p.name.toLowerCase().includes(t)));
  }

  const filtered = applyFilter(pool, filter);
  const [sortKey, dir] = Object.entries(vars.sort ?? {})[0] ?? [];
  if (sortKey) {
    const sign = dir === "DESC" ? -1 : 1;
    filtered.sort((a, b) =>
      sortKey === "price" ? sign * (finalPrice(a) - finalPrice(b)) : sign * a.name.localeCompare(b.name),
    );
  }

  const pageSize = vars.pageSize ?? 20;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(vars.currentPage ?? 1, totalPages);

  return {
    products: {
      total_count: filtered.length,
      page_info: { current_page: currentPage, total_pages: totalPages },
      aggregations: aggregations(pool, filter),
      items: filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    },
  };
}

export function findMockProductBySku(sku: string): MockProduct | undefined {
  return [DEMO_PRODUCT, ...MOCK_PRODUCTS].find((p) => p.sku === sku);
}
