import { Container } from "@/packages/module-common/Container";
import { ProductCard } from "@/packages/module-catalog/product/ProductCard";
import { ProductCarousel } from "@/packages/module-common/carousel/ProductCarousel";
import { getCategoryProducts } from "@/utils/magento/catalog";

interface DoubleCashbackSectionProps {
  className?: string;
}

export async function DoubleCashbackSection({ className = "" }: DoubleCashbackSectionProps) {
  const products = await getCategoryProducts("cashback", 8);
  if (!products.length) return null;

  return (
    <section className={`w-full mt-[10px] ${className}`}>
      <Container className="desk:max-w-[1298px]">
        <ProductCarousel
          title="EARN DOUBLE CASHBACK ON THESE SELECTED PRODUCTS >"
          viewAllLink="/category/cashback"
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
