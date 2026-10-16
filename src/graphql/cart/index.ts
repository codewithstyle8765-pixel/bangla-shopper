import { gql } from "@apollo/client";

const CART_FIELDS = /* GraphQL */ `
  id
  total_quantity
  applied_coupons { code }
  prices {
    subtotal_including_tax { value }
    discounts { amount { value } }
  }
  items {
    uid
    quantity
    product {
      sku
      name
      url_key
      country_of_manufacture
      small_image { url }
      price_range { minimum_price { regular_price { value } } }
    }
    prices { price { value } }
    ... on ConfigurableCartItem {
      configurable_options { option_label value_label }
      configured_variant { price_range { minimum_price { regular_price { value } } } }
    }
  }
`;

export const CART_QUERY = gql`
  query Cart($cartId: String!) {
    cart(cart_id: $cartId) { ${CART_FIELDS} }
  }
`;

export const CUSTOMER_CART_QUERY = gql`
  query CustomerCart {
    customerCart { ${CART_FIELDS} }
  }
`;

export const CREATE_EMPTY_CART = gql`
  mutation CreateEmptyCart {
    createEmptyCart
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($cartId: String!, $sku: String!, $quantity: Float!, $selectedOptions: [ID!]) {
    addProductsToCart(cartId: $cartId, cartItems: [{ sku: $sku, quantity: $quantity, selected_options: $selectedOptions }]) {
      cart { ${CART_FIELDS} }
      user_errors { message }
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($cartId: String!, $uid: ID!, $quantity: Float!) {
    updateCartItems(input: { cart_id: $cartId, cart_items: [{ cart_item_uid: $uid, quantity: $quantity }] }) {
      cart { ${CART_FIELDS} }
    }
  }
`;

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($cartId: String!, $uid: ID!) {
    removeItemFromCart(input: { cart_id: $cartId, cart_item_uid: $uid }) {
      cart { ${CART_FIELDS} }
    }
  }
`;

export const APPLY_COUPON = gql`
  mutation ApplyCoupon($cartId: String!, $code: String!) {
    applyCouponToCart(input: { cart_id: $cartId, coupon_code: $code }) {
      cart { ${CART_FIELDS} }
    }
  }
`;

export const REMOVE_COUPON = gql`
  mutation RemoveCoupon($cartId: String!) {
    removeCouponFromCart(input: { cart_id: $cartId }) {
      cart { ${CART_FIELDS} }
    }
  }
`;
