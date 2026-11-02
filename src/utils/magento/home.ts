import {
  HomePageDocument,
  type HomeBannerFieldsFragment,
  type HomePageQuery,
  type HomePageQueryVariables,
  type HomeTileFieldsFragment,
} from "@/graphql/home/queries/__generated__/HomePage.generated";
import { SiteBannersDocument, type SiteBannersQuery, type SiteBannersQueryVariables } from "@/graphql/home/queries/__generated__/SiteBanners.generated";
import { graphqlRequestCached } from "@/lib/cached-graphql";
import { HomeSectionId, HomeSectionLayout } from "@/types/graphql-types";
import type { HomeBanner, HomeContent, HomeSection, HomeTile } from "@/types/storefront";
import type { AnnouncementBarData, AnnouncementSide } from "@/packages/module-theme/layout/header/announcements.types";
import type { PromoBannerData, PromoBannerPerkIcon } from "@/packages/module-theme/banner/promoBanner.types";
import { getPageCacheConfig } from "@/utils/hooks/useCache";
import { mapProductCard, withCountryNames } from "@/utils/magento/catalog";

type ApiSection = NonNullable<NonNullable<HomePageQuery["homePage"]>["sections"][number]>;
type Config = NonNullable<ApiSection["configurations"]>;
type ConfigOf<T extends Config["__typename"]> = Extract<Config, { __typename?: T }>;

const isSet = <T>(item: T | null | undefined): item is T => item != null;

const banners = (list: (HomeBannerFieldsFragment | null)[]): HomeBanner[] =>
  list
    .filter(isSet)
    .filter((b) => b.image && b.link)
    .map((b) => ({ image: b.image, mobileImage: b.mobile_image ?? undefined, alt: b.alt, href: b.link }));

const tiles = (list: (HomeTileFieldsFragment | null)[]): HomeTile[] =>
  list
    .filter(isSet)
    .filter((t) => t.name && t.image && t.link)
    .map((t) => ({ name: t.name, image: t.image, href: t.link }));

const is = <T extends Config["__typename"]>(config: Config | null | undefined, type: T): config is ConfigOf<T> => config?.__typename === type;

/** One API section → what its component renders; null when it has no content. */
function toSection({ id, configurations: c }: ApiSection): HomeSection | null {
  switch (id) {
    case HomeSectionId.Hero: {
      if (!is(c, "HomeHero")) return null;
      const hero = { slides: banners(c.slides), gridMain: banners(c.grid_main), gridSide: banners(c.grid_side) };
      if (c.layout === HomeSectionLayout.Slider) return hero.slides.length ? { id: "hero", layout: "slider", ...hero } : null;
      return hero.gridMain.length ? { id: "hero", layout: "grid", ...hero } : null;
    }
    case HomeSectionId.WideBanner: {
      if (!is(c, "HomeBanner")) return null;
      const [banner] = banners([c]);
      return banner ? { id: "wide_banner", banner } : null;
    }
    case HomeSectionId.Categories: {
      if (!is(c, "HomeCategories")) return null;
      const byCategory = c.layout === HomeSectionLayout.ShopByCategory;
      const list = tiles(byCategory ? c.shop_by_category : c.popular);
      return list.length ? { id: "categories", layout: byCategory ? "shopByCategory" : "popularCategory", title: c.title, tiles: list } : null;
    }
    case HomeSectionId.VipOffers:
    case HomeSectionId.PremiumBrands:
    case HomeSectionId.ShopByConcern: {
      if (!is(c, "HomeTileSection")) return null;
      const list = tiles(c.tiles);
      const key = id === HomeSectionId.VipOffers ? "vip_offers" : id === HomeSectionId.PremiumBrands ? "premium_brands" : "shop_by_concern";
      return list.length ? { id: key, title: c.title, highlight: c.title_highlight ?? undefined, tiles: list } : null;
    }
    case HomeSectionId.ShoppersTrends:
    case HomeSectionId.DoubleCashback: {
      if (!is(c, "HomeProductSection")) return null;
      const products = c.products.filter(isSet).map(mapProductCard);
      const key = id === HomeSectionId.ShoppersTrends ? "shoppers_trends" : "double_cashback";
      return products.length ? { id: key, title: c.title, viewAllLink: c.view_all_link, products } : null;
    }
    case HomeSectionId.BeautyTech: {
      if (!is(c, "HomeBeautyTech")) return null;
      const products = c.products.filter(isSet).map(mapProductCard);
      return products.length
        ? {
            id: "beauty_tech",
            title: c.title,
            description: c.description,
            icon: c.icon,
            buttonLabel: c.button_label,
            buttonLink: c.button_link,
            products,
          }
        : null;
    }
    case HomeSectionId.LandedJustNow: {
      if (!is(c, "HomeLandedJustNow")) return null;
      const list = banners(c.banners);
      return list.length
        ? {
            id: "landed_just_now",
            eyebrow: c.eyebrow,
            title: c.title,
            description: c.description,
            icon: c.icon,
            buttonLabel: c.view_all_label,
            buttonLink: c.view_all_link,
            banners: list,
          }
        : null;
    }
    case HomeSectionId.SeoAbout:
      return is(c, "HomeSeoAbout") && c.content_html ? { id: "seo_about", title: c.title, html: c.content_html } : null;
    default:
      return null;
  }
}

/** Enabled sections in admin order; nothing when the API fails. */
export async function getHomePage(): Promise<HomeContent> {
  try {
    const { homePage } = await graphqlRequestCached<HomePageQuery, HomePageQueryVariables>(HomePageDocument, {}, getPageCacheConfig("home"));
    const sections = (homePage?.sections ?? [])
      .filter(isSet)
      .filter((s) => s.enabled)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(toSection)
      .filter(isSet);
    /* Product rows: origin code ("CN") → country name. */
    return {
      sections: await Promise.all(sections.map(async (s) => ("products" in s ? { ...s, products: await withCountryNames(s.products) } : s))),
    };
  } catch (error) {
    console.error("[magento] home page failed", error);
    return { sections: [] };
  }
}

const side = (item: { icon?: string | null; text: string; link?: string | null } | null | undefined): AnnouncementSide | undefined =>
  item?.text ? { icon: item.icon ?? undefined, text: item.text, link: item.link ?? undefined } : undefined;

const PERK_ICONS: PromoBannerPerkIcon[] = ["authentic", "offers", "rewards"];
const isPerkIcon = (icon: string): icon is PromoBannerPerkIcon => (PERK_ICONS as string[]).includes(icon);

type ApiPopup = NonNullable<NonNullable<SiteBannersQuery["homePage"]>["promo_popup"]>;

const popup = (p: ApiPopup): PromoBannerData => ({
  isEnabled: p.enabled,
  id: p.id,
  imageUrl: p.image,
  mobileImageUrl: p.mobile_image ?? undefined,
  altText: p.alt,
  targetUrl: p.link,
  sessionDismissLabel: p.dismiss_label ?? undefined,
  showNewsletter: p.show_newsletter,
  heading: p.heading ?? undefined,
  headingHighlight: p.heading_highlight ?? undefined,
  subheading: p.subheading ?? undefined,
  perks: p.perks.filter(isSet).flatMap((perk) => {
    const icon = perk.icon.toLowerCase();
    return isPerkIcon(icon) ? [{ icon, label: perk.label }] : [];
  }),
  buttonLabel: p.button_label ?? undefined,
  privacyNote: p.privacy_note ?? undefined,
});

/** Announcement bar and promo popup for every page; null parts are hidden. */
export async function getSiteBanners(): Promise<{ announcements: AnnouncementBarData | null; promo: PromoBannerData | null }> {
  try {
    const { homePage } = await graphqlRequestCached<SiteBannersQuery, SiteBannersQueryVariables>(SiteBannersDocument, {}, getPageCacheConfig("home"));
    const bar = homePage?.announcement_bar;
    const messages = (bar?.messages ?? [])
      .filter(isSet)
      .filter((m) => m.text)
      .map((m, i) => ({ id: `announcement-${i}`, text: m.text, link: m.link ?? undefined }));
    const promo = homePage?.promo_popup;
    return {
      announcements: bar ? { left: side(bar.left), messages, right: side(bar.right) } : null,
      promo: promo?.enabled && promo.image ? popup(promo) : null,
    };
  } catch (error) {
    console.error("[magento] site banners failed", error);
    return { announcements: null, promo: null };
  }
}
