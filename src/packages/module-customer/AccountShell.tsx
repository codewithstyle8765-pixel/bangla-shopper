import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { Container } from "@/packages/module-common/Container";
import { Breadcrumbs } from "@/packages/module-common/Breadcrumbs";
import { getCustomer } from "@/utils/magento/customer";
import { hasSessionCookie } from "@/utils/session";
import { AccountBreadcrumbs } from "./AccountBreadcrumbs";
import { AccountNav } from "./AccountNav";
import { AccountProfile } from "./AccountProfile";

/** Verifies the session with Magento without holding up the page (the proxy already redirects signed-out visitors). */
async function SessionGate() {
  if (!(await getCustomer())) redirect((await hasSessionCookie()) ? "/customer/account/login?expired=1" : "/customer/account/login");
  return null;
}

/**
 * Account page frame: breadcrumbs, sidebar and content. `nav` replaces the account sidebar (the affiliate area has
 * its own). The sidebar renders straight away and each page shows its own skeleton.
 */
export function AccountShell({ nav, children }: { nav?: ReactNode; children: ReactNode }) {
  return (
    <Container className="font-sans">
      <Suspense fallback={null}>
        <SessionGate />
      </Suspense>
      <Suspense fallback={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My Account", href: "/customer/account" }]} structuredData={false} />}>
        <AccountBreadcrumbs />
      </Suspense>
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-5 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-6 print:block">
        <div data-print-hide>{nav ?? <AccountNav profile={<AccountProfile />} />}</div>
        <div className="min-w-0 space-y-5 print:space-y-4">{children}</div>
      </div>
    </Container>
  );
}
