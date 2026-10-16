import Link from "next/link";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { NextImage } from "@/packages/module-common/NextImage";
import { Container } from "@/packages/module-common/Container";

export function PromoStripBanner() {
  return (
    <section aria-label="Special Promotion" className="w-full mt-(--gutter) lg:mt-[17px]">
      <Container className="w-full desk:w-[1289px] mx-auto px-(--gutter) desk:px-0">
        <Link
          href="/category/sale-items"
          className="block relative w-full overflow-hidden group"
        >
          <NextImage
            src="/assets/images/home/layer_600.png"
            alt="Promotion Banner"
            width={1289}
            sizes="(max-width: 1322px) 100vw, 1289px"
            height={430}
            className="w-full h-auto object-cover group-hover:scale-[1.005] transition-transform duration-300 block"
          />
        </Link>
      </Container>
    </section>
  );
}

export function PromoStripBannerSkeleton() {
  return (
    <section aria-hidden="true" className="w-full mt-(--gutter) lg:mt-[17px]">
      <Container className="w-full desk:w-[1289px] mx-auto px-(--gutter) desk:px-0">
        <div className="w-full aspect-[1289/430]">
          <Shimmer rounded="rounded-none" />
        </div>
      </Container>
    </section>
  );
}

export default PromoStripBanner;
