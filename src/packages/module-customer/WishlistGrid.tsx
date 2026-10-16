"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ProductCard } from "@/packages/module-catalog/product/ProductCard";
import { FormAlert } from "@/packages/module-common/form";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { useCart } from "@/packages/module-quote/context/CartContext";
import type { ProductSummary } from "@/types/storefront";
import { useWishlist } from "@/packages/module-quote/context/WishlistContext";
import { callApi, useApiFollowUp } from "@/utils/api/client";
import { ConfirmDialog } from "@/packages/module-common/Modal";
import { RemoveWishlistButton } from "./AccountForms";

interface WishlistGridProps {
  wishlistId: string | null;
  items: Array<{ itemId: string; product: ProductSummary }>;
}

export function WishlistGrid({ wishlistId, items }: WishlistGridProps) {
  const { refreshCart, openCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [clearing, startClear] = useTransition();
  const followUp = useApiFollowUp();
  const { refresh: refreshWishlist } = useWishlist();

  const move = async (itemIds: string[]) => {
    if (!wishlistId) return;
    setError(null);
    const result = followUp(await callApi("MoveWishlistToCart", { wishlistId, itemIds }));
    void refreshWishlist();
    if (!result.ok) {
      setError(result.message);
      return;
    }
    await refreshCart();
    openCart();
  };

  return (
    <>
      <PageTitle
        description={items.length ? `${items.length} saved ${items.length === 1 ? "item" : "items"}` : undefined}
        action={
          items.length > 0 && (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="flex h-10 cursor-pointer items-center rounded-[4px] border-2 border-brand-alert px-5 text-[14px] font-semibold text-brand-alert transition-colors hover:bg-brand-alert hover:text-white"
            >
              Delete all
            </button>
          )
        }
      >
        My Wishlist
      </PageTitle>

      {error && <FormAlert>{error}</FormAlert>}

      {items.length === 0 ? (
        <div className="flex flex-col items-center rounded-[6px] border border-dashed border-card-border px-4 py-14 text-center">
          <svg viewBox="0 0 24 24" className="h-12 w-12 text-brand-coral" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          <p className="mt-3 text-[16px] font-semibold text-brand-dark">Your wishlist is empty</p>
          <p className="mt-1 max-w-[360px] text-[14px] text-footer-text">Tap the heart on any product to save it here for later.</p>
          <Link href="/" className="mt-5 inline-flex h-11 items-center rounded-[4px] bg-brand-coral px-6 text-[14px] font-semibold text-white hover:bg-brand-coral-hover">
            Discover Products
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-[11px] sm:grid-cols-3 xl:grid-cols-4">
          {items.map(({ itemId, product }) => (
            <li key={itemId} className="group relative flex min-w-0">
              <RemoveWishlistButton wishlistId={wishlistId!} itemId={itemId} name={product.name} />
              <ProductCard {...product} layout="fluid" ctaLabel="Move to Cart" onAddToCart={() => move([itemId])} />
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={confirmClear}
        title="Delete all items"
        message={`Remove all ${items.length} items from your wishlist? This can't be undone.`}
        confirmLabel="Delete All"
        tone="danger"
        pending={clearing}
        onCancel={() => setConfirmClear(false)}
        onConfirm={() =>
          startClear(async () => {
            if (!wishlistId) return;
            const result = followUp(await callApi("ClearWishlist", { wishlistId, itemIds: items.map((i) => i.itemId) }));
            void refreshWishlist();
            if (!result.ok) setError(result.message);
            setConfirmClear(false);
          })
        }
      />
    </>
  );
}

export default WishlistGrid;
