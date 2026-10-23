import { Suspense } from "react";
import type { Metadata } from "next";
import { AffiliateHeader, AffiliatePageSkeleton } from "@/packages/module-customer/affiliate/AffiliatePage";
import { AffiliateTransactionsView } from "@/packages/module-customer/affiliate/AffiliateViews";
import { getAffiliateTransactions } from "@/utils/magento/affiliate";
import { requireApprovedAffiliate } from "@/utils/magento/affiliate-guard";

export const metadata: Metadata = { title: "Affiliate Transactions | BanglaShoppers", robots: { index: false } };

const SIZES = [10, 20, 50];

type SearchParams = Promise<{ page?: string; limit?: string }>;

async function TransactionsContent({ searchParams }: { searchParams: SearchParams }) {
  const account = await requireApprovedAffiliate();
  const [params, transactions] = await Promise.all([searchParams, getAffiliateTransactions()]);
  const limit = SIZES.includes(Number(params.limit)) ? Number(params.limit) : SIZES[0];
  const totalPages = Math.max(1, Math.ceil(transactions.length / limit));
  const page = Math.min(totalPages, Math.max(1, Number(params.page) || 1));
  return (
    <>
      <AffiliateHeader title="Transactions" description="Every commission and click credited to your affiliate balance." />
      <AffiliateTransactionsView account={account} transactions={transactions} pager={{ page, pageSize: limit, totalPages, sizes: SIZES }} />
    </>
  );
}

export default function AffiliateTransactionsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<AffiliatePageSkeleton />}>
      <TransactionsContent searchParams={searchParams} />
    </Suspense>
  );
}
