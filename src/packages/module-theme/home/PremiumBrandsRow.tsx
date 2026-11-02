import Link from "next/link";
import { NextImage } from "@/packages/module-common/NextImage";
import { Container } from "@/packages/module-common/Container";
import type { HomeTile } from "@/types/storefront";
import { SectionTitle } from "./SectionTitle";

/** Brand tiles from the home page API. */
export function PremiumBrandsRow({ title, highlight, tiles }: { title: string; highlight?: string; tiles: HomeTile[] }) {
  if (tiles.length === 0) return null;

  return (
    <section aria-label="Brands you may try" className="w-full mt-[14px]">
      <Container className="w-full desk:w-[1290px] mx-auto px-(--gutter) desk:px-0">
        <SectionTitle className="mb-[10px]">
          {highlight && <span className="text-brand-coral">{highlight}</span>} {title}
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-[15px] w-full">
          {tiles.map((brand) => (
            <Link
              key={`${brand.href}-${brand.name}`}
              href={brand.href}
              className="relative overflow-hidden group bg-white block"
            >
              <NextImage
                src={brand.image}
                alt={brand.name}
                width={420}
                sizes="(max-width: 639px) 100vw, 420px"
                height={160}
                className="w-full h-auto sm:h-[160px] object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PremiumBrandsRow;
