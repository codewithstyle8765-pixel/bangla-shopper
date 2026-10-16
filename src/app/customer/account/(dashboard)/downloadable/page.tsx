import { Suspense } from "react";
import type { Metadata } from "next";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { DownloadsPageSkeleton } from "@/packages/module-customer/AccountSkeletons";
import { AccountSection } from "@/packages/module-customer/AccountUi";
import { DownloadsTable } from "@/packages/module-customer/AccountExtras";
import { getDownloadableProducts } from "@/utils/magento/customer";

export const metadata: Metadata = { title: "My Downloadable Products | BanglaShoppers", robots: { index: false } };

async function DownloadablePageContent() {
  const items = await getDownloadableProducts();
  return (
    <>
      <PageTitle>My Downloadable Products</PageTitle>
      <AccountSection title={items.length ? `${items.length} Downloads` : "Downloads"}>
        <DownloadsTable items={items} />
      </AccountSection>
    </>
  );
}

export default function DownloadablePage() {
  return (
    <Suspense fallback={<DownloadsPageSkeleton />}>
      <DownloadablePageContent />
    </Suspense>
  );
}
