import { gql } from "@apollo/client";

/**
 * Reward points GraphQL (cart side). The client's store uses a reward-points extension whose checkout UI matches
 * Amasty Reward Points ("Apply Reward Points", amount + "Use maximum"). Confirm the real schema with the backend and
 * change only this file plus src/utils/magento/rewards.ts. Kept out of the main cart query so a backend without the
 * module never breaks the cart.
 */
const REWARD_FIELDS = /* GraphQL */ `applied_reward_points { money { value } points }`;

export const CART_REWARD_POINTS = gql`
  query CartRewardPoints($cartId: String!) {
    cart(cart_id: $cartId) { ${REWARD_FIELDS} }
  }
`;

/** Spend `points` (customer-chosen amount, capped by the backend). */
export const APPLY_REWARD_POINTS = gql`
  mutation ApplyRewardPoints($cartId: String!, $points: Float!) {
    applyRewardPointsToCart(cartId: $cartId, points: $points) { cart { ${REWARD_FIELDS} } }
  }
`;

export const REMOVE_REWARD_POINTS = gql`
  mutation RemoveRewardPoints($cartId: String!) {
    removeRewardPointsFromCart(cartId: $cartId) { cart { ${REWARD_FIELDS} } }
  }
`;

/** Mirasvit Rewards: the tier ladder (current tier flagged) and the customer's transactions; pending = not activated yet. */
export const CUSTOMER_REWARD_TIER = gql`
  query CustomerRewardTier {
    mstRewardsTiers { name description min_earn_points tier_logo is_current_tier }
    customer {
      mstRewardPointsBalance {
        transactions { transaction_id code comment amount is_activated created_at }
      }
    }
  }
`;
