import { Container } from "@/packages/module-common/Container";
import { Shimmer } from "@/packages/module-common/Shimmer";

export function ProductDetailSkeleton() {
  return (
    <Container className="pt-[15px]" aria-busy="true" aria-label="Loading product">
      <Shimmer width={320} height={18} rounded="rounded" className="mb-[11px] max-w-full" />
      <div className="flex flex-col lg:flex-row gap-[13px]">
        <div className="flex w-full lg:w-[50%] xl:w-[674px] gap-[15px]">
          <div className="hidden md:flex flex-col gap-[15px] w-[88px] shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Shimmer key={i} width={88} height={88} rounded="rounded-none" />
            ))}
          </div>
          <div className="flex-1 min-w-0 aspect-square">
            <Shimmer rounded="rounded-none" />
          </div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <Shimmer height={22} rounded="rounded" />
          <Shimmer width="70%" height={22} rounded="rounded" />
          <Shimmer width="55%" height={16} rounded="rounded" />
          <Shimmer width="40%" height={34} rounded="rounded" className="mt-3" />
          <Shimmer height={40} rounded="rounded" className="mt-3" />
          <Shimmer height={200} rounded="rounded-[8px]" className="mt-3" />
        </div>
      </div>
    </Container>
  );
}

export default ProductDetailSkeleton;
