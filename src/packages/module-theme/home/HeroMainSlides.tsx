"use client";

import Link from "next/link";
import { NextImage } from "@/packages/module-common/NextImage";
import type { HomeBanner } from "@/types/storefront";
import { loopSlides, useLoopSlider } from "@/packages/module-common/carousel/useLoopSlider";

/** Large banner of the grid hero: rotates automatically (and by swipe) when the admin sets several; no arrows or dots. */
export function HeroMainSlides({ banners }: { banners: HomeBanner[] }) {
  const count = banners.length;
  const { active, handlers, track } = useLoopSlider(count);

  return (
    <div
      {...(count > 1 && {
        role: "region",
        "aria-roledescription": "carousel",
        "aria-label": "Featured offers",
      })}
      {...handlers}
      className="h-full w-full touch-pan-y touch-pinch-zoom overflow-hidden select-none"
    >
      <div
        {...track}
        className="flex h-full transition-transform duration-700 ease-(--ease-panel) motion-reduce:transition-none"
      >
        {loopSlides(banners).map((banner, i) => {
          /* Copies at either end of the loop are decorative. */
          const copy = count > 1 && (i === 0 || i === count + 1);
          const index = count > 1 ? (i - 1 + count) % count : i;
          return (
            <Link
              key={`${banner.image}-${i}`}
              href={banner.href}
              draggable={false}
              aria-hidden={copy || (count > 1 && index !== active)}
              tabIndex={!copy && index === active ? 0 : -1}
              {...(count > 1 && !copy && { "aria-roledescription": "slide" })}
              className="group relative block h-full w-full shrink-0 overflow-hidden"
            >
              <NextImage
                src={banner.image}
                alt={banner.alt}
                width={970}
                height={530}
                sizes="(max-width: 1023px) 100vw, 970px"
                priority={!copy && index === 0}
                draggable={false}
                className="pointer-events-none h-full w-full object-cover transition-transform duration-300 group-hover:scale-101"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HeroMainSlides;
