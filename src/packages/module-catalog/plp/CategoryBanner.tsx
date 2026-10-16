import Link from "next/link";
import { NextImage } from "@/packages/module-common/NextImage";
import { SnapCarousel } from "@/packages/module-common/carousel/SnapCarousel";
import type { CategoryBanner as Banner } from "@/types/storefront";

/** Client banners are 990×331; the slot keeps that ratio so the page never jumps while it loads. */
const RATIO = "aspect-[990/331]";
const SIZES = "(max-width: 1023px) 100vw, (max-width: 1321px) 75vw, 1070px";

function Slide({ banner, priority }: { banner: Banner; priority: boolean }) {
  const image = (
    <NextImage
      src={banner.image}
      alt={banner.alt}
      width={990}
      height={331}
      sizes={SIZES}
      priority={priority}
      className="h-full w-full object-cover"
    />
  );
  return banner.href ? (
    <Link href={banner.href} className={`block ${RATIO} overflow-hidden bg-brand-surface`}>
      {image}
    </Link>
  ) : (
    <div className={`${RATIO} overflow-hidden bg-brand-surface`}>{image}</div>
  );
}

/** Category banner(s) above the products: one image, or a swipeable slider when the CMS block has several. */
export function CategoryBanner({ banners, title }: { banners: Banner[]; title: string }) {
  if (!banners.length) return null;
  return (
    <div className="mb-4 lg:mb-5">
      {banners.length === 1 ? (
        <Slide banner={banners[0]} priority />
      ) : (
        <SnapCarousel label={`${title} banners`} itemClassName="w-full" gapClassName="gap-0" dotsClassName="mt-2.5">
          {banners.map((banner, i) => (
            <Slide key={`${banner.image}-${i}`} banner={banner} priority={i === 0} />
          ))}
        </SnapCarousel>
      )}
    </div>
  );
}

export default CategoryBanner;
