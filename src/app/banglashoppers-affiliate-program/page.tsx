import type { Metadata } from "next";
import { AffiliateProgramView } from "@/packages/module-theme/affiliate/AffiliateProgramView";
import { getAffiliateOverview } from "@/utils/magento/affiliate";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Affiliate Program | BanglaShoppers",
  description: "Join the BanglaShoppers Affiliate Program: share your personal link, earn commission on every order you bring in. Free to join.",
  alternates: { canonical: "/banglashoppers-affiliate-program" },
};

export default async function AffiliateProgramPage() {
  return <AffiliateProgramView overview={await getAffiliateOverview()} />;
}
