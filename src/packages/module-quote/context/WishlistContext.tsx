"use client";

import { createContext, Suspense, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { callApi } from "@/utils/api/client";

interface WishlistSummary {
  loggedIn: boolean;
  wishlistId: string | null;
  items: Array<{ itemId: string; sku: string }>;
}

interface WishlistContextValue {
  /** Number of products in the customer's wishlist (0 for guests). */
  count: number;
  isInWishlist: (sku: string) => boolean;
  /** Adds or removes a product; guests are sent to sign in. Resolves to the new state, or null on failure. */
  toggle: (sku: string) => Promise<boolean | null>;
  /** Re-read after the wishlist changed elsewhere (wishlist page actions, login). */
  refresh: () => Promise<void>;
}

const EMPTY: WishlistSummary = { loggedIn: false, wishlistId: null, items: [] };
const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

/**
 * Re-reads on every navigation (login and logout end in full page loads, so this keeps the count honest). Its own
 * Suspense boundary: `usePathname()` outside one blocks prerendering of every route.
 */
function RefreshOnNavigate({ refresh }: { refresh: () => Promise<void> }) {
  const pathname = usePathname();
  useEffect(() => {
    void refresh();
  }, [refresh, pathname]);
  return null;
}

/** Customer wishlist state for the header count and heart buttons; Magento is the source of truth. */
export function WishlistProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [summary, setSummary] = useState<WishlistSummary>(EMPTY);

  const refresh = useCallback(async () => {
    const result = await callApi("WishlistSummary");
    if (result.ok) setSummary(result.data);
  }, []);

  const toggle = useCallback(
    async (sku: string) => {
      if (!summary.loggedIn) {
        router.push(`/customer/account/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        return null;
      }
      const item = summary.items.find((i) => i.sku === sku);
      const result = item && summary.wishlistId
        ? await callApi("RemoveWishlistItem", { wishlistId: summary.wishlistId, itemId: item.itemId })
        : await callApi("AddToWishlist", { sku });
      if (!result.ok) return null;
      await refresh();
      return !item;
    },
    [summary, router, refresh],
  );

  const value = useMemo<WishlistContextValue>(
    () => ({
      count: summary.items.length,
      isInWishlist: (sku) => summary.items.some((i) => i.sku === sku),
      toggle,
      refresh,
    }),
    [summary, toggle, refresh],
  );

  return (
    <WishlistContext.Provider value={value}>
      <Suspense fallback={null}>
        <RefreshOnNavigate refresh={refresh} />
      </Suspense>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
