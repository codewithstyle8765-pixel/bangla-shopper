import { Suspense } from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { Container } from "@/packages/module-common/Container";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { CheckoutSkeleton } from "@/packages/module-quote/checkout/CheckoutSkeleton";
import { CheckoutView } from "@/packages/module-quote/checkout/CheckoutView";
import { getCustomer } from "@/utils/magento/customer";
import { getBdLocations, getCountries } from "@/utils/magento/directory";

export const metadata: Metadata = { title: "Checkout | BanglaShoppers", robots: { index: false, follow: false } };

async function Checkout() {
  const [customer, countries, locations] = await Promise.all([getCustomer(), getCountries(), getBdLocations()]);
  return (
    <CheckoutView
      countries={countries}
      locations={locations}
      customer={
        customer
          ? { email: customer.email, firstName: customer.firstName, lastName: customer.lastName, addresses: customer.addresses }
          : null
      }
    />
  );
}

export default function CheckoutPage() {
  return (
    <Container className="font-sans lg:pb-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} structuredData={false} />
      <PageTitle>Secure Checkout</PageTitle>
      <Suspense fallback={<CheckoutSkeleton />}>
        <Checkout />
      </Suspense>
    </Container>
  );
}
