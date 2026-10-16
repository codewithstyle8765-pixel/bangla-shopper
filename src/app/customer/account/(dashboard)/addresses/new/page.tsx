import { Suspense } from "react";
import { AccountFormSkeleton } from "@/packages/module-customer/AccountSkeletons";
import type { Metadata } from "next";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { AccountSection } from "@/packages/module-customer/AccountUi";
import { AddressForm } from "@/packages/module-customer/AccountForms";
import { getBdLocations, getCountries } from "@/utils/magento/directory";

export const metadata: Metadata = { title: "Add New Address | BanglaShoppers", robots: { index: false } };

async function NewAddressPageContent() {
  return (
    <>
      <PageTitle>Add New Address</PageTitle>
      <AccountSection title="Address Details">
        <AddressForm countries={await getCountries()} locations={await getBdLocations()} />
      </AccountSection>
    </>
  );
}

export default function NewAddressPage() {
  return (
    <Suspense fallback={<AccountFormSkeleton />}>
      <NewAddressPageContent />
    </Suspense>
  );
}
