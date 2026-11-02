import { Container } from "@/packages/module-common/Container";
import { ProductCard } from "@/packages/module-catalog/product/ProductCard";
import { TwoRowProductCarousel } from "@/packages/module-common/carousel/TwoRowProductCarousel";
import type { ProductSummary } from "@/types/storefront";

interface ShoppersTrendsSectionProps {
  title: string;
  viewAllLink: string;
  products: ProductSummary[];
  className?: string;
}

export function ShoppersTrendsSection({ title, viewAllLink, products, className = "" }: ShoppersTrendsSectionProps) {
  if (!products.length) return null;

  return (
    <section className={`w-full mt-[10px] ${className}`}>
      <Container className="desk:max-w-[1298px]">
        <TwoRowProductCarousel
          title={title}
          viewAllLink={viewAllLink}
        >
          {products.map((item) => (
            <ProductCard key={item.id} {...item} layout="fluid" />
          ))}
        </TwoRowProductCarousel>
      </Container>
    </section>
  );
}

export default ShoppersTrendsSection;
