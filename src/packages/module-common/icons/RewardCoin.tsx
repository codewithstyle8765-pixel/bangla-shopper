import NextImage from "next/image";
import clsx from "clsx";

/**
 * Reward point image (replaces the old SVG coin everywhere across the UI:
 * account menu, drawer, dashboard, tier progress, and checkout).
 * The image renders at the same size as the coin, with a slightly larger size on desktop (`lg:`).
 */
export function RewardCoin({
  className,
  alt = "Reward Points",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <NextImage
      src="/assets/images/reward_point.webp"
      alt={alt}
      width={144}
      height={96}
      unoptimized
      className={clsx("aspect-[3/2] w-auto shrink-0 object-contain", className)}
    />
  );
}

export const RewardPointImage = RewardCoin;
export default RewardCoin;
