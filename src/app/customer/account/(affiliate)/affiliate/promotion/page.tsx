import { Suspense } from "react";
import type { Metadata } from "next";
import { AffiliateHeader, AffiliatePageSkeleton } from "@/packages/module-customer/affiliate/AffiliatePage";
import { AffiliatePromotionView } from "@/packages/module-customer/affiliate/AffiliateViews";
import { requireApprovedAffiliate } from "@/utils/magento/affiliate-guard";

export const metadata: Metadata = { title: "Promotion Materials | BanglaShoppers", robots: { index: false } };

async function PromotionContent() {
  const account = await requireApprovedAffiliate();
  return (
    <>
      <AffiliateHeader title="Promotion Materials" description="Links, coupons, banners and a product widget to share BanglaShoppers your way." />
      <AffiliatePromotionView account={account} />
    </>
  );
}

export default function AffiliatePromotionPage() {
  return (
    <Suspense fallback={<AffiliatePageSkeleton />}>
      <PromotionContent />
    </Suspense>
  );
}
