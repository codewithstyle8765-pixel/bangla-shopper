import Link from "next/link";
import { NextImage } from "@/packages/module-common/NextImage";
import { Container } from "@/packages/module-common/Container";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { HeroMainSlides } from "@/packages/module-theme/home/HeroMainSlides";
import type { HomeBanner } from "@/types/storefront";

/** "4 banners" hero template: main banner (rotating when there are several) + three side banners. */
export function HeroBannerGrid({ main, side }: { main: HomeBanner[]; side: HomeBanner[] }) {
  if (main.length === 0) return null;
  const sideBanners = side.slice(0, 3);

  return (
    <section aria-label="Hero Banners" className="w-full lg:mt-[11px] xl:mt-[15px]">
      <Container className="w-full desk:w-[1290px] mx-auto px-(--gutter) desk:px-0">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-(--gutter) lg:gap-[10px] w-full">
          <div className="order-1 lg:order-2 flex-1 min-w-0 w-full xl:w-[980px] xl:h-[530px] aspect-[980/530] overflow-hidden relative bg-brand-surface">
            <HeroMainSlides banners={main} />
          </div>

          <div className="order-2 lg:order-1 grid grid-cols-3 gap-(--gutter) lg:flex lg:flex-col lg:justify-between lg:gap-0 lg:w-[23.6%] xl:w-[300px] lg:shrink-0 w-full">
            {sideBanners.map((banner, index) => (
              <Link
                key={`${banner.image}-${index}`}
                href={banner.href}
                className="relative overflow-hidden group w-full aspect-[300/170] xl:w-[300px] xl:h-[170px] bg-brand-surface block"
              >
                <NextImage
                  src={banner.image}
                  alt={banner.alt}
                  width={300}
                  sizes="(max-width: 1023px) 33vw, 300px"
                  height={170}
                  priority
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function HeroBannerGridSkeleton() {
  return (
    <section aria-hidden="true" className="w-full lg:mt-[11px] xl:mt-[15px]">
      <Container className="w-full desk:w-[1290px] mx-auto px-(--gutter) desk:px-0">
        <div className="flex flex-col lg:flex-row gap-(--gutter) lg:gap-[10px]">
          <div className="order-1 lg:order-2 flex-1 min-w-0 aspect-[980/530] xl:w-[980px] xl:h-[530px]">
            <Shimmer rounded="rounded-none" />
          </div>
          <div className="order-2 lg:order-1 grid grid-cols-3 gap-(--gutter) lg:flex lg:flex-col lg:justify-between lg:gap-0 lg:w-[23.6%] xl:w-[300px] lg:shrink-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[300/170] xl:w-[300px] xl:h-[170px]">
                <Shimmer rounded="rounded-none" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroBannerGrid;
