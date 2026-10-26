import { gql } from "@apollo/client";
import { PRODUCT_CARD_FIELDS } from "@/graphql/catalog";

const ADDRESS_FIELDS = /* GraphQL */ `
  id
  firstname
  lastname
  telephone
  street
  city
  postcode
  country_code
  region { region }
  custom_attributesV2 { code ... on AttributeValue { value } }
  default_shipping
  default_billing
`;

const ORDER_ADDRESS_FIELDS = /* GraphQL */ `
  firstname
  lastname
  telephone
  street
  city
  postcode
  country_code
  region
  custom_attributesV2 { code ... on AttributeValue { value } }
`;

export const ORDER_FIELDS = /* GraphQL */ `
  id
  number
  order_date
  status
  payment_methods { name }
  shipping_method
  shipping_address { ${ORDER_ADDRESS_FIELDS} }
  billing_address { ${ORDER_ADDRESS_FIELDS} }
  total {
    subtotal { value }
    total_shipping { value }
    discounts { amount { value } }
    grand_total { value }
  }
  items {
    product_sku
    product_name
    product_url_key
    product_sale_price { value }
    quantity_ordered
  }
  comments { message timestamp }
`;

export const GENERATE_TOKEN = gql`
  mutation GenerateToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) { token }
  }
`;

export const REVOKE_TOKEN = gql`
  mutation RevokeToken {
    revokeCustomerToken { result }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) { customer { email } }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordResetEmail(email: $email)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($current: String!, $next: String!) {
    changeCustomerPassword(currentPassword: $current, newPassword: $next) { email }
  }
`;

export const MERGE_CARTS = gql`
  mutation MergeCarts($source: String!, $destination: String!) {
    mergeCarts(source_cart_id: $source, destination_cart_id: $destination) { id }
  }
`;

export const CUSTOMER_QUERY = gql`
  query Customer {
    customer {
      id
      firstname
      lastname
      email
      gender
      date_of_birth
      is_subscribed
      addresses { ${ADDRESS_FIELDS} }
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) { customer { firstname } }
  }
`;

export const CREATE_ADDRESS = gql`
  mutation CreateAddress($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) { id }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress($id: Int!, $input: CustomerAddressInput!) {
    updateCustomerAddress(id: $id, input: $input) { id }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation DeleteAddress($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`;

export const CUSTOMER_ORDERS_QUERY = gql`
  query CustomerOrders($pageSize: Int, $currentPage: Int) {
    customer {
      orders(pageSize: $pageSize, currentPage: $currentPage, sort: { sort_field: CREATED_AT, sort_direction: DESC }) {
        items { ${ORDER_FIELDS} }
        total_count
        page_info { current_page page_size total_pages }
      }
    }
  }
`;

export const CUSTOMER_ORDER_QUERY = gql`
  query CustomerOrder($number: String!) {
    customer {
      orders(filter: { number: { eq: $number } }) {
        items { ${ORDER_FIELDS} }
      }
    }
  }
`;

export const WISHLIST_QUERY = gql`
  query Wishlist {
    customer {
      wishlists {
        id
        items_v2 { items { id product { ${PRODUCT_CARD_FIELDS} } } }
      }
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation RemoveFromWishlist($wishlistId: ID!, $itemId: ID!) {
    removeProductsFromWishlist(wishlistId: $wishlistId, wishlistItemsIds: [$itemId]) {
      wishlist { id }
    }
  }
`;

export const ADD_WISHLIST_ITEMS_TO_CART = gql`
  mutation AddWishlistItemsToCart($wishlistId: ID!, $itemIds: [ID!]!) {
    addWishlistItemsToCart(wishlistId: $wishlistId, wishlistItemIds: $itemIds) {
      status
      add_wishlist_items_to_cart_user_errors { message }
    }
  }
`;

export const UPDATE_NEWSLETTER = gql`
  mutation UpdateNewsletter($subscribed: Boolean!) {
    updateCustomerV2(input: { is_subscribed: $subscribed }) { customer { is_subscribed } }
  }
`;

export const CUSTOMER_REVIEWS_QUERY = gql`
  query CustomerReviews($pageSize: Int, $currentPage: Int) {
    customer {
      reviews(pageSize: $pageSize, currentPage: $currentPage) {
        items {
          created_at
          summary
          text
          average_rating
          ratings_breakdown { name value }
          product { name url_key small_image { url } }
        }
        page_info { current_page page_size total_pages }
      }
    }
  }
`;

export const DOWNLOADABLE_PRODUCTS_QUERY = gql`
  query CustomerDownloadableProducts {
    customerDownloadableProducts {
      items { date download_url order_increment_id remaining_downloads status }
    }
  }
`;

export const PAYMENT_TOKENS_QUERY = gql`
  query CustomerPaymentTokens {
    customerPaymentTokens {
      items { public_hash payment_method_code type details }
    }
  }
`;

export const DELETE_PAYMENT_TOKEN = gql`
  mutation DeletePaymentToken($hash: String!) {
    deletePaymentToken(public_hash: $hash) { result }
  }
`;

/** Reward points (Adobe Commerce schema; adjust if the store uses a rewards extension). */
export const REWARD_POINTS_QUERY = gql`
  query CustomerRewardPoints {
    customer {
      reward_points {
        balance { points money { value } }
        balance_history { date change_reason points_change balance { points } }
      }
    }
  }
`;

export const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($wishlistId: ID!, $sku: String!) {
    addProductsToWishlist(wishlistId: $wishlistId, wishlistItems: [{ sku: $sku, quantity: 1 }]) {
      wishlist { id }
      user_errors { message }
    }
  }
`;

/** Magento 2.4.7+ customer order cancellation (Sales › Order cancellation must be enabled in admin). */
export const CANCEL_ORDER = gql`
  mutation CancelOrder($orderId: ID!, $reason: String!) {
    cancelOrder(input: { order_id: $orderId, reason: $reason }) {
      error
      errorV2 { code message }
      order { status }
    }
  }
`;
