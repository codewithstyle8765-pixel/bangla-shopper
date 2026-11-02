import Link from "next/link";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { NextImage } from "@/packages/module-common/NextImage";
import { Container } from "@/packages/module-common/Container";
import type { HomeTile } from "@/types/storefront";
import { SectionTitle, SectionTitleSkeleton } from "./SectionTitle";

/** "Shop by Popular Category": large square tiles, four per row on desktop. */
export function PopularCategoriesGrid({ title, tiles }: { title: string; tiles: HomeTile[] }) {
  if (tiles.length === 0) return null;
  const rows = Array.from({ length: Math.ceil(tiles.length / 4) }, (_, i) => tiles.slice(i * 4, i * 4 + 4));

  return (
    <section aria-label="Shop By Popular Category" className="w-full mt-[14px]">
      <Container className="w-full desk:w-[1290px] mx-auto px-(--gutter) desk:px-0">
        <SectionTitle className="mb-[18px]">{title}</SectionTitle>

        <div className="flex flex-col gap-3 sm:gap-[26px] w-full">
          {rows.map((row, r) => (
            <div key={r} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-[15px] w-full">
              {row.map((tile) => (
                <Link key={`${tile.href}-${tile.name}`} href={tile.href} className="relative aspect-square overflow-hidden group bg-white block">
                  <NextImage
                    src={tile.image}
                    alt={tile.name}
                    width={311}
                    sizes="(max-width: 1023px) 50vw, 311px"
                    height={311}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function PopularCategoriesSkeleton() {
  return (
    <section aria-hidden="true" className="w-full mt-[14px]">
      <Container className="w-full desk:w-[1290px] mx-auto px-(--gutter) desk:px-0">
        <SectionTitleSkeleton className="mb-[18px]" />
        <div className="flex flex-col gap-3 sm:gap-[26px]">
          {Array.from({ length: 2 }).map((_, r) => (
            <div key={r} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-[15px]">
              {Array.from({ length: 4 }).map((__, i) => (
                <div key={i} className="aspect-square">
                  <Shimmer rounded="rounded-none" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PopularCategoriesGrid;
