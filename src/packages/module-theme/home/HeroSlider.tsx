"use client";

import Link from "next/link";
import clsx from "clsx";
import { Container } from "@/packages/module-common/Container";
import { NextImage } from "@/packages/module-common/NextImage";
import type { HomeBanner } from "@/types/storefront";
import { loopSlides, useLoopSlider } from "@/packages/module-common/carousel/useLoopSlider";

/** "Wide banner scrolling" hero template: autoplay, swipe and dots (pauses on hover / focus). */
export function HeroSlider({ slides }: { slides: HomeBanner[] }) {
  const count = slides.length;
  const { active, goTo, handlers, track } = useLoopSlider(count);

  if (count === 0) return null;

  /* PSD: the next section starts 89px below the dots in this template (18px after the grid one). */
  return (
    <section
      aria-label="Featured offers"
      className="-mt-[3px] sm:mt-0 lg:mt-[11px] xl:mt-[15px] mb-2 w-full md:mb-8 lg:mb-[72px]"
    >
      <Container className="mx-auto w-full px-(--gutter) desk:w-[1290px] desk:px-0">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured offers"
          {...handlers}
          className="relative aspect-[3/1] w-full touch-pan-y touch-pinch-zoom overflow-hidden bg-brand-surface select-none"
        >
          <div
            {...track}
            className="flex h-full transition-transform duration-700 ease-(--ease-panel) motion-reduce:transition-none"
          >
            {loopSlides(slides).map((slide, i) => {
              /* Copies at either end of the loop are decorative. */
              const copy = count > 1 && (i === 0 || i === count + 1);
              const index = count > 1 ? (i - 1 + count) % count : i;
              return (
                <Link
                  key={`${slide.image}-${i}`}
                  href={slide.href}
                  draggable={false}
                  aria-hidden={copy || index !== active}
                  tabIndex={!copy && index === active ? 0 : -1}
                  aria-roledescription={copy ? undefined : "slide"}
                  aria-label={`${index + 1} of ${count}${slide.alt ? `: ${slide.alt}` : ""}`}
                  className="relative block h-full w-full shrink-0"
                >
                  <NextImage
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={!copy && index === 0}
                    sizes="(max-width: 1322px) 100vw, 1290px"
                    draggable={false}
                    className="pointer-events-none object-cover"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {count > 1 && (
          <div className="mt-[13px] flex items-center justify-center gap-[15px]">
            {slides.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
                className={clsx(
                  "h-[15px] w-[15px] cursor-pointer rounded-full transition-colors duration-(--duration-panel)",
                  index === active
                    ? "bg-brand-black"
                    : "bg-text-subtle hover:bg-brand-dark",
                )}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default HeroSlider;
