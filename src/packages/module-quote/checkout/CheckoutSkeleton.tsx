import { Shimmer } from "@/packages/module-common/Shimmer";
import { SummarySkeleton } from "@/packages/module-quote/cart/CartSkeletons";

function StepSkeleton({ fields, options }: { fields?: number; options?: number }) {
  return (
    <div className="rounded-[6px] border border-card-border bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-3">
        <Shimmer width={28} height={28} rounded="rounded-full" className="shrink-0" />
        <Shimmer width={190} height={18} rounded="rounded" />
      </div>
      {fields ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: fields }).map((_, i) => (
            <div key={i} className={i === 2 ? "space-y-1.5 sm:col-span-2" : "space-y-1.5"}>
              <Shimmer width={90} height={13} rounded="rounded" />
              <Shimmer height={44} rounded="rounded-[4px]" />
            </div>
          ))}
        </div>
      ) : null}
      {options ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: options }).map((_, i) => (
            <Shimmer key={i} height={64} rounded="rounded-[6px]" />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CheckoutSkeleton() {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]" aria-busy="true" aria-label="Loading checkout">
      <div className="space-y-4">
        <Shimmer height={48} rounded="rounded-[6px]" className="lg:hidden" />
        <StepSkeleton fields={9} />
        <StepSkeleton options={2} />
        <StepSkeleton options={3} />
      </div>
      <div className="hidden lg:block">
        <SummarySkeleton withItems />
      </div>
    </div>
  );
}

export default CheckoutSkeleton;
