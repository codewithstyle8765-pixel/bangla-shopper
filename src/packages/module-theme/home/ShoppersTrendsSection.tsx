import { Container } from "@/packages/module-common/Container";
import { ProductCard } from "@/packages/module-catalog/product/ProductCard";
import { TwoRowProductCarousel } from "@/packages/module-common/carousel/TwoRowProductCarousel";
import { getCategoryProducts } from "@/utils/magento/catalog";

interface ShoppersTrendsSectionProps {
  className?: string;
}

export async function ShoppersTrendsSection({ className = "" }: ShoppersTrendsSectionProps) {
  const products = await getCategoryProducts("trends", 16);
  if (!products.length) return null;

  return (
    <section className={`w-full mt-[10px] ${className}`}>
      <Container className="desk:max-w-[1298px]">
        <TwoRowProductCarousel
          title="TRENDING NOW >"
          viewAllLink="/category/trends"
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
