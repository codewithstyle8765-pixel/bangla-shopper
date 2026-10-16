import Link from "next/link";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { Container } from "@/packages/module-common/Container";
import { NextImage } from "@/packages/module-common/NextImage";
import type { HomeTile } from "@/types/storefront";
import { SectionTitle, SectionTitleSkeleton } from "./SectionTitle";

/** Category tiles from the home page API (`shop_by_category`). */
export function ShopByCategorySection({ tiles }: { tiles: HomeTile[] }) {
  if (tiles.length === 0) return null;

  return (
    <section aria-label="Shop by category" className="mt-[30px] mb-[10px] w-full">
      <Container className="mx-auto w-full px-(--gutter) desk:w-[1290px] desk:px-0">
        <SectionTitle className="mb-[22px]">SHOP BY CATEGORY</SectionTitle>
        <ul className="grid grid-cols-4 gap-x-2 gap-y-6 sm:gap-x-3 md:grid-cols-6 xl:grid-cols-8 xl:gap-x-[13px] xl:gap-y-[36px]">
          {tiles.map((tile) => (
            <li key={`${tile.href}-${tile.name}`} className="min-w-0">
              <Link href={tile.href} className="group flex h-full flex-col items-center">
                <span className="block aspect-square w-full overflow-hidden">
                  <NextImage
                    src={tile.image}
                    alt=""
                    width={150}
                    height={150}
                    sizes="(max-width: 767px) 25vw, (max-width: 1279px) 16vw, 150px"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="mt-2.5 line-clamp-2 text-center text-[12px] leading-[1.25] text-brand-dark transition-colors group-hover:text-brand-coral sm:text-[13px] xl:text-[14px]">
                  {tile.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ShopByCategorySkeleton() {
  return (
    <section aria-hidden="true" className="mt-[30px] mb-[10px] w-full">
      <Container className="mx-auto w-full px-(--gutter) desk:w-[1290px] desk:px-0">
        <SectionTitleSkeleton className="mb-[22px]" />
        <div className="grid grid-cols-4 gap-x-2 gap-y-6 sm:gap-x-3 md:grid-cols-6 xl:grid-cols-8 xl:gap-x-[13px] xl:gap-y-[36px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="aspect-square w-full">
                <Shimmer rounded="rounded-full" />
              </div>
              <Shimmer width="70%" height={12} rounded="rounded" className="mt-2.5" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ShopByCategorySection;
