import type { Metadata } from "next";
import { StoreLocationsView } from "@/packages/module-theme/stores/StoreLocationsView";
import { getStoreLocations } from "@/utils/magento/cms";

export const metadata: Metadata = {
  title: "Store Locations | BanglaShoppers Showrooms in Dhaka",
  description: "Find a BanglaShoppers showroom: opening hours, address, phone and directions for our Banani and Baily Road stores.",
  alternates: { canonical: "/locations" },
};

export const revalidate = 3600;

export default async function StoreLocationsPage() {
  return <StoreLocationsView stores={await getStoreLocations()} />;
}
