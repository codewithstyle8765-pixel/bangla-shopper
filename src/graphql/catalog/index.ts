import { gql } from "@apollo/client";

export const PRODUCT_CARD_FIELDS = /* GraphQL */ `
  uid
  sku
  name
  url_key
  stock_status
  rating_summary
  review_count
  country_of_manufacture
  small_image { url }
  price_range {
    minimum_price {
      final_price { value }
      regular_price { value }
    }
  }
`;

export const PRODUCT_LISTING_QUERY = gql`
  query ProductListing(
    $search: String
    $filter: ProductAttributeFilterInput
    $sort: ProductAttributeSortInput
    $pageSize: Int
    $currentPage: Int
  ) {
    products(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
      total_count
      page_info { current_page total_pages }
      aggregations { attribute_code label options { label value count } }
      items { ${PRODUCT_CARD_FIELDS} }
    }
  }
`;

export const CATEGORY_QUERY = gql`
  query CategoryByPath($urlPath: String!) {
    categoryList(filters: { url_path: { eq: $urlPath } }) {
      uid
      name
      description
      image
      cms_block { content }
      breadcrumbs { category_name category_url_path }
      children { name url_path }
    }
  }
`;

export const NAVIGATION_QUERY = gql`
  query Navigation {
    categoryList(filters: {}) {
      children {
        name
        url_path
        include_in_menu
        product_count
        children {
          name
          url_path
          include_in_menu
          children { name url_path include_in_menu }
        }
      }
    }
  }
`;

export const PRODUCT_DETAIL_QUERY = gql`
  query ProductDetail($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
      items {
        ${PRODUCT_CARD_FIELDS}
        media_gallery { url position disabled }
        description { html }
        only_x_left_in_stock
        custom_attributesV2(filters: { is_visible_on_front: true }) {
          items {
            code
            ... on AttributeValue { value }
            ... on AttributeSelectedOptions { selected_options { label } }
          }
        }
        categories { name url_path breadcrumbs { category_name category_url_path } }
        live_stock { location available }
        related_products { ${PRODUCT_CARD_FIELDS} }
        upsell_products { ${PRODUCT_CARD_FIELDS} }
        ... on ConfigurableProduct {
          configurable_options { uid attribute_code label values { uid label swatch_data { __typename value ... on ImageSwatchData { thumbnail } } } }
          variants {
            attributes { code uid }
            product { sku stock_status price_range { minimum_price { final_price { value } regular_price { value } } } }
          }
        }
      }
    }
  }
`;

/** Rating options configured in Magento (Stores › Rating); each has five values. */
/** Thumbnails for order lines (Magento order items carry no image). */
export const PRODUCT_IMAGES_BY_SKU_QUERY = gql`
  query ProductImagesBySku($skus: [String!]!) {
    products(filter: { sku: { in: $skus } }, pageSize: 100) {
      items { sku small_image { url } }
    }
  }
`;

export const PRODUCT_REVIEW_RATINGS_QUERY = gql`
  query ProductReviewRatings {
    productReviewRatingsMetadata {
      items { id name values { value_id value } }
    }
  }
`;

export const CREATE_PRODUCT_REVIEW = gql`
  mutation CreateProductReview($input: CreateProductReviewInput!) {
    createProductReview(input: $input) {
      review { nickname summary }
    }
  }
`;
