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
  imageUrl: "/assets/images/pop-up-new.webp",
  altText: "BanglaShoppers Beauty Club - Mega Beauty Sale, up to 50% off skincare, makeup and haircare",
  targetUrl: "/category/sale-items",
  sessionDismissLabel: "Don't show this again for this session",
  showNewsletter: true,
  heading: "Never Miss a",
  headingHighlight: "Beauty Deal",
  subheading: "Be the first to hear about new arrivals, exclusive offers and member rewards.",
  perks: [
    { icon: "authentic", label: "100% Authentic" },
    { icon: "offers", label: "Exclusive Offers" },
    { icon: "rewards", label: "Member Rewards" },
  ],
  buttonLabel: "Subscribe & Unlock Offers",
  privacyNote: "No spam, unsubscribe anytime.",
};
