import { Suspense } from "react";
import type { Metadata } from "next";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { NewsletterPageSkeleton } from "@/packages/module-customer/AccountSkeletons";
import { AccountSection } from "@/packages/module-customer/AccountUi";
import { NewsletterPreferences } from "@/packages/module-customer/NewsletterPreferences";
import { getCustomer } from "@/utils/magento/customer";

export const metadata: Metadata = { title: "Newsletter Subscriptions | BanglaShoppers", robots: { index: false } };

async function NewsletterPageContent() {
  const customer = await getCustomer();
  if (!customer) return null;
  return (
    <>
      <PageTitle>Newsletter Subscriptions</PageTitle>
      <AccountSection title="Subscription Option">
        <NewsletterPreferences subscribed={customer.isSubscribed} />
      </AccountSection>
    </>
  );
}

export default function NewsletterPage() {
  return (
    <Suspense fallback={<NewsletterPageSkeleton />}>
      <NewsletterPageContent />
    </Suspense>
  );
}
