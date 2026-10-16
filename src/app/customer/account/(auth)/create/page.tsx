import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/packages/module-customer/AuthShell";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { Container } from "@/packages/module-common/Container";
import { RegisterForm } from "@/packages/module-customer/AuthForms";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { getCustomer } from "@/utils/magento/customer";

export const metadata: Metadata = { title: "Create New Customer Account | BanglaShoppers", robots: { index: false } };

async function Register() {
  if (await getCustomer()) redirect("/customer/account");
  return <RegisterForm />;
}

export default function RegisterPage() {
  return (
    <Container className="pb-3.5 font-sans">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Create Account" }]} structuredData={false} />
      <AuthShell
        tab="register"
        title="Create Account"
        subtitle="Join the Cash Back Reward program and get up to 5% back on every order."
      >
        <Suspense fallback={<Shimmer height={420} rounded="rounded-[6px]" />}>
          <Register />
        </Suspense>
      </AuthShell>
    </Container>
  );
}
