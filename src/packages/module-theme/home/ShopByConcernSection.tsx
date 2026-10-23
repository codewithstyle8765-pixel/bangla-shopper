import Link from "next/link";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { Container } from "@/packages/module-common/Container";
import { NextImage } from "@/packages/module-common/NextImage";
import type { HomeTile } from "@/types/storefront";
import { SectionTitle, SectionTitleSkeleton } from "./SectionTitle";

/** Concern banners from the home page API (`shop_by_concern`); each image carries its own artwork. */
export function ShopByConcernSection({ tiles }: { tiles: HomeTile[] }) {
  if (tiles.length === 0) return null;

  return (
    <section aria-label="Shop by concern" className="mt-[16px] w-full">
      <Container className="mx-auto w-full px-(--gutter) desk:w-[1290px] desk:px-0">
        <SectionTitle className="mb-[16px]">SHOP BY CONCERN</SectionTitle>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 lg:gap-x-[9px] lg:gap-y-[11px]">
          {tiles.map((tile) => (
            <li key={`${tile.href}-${tile.name}`} className="min-w-0">
              <Link href={tile.href} className="group block aspect-[251/296] overflow-hidden rounded-[14px] bg-brand-surface">
                <NextImage
                  src={tile.image}
                  alt={tile.name}
                  width={256}
                  height={296}
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 256px"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ShopByConcernSkeleton() {
  return (
    <section aria-hidden="true" className="mt-[16px] w-full">
      <Container className="mx-auto w-full px-(--gutter) desk:w-[1290px] desk:px-0">
        <SectionTitleSkeleton className="mb-[16px]" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 lg:gap-x-[9px] lg:gap-y-[11px]">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[251/296]">
              <Shimmer rounded="rounded-[14px]" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ShopByConcernSection;
