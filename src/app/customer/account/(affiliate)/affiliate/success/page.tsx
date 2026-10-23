import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { AffiliatePageSkeleton } from "@/packages/module-customer/affiliate/AffiliatePage";
import { AffiliatePendingView, AffiliateWelcomeView } from "@/packages/module-customer/affiliate/AffiliateViews";
import { getAffiliateAccount } from "@/utils/magento/affiliate";

export const metadata: Metadata = { title: "Application Submitted | BanglaShoppers", robots: { index: false } };

async function SuccessContent() {
  const account = await getAffiliateAccount();
  if (account.status === "none") redirect("/customer/account/affiliate");
  return (
    <>
      <PageTitle>Affiliate Program</PageTitle>
      {account.status === "approved" ? <AffiliateWelcomeView account={account} /> : <AffiliatePendingView submitted />}
    </>
  );
}

export default function AffiliateSuccessPage() {
  return (
    <Suspense fallback={<AffiliatePageSkeleton />}>
      <SuccessContent />
    </Suspense>
  );
}
