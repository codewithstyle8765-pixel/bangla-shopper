import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { Container } from "@/packages/module-common/Container";
import { ProductListingView } from "@/packages/module-catalog/plp/ProductListingView";
import { ProductListingSkeleton } from "@/packages/module-catalog/plp/ProductListingSkeleton";
import { getCategoryByPath, getProductListing, parseListingSearchParams } from "@/utils/magento/catalog";
import type { SearchParamsRecord } from "@/utils/url";
import { stripTags } from "@/utils/product-description";

interface CategoryPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<SearchParamsRecord>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  /* Only the category: the page itself loads the products. */
  const category = await getCategoryByPath(path);
  if (!category) return { title: "Category not found | BanglaShoppers" };
  return {
    title: `${category.name} | Buy Online in Bangladesh | BanglaShoppers`,
    description: stripTags(category.description ?? "").slice(0, 300) || undefined,
    alternates: { canonical: `/category/${path}` },
  };
}

async function CategoryListing({ params, searchParams }: CategoryPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const category = slug.join("/");
  const listingParams = parseListingSearchParams(query, { category });
  const listing = await getProductListing(listingParams);
  if (!listing) notFound();

  return (
    <Container className="font-sans">
      <Breadcrumbs items={listing.breadcrumbs} />
      <ProductListingView
        listing={listing}
        pathname={`/category/${category}`}
        searchParams={query}
        active={listingParams.filters}
        sort={listingParams.sort}
        pageSize={listingParams.pageSize}
        titleAtEnd
      />
    </Container>
  );
}

export default function CategoryPage(props: CategoryPageProps) {
  return (
    <Suspense fallback={<ProductListingSkeleton titleAtEnd />}>
      <CategoryListing {...props} />
    </Suspense>
  );
}
