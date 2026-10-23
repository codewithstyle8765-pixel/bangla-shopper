import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/config";
import { ProductDescription } from "@/packages/module-catalog/pdp/ProductDescription";
import { descriptionSummary } from "@/utils/product-description";
import { Container } from "@/packages/module-common/Container";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { ProductGallery } from "@/packages/module-catalog/pdp/ProductGallery";
import { ProductSummary } from "@/packages/module-catalog/pdp/ProductSummary";
import { ProductTabs } from "@/packages/module-catalog/pdp/ProductTabs";
import { ProductDetailSkeleton } from "@/packages/module-catalog/pdp/ProductDetailSkeleton";
import { ProductCarousel } from "@/packages/module-common/carousel/ProductCarousel";
import { ProductCard } from "@/packages/module-catalog/product/ProductCard";
import { getPrerenderProductUrlKeys, getProductDetail } from "@/utils/magento/catalog";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/* Prerendered at build time, rebuilt in the background at most once an hour. */
export const revalidate = 3600;

/** Builds the catalog's first products at build time; any other product renders on first visit, then stays cached. */
export async function generateStaticParams() {
  const urlKeys = new Set(["absolute-new-york-matte-lipstick", ...(await getPrerenderProductUrlKeys())]);
  return [...urlKeys].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductDetail(slug);
  if (!product) return { title: "Product not found | BanglaShoppers" };
  return {
    title: `${product.name} | BanglaShoppers`,
    description: `Buy ${product.name} online at the best price in Bangladesh from BanglaShoppers. 100% authentic products.`,
    alternates: { canonical: `/product/${product.urlKey}` },
    openGraph: { title: product.name, images: [product.image] },
  };
}

async function ProductDetail({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductDetail(slug);
  if (!product) notFound();

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: descriptionSummary(product.descriptionHtml) || product.name,
    image: product.gallery.filter((_, i) => !product.videos?.some((v) => v.index === i)),
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    ...(product.reviewCount
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount } }
      : {}),
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${slug}`,
      price: product.price,
      priceCurrency: "BDT",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="w-full bg-white font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container>
        <Breadcrumbs items={product.breadcrumbs} />

        <div className="flex flex-col lg:flex-row items-start justify-start gap-[13px] desk:ml-px">
          <ProductGallery className="desk:mt-[2px]" images={product.gallery} videos={product.videos} productName={product.name} discountPercent={discountPercent} />

          <ProductSummary
            name={product.name}
            sku={product.sku}
            brand={product.brand}
            origin={product.origin}
            rating={product.rating}
            ratingCount={product.ratingCount}
            reviewCount={product.reviewCount}
            price={product.price}
            originalPrice={product.originalPrice}
            inStock={product.inStock}
            liveStock={product.liveStock}
            similarHref={product.categoryHref}
            stockLeft={product.stockLeft}
            options={product.options}
            variants={product.variants}
          />
        </div>

        <div className="w-full mt-6 lg:mt-8">
          <ProductTabs
            reviewCount={product.ratingCount}
            sku={product.sku}
            productName={product.name}
            product={{
              sku: product.sku,
              name: product.name,
              image: product.image,
              price: product.price,
              originalPrice: product.originalPrice,
              inStock: product.inStock,
              chooseOption: product.options?.length ? (product.options.length > 1 ? "Options" : product.options[0].label) : undefined,
            }}
            description={<ProductDescription html={product.descriptionHtml} name={product.name} brand={product.brand} origin={product.origin} />}
          />
        </div>

        {product.related.length > 0 && (
          <div id="similar-products" className="w-full mt-[8px] desk:mt-[6px] scroll-mt-(--sticky-header)">
            <ProductCarousel title="Similar Products >" titleClassName="desk:mt-[5px]" viewAllLink={product.categoryHref ?? "/category/makeup"}>
              {product.related.map((item) => (
                <ProductCard key={item.id} {...item} layout="fluid" />
              ))}
            </ProductCarousel>
          </div>
        )}

        {product.recommended.length > 0 && (
          <div className="w-full mt-[5px] desk:mt-[8px]">
            <ProductCarousel title="We found other products you might like! >" titleClassName="desk:mt-[5px]" viewAllLink="/category/trends">
              {product.recommended.map((item) => (
                <ProductCard key={`rec-${item.id}`} {...item} layout="fluid" />
              ))}
            </ProductCarousel>
          </div>
        )}
      </Container>
    </div>
  );
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetail params={params} />
    </Suspense>
  );
}
