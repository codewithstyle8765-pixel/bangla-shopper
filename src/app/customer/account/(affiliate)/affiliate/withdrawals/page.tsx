import { Suspense } from "react";
import type { Metadata } from "next";
import { AffiliateHeader, AffiliatePageSkeleton } from "@/packages/module-customer/affiliate/AffiliatePage";
import { AffiliateWithdrawalsView } from "@/packages/module-customer/affiliate/AffiliateViews";
import { getAffiliateWithdrawals } from "@/utils/magento/affiliate";
import { requireApprovedAffiliate } from "@/utils/magento/affiliate-guard";

export const metadata: Metadata = { title: "Affiliate Withdrawals | BanglaShoppers", robots: { index: false } };

const SIZES = [10, 20, 50];

type SearchParams = Promise<{ page?: string; limit?: string }>;

async function WithdrawalsContent({ searchParams }: { searchParams: SearchParams }) {
  const account = await requireApprovedAffiliate();
  const [params, withdrawals] = await Promise.all([searchParams, getAffiliateWithdrawals()]);
  const limit = SIZES.includes(Number(params.limit)) ? Number(params.limit) : SIZES[0];
  const totalPages = Math.max(1, Math.ceil(withdrawals.length / limit));
  const page = Math.min(totalPages, Math.max(1, Number(params.page) || 1));
  return (
    <>
      <AffiliateHeader title="Withdrawals" description="Request a payout of your balance and follow its status." />
      <AffiliateWithdrawalsView account={account} withdrawals={withdrawals} pager={{ page, pageSize: limit, totalPages, sizes: SIZES }} />
    </>
  );
}

export default function AffiliateWithdrawalsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<AffiliatePageSkeleton />}>
      <WithdrawalsContent searchParams={searchParams} />
    </Suspense>
  );
}
