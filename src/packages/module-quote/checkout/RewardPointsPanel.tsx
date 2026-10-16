"use client";

import { useEffect, useId, useState } from "react";
import type { CheckoutRewards } from "@/types/storefront";
import { formatTk } from "@/utils/format";
import { pointsToTaka } from "@/utils/rewards";
import { RewardCoin } from "@/packages/module-common/icons/RewardCoin";

interface RewardPointsPanelProps {
  rewards: CheckoutRewards;
  pending: boolean;
  error: string | null;
  onApply: (points: number) => void;
  onCancel: () => void;
}

const fmt = (n: number) => n.toLocaleString("en-US");

/** "Apply reward points": amount field + "Use maximum", then Apply / Remove (signed-in customers with a balance). */
export function RewardPointsPanel({ rewards, pending, error, onApply, onCancel }: RewardPointsPanelProps) {
  const uid = useId();
  const max = rewards.maxPoints;
  const [points, setPoints] = useState(max);
  const [useMax, setUseMax] = useState(true);

  useEffect(() => {
    setPoints((p) => (useMax ? max : Math.min(p, max)));
  }, [max, useMax]);

  const set = (value: number) => {
    const next = Math.max(0, Math.min(max, Math.round(value) || 0));
    setPoints(next);
    setUseMax(next === max);
  };

  return (
    <section aria-labelledby={`${uid}-title`} className="border-y border-card-border py-4">
      <div className="flex items-center justify-between gap-2">
        <h3 id={`${uid}-title`} className="text-[12px] font-bold uppercase tracking-[0.08em] text-brand-dark">
          Reward Points
        </h3>
        {rewards.applied && (
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-brand-dark">
            Applied
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2 text-[13px] text-footer-text">
        <RewardCoin className="h-4.5 w-4.5 shrink-0" />
        <span>
          Available balance: <strong className="font-semibold text-brand-dark">{fmt(rewards.balance)} points</strong> ({formatTk(rewards.balanceValue)})
        </span>
      </div>

      {rewards.applied ? (
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] text-brand-dark">
              <strong className="font-semibold">{fmt(rewards.applied.points)} points</strong> applied
            </p>
            <p className="mt-0.5 text-[12px] text-footer-text">
              Saving <strong className="font-semibold text-brand-dark">{formatTk(rewards.applied.amount)}</strong> on this order
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="h-8 shrink-0 cursor-pointer rounded-[4px] border border-card-border bg-white px-3 text-[12px] font-medium text-brand-dark transition-colors hover:border-brand-dark hover:bg-neutral-50 disabled:cursor-wait disabled:opacity-60"
          >
            {pending ? "Removing..." : "Remove"}
          </button>
        </div>
      ) : max <= 0 ? (
        <p className="mt-2.5 text-[12px] text-footer-text">Points can be used once your cart has products.</p>
      ) : (
        <div className="mt-3">
          <label htmlFor={`${uid}-points`} className="block text-[12px] font-medium text-brand-dark">
            Points to spend
          </label>
          <div className="mt-1.5 flex items-center gap-3">
            <input
              id={`${uid}-points`}
              inputMode="numeric"
              value={points ? String(points) : ""}
              onChange={(e) => set(Number(e.target.value.replace(/\D/g, "")))}
              placeholder="0"
              className="h-9.5 w-[110px] shrink-0 rounded-[4px] border border-card-border bg-white px-3 text-[16px] tabular-nums text-brand-dark outline-none transition-colors focus:border-brand-dark lg:text-[13px]"
            />
            <span className="text-[13px] text-footer-text">
              = <strong className="font-semibold text-brand-dark">{formatTk(pointsToTaka(points))}</strong> off
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={max}
            step={1}
            value={points}
            onChange={(e) => set(Number(e.target.value))}
            aria-label="Points to spend slider"
            className="mt-3 h-1.5 w-full cursor-pointer accent-brand-coral"
          />

          <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-[13px] text-brand-dark select-none">
            <input
              type="checkbox"
              checked={useMax}
              onChange={(e) => {
                const checked = e.target.checked;
                setUseMax(checked);
                if (checked) setPoints(max);
              }}
              className="h-4 w-4 cursor-pointer rounded-[3px] accent-brand-coral"
            />
            <span>
              Use maximum <strong className="font-semibold">{fmt(max)} pts</strong>
            </span>
          </label>

          <button
            type="button"
            onClick={() => onApply(points)}
            disabled={pending || points <= 0}
            className="mt-3 flex h-10 w-full cursor-pointer items-center justify-center rounded-[4px] bg-brand-dark text-[13px] font-semibold text-white transition-colors hover:bg-brand-coral disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Applying..." : `Apply ${fmt(points)} Points`}
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-2 text-[12px] text-brand-alert">
          {error}
        </p>
      )}
    </section>
  );
}

export default RewardPointsPanel;
