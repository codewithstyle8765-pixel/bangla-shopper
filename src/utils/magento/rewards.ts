import { APPLY_REWARD_POINTS, CART_REWARD_POINTS, CUSTOMER_REWARD_TIER, REMOVE_REWARD_POINTS } from "@/graphql/rewards";
import { authContext, graphqlMutate, graphqlRequestNoCache } from "@/lib/graphql-fetch";
import type { CheckoutRewards, RewardTierStatus } from "@/types/storefront";
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

type RewardTierData = {
  mstRewardsTiers: Array<{ name?: string | null; min_earn_points?: number | null; tier_logo?: string | null; is_current_tier?: boolean | null } | null> | null;
  customer?: {
    mstRewardPointsBalance?: {
      transactions: Array<{ transaction_id?: number | null; code?: string | null; comment?: string | null; amount?: number | null; is_activated?: boolean | null } | null>;
    } | null;
  } | null;
};

/** Order number from a transaction ("Order #101742203"), else its comment. */
const pendingLabel = (comment?: string | null, code?: string | null) => {
  const order = `${comment ?? ""} ${code ?? ""}`.match(/#?(\d{6,})/)?.[1];
  return order ? `#${order}` : comment || code || "Order";
};

/** Membership tier and pending points; empty when signed out or the API fails. */
export async function getRewardTier(): Promise<RewardTierStatus> {
  const empty: RewardTierStatus = { tiers: [], current: null, pending: [] };
  const token = await getCustomerToken();
  if (!token) return empty;
  try {
    const data = await graphqlRequestNoCache<RewardTierData>(CUSTOMER_REWARD_TIER, undefined, { context: authContext(token) });
    const list = (data.mstRewardsTiers ?? []).flatMap((t) => (t?.name ? [t] : []));
    const tiers = list
      .map((t) => ({ name: t.name ?? "", minPoints: t.min_earn_points ?? 0, logo: t.tier_logo ?? undefined }))
      .sort((a, b) => a.minPoints - b.minPoints);
    const currentName = list.find((t) => t.is_current_tier)?.name;
    const pending = (data.customer?.mstRewardPointsBalance?.transactions ?? []).flatMap((t) =>
      t && !t.is_activated && (t.amount ?? 0) > 0 ? [{ id: String(t.transaction_id), label: pendingLabel(t.comment, t.code), points: t.amount ?? 0 }] : [],
    );
    return { tiers, current: tiers.find((t) => t.name === currentName) ?? null, pending };
  } catch (error) {
    console.error("[magento] reward tier failed", error);
    return empty;
  }
}
