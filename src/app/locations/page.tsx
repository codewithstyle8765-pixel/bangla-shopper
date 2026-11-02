import type { Metadata } from "next";
import { StoreLocationsView } from "@/packages/module-theme/stores/StoreLocationsView";
import { getStoreLocationsPageData } from "@/utils/magento/cms";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStoreLocationsPageData();
  return {
    title: data?.title ? `${data.title} | BanglaShoppers Showrooms in Dhaka` : "Store Locations | BanglaShoppers Showrooms in Dhaka",
    description: data?.subtitle || "Find a BanglaShoppers showroom: opening hours, address, phone and directions for our Banani and Baily Road stores.",
    alternates: { canonical: "/locations" },
  };
}

export default async function StoreLocationsPage() {
  const pageData = await getStoreLocationsPageData();
  return <StoreLocationsView stores={pageData?.stores ?? []} pageData={pageData} />;
}
