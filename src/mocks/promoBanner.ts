import type { PromoBannerData } from "@/packages/module-theme/banner/promoBanner.types";

/**
 * Mock data for the Promotional Popup Banner.
 *
 * NOTE FOR DELETION:
 * When backend Magento APIs are live and this folder (`src/mocks/`) is deleted,
 * `usePromoBanner.ts` will fetch directly from Magento GraphQL/REST API.
 */
export const MOCK_PROMO_BANNER: PromoBannerData = {
  isEnabled: true, // Simulates the admin switch (true = on, false = off)
  id: "mega_beauty_sale_2026",
  title: "BanglaShoppers Mega Beauty Sale",
  imageUrl: "/assets/images/popup.webp",
  altText: "BanglaShoppers Mega Beauty Sale - Up to 50% Off",
  targetUrl: "/category/sale-items",
  sessionDismissLabel: "Don't show this again for this session",
};
