import { CMS_BLOCKS_QUERY, CMS_PAGE_QUERY, FOOTER_BLOCK_ID, STORE_LOCATIONS_BLOCK_ID } from "@/graphql/cms";
import { getPageCacheConfig } from "@/utils/hooks/useCache";
import type { CmsPage, FooterData, StoreLocation } from "@/types/storefront";
import { normalizeCmsHtml } from "@/utils/cms-content";
import { graphqlRequestCached } from "@/lib/cached-graphql";

export async function getFooterData(): Promise<FooterData | null> {
  try {
    const data = await graphqlRequestCached<{ cmsBlocks: { items: Array<{ identifier: string; content: string }> } }>(
      CMS_BLOCKS_QUERY,
      { identifiers: [FOOTER_BLOCK_ID] },
      getPageCacheConfig("static"),
    );
    const block = data.cmsBlocks.items.find((b) => b.identifier === FOOTER_BLOCK_ID);
    return block ? (JSON.parse(block.content) as FooterData) : null;
  } catch (error) {
    console.error("[magento] footer block failed", error);
    return null;
  }
}


interface MagentoCmsPage {
  identifier: string;
  title: string;
  content_heading?: string | null;
  content: string;
  meta_title?: string | null;
  meta_description?: string | null;
}

/** A CMS page by its URL key; null when Magento has no such (enabled) page. */
export async function getCmsPage(identifier: string): Promise<CmsPage | null> {
  try {
    const data = await graphqlRequestCached<{ cmsPage: MagentoCmsPage | null }>(CMS_PAGE_QUERY, { identifier }, getPageCacheConfig("static"));
    const page = data.cmsPage;
    if (!page) return null;
    return {
      identifier: page.identifier,
      title: page.content_heading || page.title,
      html: normalizeCmsHtml(page.content ?? ""),
      metaTitle: page.meta_title || undefined,
      metaDescription: page.meta_description || undefined,
    };
  } catch (error) {
    if (!/doesn't exist|not found/i.test(String(error))) console.error(`[magento] cms page "${identifier}" failed`, error);
    return null;
  }
}

/** Showrooms for the Store Locations page; [] when the block is missing or not valid JSON. */
export async function getStoreLocations(): Promise<StoreLocation[]> {
  try {
    const data = await graphqlRequestCached<{ cmsBlocks: { items: Array<{ identifier: string; content: string }> } }>(
      CMS_BLOCKS_QUERY,
      { identifiers: [STORE_LOCATIONS_BLOCK_ID] },
      getPageCacheConfig("static"),
    );
    const block = data.cmsBlocks.items.find((b) => b.identifier === STORE_LOCATIONS_BLOCK_ID);
    const stores = block ? (JSON.parse(block.content) as unknown) : [];
    return Array.isArray(stores) ? (stores as StoreLocation[]) : [];
  } catch (error) {
    console.error("[magento] store locations block failed", error);
    return [];
  }
}
