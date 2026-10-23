import { Suspense } from "react";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { getAffiliateAccount } from "@/utils/magento/affiliate";
import { AccountNav } from "../AccountNav";
import { AccountName } from "../AccountShell";
import { AffiliateNav } from "./AffiliateNav";

/** Approved affiliates get the affiliate menu; while applying or pending, the usual account sidebar stays. */
async function SidebarForStatus() {
  const account = await getAffiliateAccount().catch(() => null);
  return account?.status === "approved" ? <AffiliateNav group={account.group} /> : <AccountNav name={<AccountName />} />;
}

export function AffiliateSidebar() {
  return (
    <Suspense fallback={<Shimmer height={430} rounded="rounded-[6px]" className="max-lg:hidden" />}>
      <SidebarForStatus />
    </Suspense>
  );
}
