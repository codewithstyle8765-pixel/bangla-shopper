import { Suspense } from "react";
import type { Metadata } from "next";
import { AffiliateHeader, AffiliatePageSkeleton } from "@/packages/module-customer/affiliate/AffiliatePage";
import { AffiliateStatisticsView } from "@/packages/module-customer/affiliate/AffiliateStatistics";
import { getAffiliateStatistics } from "@/utils/magento/affiliate";
import { requireApprovedAffiliate } from "@/utils/magento/affiliate-guard";

export const metadata: Metadata = { title: "Affiliate Statistics | BanglaShoppers", robots: { index: false } };

const DAY = 86_400_000;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isoDate = (time: number) => new Date(time).toISOString().slice(0, 10);

type SearchParams = Promise<{ from?: string; to?: string }>;

async function StatisticsContent({ searchParams }: { searchParams: SearchParams }) {
  await requireApprovedAffiliate();
  const params = await searchParams;
  const today = isoDate(Date.now());
  let to = params.to && ISO_DATE.test(params.to) && params.to <= today ? params.to : today;
  let from = params.from && ISO_DATE.test(params.from) ? params.from : isoDate(Date.parse(to) - 29 * DAY);
  if (from > to) [from, to] = [to, from];
  const stats = await getAffiliateStatistics(from, to);
  return (
    <>
      <AffiliateHeader title="Statistics" description="Clicks, orders and earnings from your referral links." />
      <AffiliateStatisticsView stats={stats} />
    </>
  );
}

export default function AffiliateStatisticsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<AffiliatePageSkeleton />}>
      <StatisticsContent searchParams={searchParams} />
    </Suspense>
  );
}
