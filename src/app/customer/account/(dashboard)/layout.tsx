import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { Container } from "@/packages/module-common/Container";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { AccountBreadcrumbs } from "@/packages/module-customer/AccountBreadcrumbs";
import { AccountNav } from "@/packages/module-customer/AccountNav";
import { getCustomer } from "@/utils/magento/customer";
import { getCustomerFullName, hasSessionCookie } from "@/utils/session";

/** Sidebar greeting from the name cookie set at login (instant); sessions started before it existed ask Magento once. */
async function CustomerName() {
  const fromCookie = await getCustomerFullName();
  if (fromCookie) return fromCookie;
  const customer = await getCustomer();
  return customer ? `${customer.firstName} ${customer.lastName}` : "";
}

/** Verifies the session with Magento without holding up the page (the proxy already redirects signed-out visitors). */
async function SessionGate() {
  if (!(await getCustomer())) redirect((await hasSessionCookie()) ? "/customer/account/login?expired=1" : "/customer/account/login");
  return null;
}

/**
 * The sidebar renders straight away and each page shows its own skeleton, so a reload never shows a generic
 * account placeholder.
 */
export default function AccountLayout({ children }: { children: ReactNode }) {
  const name = (
    <Suspense fallback={null}>
      <CustomerName />
    </Suspense>
  );

  return (
    <Container className="pb-3 font-sans">
      <Suspense fallback={null}>
        <SessionGate />
      </Suspense>
      <Suspense fallback={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My Account", href: "/customer/account" }]} structuredData={false} />}>
        <AccountBreadcrumbs />
      </Suspense>
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-5 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-6 print:block">
        <div data-print-hide>
          <AccountNav name={name} />
        </div>
        <div className="min-w-0 space-y-5 print:space-y-4">{children}</div>
      </div>
    </Container>
  );
}
