import { HOME_PAGE_QUERY } from "@/graphql/home";
import { graphqlRequestCached } from "@/lib/cached-graphql";
import type { MagentoHomeBanner, MagentoHomePage, MagentoHomeTile } from "@/types/magento";
import type { HomeBanner, HomeContent, HomeSectionId, HomeTile } from "@/types/storefront";
import { getPageCacheConfig } from "@/utils/hooks/useCache";

/** PSD order; used when the API sends no `sort_order`. */
export const DEFAULT_SECTIONS: HomeSectionId[] = [
  "hero",
  "wide_banner",
  "vip_offers",
  "categories",
  "premium_brands",
  "shop_by_concern",
  "shoppers_trends",
  "double_cashback",
  "beauty_tech",
  "landed_just_now",
  "seo_about",
];

const isSection = (id: string): id is HomeSectionId => (DEFAULT_SECTIONS as string[]).includes(id);

/** Known sections in `sort_order` order, each once; falls back to the PSD order. */
function sectionOrder(list: MagentoHomePage["sort_order"] | null | undefined): HomeSectionId[] {
  const ids = [...(list ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => item.section_id)
    .filter(isSection);
  const unique = [...new Set(ids)];
  return unique.length > 0 ? unique : DEFAULT_SECTIONS;
}

/** Used when the home page API fails: the grid template with its built-in images, no tile sections. */
const FALLBACK: HomeContent = {
  sections: DEFAULT_SECTIONS,
  hero: { layout: "grid", slides: [], gridMain: [], gridSide: [] },
  categoryLayout: "popularCategory",
  shopByCategory: [],
  popularCategories: [],
  shopByConcern: [],
};

const tile = (t: MagentoHomeTile): HomeTile => ({ name: t.name, image: t.image, href: t.link });

const tiles = (list: MagentoHomeTile[] | null | undefined): HomeTile[] =>
  (list ?? []).filter((t) => t.name && t.image && t.link).map(tile);

const banner = (b: MagentoHomeBanner): HomeBanner => ({
  image: b.image,
  mobileImage: b.mobile_image ?? undefined,
  alt: b.alt ?? "",
  href: b.link,
});

const banners = (list: MagentoHomeBanner[] | null | undefined) => (list ?? []).filter((b) => b.image && b.link).map(banner);


export async function getHomePage(): Promise<HomeContent> {
  try {
    const { homePage } = await graphqlRequestCached<{ homePage: MagentoHomePage | null }>(HOME_PAGE_QUERY, {}, getPageCacheConfig("home"));
    if (!homePage) return FALLBACK;
    const slides = banners(homePage.hero_slides);
    const shopByCategory = tiles(homePage.shop_by_category);
    return {
      sections: sectionOrder(homePage.sort_order),
      hero: {
        layout: homePage.hero_layout === "SLIDER" && slides.length > 0 ? "slider" : "grid",
        slides,
        gridMain: banners(homePage.hero_grid_main_banners),
        gridSide: banners(homePage.hero_grid_side_banners),
      },
      categoryLayout: homePage.category_layout === "SHOP_BY_CATEGORY" && shopByCategory.length > 0 ? "shopByCategory" : "popularCategory",
      shopByCategory,
      popularCategories: tiles(homePage.popular_categories),
      shopByConcern: tiles(homePage.shop_by_concern),
    };
  } catch (error) {
    console.error("[magento] home page failed", error);
    return FALLBACK;
  }
}
