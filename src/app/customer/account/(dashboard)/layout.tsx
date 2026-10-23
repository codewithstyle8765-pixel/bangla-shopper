import type { ReactNode } from "react";
import { AccountShell } from "@/packages/module-customer/AccountShell";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return <AccountShell>{children}</AccountShell>;
}
