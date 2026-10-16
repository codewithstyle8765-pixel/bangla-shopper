import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { ReviewsPageSkeleton } from "@/packages/module-customer/AccountSkeletons";
import { AccountEmptyState, AccountIcons, AccountSection } from "@/packages/module-customer/AccountUi";
import { ProductReviewsList } from "@/packages/module-customer/ProductReviewsList";
import { getCustomerReviews } from "@/utils/magento/customer";

export const metadata: Metadata = { title: "My Product Reviews | BanglaShoppers", robots: { index: false } };

const PAGE_SIZES = [10, 20, 50];

type SearchParams = Promise<{ page?: string; limit?: string }>;

async function ReviewsPageContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const limit = PAGE_SIZES.includes(Number(params.limit)) ? Number(params.limit) : 10;
  const page = Math.max(1, Number(params.page) || 1);
  const reviews = await getCustomerReviews(page, limit);

  return (
    <>
      <PageTitle>My Product Reviews</PageTitle>
      <AccountSection title="Reviews you have written">
        {reviews.items.length === 0 ? (
          <AccountEmptyState
            icon={AccountIcons.review}
            title="You haven't reviewed any products yet"
            action={
              <Link href="/customer/account/orders" className="inline-flex h-10 items-center rounded-[4px] bg-brand-coral px-5 text-[14px] font-semibold text-white hover:bg-brand-coral-hover">
                Review a Past Order
              </Link>
            }
          >
            Share what you think of the products you bought. Your reviews help other shoppers and earn you bonus reward points.
          </AccountEmptyState>
        ) : (
          <ProductReviewsList reviews={reviews} />
        )}
      </AccountSection>
    </>
  );
}

export default function ReviewsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<ReviewsPageSkeleton />}>
      <ReviewsPageContent searchParams={searchParams} />
    </Suspense>
  );
}
