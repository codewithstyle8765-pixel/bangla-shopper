import HomeView from "@/packages/module-theme/home/HomeView";
import { getHomePage } from "@/utils/magento/home";

export const metadata = {
  title: "BanglaShoppers | Authentic Cosmetics, Skincare & Fragrance Store in Bangladesh",
  description:
    "Shop authentic international cosmetics, skincare, haircare, and makeup brands online in Bangladesh with fast nationwide delivery and 100% genuine product guarantee.",
  alternates: { canonical: "/" },
};

/**
 * The home page API response is cached for 60 seconds ('use cache'). It decides which sections render and in what order.
 */
export default async function HomePage() {
  return <HomeView content={await getHomePage()} />;
}
