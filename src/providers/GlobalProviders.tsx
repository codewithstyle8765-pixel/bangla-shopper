"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/packages/module-quote/context/CartContext";
import { CartDrawer } from "@/packages/module-quote/cart/CartDrawer";
import { WishlistProvider } from "@/packages/module-quote/context/WishlistContext";
import { PinchZoomWatcher } from "@/packages/module-common/PinchZoomWatcher";
import { CookieConsent } from "@/packages/module-common/CookieConsent";
import { PromoPopupBanner } from "@/packages/module-theme/banner/PromoPopupBanner";

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
        <CartDrawer />
        <PinchZoomWatcher />
        <CookieConsent />
        <PromoPopupBanner />
      </WishlistProvider>
    </CartProvider>
  );
}
