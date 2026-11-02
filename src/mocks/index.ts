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
import { findMockProductBySku } from "./catalog";
import { MOCK_FOOTER, MOCK_STORE_LOCATIONS } from "./cms";
import { MOCK_CMS_PAGES } from "./cms-pages";
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
  ProductImagesBySku: (v) => ({
    products: {
      items: (v.skus as string[])
        .map(findMockProductBySku)
        .filter((p) => p !== undefined)
        .map((p) => ({ sku: p.sku, small_image: p.small_image })),
    },
  }),
  CmsPage: (v) => ({ cmsPage: MOCK_CMS_PAGES[String(v.identifier)] ?? null }),
  Footer: () => ({
    footer: {
      newsletter_title: MOCK_FOOTER.newsletterTitle,
      newsletter_text: MOCK_FOOTER.newsletterText,
      columns: [
        {
          title: MOCK_FOOTER.contact.title,
          links: [
            { label: "Address", href: null, text: MOCK_FOOTER.contact.address, icon: "LOCATION", new_tab: false },
            { label: "Hotline", href: null, text: MOCK_FOOTER.contact.hotline, icon: "PHONE", new_tab: false },
            { label: "Email", href: null, text: MOCK_FOOTER.contact.email, icon: "EMAIL", new_tab: false },
            { label: "Open Time", href: null, text: MOCK_FOOTER.contact.hours, icon: "CLOCK", new_tab: false },
          ],
        },
        ...MOCK_FOOTER.columns.map((col) => ({
          title: col.title,
          links: col.links.map((l) => ({ label: l.label, href: l.href, text: null, icon: null, new_tab: false })),
        })),
      ],
      social: MOCK_FOOTER.social,
      apps: {
        title: "Check out our app!",
        ...MOCK_FOOTER.apps,
      },
      payment_banner: {
        image_url: "/assets/images/footer/payment-logos.webp",
        alt_text: "Accepted Payment Methods",
      },
      highlights: MOCK_FOOTER.highlights,
      copyright: MOCK_FOOTER.copyright,
      legal_links: MOCK_FOOTER.legalLinks.map((l) => ({ label: l.label, href: l.href, text: null, icon: null, new_tab: false })),
    },
  }),
  CmsBlocks: (v) => {
    const blocks: Record<string, unknown> = { "headless-footer": MOCK_FOOTER, "headless-store-locations": MOCK_STORE_LOCATIONS };
    const ids = (v.identifiers as string[] | undefined) ?? Object.keys(blocks);
    return { cmsBlocks: { items: ids.filter((id) => id in blocks).map((identifier) => ({ identifier, content: JSON.stringify(blocks[identifier]) })) } };
  },
  ContactUs: () => ({ contactUs: { status: true } }),
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
