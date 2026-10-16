import { Container } from "@/packages/module-common/Container";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { CAROUSEL_DESK_WIDTH } from "@/packages/module-common/carousel/CarouselNavButtons";

interface ProductGridSkeletonProps {
  title?: string;
  count?: number;
  /** Same top margin as the section it stands in for. */
  className?: string;
}

export function ProductGridSkeleton({
  title = "Loading Deals...",
  count = 6,
  className = "mt-[14px]",
}: ProductGridSkeletonProps) {
  return (
    <section className={`w-full ${className}`}>
      <Container className="desk:max-w-[1298px]">
        <div className={`w-full ${CAROUSEL_DESK_WIDTH}`}>
          <div className="flex items-center justify-between mb-[10px] w-full">
            <h2 className="text-[clamp(13px,0.75vw+10.3px,18px)] font-black uppercase tracking-[0.1em] text-brand-dark leading-tight">
              {title}
            </h2>
            <Shimmer width={209} height={43} rounded="rounded-[4px]" />
          </div>

          <div className="flex gap-[11px] overflow-x-auto no-scrollbar w-full pb-2">
            {Array.from({ length: count }).map((_, idx) => (
              <div
                key={idx}
                className="w-[207px] h-[374px] p-[12px_4px_10px_4px] bg-white border border-card-border rounded-[6px] flex flex-col justify-between shrink-0 select-none shadow-xs"
              >
                <div className="w-[182px] h-[182px] mx-auto">
                  <Shimmer width={182} height={182} rounded="rounded-[4px]" />
                </div>

                <div className="flex items-center ml-[9px] mt-[6px] gap-[6px]">
                  <div className="flex items-center gap-[4px] w-[92px]">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <Shimmer
                        key={sIdx}
                        width={14}
                        height={14}
                        rounded="rounded-xs"
                      />
                    ))}
                  </div>
                  <Shimmer width={60} height={12} rounded="rounded" />
                </div>

                <div className="flex flex-col gap-1.5 ml-[9px] mt-[6px]">
                  <Shimmer width={182} height={12} rounded="rounded" />
                  <Shimmer width={130} height={12} rounded="rounded" />
                </div>

                <div className="flex items-center gap-2 ml-[8px] mt-[6px]">
                  <Shimmer width={70} height={16} rounded="rounded" />
                  <Shimmer width={55} height={12} rounded="rounded" />
                </div>

                <div className="w-[199px] h-[35px] mx-auto mt-[8px]">
                  <Shimmer width={199} height={35} rounded="rounded-[6px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ProductGridSkeleton;
