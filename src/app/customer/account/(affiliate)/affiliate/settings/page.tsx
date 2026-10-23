import { Suspense } from "react";
import type { Metadata } from "next";
import { AffiliateSettingsForm } from "@/packages/module-customer/affiliate/AffiliateForms";
import { AffiliateHeader, AffiliatePageSkeleton } from "@/packages/module-customer/affiliate/AffiliatePage";
import { requireApprovedAffiliate } from "@/utils/magento/affiliate-guard";

export const metadata: Metadata = { title: "Affiliate Settings | BanglaShoppers", robots: { index: false } };

async function SettingsContent() {
  const account = await requireApprovedAffiliate();
  return (
    <>
      <AffiliateHeader title="Affiliate Settings" description="Where you promote us and how you'd like to be paid." />
      <AffiliateSettingsForm account={account} />
    </>
  );
}

export default function AffiliateSettingsPage() {
  return (
    <Suspense fallback={<AffiliatePageSkeleton />}>
      <SettingsContent />
    </Suspense>
  );
}
