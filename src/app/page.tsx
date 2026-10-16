import HomeView from "@/packages/module-theme/home/HomeView";
import { getHomePage } from "@/utils/magento/home";

export const metadata = {
  title: "BanglaShoppers | Authentic Cosmetics, Skincare & Fragrance Store in Bangladesh",
  description:
    "Shop authentic international cosmetics, skincare, haircare, and makeup brands online in Bangladesh with fast nationwide delivery and 100% genuine product guarantee.",
  alternates: { canonical: "/" },
};

/* Prerendered at build time, rebuilt in the background at most once an hour. */
export const revalidate = 3600;

/**
 * The home page API response is cached (unstable_cache). It decides which sections render and in what order;
 * each section has its own Suspense + skeleton.
 */
export default async function HomePage() {
  return <HomeView content={await getHomePage()} />;
}
