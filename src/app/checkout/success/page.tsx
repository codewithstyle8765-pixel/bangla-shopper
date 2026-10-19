import { Suspense } from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { Container } from "@/packages/module-common/Container";
import { OrderConfirmation } from "@/packages/module-customer/OrderConfirmation";
import { getOrder } from "@/utils/magento/customer";
import { getCountries } from "@/utils/magento/directory";
import { getCustomerToken } from "@/utils/session";
import type { SearchParamsRecord } from "@/utils/url";

export const metadata: Metadata = { title: "Thank You for Your Order | BanglaShoppers", robots: { index: false } };

async function Confirmation({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const [{ order }, token, countries] = await Promise.all([searchParams, getCustomerToken(), getCountries()]);
  const number = typeof order === "string" ? order : null;
  const initialOrder = token && number ? await getOrder(number).catch(() => null) : null;
  return <OrderConfirmation number={number} initialOrder={initialOrder} signedIn={Boolean(token)} countries={countries} />;
}

export default function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  return (
    <Container className="font-sans">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Order Confirmation" }]} structuredData={false} />
      <div className="pt-4">
        <Suspense fallback={null}>
          <Confirmation searchParams={searchParams} />
        </Suspense>
      </div>
    </Container>
  );
}
