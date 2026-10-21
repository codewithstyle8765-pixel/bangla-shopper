import type { AnnouncementItem } from "@/packages/module-theme/layout/header/announcements.types";

/**
 * Mock data for the rotating Header Announcement Bar.
 *
 * NOTE FOR DELETION:
 * When backend Magento APIs are live and this folder (`src/mocks/`) is deleted,
 * the announcement bar data will be provided via page/layout props or Apollo Client query.
 */
export const MOCK_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "announcement_free_shipping",
    text: "Free Shipping on Orders Over TK 3,000!",
  },
  {
    id: "announcement_express_delivery",
    text: "Nationwide Express Delivery!",
  },
  {
    id: "announcement_authentic_guarantee",
    text: "100% Authentic & Genuine Products!",
  },
  {
    id: "announcement_beauty_brands",
    text: "Shop Your Favorite Beauty Brands!",
  },
];
