import { REWARD_EARN_PERCENT, REWARD_POINTS_PER_TAKA } from "@/lib/config";

/** Points earned for spending `amount` TK on products (estimate shown before checkout; the backend awards the real value). */
export function estimateEarnPoints(amount: number): number {
  return Math.max(0, Math.floor(((amount * REWARD_EARN_PERCENT) / 100) * REWARD_POINTS_PER_TAKA));
}

export const pointsToTaka = (points: number) => points / REWARD_POINTS_PER_TAKA;
