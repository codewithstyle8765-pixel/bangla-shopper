import HeroBannerGrid from "@/packages/module-theme/home/HeroBannerGrid";
import HeroSlider from "@/packages/module-theme/home/HeroSlider";
import PromoStripBanner from "@/packages/module-theme/home/PromoStripBanner";
import VipOffersGrid from "@/packages/module-theme/home/VipOffersGrid";
import ShopByCategorySection from "@/packages/module-theme/home/ShopByCategorySection";
import PopularCategoriesGrid from "@/packages/module-theme/home/PopularCategoriesGrid";
import PremiumBrandsRow from "@/packages/module-theme/home/PremiumBrandsRow";
import ShopByConcernSection from "@/packages/module-theme/home/ShopByConcernSection";
import ShoppersTrendsSection from "@/packages/module-theme/home/ShoppersTrendsSection";
import DoubleCashbackSection from "@/packages/module-theme/home/DoubleCashbackSection";
import BeautyTechDealSection from "@/packages/module-theme/home/BeautyTechDealSection";
import LandedJustNowSection from "@/packages/module-theme/home/LandedJustNowSection";
import SeoAboutSection from "@/packages/module-theme/home/SeoAboutSection";
import type { HomeContent, HomeSection } from "@/types/storefront";

/** One section from the home page API. */
function Section({ section: s }: { section: HomeSection }) {
  switch (s.id) {
    case "hero":
      return s.layout === "slider" ? <HeroSlider slides={s.slides} /> : <HeroBannerGrid main={s.gridMain} side={s.gridSide} />;
    case "wide_banner":
      return <PromoStripBanner banner={s.banner} />;
    case "vip_offers":
      return <VipOffersGrid title={s.title} highlight={s.highlight} tiles={s.tiles} />;
    case "categories":
      return s.layout === "shopByCategory" ? (
        <ShopByCategorySection title={s.title} tiles={s.tiles} />
      ) : (
        <PopularCategoriesGrid title={s.title} tiles={s.tiles} />
      );
    case "premium_brands":
      return <PremiumBrandsRow title={s.title} highlight={s.highlight} tiles={s.tiles} />;
    case "shop_by_concern":
      return <ShopByConcernSection title={s.title} highlight={s.highlight} tiles={s.tiles} />;
    case "shoppers_trends":
      return <ShoppersTrendsSection title={s.title} viewAllLink={s.viewAllLink} products={s.products} />;
    case "double_cashback":
      return <DoubleCashbackSection title={s.title} viewAllLink={s.viewAllLink} products={s.products} />;
    case "beauty_tech":
      return (
        <BeautyTechDealSection
          title={s.title}
          description={s.description}
          icon={s.icon}
          buttonLabel={s.buttonLabel}
          buttonLink={s.buttonLink}
          products={s.products}
        />
      );
    case "landed_just_now":
      return (
        <LandedJustNowSection
          eyebrow={s.eyebrow}
          title={s.title}
          description={s.description}
          icon={s.icon}
          buttonLabel={s.buttonLabel}
          buttonLink={s.buttonLink}
          banners={s.banners}
        />
      );
    case "seo_about":
      return <SeoAboutSection title={s.title} html={s.html} />;
  }
}

/** Renders the sections the home page API lists, in its order. */
export function HomeView({ content }: { content: HomeContent }) {
  return (
    <div className="w-full flex flex-col">
      <h1 className="sr-only">BanglaShoppers — 100% Authentic Cosmetics, Skincare &amp; Beauty Products in Bangladesh</h1>
      {content.sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </div>
  );
}

export default HomeView;
