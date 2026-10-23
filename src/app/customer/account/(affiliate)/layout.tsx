import type { ReactNode } from "react";
import { AccountShell } from "@/packages/module-customer/AccountShell";
import { AffiliateSidebar } from "@/packages/module-customer/affiliate/AffiliateSidebar";

/** Same frame as the account pages, with the affiliate menu in place of the account sidebar. */
export default function AffiliateLayout({ children }: { children: ReactNode }) {
  return <AccountShell nav={<AffiliateSidebar />}>{children}</AccountShell>;
}
