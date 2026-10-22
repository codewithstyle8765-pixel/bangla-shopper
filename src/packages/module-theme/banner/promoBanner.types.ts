/**
 * Type definitions for Promotional Popup Banner.
 * Designed to seamlessly map to Magento GraphQL / REST CMS promo endpoints.
 */
export type PromoBannerPerkIcon = "authentic" | "offers" | "rewards";

export interface PromoBannerData {
  /** Admin toggle: enables or disables the banner globally */
  isEnabled: boolean;
  /** Unique identifier for the promotion / campaign */
  id: string;
  /** Banner title or campaign name (optional) */
  title?: string;
  /** Square artwork (1000×1000), used on every screen; keep text 10% from the edges */
  imageUrl: string;
  /** Optional phone/tablet artwork (below 1024px); falls back to `imageUrl` */
  mobileImageUrl?: string;
  /** Alternative text for accessibility */
  altText: string;
  /** Click destination (internal route like /category/sale-items or external URL) */
  targetUrl: string;
  /** Label for the session-suppress button */
  sessionDismissLabel?: string;
  /** Shows the newsletter panel beside the image; off shows the image alone */
  showNewsletter?: boolean;
  /** Panel heading; the `highlight` part is drawn in the brand colour */
  heading?: string;
  headingHighlight?: string;
  subheading?: string;
  perks?: { icon: PromoBannerPerkIcon; label: string }[];
  buttonLabel?: string;
  privacyNote?: string;
}
