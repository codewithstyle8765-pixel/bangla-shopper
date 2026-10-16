import { Suspense } from "react";
import { AccountFormSkeleton } from "@/packages/module-customer/AccountSkeletons";
import type { Metadata } from "next";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { notFound } from "next/navigation";
import { AccountSection } from "@/packages/module-customer/AccountUi";
import { AddressForm } from "@/packages/module-customer/AccountForms";
import { getCustomer } from "@/utils/magento/customer";
import { getBdLocations, getCountries } from "@/utils/magento/directory";

export const metadata: Metadata = { title: "Edit Address | BanglaShoppers", robots: { index: false } };

async function EditAddressPageContent({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, customer] = await Promise.all([params, getCustomer()]);
  const address = customer?.addresses.find((a) => a.id === id);
  if (!address) notFound();

  return (
    <>
      <PageTitle>Edit Address</PageTitle>
      <AccountSection title="Address Details">
        <AddressForm address={address} countries={await getCountries()} locations={await getBdLocations()} />
      </AccountSection>
    </>
  );
}

export default function EditAddressPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<AccountFormSkeleton />}>
      <EditAddressPageContent {...props} />
    </Suspense>
  );
}
