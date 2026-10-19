import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/packages/module-customer/AuthShell";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { Container } from "@/packages/module-common/Container";
import { LoginForm } from "@/packages/module-customer/AuthForms";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { getCustomer } from "@/utils/magento/customer";
import type { SearchParamsRecord } from "@/utils/url";

export const metadata: Metadata = { title: "Customer Login | BanglaShoppers", robots: { index: false } };

async function Login({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const [customer, { redirect: target, expired }] = await Promise.all([getCustomer(), searchParams]);
  if (customer) redirect("/customer/account");
  return <LoginForm redirectTo={typeof target === "string" ? target : "/customer/account"} expired={expired === "1"} />;
}

export default function LoginPage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  return (
    <Container className="font-sans">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Login" }]} structuredData={false} />
      <AuthShell
        tab="login"
        title="Sign In"
        subtitle="Welcome back! Sign in to track orders, manage your wishlist and earn Cash Back Rewards."
      >
        <Suspense fallback={<Shimmer height={260} rounded="rounded-[6px]" />}>
          <Login searchParams={searchParams} />
        </Suspense>
      </AuthShell>
    </Container>
  );
}
