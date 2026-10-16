import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsPageView } from "@/packages/module-theme/cms/CmsPageView";
import { cmsSummary } from "@/utils/cms-content";
import { getCmsPage } from "@/utils/magento/cms";

interface CmsRouteProps {
  params: Promise<{ slug: string[] }>;
}

/* Admin edits show within an hour, or at once through the `cms` revalidate webhook. */
export const revalidate = 3600;

/** Any URL no other route owns is looked up as a Magento CMS page (about-banglashoppers, terms-condition...). */
const identifierOf = (slug: string[]) => slug.map(decodeURIComponent).join("/");

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
