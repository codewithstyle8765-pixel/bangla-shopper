import { Suspense } from "react";
import type { Metadata } from "next";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { RewardsPageSkeleton } from "@/packages/module-customer/AccountSkeletons";
import { RewardPointsView } from "@/packages/module-customer/AccountExtras";
import { getRewardPoints } from "@/utils/magento/customer";

export const metadata: Metadata = { title: "My Reward Points | BanglaShoppers", robots: { index: false } };

const SIZES = [5, 10, 20, 50];

type SearchParams = Promise<{ page?: string; limit?: string }>;

async function RewardsPageContent({ searchParams }: { searchParams: SearchParams }) {
  const [params, rewards] = await Promise.all([searchParams, getRewardPoints()]);
  const limit = SIZES.includes(Number(params.limit)) ? Number(params.limit) : 5;
  const totalPages = Math.max(1, Math.ceil(rewards.history.length / limit));
  const page = Math.min(totalPages, Math.max(1, Number(params.page) || 1));
  return (
    <>
      <PageTitle description="Earn Cash Back Reward points on every order and spend them like cash at checkout.">My Reward Points</PageTitle>
      <RewardPointsView rewards={rewards} pager={{ page, pageSize: limit, totalPages, sizes: SIZES }} />
    </>
  );
}

export default function RewardsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<RewardsPageSkeleton />}>
      <RewardsPageContent searchParams={searchParams} />
    </Suspense>
  );
}
