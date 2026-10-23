import { Suspense, type ReactNode } from "react";
import HeroBannerGrid, { HeroBannerGridSkeleton } from "@/packages/module-theme/home/HeroBannerGrid";
import HeroSlider from "@/packages/module-theme/home/HeroSlider";
import { HeroSliderSkeleton } from "@/packages/module-theme/home/HeroSliderSkeleton";
import PromoStripBanner, { PromoStripBannerSkeleton } from "@/packages/module-theme/home/PromoStripBanner";
import VipOffersGrid, { VipOffersGridSkeleton } from "@/packages/module-theme/home/VipOffersGrid";
import ShopByCategorySection, { ShopByCategorySkeleton } from "@/packages/module-theme/home/ShopByCategorySection";
import PopularCategoriesGrid, { PopularCategoriesSkeleton } from "@/packages/module-theme/home/PopularCategoriesGrid";
import PremiumBrandsRow from "@/packages/module-theme/home/PremiumBrandsRow";
import ShopByConcernSection, { ShopByConcernSkeleton } from "@/packages/module-theme/home/ShopByConcernSection";
import ShoppersTrendsSection from "@/packages/module-theme/home/ShoppersTrendsSection";
import DoubleCashbackSection from "@/packages/module-theme/home/DoubleCashbackSection";
import BeautyTechDealSection from "@/packages/module-theme/home/BeautyTechDealSection";
import LandedJustNowSection from "@/packages/module-theme/home/LandedJustNowSection";
import SeoAboutSection from "@/packages/module-theme/home/SeoAboutSection";
import ProductGridSkeleton from "@/packages/module-theme/home/ProductGridSkeleton";
import type { HomeContent, HomeSectionId } from "@/types/storefront";

interface Section {
  render: (content: HomeContent) => ReactNode;
  /** Shown while the section loads; static sections never suspend and need none. */
  skeleton?: (content: HomeContent) => ReactNode;
}

/** Every home section the admin can place (home page API `sort_order`). */
const SECTIONS: Record<HomeSectionId, Section> = {
  hero: {
    render: (c) => (c.hero.layout === "slider" ? <HeroSlider slides={c.hero.slides} /> : <HeroBannerGrid main={c.hero.gridMain} side={c.hero.gridSide} />),
    skeleton: (c) => (c.hero.layout === "slider" ? <HeroSliderSkeleton /> : <HeroBannerGridSkeleton />),
  },
  wide_banner: { render: () => <PromoStripBanner />, skeleton: () => <PromoStripBannerSkeleton /> },
  vip_offers: { render: () => <VipOffersGrid />, skeleton: () => <VipOffersGridSkeleton /> },
  categories: {
    render: (c) =>
      c.categoryLayout === "shopByCategory" ? <ShopByCategorySection tiles={c.shopByCategory} /> : <PopularCategoriesGrid tiles={c.popularCategories} />,
    skeleton: (c) => (c.categoryLayout === "shopByCategory" ? <ShopByCategorySkeleton /> : <PopularCategoriesSkeleton />),
  },
  premium_brands: { render: () => <PremiumBrandsRow /> },
  shop_by_concern: { render: (c) => <ShopByConcernSection tiles={c.shopByConcern} />, skeleton: () => <ShopByConcernSkeleton /> },
  shoppers_trends: {
    render: () => <ShoppersTrendsSection />,
    skeleton: () => <ProductGridSkeleton title="TRENDING NOW >" count={6} className="mt-[10px]" />,
  },
  double_cashback: {
    render: () => <DoubleCashbackSection />,
    skeleton: () => <ProductGridSkeleton title="EARN DOUBLE CASHBACK >" count={6} className="mt-[10px]" />,
  },
  beauty_tech: {
    render: () => <BeautyTechDealSection />,
    skeleton: () => <ProductGridSkeleton title="Get the Latest and Greatest Beauty Tech." count={4} className="mt-[9px]" />,
  },
  landed_just_now: { render: () => <LandedJustNowSection /> },
  seo_about: { render: () => <SeoAboutSection /> },
};

/** Renders the sections the home page API lists, in its order; each loads behind its own Suspense. */
export function HomeView({ content }: { content: HomeContent }) {
  return (
    <div className="w-full flex flex-col">
      <h1 className="sr-only">BanglaShoppers — 100% Authentic Cosmetics, Skincare &amp; Beauty Products in Bangladesh</h1>
      {content.sections.map((id) => {
        const section = SECTIONS[id];
        return (
          <Suspense key={id} fallback={section.skeleton?.(content) ?? null}>
            {section.render(content)}
          </Suspense>
        );
      })}
    </div>
  );
}

export default HomeView;
