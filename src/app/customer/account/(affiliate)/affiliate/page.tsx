import { Suspense } from "react";
import type { Metadata } from "next";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { AffiliateHub } from "@/packages/module-customer/affiliate/AffiliateHub";
import { AffiliateHeader, AffiliatePageSkeleton } from "@/packages/module-customer/affiliate/AffiliatePage";
import { AffiliateDashboardView, AffiliateJoinView, AffiliatePendingView } from "@/packages/module-customer/affiliate/AffiliateViews";
import { getAffiliateAccount, getAffiliateTransactions } from "@/utils/magento/affiliate";
import { getCustomer } from "@/utils/magento/customer";

export const metadata: Metadata = { title: "Affiliate Program | BanglaShoppers", robots: { index: false } };

/** Join form, pending notice or the affiliate dashboard, depending on the account's status. */
async function AffiliateContent() {
  const [account, customer] = await Promise.all([getAffiliateAccount(), getCustomer()]);

  if (account.status === "approved") {
    const recent = (await getAffiliateTransactions()).slice(0, 5);
    return (
      <>
        <AffiliateHeader title="Affiliate Dashboard" description="Your earnings, referral link and commission rates at a glance." />
        <AffiliateHub />
        <AffiliateDashboardView account={account} recent={recent} />
      </>
    );
  }

  if (account.status === "pending") {
    return (
      <>
        <PageTitle>Affiliate Program</PageTitle>
        <AffiliatePendingView />
      </>
    );
  }

  return (
    <>
      <PageTitle description="Earn commission by sharing BanglaShoppers with your friends and followers. It's free and takes two minutes.">Join the Affiliate Program</PageTitle>
      <AffiliateJoinView account={account} customerName={customer ? `${customer.firstName} ${customer.lastName}` : ""} email={customer?.email ?? ""} />
    </>
  );
}

export default function AffiliatePage() {
  return (
    <Suspense fallback={<AffiliatePageSkeleton />}>
      <AffiliateContent />
    </Suspense>
  );
}
