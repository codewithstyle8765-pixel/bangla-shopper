import Link from "next/link";
import { NextImage } from "@/packages/module-common/NextImage";
import { Container } from "@/packages/module-common/Container";
import { SectionTitle } from "./SectionTitle";

const BRANDS = [
  {
    id: "brand-1",
    name: "The Body Shop",
    image: "/assets/images/home/layer_607.jpg",
    link: "/category/outlet-center",
  },
  {
    id: "brand-2",
    name: "Simple Skincare",
    image: "/assets/images/home/layer_608.jpg",
    link: "/category/outlet-center",
  },
  {
    id: "brand-3",
    name: "Kodomo",
    image: "/assets/images/home/layer_609.jpg",
    link: "/category/outlet-center",
  },
];

export function PremiumBrandsRow() {
  return (
    <section aria-label="Brands you may try" className="w-full mt-[14px]">
      <Container className="w-full desk:w-[1290px] mx-auto px-(--gutter) desk:px-0">
        <SectionTitle className="mb-[10px]">
          <span className="text-brand-coral">BRAND</span> YOU MAY TRY
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-[15px] w-full">
          {BRANDS.map((brand) => (
            <Link
              key={brand.id}
              href={brand.link}
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
