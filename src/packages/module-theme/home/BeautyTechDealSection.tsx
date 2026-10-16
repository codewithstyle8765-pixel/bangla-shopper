import Link from "next/link";
import { Container } from "@/packages/module-common/Container";
import { NextImage } from "@/packages/module-common/NextImage";
import { ProductCard } from "@/packages/module-catalog/product/ProductCard";
import { SnapCarousel } from "@/packages/module-common/carousel/SnapCarousel";
import { CAROUSEL_EDGE } from "@/packages/module-common/carousel/CarouselNavButtons";
import { getCategoryProducts } from "@/utils/magento/catalog";

interface BeautyTechDealSectionProps {
  className?: string;
}

export async function BeautyTechDealSection({ className = "" }: BeautyTechDealSectionProps) {
  const products = await getCategoryProducts("beauty-tech", 8);

  return (
    <section className={`w-full mt-[9px] ${className}`}>
      <Container className="mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-3 xl:gap-12 desk:gap-[43px] w-full">
          <div className="w-full lg:w-[320px] xl:w-[383px] desk:w-[388px] max-w-[383px] desk:max-w-[388px] flex flex-col shrink-0 mt-[4px] pl-3 desk:pl-[17px]">
            <NextImage
              src="/assets/images/home/tech_deal_icon_2.png"
              alt="Beauty Tech"
              width={100}
              height={100}
              className="w-[100px] h-[100px] object-contain block"
            />
            <h2 className="font-bold text-brand-dark font-sans text-[32px] leading-[1.2] mt-[19px] ml-[1px] w-[382px] max-w-full">
              Get the Latest and Greatest Beauty Tech.
            </h2>
            <p className="font-normal text-brand-dark font-sans text-[16px] leading-[1.2] mt-[20px] w-[381px] max-w-full">
              Discover cool gadgets, product reviews, and the newest beauty tech releases, all in one place.
            </p>
            <Link
              href="/category/beauty-tech"
              className="w-[193px] h-[40px] leading-[40px] text-white text-[18px] font-semibold text-center mt-[20px] rounded-[3px] bg-brand-charcoal hover:opacity-95 transition-opacity block font-sans"
            >
              Explore Deal
            </Link>
          </div>

          <div className="w-full lg:flex-1 min-w-0 flex flex-col mt-1 lg:mt-0 xl:ml-auto">
            {/* Same cards per view as the other carousels on small screens; four PSD cards beside the copy on desktop. */}
            <SnapCarousel
              label="Beauty tech deals"
              className={`pb-1 ${CAROUSEL_EDGE}`}
              dotsClassName="mt-[13px]"
              itemClassName="w-[calc((100%-11px)/2)] sm:w-[calc((100%-22px)/3)] md:w-[calc((100%-33px)/4)] lg:w-[calc((100%-22px)/3)] xl:w-[calc((100%-33px)/4)]"
            >
              {products.map((item) => (
                <ProductCard key={item.id} {...item} layout="fluid" />
              ))}
            </SnapCarousel>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BeautyTechDealSection;
