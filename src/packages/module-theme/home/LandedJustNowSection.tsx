"use client";

import { useRef } from "react";
import Link from "next/link";
import { Container } from "@/packages/module-common/Container";
import { NextImage } from "@/packages/module-common/NextImage";
import { Button } from "@/packages/module-common/button/Button";
import { CutChevron } from "@/packages/module-common/icons/Shapes";
import { SnapCarousel } from "@/packages/module-common/carousel/SnapCarousel";
import { useSnapPager } from "@/packages/module-common/carousel/useSnapPager";

/** Demo banners (725×360) until the home page API provides them. */
const BANNERS = [
  {
    image: "/assets/images/home/banner_frame.png",
    alt: "New arrivals",
    href: "/category/new-arrivals",
  },
  {
    image: "/assets/images/mock/landed/upto-70.jpg",
    alt: "Makeup and skin care, up to 70% off",
    href: "/category/new-arrivals",
  },
  {
    image: "/assets/images/mock/landed/valentine-sale.jpg",
    alt: "Valentine's sale, up to 50% discount",
    href: "/category/new-arrivals",
  },
];

interface LandedJustNowSectionProps {
  className?: string;
}

export function LandedJustNowSection({
  className = "",
}: LandedJustNowSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { prev, next, canPrev, canNext } = useSnapPager(trackRef);

  return (
    <section className={`w-full mt-[13px] ${className}`}>
      <Container className="w-full desk:w-[1290px] mx-auto px-(--gutter) desk:px-0">
        <div className="w-full min-h-[432px] p-[14px_8px_15px_16px] border border-landed-border bg-gradient-to-t from-landed-from to-landed-to flex flex-col lg:flex-row items-start justify-between">
          <div className="w-full lg:w-[380px] xl:w-[467px] shrink-0 mt-[1px] lg:mr-[18px]">
            <NextImage
              src="/assets/images/home/makeup.png"
              alt="Pro Beauty Heaven"
              width={107}
              height={112}
              className="w-[107px] h-[112px] object-contain"
            />

            <div className="flex items-start justify-between mt-[9px] w-full max-w-[467px]">
              <h2 className="max-w-[429px] text-[36px] font-bold text-brand-dark leading-[1.2]">
                Landed Just Now...
                <br />
                Pro Beauty’s Heaven!
              </h2>

              {/* Arrows only on desktop; smaller screens swipe. */}
              <div className="hidden lg:flex items-center gap-2 shrink-0 mt-[37px]">
                <Button
                  type="button"
                  variant="unstyled"
                  size="icon"
                  onClick={prev}
                  disabled={!canPrev}
                  aria-label="Previous Deal"
                  className="w-[36px] h-[36px] rounded-full bg-black relative flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity cursor-pointer overflow-hidden disabled:cursor-default disabled:opacity-40"
                >
                  <CutChevron
                    direction="left"
                    className="absolute top-[5px] left-1/2 -ml-[7px] w-[13px] h-[26px] text-white pointer-events-none"
                  />
                </Button>
              </div>
            </div>

            <p className="max-w-[458px] text-[16px] text-brand-dark leading-[1.2] mt-[11px]">
              Discover just released beauty products, gadgets,
              <br />
              accessories and product reviews all in one place.
            </p>

            <Link
              href="/category/new-arrivals"
              className="w-[193px] min-h-[40px] leading-[40px] text-center text-white font-semibold text-[18px] rounded-[3px] bg-brand-charcoal hover:opacity-95 transition-opacity mt-[12px] block"
            >
              Explore Deal
            </Link>
          </div>

          <div className="w-full lg:flex-1 lg:max-w-[725px] min-w-0 flex flex-col items-center mt-[11px] lg:mr-[18px]">
            <div className="w-full max-w-[725px] overflow-hidden rounded-[10px]">
              <SnapCarousel
                trackRef={trackRef}
                label="New arrivals"
                itemClassName="w-full"
                gapClassName="gap-0"
                dotsClassName="mt-[16px]"
              >
                {BANNERS.map((banner, index) => (
                  <Link
                    key={banner.image}
                    href={banner.href}
                    draggable={false}
                    className="block"
                  >
                    <NextImage
                      src={banner.image}
                      alt={banner.alt}
                      width={725}
                      height={360}
                      sizes="(max-width: 1023px) 100vw, 725px"
                      priority={index === 0}
                      draggable={false}
                      className="pointer-events-none w-full h-auto object-cover"
                    />
                  </Link>
                ))}
              </SnapCarousel>
            </div>
          </div>

          <div className="hidden lg:flex shrink-0 items-center justify-center mt-[159px]">
            <Button
              type="button"
              variant="unstyled"
              size="icon"
              onClick={next}
              disabled={!canNext}
              aria-label="Next Deal"
              className="w-[36px] h-[36px] rounded-full bg-black relative flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer overflow-hidden disabled:cursor-default disabled:opacity-40"
            >
              <CutChevron
                direction="right"
                className="absolute top-[5px] left-1/2 -ml-[6px] w-[13px] h-[26px] text-white pointer-events-none"
              />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default LandedJustNowSection;
