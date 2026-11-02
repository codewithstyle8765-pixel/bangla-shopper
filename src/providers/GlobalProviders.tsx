"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/packages/module-quote/context/CartContext";
import { CartDrawer } from "@/packages/module-quote/cart/CartDrawer";
import { WishlistProvider } from "@/packages/module-quote/context/WishlistContext";
import { PinchZoomWatcher } from "@/packages/module-common/PinchZoomWatcher";
import { CookieConsent } from "@/packages/module-common/CookieConsent";
import { PromoPopupBanner } from "@/packages/module-theme/banner/PromoPopupBanner";
import type { PromoBannerData } from "@/packages/module-theme/banner/promoBanner.types";
import { CurrencyProvider } from "@/packages/module-common/currency/Currency";

export function GlobalProviders({
  children,
  promo = null,
  currencySymbol,
}: {
  children: ReactNode;
  promo?: PromoBannerData | null;
  currencySymbol: string;
}) {
  return (
    <CurrencyProvider symbol={currencySymbol}>
      <CartProvider>
        <WishlistProvider>
          {children}
          <CartDrawer />
          <PinchZoomWatcher />
          <CookieConsent />
          <PromoPopupBanner banner={promo} />
        </WishlistProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
