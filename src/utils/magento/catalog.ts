import { getCountries } from "@/utils/magento/directory";
import { ProductQuestionsDocument, type ProductQuestionsQuery, type ProductQuestionsQueryVariables } from "@/graphql/catalog/queries/__generated__/ProductQuestions.generated";
import {
  AskProductQuestionDocument,
  type AskProductQuestionMutation,
  type AskProductQuestionMutationVariables,
} from "@/graphql/catalog/mutations/__generated__/AskProductQuestion.generated";
import { HOME_PRODUCT_ROWS, PLP_PAGE_SIZE, PLP_PAGE_SIZES, PRODUCT_VIDEO_ATTRIBUTE, type HomeProductRow } from "@/lib/config";
import type { ProductCardFragment } from "@/graphql/catalog/fragments/__generated__/ProductCard.generated";
import { MegaMenuDocument, type MegaMenuQuery, type MegaMenuQueryVariables } from "@/graphql/catalog/queries/__generated__/MegaMenu.generated";
import { CategoryByPathDocument, type CategoryByPathQuery, type CategoryByPathQueryVariables } from "@/graphql/catalog/queries/__generated__/CategoryByPath.generated";
import { ProductListingDocument, type ProductListingQuery, type ProductListingQueryVariables } from "@/graphql/catalog/queries/__generated__/ProductListing.generated";
import {
  HomeCategoryProductsDocument,
  type HomeCategoryProductsQuery,
  type HomeCategoryProductsQueryVariables,
} from "@/graphql/catalog/queries/__generated__/HomeCategoryProducts.generated";
import { CREATE_PRODUCT_REVIEW, PRODUCT_REVIEW_RATINGS_QUERY } from "@/graphql/catalog";
import { ProductDetailDocument, type ProductDetailQuery, type ProductDetailQueryVariables } from "@/graphql/catalog/queries/__generated__/ProductDetail.generated";
import { graphqlMutate } from "@/lib/graphql-fetch";
import { getCustomerToken } from "@/utils/session";
import { getCategoryCacheConfig, getPageCacheConfig, getProductCacheConfig } from "@/utils/hooks/useCache";
import type {
  MagentoCategory,
  MagentoProduct,
  MagentoProductDetail,
} from "@/types/magento";
import type {
  CategoryBanner,
  NavCategory,
  ProductDetail,
  ProductListing,
  ProductListingParams,
  ProductQuestion,
  ProductSummary,
  SortOption,
} from "@/types/storefront";
import { graphqlRequestCached } from "@/lib/cached-graphql";
import { youTubeId, youTubeThumbnail } from "@/utils/video-url";

const PLACEHOLDER_IMAGE = "/assets/images/placeholder.svg";

/** `?sort=` values: "featured" (Magento's default order) or "<sort field>_asc|desc", e.g. "price_asc". */
const SORT_PARAM = /^(featured|[a-z0-9_]+_(asc|desc))$/;
/** Sort fields that are an order, not a value range: offered once, as "Featured". */
const NO_DIRECTION = new Set(["position", "relevance"]);
const DIRECTION_LABELS: Record<string, [string, string]> = { name: ["A to Z", "Z to A"] };

const toMagentoSort = (sort: string) => {
  const match = sort.match(/^(.+)_(asc|desc)$/);
  return match ? { [match[1]]: match[2].toUpperCase() } : undefined;
};

/** The sort dropdown from Magento's `sort_fields`: Featured (its default order) first, then each field both ways. */
function sortOptionsFrom(fields: { options?: Array<{ label?: string | null; value?: string | null } | null> | null } | null | undefined): SortOption[] {
  const options = (fields?.options ?? []).filter((o): o is { label?: string | null; value?: string | null } => !!o?.value);
  return [
    { value: "featured", label: "Featured" },
    ...options
      .filter((o) => !NO_DIRECTION.has(o.value!))
      .flatMap((o) => {
        const [up, down] = DIRECTION_LABELS[o.value!] ?? ["Low to High", "High to Low"];
        const label = o.label || o.value!;
        return [
          { value: `${o.value}_asc`, label: `${label}: ${up}` },
          { value: `${o.value}_desc`, label: `${label}: ${down}` },
        ];
      }),
  ];
}

/** Top-level categories that hold brands or offers: not used as a product's breadcrumb when a shop category exists. */
const BREADCRUMB_SKIP_ROOTS = new Set(["top-brands", "all-products", "hot-offers", "fatafati-combos", "combo-offer", "clearance-sale", "editors-choice"]);

/** "Unassigned" is Magento's placeholder for "no value", not a real choice; a filter left with no options is dropped. */
const isRealOption = (o: { label?: string | null }) => !!o.label && o.label.trim().toLowerCase() !== "unassigned";

/** Product types Magento cannot add to the cart without a choice. */
const NEEDS_CHOICE = new Set(["ConfigurableProduct", "BundleProduct", "GroupedProduct"]);

export function mapProduct(p: MagentoProduct): ProductSummary {
  const final = p.price_range.minimum_price.final_price.value;
  const regular = p.price_range.minimum_price.regular_price.value;
  const hasDiscount = regular > final;
  /* Magento's own discount (e.g. 18.79), shown rounded ("19% OFF"). */
  const discountPercent = p.price_range.minimum_price.discount?.percent_off;

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
    hasOptions: NEEDS_CHOICE.has(p.__typename ?? ""),
  };
}

/** Page Builder "HTML Code" elements (data-content-type="html") store their HTML escaped; this unescapes them. */
const decodePageBuilder = (html: string) =>
  html.replace(/(<[^>]*data-content-type="html"[^>]*>)([^<]*)/g, (_, open: string, inner: string) =>
    open + inner.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&amp;/g, "&"),
  );

/** Magento sends the origin as an ISO code ("CN"); show the country name. Unknown codes stay as they are. */
export async function withCountryNames<T extends { origin?: string }>(products: T[]): Promise<T[]> {
  if (!products.some((p) => p.origin)) return products;
  const names = new Map((await getCountries()).map((c) => [c.value, c.label]));
  return products.map((p) => (p.origin ? { ...p, origin: names.get(p.origin) ?? p.origin } : p));
}

/**
 * Category banners: every image in the category CMS block (the client's block is an image slider, each slide an
 * <a><img></a>). Slides the admin commented out (<!-- -->) are skipped, as a browser would, and a slide repeated in the
 * block (same image, link and alt) is shown once. No images → no banner.
 * Links to "#" are dropped.
 */
function categoryBanners(category: MagentoCategory): CategoryBanner[] {
  const html = decodePageBuilder(category.cms_block?.content ?? "").replace(/<!--[\s\S]*?-->/g, "");
  return [...html.matchAll(/(?:<a\b[^>]*href=["']([^"']*)["'][^>]*>\s*)?<img\b[^>]*>/gi)].flatMap((m) => {
    const src = m[0].match(/\ssrc=["']([^"']+)["']/i)?.[1];
    if (!src || src.startsWith("data:")) return [];
    const alt = m[0].match(/\salt=["']([^"']*)["']/i)?.[1] || category.name;
    const href = m[1] && m[1] !== "#" ? m[1] : undefined;
    return [{ image: src, alt, ...(href ? { href } : {}) }];
  }).filter((b, i, all) => all.findIndex((x) => x.image === b.image && x.href === b.href && x.alt === b.alt) === i);
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
  const sort = typeof searchParams.sort === "string" && SORT_PARAM.test(searchParams.sort) ? searchParams.sort : "featured";
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
    } else if (code === "rating") {
      /* "4" = rated 4 stars or more. */
      filter.rating = { from: values[0] };
    } else {
      filter[code] = values.length > 1 ? { in: values } : { eq: values[0] };
    }
  }
  return filter;
}

type NavNode = { name?: string | null; url_path?: string | null; include_in_menu?: number | null; product_count?: number | null; children?: Array<NavNode | null> | null };

/** Categories shown in the menu (Magento `include_in_menu`), with a name and a URL. */
const menuNodes = (nodes: Array<NavNode | null> | null | undefined): NavCategory[] =>
  (nodes ?? [])
    .filter((n): n is NavNode => !!n && n.include_in_menu !== 0 && !!n.name && !!n.url_path)
    .map((n) => ({
      name: n.name!,
      urlPath: n.url_path!,
      productCount: n.product_count ?? undefined,
      children: n.children ? menuNodes(n.children) : undefined,
    }));

export async function getNavigation(): Promise<NavCategory[]> {
  try {
    const data = await graphqlRequestCached<MegaMenuQuery, MegaMenuQueryVariables>(MegaMenuDocument, {}, getPageCacheConfig("category"));
    return menuNodes(data.categoryList?.[0]?.children);
  } catch (error) {
    console.error("[magento] navigation failed", error);
    return [];
  }
}

/** Generated category result → the shape the banner and breadcrumb helpers read. */
const toCategory = (c: NonNullable<NonNullable<CategoryByPathQuery["categoryList"]>[number]>): MagentoCategory => ({
  uid: c.uid,
  name: c.name ?? "",
  description: c.description,
  cms_block: c.cms_block,
  breadcrumbs: (c.breadcrumbs ?? []).flatMap((b) => (b?.category_name && b.category_url_path ? [{ category_name: b.category_name, category_url_path: b.category_url_path }] : [])),
  children: (c.children ?? []).flatMap((ch) => (ch?.name && ch.url_path ? [{ name: ch.name, url_path: ch.url_path }] : [])),
});

/** The category at a URL path (cached), or null when there is none. Shared by the category page and its metadata. */
export async function getCategoryByPath(urlPath: string): Promise<MagentoCategory | null> {
  const data = await graphqlRequestCached<CategoryByPathQuery, CategoryByPathQueryVariables>(
    CategoryByPathDocument,
    { urlPath },
    getCategoryCacheConfig(urlPath),
  );
  const found = data.categoryList?.[0];
  return found ? toCategory(found) : null;
}

export async function getProductListing(params: ProductListingParams): Promise<ProductListing | null> {
  let category: MagentoCategory | undefined;
  if (params.category) {
    const found = await getCategoryByPath(params.category);
    if (!found) return null;
    category = found;
  }

  const cache = params.category ? getCategoryCacheConfig(params.category) : getPageCacheConfig("search");
  const variables: ProductListingQueryVariables = {
    search: params.search,
    filter: toMagentoFilter(params.filters, category?.uid),
    pageSize: params.pageSize,
    currentPage: params.page,
  };
  const sort = toMagentoSort(params.sort);
  /* A sort the store does not offer (old or hand-typed URL) falls back to the default order. */
  const data = sort
    ? await graphqlRequestCached<ProductListingQuery, ProductListingQueryVariables>(ProductListingDocument, { ...variables, sort }, cache).catch(() =>
        graphqlRequestCached<ProductListingQuery, ProductListingQueryVariables>(ProductListingDocument, variables, cache),
      )
    : await graphqlRequestCached<ProductListingQuery, ProductListingQueryVariables>(ProductListingDocument, variables, cache);
  const products = data.products;

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
    products: await withCountryNames((products?.items ?? []).filter((p) => p !== null).map((p) => mapProduct(fromProductCard(p)))),
    filters: (products?.aggregations ?? []).flatMap((a) => {
      if (!a?.attribute_code || a.attribute_code === "category_uid") return [];
      const options = (a.options ?? []).flatMap((o) =>
        o && o.value != null && isRealOption(o) ? [{ label: o.label!, value: o.value, count: o.count ?? 0 }] : [],
      );
      if (!options.length) return [];
      return [
        {
          code: a.attribute_code,
          label: a.label ?? a.attribute_code,
          type: a.attribute_code === "price" ? "range" : a.attribute_code === "rating" ? "rating" : "checkbox",
          options,
        },
      ];
    }),
    sortOptions: sortOptionsFrom(products?.sort_fields),
    totalCount: products?.total_count ?? 0,
    currentPage: products?.page_info?.current_page ?? params.page,
    totalPages: Math.max(1, products?.page_info?.total_pages ?? 1),
    subcategories: (category?.children ?? []).map((c) => ({ name: c.name, urlPath: c.url_path })),
  };
}

/** URL keys of the first `limit` catalog products, for build-time PDP prerendering. Empty on failure. */
export async function getPrerenderProductUrlKeys(limit = 100): Promise<string[]> {
  try {
    const { products } = await graphqlRequestCached<ProductListingQuery, ProductListingQueryVariables>(
      ProductListingDocument,
      { search: "", filter: {}, pageSize: limit, currentPage: 1 },
      getPageCacheConfig("product"),
    );
    return (products?.items ?? []).flatMap((p) => (p?.url_key ? [p.url_key] : []));
  } catch {
    return [];
  }
}

/** "country_of_manufacture" → "Country Of Manufacture" for attributes Magento sends no label for. */
const specLabel = (code: string) => code.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

/** Magento sends "2022-08-05 03:44:22" (UTC); missing/invalid dates become "". */
const toIsoDate = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
};

export async function getProductDetail(urlKey: string): Promise<ProductDetail | null> {
  const data = await graphqlRequestCached<ProductDetailQuery, ProductDetailQueryVariables>(ProductDetailDocument, { urlKey }, getProductCacheConfig(urlKey));
  /* Same fields as MagentoProductDetail (Magento marks them nullable); `live_stock` is not on this endpoint yet. */
  const item = data.products?.items?.[0] as MagentoProductDetail | null | undefined;
  if (!item) return null;
  const labels = new Map((data.products?.aggregations ?? []).flatMap((a) => (a?.attribute_code && a.label ? [[a.attribute_code, a.label] as const] : [])));

  const [base] = await withCountryNames([mapProduct(item)]);
  const media = (item.media_gallery ?? [])
    .filter((m) => !m.disabled)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((m) => ({ url: m.url, isVideo: Boolean(m.video_content), youtubeId: youTubeId(m.video_content?.video_url), title: m.video_content?.video_title ?? undefined }))
    /* Non-YouTube videos (Vimeo) have no player here, so they are left out rather than shown as a still. */
    .filter((m) => !m.isVideo || m.youtubeId);
  const attribute = (code: string) => {
    const attr = item.custom_attributesV2?.items.find((a) => a.code === code);
    return attr?.selected_options?.[0]?.label ?? attr?.value;
  };
  /* Videos from the product's YouTube attribute go right after the main image, unless the gallery already has them. */
  const linked = (attribute(PRODUCT_VIDEO_ATTRIBUTE) ?? "")
    .split(/[\s,]+/)
    .map((url) => youTubeId(url))
    .filter((id, i, all): id is string => Boolean(id) && all.indexOf(id) === i && !media.some((m) => m.youtubeId === id));
  if (linked.length) media.splice(Math.min(1, media.length), 0, ...linked.map((id) => ({ url: youTubeThumbnail(id), isVideo: true, youtubeId: id, title: undefined })));
  const gallery = media.map((m) => m.url);
  const videos = media.flatMap((m, index) => (m.youtubeId ? [{ index, youtubeId: m.youtubeId, title: m.title }] : []));
  /* Breadcrumb: the deepest category outside brand / offer roots (Magento marks no main category); else the deepest. */
  const byDepth = [...(item.categories ?? [])].sort((a, b) => (b.breadcrumbs?.length ?? 0) - (a.breadcrumbs?.length ?? 0) || b.url_path.length - a.url_path.length);
  const deepest = byDepth.find((c) => !BREADCRUMB_SKIP_ROOTS.has(c.url_path.split("/")[0])) ?? byDepth[0];
  const categoryHref = deepest ? `/category/${deepest.url_path}` : undefined;

  return {
    ...base,
    /* The store's brand is `manufacturer`, else `brand_name` (Magento's rule); `brand` is the mock catalog's code. */
    brand: [attribute("manufacturer"), attribute("brand_name"), attribute("brand")].find((b) => b && isRealOption({ label: b })),
    shade: attribute("color"),
    gallery: gallery.length ? gallery : [base.image],
    videos: gallery.length ? videos : [],
    ratingCount: base.reviewCount,
    breadcrumbs: [
      { label: "Home", href: "/" },
      ...(deepest?.breadcrumbs ?? []).map((b) => ({
        label: b.category_name,
        href: `/category/${b.category_url_path}`,
      })),
      ...(deepest ? [{ label: deepest.name, href: categoryHref }] : []),
    ],
    related: await withCountryNames((item.related_products ?? []).map(mapProduct)),
    recommended: await withCountryNames((item.upsell_products ?? []).map(mapProduct)),
    /* Empty for an attribute set without a "Custom Stock" group: show the online stock alone. */
    liveStock: item.live_stock?.length ? item.live_stock : [{ location: "Online Stock", available: base.inStock }],
    descriptionHtml: item.description?.html ?? "",
    categoryHref,
    stockLeft: item.only_x_left_in_stock ?? undefined,
    /* In Magento's "most helpful" order; the tab re-sorts for newest / rating. */
    reviews: (item.reviews?.items ?? []).map((r) => ({
      id: String(r.review_id),
      author: r.nickname,
      rating: Math.max(1, Math.min(5, Math.round(r.average_rating / 20))),
      title: r.summary,
      text: r.text,
      createdAt: toIsoDate(r.created_at),
      breakdown: r.ratings_breakdown ?? [],
      verified: r.verified_buyer,
      firstPurchaseAt: r.first_purchase_at ? toIsoDate(r.first_purchase_at) : undefined,
      totalPurchased: r.total_purchased,
      pros: r.pros || undefined,
      value: r.value || undefined,
      price: r.price || undefined,
      photos: r.photos ?? [],
      storeReply: r.store_reply || undefined,
      helpfulCount: r.helpful_count,
    })),
    specs: (item.custom_attributesV2?.items ?? []).flatMap((a) => {
      if (a.code === PRODUCT_VIDEO_ATTRIBUTE) return [];
      const value = a.selected_options?.filter(isRealOption).map((o) => o.label).join(", ") || (a.value && isRealOption({ label: a.value }) ? a.value : "");
      return value ? [{ label: labels.get(a.code) ?? specLabel(a.code), value }] : [];
    }),
    reviewSummaries: (item.review_summaries ?? [])
      .filter((s): s is NonNullable<typeof s> => Boolean(s))
      .map((s) => ({
        period: s.period,
        averageRating: s.average_rating,
        ratingsCount: s.ratings_count,
        reviewsCount: s.reviews_count,
        distribution: (s.distribution ?? [])
          .filter((d): d is NonNullable<typeof d> => Boolean(d))
          .map((d) => ({
            stars: d.stars,
            count: d.count,
            percent: d.percent,
          })),
      })),
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

/** Generated product-card result → the shape `mapProduct` reads (Magento may return nulls). */
const fromProductCard = (p: ProductCardFragment): MagentoProduct => ({
  __typename: p.__typename,
  uid: p.uid,
  sku: p.sku ?? "",
  name: p.name ?? "",
  url_key: p.url_key ?? "",
  stock_status: p.stock_status ?? undefined,
  rating_summary: p.rating_summary,
  review_count: p.review_count,
  country_of_manufacture: p.country_of_manufacture,
  small_image: p.small_image?.url ? { url: p.small_image.url } : null,
  price_range: {
    minimum_price: {
      final_price: { value: p.price_range.minimum_price.final_price.value ?? 0 },
      regular_price: { value: p.price_range.minimum_price.regular_price.value ?? 0 },
      discount: p.price_range.minimum_price.discount,
    },
  },
});

export const mapProductCard = (p: ProductCardFragment): ProductSummary => mapProduct(fromProductCard(p));

/** Products for a Home page row (also the cart page suggestions); each row reads the category set in HOME_PRODUCT_ROWS. */
export async function getCategoryProducts(row: HomeProductRow, pageSize: number): Promise<ProductSummary[]> {
  const urlPath = HOME_PRODUCT_ROWS[row];
  try {
    const { products } = await graphqlRequestCached<HomeCategoryProductsQuery, HomeCategoryProductsQueryVariables>(
      HomeCategoryProductsDocument,
      { urlPath, pageSize },
      getCategoryCacheConfig(urlPath),
    );
    return await withCountryNames((products?.items ?? []).filter((p) => p !== null).map((p) => mapProduct(fromProductCard(p))));
  } catch (error) {
    console.error(`[magento] home row "${row}" (${urlPath}) failed`, error);
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

  await graphqlMutate(
    CREATE_PRODUCT_REVIEW,
    {
      input: {
        sku: review.sku,
        nickname: review.nickname,
        summary: review.summary,
        text: review.text,
        ratings,
        /* Pros / value / price and base64 photos (max 5, 2 MB each) are their own fields. */
        ...(review.pros && { pros: review.pros }),
        ...(review.value && { value: review.value }),
        ...(review.price && { price: review.price }),
        ...(review.photos?.length && { photos: review.photos }),
      },
    },
    await getCustomerToken(),
  );
}

/** Answered questions for the Q&A tab (cached with the product); empty when the API fails. */
export async function getProductQuestions(sku: string): Promise<ProductQuestion[]> {
  try {
    const { productQuestions } = await graphqlRequestCached<ProductQuestionsQuery, ProductQuestionsQueryVariables>(
      ProductQuestionsDocument,
      { sku, pageSize: 50, currentPage: 1 },
      getProductCacheConfig(sku),
    );
    return (productQuestions?.items ?? []).flatMap((q) =>
      q?.question && q.answer ? [{ question: q.question, answer: q.answer, author: q.author ?? undefined, createdAt: q.created_at ?? undefined }] : [],
    );
  } catch (error) {
    console.error("[magento] product questions failed", error);
    return [];
  }
}

/** Sends a question from the Q&A tab; a signed-in customer's name and email come from the account. */
export async function askProductQuestion(input: { sku: string; question: string; name?: string; email?: string }) {
  await graphqlMutate<AskProductQuestionMutation, AskProductQuestionMutationVariables>(AskProductQuestionDocument, input, await getCustomerToken());
}
