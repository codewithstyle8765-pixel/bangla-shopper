/**
 * Type definitions for Header Announcement Bar messages.
 * Designed to map cleanly to Magento GraphQL / CMS blocks or REST promo endpoints.
 */
export interface AnnouncementItem {
  id: string;
  text: string;
  link?: string;
}
