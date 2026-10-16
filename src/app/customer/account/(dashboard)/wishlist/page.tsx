import { Suspense } from "react";
import type { Metadata } from "next";
import { WishlistSkeleton } from "@/packages/module-customer/AccountSkeletons";
import { WishlistGrid } from "@/packages/module-customer/WishlistGrid";
import { getWishlist } from "@/utils/magento/customer";

export const metadata: Metadata = { title: "My Wishlist | BanglaShoppers", robots: { index: false } };

async function WishlistPageContent() {
  const wishlist = await getWishlist();
  return <WishlistGrid wishlistId={wishlist.id} items={wishlist.items} />;
}

export default function WishlistPage() {
  return (
    <Suspense fallback={<WishlistSkeleton />}>
      <WishlistPageContent />
    </Suspense>
  );
}
