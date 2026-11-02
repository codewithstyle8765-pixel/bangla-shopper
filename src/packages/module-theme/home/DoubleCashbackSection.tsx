import { Container } from "@/packages/module-common/Container";
import { ProductCard } from "@/packages/module-catalog/product/ProductCard";
import { ProductCarousel } from "@/packages/module-common/carousel/ProductCarousel";
import type { ProductSummary } from "@/types/storefront";

interface DoubleCashbackSectionProps {
  title: string;
  viewAllLink: string;
  products: ProductSummary[];
  className?: string;
}

export function DoubleCashbackSection({ title, viewAllLink, products, className = "" }: DoubleCashbackSectionProps) {
  if (!products.length) return null;

  return (
    <section className={`w-full mt-[10px] ${className}`}>
      <Container className="desk:max-w-[1298px]">
        <ProductCarousel
          title={title}
          viewAllLink={viewAllLink}
          bleed={false}
        >
          {products.map((item) => (
            <ProductCard key={item.id} {...item} layout="fluid" />
          ))}
        </ProductCarousel>
      </Container>
    </section>
  );
}

export default DoubleCashbackSection;
