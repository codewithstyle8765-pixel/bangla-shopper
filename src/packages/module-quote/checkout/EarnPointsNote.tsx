import { estimateEarnPoints } from "@/utils/rewards";
import { RewardCoin } from "@/packages/module-common/icons/RewardCoin";

/**
 * "Checkout now and earn N Reward Points" (estimate from the reward rules; guests see that it needs an account).
 * Coin + text are one unit centred in the card, so wrapped lines stay aligned beside the coin.
 */
export function EarnPointsNote({ amount, signedIn }: { amount: number; signedIn: boolean }) {
  const points = estimateEarnPoints(amount);
  if (points <= 0) return null;

  return (
    <div className="flex justify-center rounded-[6px] bg-brand-surface px-3 py-2.5">
      <div className="inline-flex max-w-full items-center gap-2.5">
        <RewardCoin className="h-6 w-6" />
        <p className="min-w-0 text-left text-[13px] leading-[1.4] text-brand-dark">
          Checkout now and earn <strong className="font-bold text-brand-coral">{points.toLocaleString("en-US")} Reward Points</strong> for this
          order.
          {!signedIn && <span className="block text-[11px] leading-[1.4] text-footer-text">Applies only to registered customers, may vary when logged in.</span>}
        </p>
      </div>
    </div>
  );
}

export default EarnPointsNote;
