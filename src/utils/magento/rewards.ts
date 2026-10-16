import { APPLY_REWARD_POINTS, CART_REWARD_POINTS, REMOVE_REWARD_POINTS } from "@/graphql/rewards";
import { authContext, graphqlMutate, graphqlRequestNoCache } from "@/lib/graphql-fetch";
import type { CheckoutRewards } from "@/types/storefront";
import { getCustomerToken } from "@/utils/session";
import { pointsToTaka } from "@/utils/rewards";
import { getCart, resolveCartId } from "./cart";
import { getRewardPoints } from "./customer";

/** All reward-point calls for checkout live here (see src/graphql/rewards for the schema to confirm). */

type RewardCartData = { applied_reward_points?: { money: { value: number }; points: number } | null };

async function requireToken() {
  const token = await getCustomerToken();
  if (!token) throw new Error("Please sign in to use reward points.");
  return token;
}

/** Balance, the most points this cart can take, and what is applied now. */
export async function getCheckoutRewards(): Promise<CheckoutRewards> {
  const token = await requireToken();
  const [rewards, cartId, cart] = await Promise.all([getRewardPoints(), resolveCartId(false), getCart()]);
  let applied: CheckoutRewards["applied"] = null;
  if (cartId) {
    const data = await graphqlRequestNoCache<{ cart: RewardCartData }>(CART_REWARD_POINTS, { cartId }, { context: authContext(token) });
    const a = data.cart.applied_reward_points;
    if (a && a.points > 0) applied = { points: a.points, amount: a.money.value };
  }
  const payable = Math.max(0, cart.subtotal - cart.discount);
  const maxPoints = Math.max(0, Math.min(rewards.balance, Math.floor(payable / pointsToTaka(1))));
  return { balance: rewards.balance, balanceValue: rewards.balanceValue, maxPoints, applied };
}

/** Spend `points` on the cart; 0 removes them. */
export async function setRewardPoints(points: number): Promise<CheckoutRewards> {
  const token = await requireToken();
  const cartId = await resolveCartId(false);
  if (!cartId) throw new Error("Your cart is empty.");
  if (points > 0) await graphqlMutate(APPLY_REWARD_POINTS, { cartId, points }, token);
  else await graphqlMutate(REMOVE_REWARD_POINTS, { cartId }, token);
  return getCheckoutRewards();
}
