import clsx from "clsx";
import { Shimmer } from "@/packages/module-common/Shimmer";

/** Same geometry as ProductCard to avoid layout shift. */
export function ProductCardSkeleton({ layout = "fixed" }: { layout?: "fixed" | "fluid" }) {
  const fluid = layout === "fluid";
  const inset = fluid ? "ml-[9px] mr-[8px]" : "ml-[9px]";

  return (
    <div
      aria-hidden="true"
      className={clsx(
        "card-surface flex flex-col p-[11px_3px]",
        fluid ? "h-full w-full min-w-0" : "w-[207px] h-[374px] shrink-0",
      )}
    >
      <div className={clsx(inset, fluid ? "aspect-square" : "w-[182px] h-[182px]")}>
        <Shimmer rounded="rounded-none" />
      </div>
      <div className={clsx("mt-[7px] flex h-[14px] items-center gap-[5px]", inset)}>
        <Shimmer width={92} height={14} rounded="rounded" />
        <Shimmer width={70} height={11} rounded="rounded" />
      </div>
      <div className={clsx("mt-[7px] flex h-[56.5px] flex-col gap-[5px]", inset)}>
        <Shimmer height={11} rounded="rounded" />
        <Shimmer height={11} rounded="rounded" />
        <Shimmer width="60%" height={11} rounded="rounded" />
      </div>
      <div className={clsx("mt-[6px] flex gap-[6px]", inset, fluid ? "h-[18px] items-center max-[495px]:h-[36px] max-[495px]:flex-col max-[495px]:items-start" : "items-center")}>
        <Shimmer width={70} height={18} rounded="rounded" />
        <Shimmer width={64} height={11} rounded="rounded" />
      </div>
      <div className={clsx("mt-[3px]", inset)}>
        <Shimmer width={110} height={10.8} rounded="rounded" />
      </div>
      <div className={clsx("mt-[4px]", inset, !fluid && "w-[181px]")}>
        <Shimmer height={40} rounded="rounded-[4px]" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
