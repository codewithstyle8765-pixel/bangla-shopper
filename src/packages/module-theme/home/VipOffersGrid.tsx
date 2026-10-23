import Link from "next/link";
import { SectionTitle, SectionTitleSkeleton } from "./SectionTitle";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { NextImage } from "@/packages/module-common/NextImage";
import { Container } from "@/packages/module-common/Container";

const VIP_OFFERS = [
  {
    id: "simple-offer",
    title: "Simple Skincare Deals",
    image: "/assets/images/home/simple_offer.png",
    link: "/category/sale-items",
  },
  {
    id: "skin-care-offer",
    title: "Premium Skincare Offers",
    image: "/assets/images/home/skin_care_offer.png",
    link: "/category/sale-items",
  },
  {
    id: "tresemme-offer",
    title: "TRESemmé Hair Care Special",
    image: "/assets/images/home/tresemme_offer.png",
    link: "/category/sale-items",
  },
  {
    id: "cetaphil-offer",
    title: "Cetaphil Gentle Care",
    image: "/assets/images/home/cetaphil.png",
    link: "/category/sale-items",
  },
];

export function VipOffersGrid() {
  return (
    <section aria-label="VIP Offers" className="w-full mt-[14px]">
      <Container className="w-full desk:w-[1290px] mx-auto px-(--gutter) desk:px-0">
        <SectionTitle className="mb-[11px]">DEALS FOR VIP CUSTOMER</SectionTitle>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-[15px] w-full">
          {VIP_OFFERS.map((offer) => (
            <Link
              key={offer.id}
              href={offer.link}
              className="relative aspect-square overflow-hidden group bg-white block"
            >
              <NextImage
                src={offer.image}
                alt={offer.title}
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
