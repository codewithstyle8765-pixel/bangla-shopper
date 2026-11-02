import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsPageView } from "@/packages/module-theme/cms/CmsPageView";
import { cmsSummary } from "@/utils/cms-content";
import { getCmsPage, getFooterData } from "@/utils/magento/cms";

interface CmsRouteProps {
  params: Promise<{ slug: string[] }>;
}

/** Any URL no other route owns is looked up as a Magento CMS page (about-banglashoppers, terms-condition...). */
const identifierOf = (slug: string[]) => slug.map(decodeURIComponent).join("/");

/** Top-level paths other routes own; footer links to them are not CMS pages. */
const OWN_ROUTES = new Set(["api", "banglashoppers-affiliate-program", "cart", "category", "checkout", "contact", "customer", "locations", "product", "search", "wishlist"]);

/**
 * CMS pages linked from the footer are prerendered (at least one path is required with Cache Components); any other
 * CMS URL renders on its first request.
 */
export async function generateStaticParams() {
  const footer = await getFooterData();
  const slugs = (footer?.columns ?? [])
    .flatMap((column) => column.links.map((link) => link.href))
    .filter((href) => /^\/[a-z0-9-]+$/i.test(href))
    .map((href) => href.slice(1))
    .filter((slug, i, all) => !OWN_ROUTES.has(slug) && all.indexOf(slug) === i);
  return (slugs.length ? slugs : ["about-banglashoppers"]).map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({ params }: CmsRouteProps): Promise<Metadata> {
  const identifier = identifierOf((await params).slug);
  const page = await getCmsPage(identifier);
  if (!page) return { title: "Page not found | BanglaShoppers" };
  return {
    title: page.metaTitle || `${page.title} | BanglaShoppers`,
    description: page.metaDescription || cmsSummary(page.html),
    alternates: { canonical: `/${identifier}` },
  };
}

/** Looked up before anything renders, so an unknown URL answers with a real 404. */
export default async function CmsPageRoute({ params }: CmsRouteProps) {
  const identifier = identifierOf((await params).slug);
  const page = await getCmsPage(identifier);
  if (!page) notFound();
  return <CmsPageView page={page} />;
}
