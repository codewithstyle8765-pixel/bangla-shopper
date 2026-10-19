/**
 * Type definitions for Promotional Popup Banner.
 * Designed to seamlessly map to Magento GraphQL / REST CMS promo endpoints.
 */
export interface PromoBannerData {
  /** Admin toggle: enables or disables the banner globally */
  isEnabled: boolean;
  /** Unique identifier for the promotion / campaign */
  id: string;
  /** Banner title or campaign name (optional) */
  title?: string;
  /** Primary banner graphic image URL */
  imageUrl: string;
  /** Alternative text for accessibility */
  altText: string;
  /** Click destination (internal route like /category/sale-items or external URL) */
  targetUrl: string;
  /** Label for the session-suppress button */
  sessionDismissLabel?: string;
}
