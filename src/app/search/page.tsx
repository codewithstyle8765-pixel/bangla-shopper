import { Suspense } from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { Container } from "@/packages/module-common/Container";
import { ProductListingView } from "@/packages/module-catalog/plp/ProductListingView";
import { ProductListingSkeleton } from "@/packages/module-catalog/plp/ProductListingSkeleton";
import { getProductListing, parseListingSearchParams } from "@/utils/magento/catalog";
import type { SearchParamsRecord } from "@/utils/url";

interface SearchPageProps {
  searchParams: Promise<SearchParamsRecord>;
}

export const metadata: Metadata = {
  title: "Search | BanglaShoppers",
  robots: { index: false, follow: true },
};

async function SearchResults({ searchParams }: SearchPageProps) {
  const query = await searchParams;
  const q = typeof query.q === "string" ? query.q.trim() : "";
  const listingParams = parseListingSearchParams(query, { search: q });
  const listing = await getProductListing(listingParams);
  if (!listing) return null;

  return (
    <Container className="font-sans">
      <Breadcrumbs items={listing.breadcrumbs} structuredData={false} />
      <ProductListingView
        listing={listing}
        pathname="/search"
        searchParams={query}
        active={listingParams.filters}
        sort={listingParams.sort}
        pageSize={listingParams.pageSize}
      />
    </Container>
  );
}

export default function SearchPage(props: SearchPageProps) {
  return (
    <Suspense fallback={<ProductListingSkeleton />}>
      <SearchResults {...props} />
    </Suspense>
  );
}
