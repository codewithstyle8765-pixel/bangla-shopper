import { PLP_PAGE_SIZE, PLP_PAGE_SIZES } from "@/lib/config";
import {
  CATEGORY_QUERY,
  NAVIGATION_QUERY,
  CREATE_PRODUCT_REVIEW,
  PRODUCT_DETAIL_QUERY,
  PRODUCT_LISTING_QUERY,
  PRODUCT_REVIEW_RATINGS_QUERY,
} from "@/graphql/catalog";
import { graphqlMutate } from "@/lib/graphql-fetch";
import { getCustomerToken } from "@/utils/session";
import { getCategoryCacheConfig, getPageCacheConfig, getProductCacheConfig } from "@/utils/hooks/useCache";
import type {
  MagentoCategory,
  MagentoNavNode,
  MagentoProduct,
  MagentoProductDetail,
  MagentoProductsResponse,
} from "@/types/magento";
import type {
  CategoryBanner,
  NavCategory,
  ProductDetail,
  ProductListing,
  ProductListingParams,
  ProductSummary,
  SortOption,
} from "@/types/storefront";
import { graphqlRequestCached } from "@/lib/cached-graphql";

const PLACEHOLDER_IMAGE = "/assets/images/placeholder.svg";

export const SORT_OPTIONS: SortOption[] = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "name_desc", label: "Name: Z to A" },
];

const SORT_MAP: Record<string, Record<string, "ASC" | "DESC"> | undefined> = {
  featured: undefined,
  price_asc: { price: "ASC" },
  price_desc: { price: "DESC" },
  name_asc: { name: "ASC" },
  name_desc: { name: "DESC" },
};

export function mapProduct(p: MagentoProduct): ProductSummary {
  const final = p.price_range.minimum_price.final_price.value;
  const regular = p.price_range.minimum_price.regular_price.value;
  const hasDiscount = regular > final;
  const discountPercent =
    (p.price_range.minimum_price as { discount?: { percent_off?: number } })?.discount?.percent_off ??
    (hasDiscount ? Math.round(((regular - final) / regular) * 100) : undefined);

  return {
    id: p.uid,
    sku: p.sku,
    name: p.name,
    urlKey: p.url_key,
    image: p.small_image?.url || PLACEHOLDER_IMAGE,
    price: final,
    originalPrice: hasDiscount ? regular : undefined,
    discountPercentage: discountPercent && discountPercent > 0 ? Math.round(discountPercent) : undefined,
    rating: Math.round(((p.rating_summary ?? 0) / 20) * 10) / 10,
    reviewCount: p.review_count ?? 0,
    origin: p.country_of_manufacture ?? undefined,
    inStock: p.stock_status !== "OUT_OF_STOCK",
  };
}

/**
 * Category banners: every image in the category CMS block (the client's block is an image slider, each slide an
 * <a><img></a>), else the category image. Links to "#" are dropped.
 */
function categoryBanners(category: MagentoCategory): CategoryBanner[] {
  const html = category.cms_block?.content ?? "";
  const banners = [...html.matchAll(/(?:<a\b[^>]*href=["']([^"']*)["'][^>]*>\s*)?<img\b[^>]*>/gi)].flatMap((m) => {
    const src = m[0].match(/\ssrc=["']([^"']+)["']/i)?.[1];
    if (!src || src.startsWith("data:")) return [];
    const alt = m[0].match(/\salt=["']([^"']*)["']/i)?.[1] || category.name;
    const href = m[1] && m[1] !== "#" ? m[1] : undefined;
    return [{ image: src, alt, ...(href ? { href } : {}) }];
  });
  if (banners.length) return banners;
  return category.image ? [{ image: category.image, alt: category.name }] : [];
}

/** `?brand=a,b&price=300_500&sort=price_asc&page=2&limit=48` → listing params. */
export function parseListingSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
  base: { category?: string; search?: string },
): ProductListingParams {
  const filters: Record<string, string[]> = {};
  for (const [key, raw] of Object.entries(searchParams)) {
    if (["sort", "page", "limit", "q", "gclid", "fbclid"].includes(key) || key.startsWith("utm_") || raw === undefined) continue;
    const values = (Array.isArray(raw) ? raw.join(",") : raw).split(",").filter(Boolean);
    if (values.length) filters[key] = values;
  }
  const sort = typeof searchParams.sort === "string" && searchParams.sort in SORT_MAP ? searchParams.sort : "featured";
  const page = Number(typeof searchParams.page === "string" ? searchParams.page : 1);
  const limit = Number(searchParams.limit);
  const pageSize = (PLP_PAGE_SIZES as readonly number[]).includes(limit) ? limit : PLP_PAGE_SIZE;
  return {
    ...base,
    filters,
    sort,
    page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
    pageSize,
  };
}

function toMagentoFilter(filters: Record<string, string[]>, categoryUid?: string) {
  const filter: Record<string, unknown> = {};
  if (categoryUid) filter.category_uid = { eq: categoryUid };
  for (const [code, values] of Object.entries(filters)) {
    if (code === "price") {
      const [from, to] = values[0].split("_");
      filter.price = { ...(from ? { from } : {}), ...(to ? { to } : {}) };
    } else {
      filter[code] = values.length > 1 ? { in: values } : { eq: values[0] };
    }
  }
  return filter;
}

export async function getNavigation(): Promise<NavCategory[]> {
  try {
    const data = await graphqlRequestCached<{ categoryList: Array<{ children: MagentoNavNode[] }> }>(
      NAVIGATION_QUERY,
      {},
      getPageCacheConfig("category"),
    );
    const toNav = (n: MagentoNavNode): NavCategory => ({
      name: n.name,
      urlPath: n.url_path,
      productCount: n.product_count,
      children: n.children?.filter((c) => c.include_in_menu !== 0).map(toNav),
    });
    return (data.categoryList[0]?.children ?? []).filter((c) => c.include_in_menu !== 0).map(toNav);
  } catch (error) {
    console.error("[magento] navigation failed", error);
    return [];
  }
}

export async function getProductListing(params: ProductListingParams): Promise<ProductListing | null> {
  let category: MagentoCategory | undefined;
  if (params.category) {
    const data = await graphqlRequestCached<{ categoryList: MagentoCategory[] }>(
      CATEGORY_QUERY,
      { urlPath: params.category },
      getCategoryCacheConfig(params.category),
    );
    category = data.categoryList[0];
    if (!category) return null;
  }

  const { products } = await graphqlRequestCached<MagentoProductsResponse>(
    PRODUCT_LISTING_QUERY,
    {
      search: params.search,
      filter: toMagentoFilter(params.filters, category?.uid),
      sort: SORT_MAP[params.sort],
      pageSize: params.pageSize,
      currentPage: params.page,
    },
    params.category ? getCategoryCacheConfig(params.category) : getPageCacheConfig("search"),
  );

  return {
    title: category?.name ?? `Search results for "${params.search ?? ""}"`,
    description: category?.description ?? undefined,
    banners: category ? categoryBanners(category) : [],
    breadcrumbs: [
      { label: "Home", href: "/" },
      ...(category?.breadcrumbs ?? []).map((b) => ({
        label: b.category_name,
        href: `/category/${b.category_url_path}`,
      })),
      { label: category?.name ?? "Search" },
    ],
    products: products.items.map(mapProduct),
    filters: products.aggregations
      .filter((a) => a.attribute_code !== "category_uid")
      .map((a) => ({
        code: a.attribute_code,
        label: a.label,
        type: a.attribute_code === "price" ? "range" : a.attribute_code === "rating" ? "rating" : "checkbox",
        options: a.options,
      })),
    sortOptions: SORT_OPTIONS,
    totalCount: products.total_count,
    currentPage: products.page_info.current_page,
    totalPages: Math.max(1, products.page_info.total_pages),
    subcategories: (category?.children ?? []).map((c) => ({ name: c.name, urlPath: c.url_path })),
  };
}

/** URL keys of the first `limit` catalog products, for build-time PDP prerendering. Empty on failure. */
export async function getPrerenderProductUrlKeys(limit = 100): Promise<string[]> {
  try {
    const { products } = await graphqlRequestCached<MagentoProductsResponse>(
      PRODUCT_LISTING_QUERY,
      { search: "", filter: {}, pageSize: limit, currentPage: 1 },
      getPageCacheConfig("product"),
    );
    return products.items.map((p) => p.url_key).filter(Boolean);
  } catch {
    return [];
  }
}

export async function getProductDetail(urlKey: string): Promise<ProductDetail | null> {
  const data = await graphqlRequestCached<{ products: { items: MagentoProductDetail[] } }>(
    PRODUCT_DETAIL_QUERY,
    { urlKey },
    getProductCacheConfig(urlKey),
  );
  const item = data.products.items[0];
  if (!item) return null;

  const base = mapProduct(item);
  const gallery = (item.media_gallery ?? [])
    .filter((m) => !m.disabled)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((m) => m.url);
  const attribute = (code: string) => {
    const attr = item.custom_attributesV2?.items.find((a) => a.code === code);
    return attr?.selected_options?.[0]?.label ?? attr?.value;
  };
  const deepest = [...(item.categories ?? [])].sort((a, b) => b.url_path.length - a.url_path.length)[0];
  const categoryHref = deepest ? `/category/${deepest.url_path}` : undefined;

  return {
    ...base,
    brand: attribute("brand"),
    shade: attribute("color"),
    gallery: gallery.length ? gallery : [base.image],
    ratingCount: base.reviewCount,
    breadcrumbs: [
      { label: "Home", href: "/" },
      ...(deepest?.breadcrumbs ?? []).map((b) => ({
        label: b.category_name,
        href: `/category/${b.category_url_path}`,
      })),
      ...(deepest ? [{ label: deepest.name, href: categoryHref }] : []),
    ],
    related: (item.related_products ?? []).map(mapProduct),
    recommended: (item.upsell_products ?? []).map(mapProduct),
    liveStock: item.live_stock ?? [{ location: "Online Stock", available: base.inStock }],
    descriptionHtml: item.description?.html ?? "",
    categoryHref,
    stockLeft: item.only_x_left_in_stock ?? undefined,
    options: item.configurable_options?.map((o) => ({
      code: o.attribute_code,
      label: o.label,
      values: o.values.map(({ uid, label, swatch_data: swatch }) => ({
        uid,
        label,
        ...(swatch?.__typename === "ColorSwatchData" && { swatch: { kind: "color" as const, value: swatch.value } }),
        ...(swatch?.__typename === "ImageSwatchData" && { swatch: { kind: "image" as const, value: swatch.thumbnail ?? swatch.value } }),
      })),
    })),
    variants: item.variants?.map((v) => {
      const { final_price, regular_price } = v.product.price_range.minimum_price;
      return {
        sku: v.product.sku,
        price: final_price.value,
        originalPrice: regular_price.value > final_price.value ? regular_price.value : undefined,
        inStock: v.product.stock_status !== "OUT_OF_STOCK",
        attributes: Object.fromEntries(v.attributes.map((a) => [a.code, a.uid])),
      };
    }),
  };
}

/** Home product strips are merchandising categories with these url paths. */
export async function getCategoryProducts(urlPath: string, pageSize: number): Promise<ProductSummary[]> {
  try {
    const listing = await getProductListing({ category: urlPath, filters: {}, sort: "featured", page: 1, pageSize });
    return listing?.products ?? [];
  } catch (error) {
    console.error(`[magento] category products "${urlPath}" failed`, error);
    return [];
  }
}

interface ReviewRatingsMetadata {
  productReviewRatingsMetadata: { items: Array<{ id: string; name: string; values: Array<{ value_id: string; value: string }> }> };
}

/**
 * Submits a review (Magento holds it for moderation). The star choice is applied to every rating
 * configured in admin; signed-in customers are attached through their token.
 */
export async function submitProductReview(review: {
  sku: string;
  nickname: string;
  summary: string;
  text: string;
  stars: number;
  pros?: string;
  value?: string;
  price?: string;
  photos?: string[];
}) {
  const metadata = await graphqlRequestCached<ReviewRatingsMetadata>(PRODUCT_REVIEW_RATINGS_QUERY, {}, getPageCacheConfig("static"));
  const ratings = metadata.productReviewRatingsMetadata.items
    .map((rating) => ({ id: rating.id, value_id: rating.values.find((v) => v.value === String(review.stars))?.value_id }))
    .filter((r): r is { id: string; value_id: string } => Boolean(r.value_id));

  const extraSections: string[] = [];
  if (review.pros) extraSections.push(`Pros:\n${review.pros}`);
  if (review.value) extraSections.push(`Value:\n${review.value}`);
  if (review.price) extraSections.push(`Price:\n${review.price}`);

  const combinedText = extraSections.length > 0
    ? `${review.text}\n\n${extraSections.join("\n\n")}`
    : review.text;

  await graphqlMutate(
    CREATE_PRODUCT_REVIEW,
    { input: { sku: review.sku, nickname: review.nickname, summary: review.summary, text: combinedText, ratings } },
    await getCustomerToken(),
  );
}
