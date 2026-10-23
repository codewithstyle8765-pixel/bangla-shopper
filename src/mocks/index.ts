/**
 * FALLBACK_MODE mock backend.
 *
 * Answers Magento GraphQL operations (by operation name) with Magento-shaped
 * data, so the app runs exactly as it will against the real API.
 *
 * To remove when the API is live:
 *   1. delete the `src/mocks/` folder
 *   2. in `src/lib/apollo-client.ts` delete the `createMockLink` import and use
 *      `from([authLink, httpLink])` as the only link
 * Mocks are reached only through `./link.ts` (an Apollo link); nothing else imports them.
 */
import { MOCK_NAVIGATION, findMockProductBySku, resolveCategory, resolveProducts } from "./catalog";
import { MOCK_FOOTER, MOCK_STORE_LOCATIONS } from "./cms";
import { MOCK_CMS_PAGES } from "./cms-pages";
import { MOCK_HOME_PAGE } from "./home";
import { affiliateResolvers } from "./affiliate";
import { cartResolvers } from "./cart";
import { checkoutResolvers } from "./checkout";
import { customerResolvers } from "./customer";
import { directoryResolvers } from "./directory";

type Resolver = (variables: Record<string, unknown>, token?: string | null) => unknown | Promise<unknown>;

const RESOLVERS: Record<string, Resolver> = {
  ...affiliateResolvers,
  ...cartResolvers,
  ...checkoutResolvers,
  ...customerResolvers,
  ...directoryResolvers,
  Navigation: () => ({ categoryList: [{ children: MOCK_NAVIGATION }] }),
  CategoryByPath: (v) => {
    const category = resolveCategory(String(v.urlPath));
    return { categoryList: category ? [category] : [] };
  },
  ProductListing: (v) => resolveProducts(v),
  ProductImagesBySku: (v) => ({
    products: {
      items: (v.skus as string[])
        .map(findMockProductBySku)
        .filter((p) => p !== undefined)
        .map((p) => ({ sku: p.sku, small_image: p.small_image })),
    },
  }),
  ProductDetail: (v) => resolveProducts({ filter: { url_key: { eq: String(v.urlKey) } } }),
  CmsPage: (v) => ({ cmsPage: MOCK_CMS_PAGES[String(v.identifier)] ?? null }),
  CmsBlocks: (v) => {
    const blocks: Record<string, unknown> = { "headless-footer": MOCK_FOOTER, "headless-store-locations": MOCK_STORE_LOCATIONS };
    const ids = (v.identifiers as string[] | undefined) ?? Object.keys(blocks);
    return { cmsBlocks: { items: ids.filter((id) => id in blocks).map((identifier) => ({ identifier, content: JSON.stringify(blocks[identifier]) })) } };
  },
  ContactUs: () => ({ contactUs: { status: true } }),
  HomePage: () => ({ homePage: MOCK_HOME_PAGE }),
  SubscribeNewsletter: () => ({ subscribeEmailToNewsletter: { status: "SUBSCRIBED" } }),
  ProductReviewRatings: () => ({
    productReviewRatingsMetadata: {
      items: [{ id: "MQ==", name: "Rating", values: [1, 2, 3, 4, 5].map((n) => ({ value_id: `rv-${n}`, value: String(n) })) }],
    },
  }),
  CreateProductReview: (v) => {
    const input = v.input as { nickname: string; summary: string };
    return { createProductReview: { review: { nickname: input.nickname, summary: input.summary } } };
  },
};

export async function mockResolver<TData>(
  operationName: string,
  variables: Record<string, unknown>,
  token?: string | null,
): Promise<TData> {
  const resolver = RESOLVERS[operationName];
  if (!resolver) throw new Error(`[mocks] No mock resolver for GraphQL operation "${operationName}"`);
  return (await resolver(variables, token)) as TData;
}
