import { Suspense } from "react";
import { AccountFormSkeleton } from "@/packages/module-customer/AccountSkeletons";
import type { Metadata } from "next";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { AccountSection } from "@/packages/module-customer/AccountUi";
import { ChangePasswordForm, ProfileForm } from "@/packages/module-customer/AccountForms";
import { getCustomer } from "@/utils/magento/customer";

export const metadata: Metadata = { title: "Account Information | BanglaShoppers", robots: { index: false } };

async function AccountEditPageContent() {
  const customer = await getCustomer();
  if (!customer) return null;
  return (
    <>
      <PageTitle>Account Information</PageTitle>
      <AccountSection title="Personal Details">
        <ProfileForm customer={customer} />
      </AccountSection>
      <AccountSection title="Change Password">
        <ChangePasswordForm />
      </AccountSection>
    </>
  );
}

export default function AccountEditPage() {
  return (
    <Suspense fallback={<AccountFormSkeleton />}>
      <AccountEditPageContent />
    </Suspense>
  );
}
