import { Suspense } from "react";
import { AddressesSkeleton } from "@/packages/module-customer/AccountSkeletons";
import type { Metadata } from "next";
import Link from "next/link";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { AccountSection, AddressBlock } from "@/packages/module-customer/AccountUi";
import { DeleteAddressButton } from "@/packages/module-customer/AccountForms";
import { getCustomer } from "@/utils/magento/customer";
import { countryName, getCountries } from "@/utils/magento/directory";

export const metadata: Metadata = { title: "Address Book | BanglaShoppers", robots: { index: false } };

async function AddressesPageContent() {
  const [customer, countries] = await Promise.all([getCustomer(), getCountries()]);
  if (!customer) return null;

  return (
    <>
      <PageTitle
        action={
          <Link href="/customer/account/addresses/new" className="flex h-10 items-center rounded-[4px] bg-brand-coral px-5 text-[14px] font-semibold text-white hover:bg-brand-coral-hover">
            + Add New Address
          </Link>
        }
      >
        Address Book
      </PageTitle>

      {customer.addresses.length === 0 ? (
        <AccountSection title="No saved addresses">
          <p className="text-[14px] text-footer-text">Save an address to check out faster next time.</p>
        </AccountSection>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {customer.addresses.map((address) => (
            <li key={address.id} className="flex flex-col rounded-[6px] border border-card-border bg-white p-4 sm:p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                {address.isDefaultShipping && <span className="rounded-full bg-brand-coral/10 px-2.5 py-0.5 text-[12px] font-semibold text-brand-coral">Default Delivery</span>}
                {address.isDefaultBilling && <span className="rounded-full bg-brand-link/10 px-2.5 py-0.5 text-[12px] font-semibold text-brand-link">Default Billing</span>}
              </div>
              <AddressBlock address={address} countryName={countryName(countries, address.countryCode)} />
              <div className="mt-4 flex gap-4 border-t border-card-border pt-3">
                <Link href={`/customer/account/addresses/${address.id}/edit`} className="text-[13px] font-semibold text-brand-link hover:underline">
                  Edit
                </Link>
                <DeleteAddressButton id={address.id} summary={`${address.firstName} ${address.lastName}, ${address.street[0]}, ${address.city}`} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function AddressesPage() {
  return (
    <Suspense fallback={<AddressesSkeleton />}>
      <AddressesPageContent />
    </Suspense>
  );
}
