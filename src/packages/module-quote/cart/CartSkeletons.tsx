import { Shimmer } from "@/packages/module-common/Shimmer";

export function SummarySkeleton({ withItems = false }: { withItems?: boolean }) {
  return (
    <div className="space-y-5 rounded-[6px] border border-card-border bg-white p-5">
      <Shimmer width={160} height={18} rounded="rounded" />
      {withItems &&
        Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Shimmer width={56} height={56} rounded="rounded-[4px]" className="shrink-0" />
            <div className="flex-1 space-y-2">
              <Shimmer height={12} rounded="rounded" />
              <Shimmer width="60%" height={12} rounded="rounded" />
            </div>
            <Shimmer width={64} height={14} rounded="rounded" className="shrink-0" />
          </div>
        ))}
      <div className="space-y-2">
        <Shimmer width="70%" height={13} rounded="rounded" />
        <Shimmer height={6} rounded="rounded-full" />
      </div>
      <Shimmer height={40} rounded="rounded-[4px]" />
      <div className="space-y-3">
        {[0, 1].map((i) => (
          <div key={i} className="flex justify-between">
            <Shimmer width={110} height={14} rounded="rounded" />
            <Shimmer width={80} height={14} rounded="rounded" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-card-border pt-3">
        <Shimmer width={70} height={18} rounded="rounded" />
        <Shimmer width={120} height={24} rounded="rounded" />
      </div>
      <Shimmer height={48} rounded="rounded-[4px]" />
    </div>
  );
}

function CartRowSkeleton() {
  return (
    <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-x-3 gap-y-3 py-4 md:grid-cols-[minmax(0,1fr)_120px_130px_120px] md:items-center md:gap-4">
      <div className="row-span-2 md:row-span-1 md:flex md:items-center md:gap-4">
        <Shimmer width={88} height={88} rounded="rounded-[4px]" className="shrink-0" />
        <div className="hidden flex-1 space-y-2 md:block">
          <Shimmer height={14} rounded="rounded" />
          <Shimmer width="60%" height={14} rounded="rounded" />
          <Shimmer width={90} height={12} rounded="rounded" />
        </div>
      </div>
      <div className="space-y-2 md:hidden">
        <Shimmer height={13} rounded="rounded" />
        <Shimmer width="70%" height={13} rounded="rounded" />
        <Shimmer width={80} height={14} rounded="rounded" />
      </div>
      <Shimmer width={90} height={16} rounded="rounded" className="ml-auto hidden md:block" />
      <div className="col-start-2 flex items-center justify-between md:col-start-auto md:justify-center">
        <Shimmer width={104} height={32} rounded="rounded-[4px]" />
        <Shimmer width={80} height={16} rounded="rounded" className="md:hidden" />
      </div>
      <Shimmer width={90} height={16} rounded="rounded" className="ml-auto hidden md:block" />
    </div>
  );
}

export function CartPageSkeleton() {
  return (
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]" aria-busy="true" aria-label="Loading cart">
      <div>
        <div className="mb-3 hidden border-b-2 border-card-border pb-2 md:block">
          <Shimmer width="100%" height={14} rounded="rounded" />
        </div>
        <div className="divide-y divide-card-border">
          {Array.from({ length: 3 }).map((_, i) => (
            <CartRowSkeleton key={i} />
          ))}
        </div>
      </div>
      <SummarySkeleton />
    </div>
  );
}

export function CartDrawerSkeleton() {
  return (
    <div className="flex-1 divide-y divide-card-border px-4 sm:px-5" aria-busy="true" aria-label="Loading cart">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3 py-4">
          <Shimmer width={88} height={88} rounded="rounded-[4px]" className="shrink-0" />
          <div className="flex-1 space-y-2">
            <Shimmer height={13} rounded="rounded" />
            <Shimmer width="70%" height={13} rounded="rounded" />
            <div className="flex items-end justify-between pt-4">
              <Shimmer width={104} height={32} rounded="rounded-[4px]" />
              <Shimmer width={70} height={16} rounded="rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
