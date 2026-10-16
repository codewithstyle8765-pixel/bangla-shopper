import { Suspense } from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { Container } from "@/packages/module-common/Container";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { CartPageView } from "@/packages/module-quote/cart/CartPageView";
import { ProductCard } from "@/packages/module-catalog/product/ProductCard";
import { ProductCarousel } from "@/packages/module-common/carousel/ProductCarousel";
import ProductGridSkeleton from "@/packages/module-theme/home/ProductGridSkeleton";
import { getCategoryProducts } from "@/utils/magento/catalog";

export const metadata: Metadata = {
  title: "Shopping Cart | BanglaShoppers",
  robots: { index: false, follow: false },
};

async function CartRecommendations() {
  const products = await getCategoryProducts("trends", 8);
  if (!products.length) return null;
  return (
    <div className="mt-10">
      <ProductCarousel title="You may also like >" viewAllLink="/category/trends">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} layout="fluid" />
        ))}
      </ProductCarousel>
    </div>
  );
}

export default function CartPage() {
  return (
    <Container className="pb-28 font-sans xl:pb-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shopping Cart" }]} structuredData={false} />
      <PageTitle>Shopping Cart</PageTitle>
      <CartPageView />
      <Suspense fallback={<ProductGridSkeleton title="You may also like >" count={6} />}>
        <CartRecommendations />
      </Suspense>
    </Container>
  );
}
