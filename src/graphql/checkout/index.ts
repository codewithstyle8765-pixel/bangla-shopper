import { gql } from "@apollo/client";
import { ORDER_FIELDS } from "@/graphql/customer";

export const SET_GUEST_EMAIL = gql`
  mutation SetGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart { id }
    }
  }
`;

export const SET_SHIPPING_ADDRESS = gql`
  mutation SetShippingAddress($cartId: String!, $shippingAddress: ShippingAddressInput!) {
    setShippingAddressesOnCart(input: { cart_id: $cartId, shipping_addresses: [$shippingAddress] }) {
      cart {
        shipping_addresses {
          available_shipping_methods {
            carrier_code
            method_code
            carrier_title
            method_title
            amount { value }
          }
        }
        available_payment_methods { code title }
      }
    }
  }
`;

export const SET_BILLING_ADDRESS = gql`
  mutation SetBillingAddress($cartId: String!, $billingAddress: BillingAddressInput!) {
    setBillingAddressOnCart(input: { cart_id: $cartId, billing_address: $billingAddress }) {
      cart { id }
    }
  }
`;

export const SET_SHIPPING_METHOD = gql`
  mutation SetShippingMethod($cartId: String!, $carrier: String!, $method: String!) {
    setShippingMethodsOnCart(
      input: { cart_id: $cartId, shipping_methods: [{ carrier_code: $carrier, method_code: $method }] }
    ) {
      cart { id }
    }
  }
`;

export const SET_PAYMENT_METHOD = gql`
  mutation SetPaymentMethod($cartId: String!, $code: String!) {
    setPaymentMethodOnCart(input: { cart_id: $cartId, payment_method: { code: $code } }) {
      cart { id }
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation PlaceOrder($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      orderV2 { ${ORDER_FIELDS} }
      errors { message }
    }
  }
`;
