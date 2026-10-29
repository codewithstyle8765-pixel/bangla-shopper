"use client";

import { useState } from "react";
import clsx from "clsx";
import type { RewardTier, RewardTierStatus } from "@/types/storefront";
import { NextImage } from "@/packages/module-common/NextImage";
import { Modal } from "@/packages/module-common/Modal";
import { RewardCoin } from "@/packages/module-common/icons/RewardCoin";
import { AccountSection } from "./AccountUi";

const points = (n: number) => n.toLocaleString("en-US");

/** Where `earned` sits on a track with the tiers spaced evenly: 0-100. */
function tierProgress(tiers: RewardTier[], earned: number) {
  if (tiers.length < 2) return 100;
  const next = tiers.findIndex((t) => earned < t.minPoints);
  if (next === -1) return 100;
  if (next === 0) return 0;
  const from = tiers[next - 1].minPoints;
  const part = (earned - from) / (tiers[next].minPoints - from);
  return ((next - 1 + part) / (tiers.length - 1)) * 100;
}

/**
 * Silver → Gold → Platinum: badges on a track filled up to the points earned so far. The name of a tier the customer
 * has reached opens its description (Magento admin, sanitised on the server) in a dialog.
 */
export function TierProgress({ status, earned }: { status: RewardTierStatus; earned: number }) {
  const { tiers, current } = status;
  const next = tiers.find((t) => earned < t.minPoints);
  const [shown, setShown] = useState<RewardTier | null>(null);

  return (
    <AccountSection title="Membership Tier" className="[&>div:first-child]:justify-center">
      {/* Kept together in the middle rather than spread to the card's edges. */}
      <div className="relative mx-auto max-w-[560px] pt-1">
        {/* From the first badge's centre to the last one's. */}
        <div
          aria-hidden="true"
          className="absolute top-[calc(1.75rem+1px)] h-1.5 rounded-full bg-card-border sm:top-[calc(2rem+1px)]"
          style={{ left: `${50 / tiers.length}%`, right: `${50 / tiers.length}%` }}
        >
          <div className="h-full rounded-full bg-brand-coral" style={{ width: `${tierProgress(tiers, earned)}%` }} />
        </div>
        <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${tiers.length}, minmax(0, 1fr))` }}>
          {tiers.map((t, i) => {
            const isCurrent = t.name === current?.name;
            const nameClass = clsx("mt-2 text-[12px] font-bold leading-[1.3] sm:text-[13px]", isCurrent ? "text-brand-coral" : "text-brand-dark");
            return (
              <li key={t.name} className="flex flex-col items-center text-center" aria-current={isCurrent ? "step" : undefined}>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white sm:h-16 sm:w-16">
                  {t.logo ? (
                    <NextImage src={t.logo} alt="" width={128} height={128} className="h-full w-full object-contain" />
                  ) : (
                    <RewardCoin className="h-10 w-10" />
                  )}
                </span>
                {/* Only a tier the customer has reached opens its message. */}
                {t.description && earned >= t.minPoints ? (
                  <button
                    type="button"
                    onClick={() => setShown(t)}
                    aria-haspopup="dialog"
                    className={clsx(nameClass, "cursor-pointer underline decoration-dotted underline-offset-[3px] transition-colors hover:text-brand-coral")}
                  >
                    {t.name}
                  </button>
                ) : (
                  <span className={nameClass}>{t.name}</span>
                )}
                <span className="mt-1 rounded-full bg-brand-coral px-2 py-0.5 text-[11px] font-bold text-white tabular-nums">
                  {points(t.minPoints)}
                  {i === tiers.length - 1 ? "+" : ""}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="mt-4 text-center text-[13px] text-footer-text">
        {current && (
          <>
            Your current tier is <strong className="text-brand-dark">{current.name}</strong>.{" "}
          </>
        )}
        {next ? (
          <>
            Earn <strong className="text-brand-dark">{points(next.minPoints - earned)}</strong> more points to reach {next.name}.
          </>
        ) : (
          "You have reached the highest tier."
        )}
      </p>

      <Modal open={shown !== null} onClose={() => setShown(null)} title={shown?.name ?? ""} size="md">
        {shown?.description && (
          <p className="text-[14px] leading-[1.7] text-footer-text [&_strong]:font-semibold [&_strong]:text-brand-dark" dangerouslySetInnerHTML={{ __html: shown.description }} />
        )}
      </Modal>
    </AccountSection>
  );
}

export default TierProgress;
