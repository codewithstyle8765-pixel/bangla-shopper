import { redirect } from "next/navigation";
import type { AffiliateAccount } from "@/types/storefront";
import { getAffiliateAccount } from "./affiliate";

/** Affiliate area pages: anyone not yet approved is sent to the program page (apply / pending). */
export async function requireApprovedAffiliate(): Promise<AffiliateAccount> {
  const account = await getAffiliateAccount();
  if (account.status !== "approved") redirect("/customer/account/affiliate");
  return account;
}
