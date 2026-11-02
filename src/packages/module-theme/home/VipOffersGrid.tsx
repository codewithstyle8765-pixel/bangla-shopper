import Link from "next/link";
import { SectionTitle, SectionTitleSkeleton } from "./SectionTitle";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { NextImage } from "@/packages/module-common/NextImage";
import { Container } from "@/packages/module-common/Container";
import type { HomeTile } from "@/types/storefront";

/** VIP offer tiles from the home page API. */
export function VipOffersGrid({ title, highlight, tiles }: { title: string; highlight?: string; tiles: HomeTile[] }) {
  if (tiles.length === 0) return null;

  return (
    <section aria-label="VIP Offers" className="w-full mt-[14px]">
      <Container className="w-full desk:w-[1290px] mx-auto px-(--gutter) desk:px-0">
        <SectionTitle className="mb-[11px]">
          {highlight && <span className="text-brand-coral">{highlight}</span>} {title}
        </SectionTitle>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-[15px] w-full">
          {tiles.map((offer) => (
            <Link
              key={`${offer.href}-${offer.name}`}
              href={offer.href}
              className="relative aspect-square overflow-hidden group bg-white block"
            >
              <NextImage
                src={offer.image}
                alt={offer.name}
                width={311}
                sizes="(max-width: 1023px) 50vw, 311px"
                height={311}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function VipOffersGridSkeleton() {
  return (
    <section aria-hidden="true" className="w-full mt-[14px]">
      <Container className="w-full desk:w-[1290px] mx-auto px-(--gutter) desk:px-0">
        <SectionTitleSkeleton className="mb-[11px]" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-[15px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square">
              <Shimmer rounded="rounded-none" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default VipOffersGrid;
