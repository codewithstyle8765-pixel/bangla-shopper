import { gql } from "@apollo/client";

/**
 * Footer content is managed in a Magento CMS block whose content is JSON
 * matching `FooterData` (src/types/storefront.ts).
 */
export const FOOTER_BLOCK_ID = "headless-footer";

/** Store Locations page content: a CMS block whose content is JSON `StoreLocation[]`. */
export const STORE_LOCATIONS_BLOCK_ID = "headless-store-locations";

export const CMS_BLOCKS_QUERY = gql`
  query CmsBlocks($identifiers: [String]) {
    cmsBlocks(identifiers: $identifiers) {
      items { identifier content }
    }
  }
`;

export const CMS_PAGE_QUERY = gql`
  query CmsPage($identifier: String!) {
    cmsPage(identifier: $identifier) { identifier title content_heading content meta_title meta_description }
  }
`;

/** Magento 2.4.7+ Contact Us form (sends the admin the store's contact email). */
export const CONTACT_US = gql`
  mutation ContactUs($input: ContactUsInput!) {
    contactUs(input: $input) { status }
  }
`;

export const SUBSCRIBE_NEWSLETTER = gql`
  mutation SubscribeNewsletter($email: String!) {
    subscribeEmailToNewsletter(email: $email) { status }
  }
`;
