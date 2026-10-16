import { Suspense } from "react";
import type { Metadata } from "next";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { PaymentMethodsPageSkeleton } from "@/packages/module-customer/AccountSkeletons";
import { AccountSection } from "@/packages/module-customer/AccountUi";
import { PaymentMethodsList } from "@/packages/module-customer/PaymentMethodsList";
import { getStoredPaymentMethods } from "@/utils/magento/customer";

export const metadata: Metadata = { title: "Stored Payment Methods | BanglaShoppers", robots: { index: false } };

async function PaymentMethodsPageContent() {
  const methods = await getStoredPaymentMethods();
  return (
    <>
      <PageTitle>Stored Payment Methods</PageTitle>
      <AccountSection title="Saved Cards">
        <PaymentMethodsList methods={methods} />
      </AccountSection>
    </>
  );
}

export default function PaymentMethodsPage() {
  return (
    <Suspense fallback={<PaymentMethodsPageSkeleton />}>
      <PaymentMethodsPageContent />
    </Suspense>
  );
}
