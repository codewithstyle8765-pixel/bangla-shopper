import Link from "next/link";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { NextImage } from "@/packages/module-common/NextImage";
import { Container } from "@/packages/module-common/Container";
import type { HomeTile } from "@/types/storefront";
import { SectionTitle, SectionTitleSkeleton } from "./SectionTitle";

/** Built-in tiles used when the home page API returns none. */
const DEFAULT_TILES: HomeTile[] = [
  { name: "Makeup", image: "/assets/images/home/makeup_1000x1000.png", href: "/category/makeup" },
  { name: "K-Beauty", image: "/assets/images/home/k_beauty_1000x1000.png", href: "/category/k-beauty" },
  { name: "Hair Care", image: "/assets/images/home/hair_care_1000x1000.png", href: "/category/hair-care" },
  { name: "Mom & Baby", image: "/assets/images/home/mom_and_baby_1000x1000.png", href: "/category/mom-and-baby" },
  { name: "Skin Care", image: "/assets/images/home/skin_care_1000x1000.png", href: "/category/skin-care" },
  { name: "Accessories", image: "/assets/images/home/accessories_1000x1000.png", href: "/category/accessories" },
  { name: "Undergarments", image: "/assets/images/home/undergarments_1000x1000.png", href: "/category/undergarments" },
  { name: "Fragrance", image: "/assets/images/home/fragrance_1000x1000.png", href: "/category/fragrance" },
];

/** "Shop by Popular Category": large square tiles, four per row on desktop. */
export function PopularCategoriesGrid({ tiles = [] }: { tiles?: HomeTile[] }) {
  const list = tiles.length > 0 ? tiles : DEFAULT_TILES;
  const rows = Array.from({ length: Math.ceil(list.length / 4) }, (_, i) => list.slice(i * 4, i * 4 + 4));

  return (
    <section aria-label="Shop By Popular Category" className="w-full mt-[14px]">
      <Container className="w-full desk:w-[1290px] mx-auto px-(--gutter) desk:px-0">
        <SectionTitle className="mb-[18px]">SHOP BY POPULAR CATEGORY</SectionTitle>

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
