import { gql } from "@apollo/client";

export const PRODUCT_CARD_FIELDS = /* GraphQL */ `
  __typename
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
