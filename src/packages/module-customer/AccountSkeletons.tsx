import { Shimmer } from "@/packages/module-common/Shimmer";

function TitleSkeleton({ withDescription = false }: { withDescription?: boolean }) {
  return (
    <div className="mb-5 space-y-2">
      <Shimmer width={220} height={24} rounded="rounded" className="max-w-full" />
      {withDescription && <Shimmer width={420} height={14} rounded="rounded" className="max-w-full" />}
    </div>
  );
}

function SectionSkeleton({ children, titleWidth = 160 }: { children: React.ReactNode; titleWidth?: number }) {
  return (
    <div className="rounded-[6px] border border-card-border bg-white p-4 sm:p-5">
      <Shimmer width={titleWidth} height={18} rounded="rounded" className="mb-4 max-w-full" />
      {children}
    </div>
  );
}

function OrdersSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <>
      <div className="hidden space-y-3 md:block">
        <Shimmer height={18} rounded="rounded" />
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-[1.2fr_1fr_0.5fr_1fr_1fr_0.8fr] items-center gap-4 py-1">
            {Array.from({ length: 6 }).map((__, j) => (
              <Shimmer key={j} height={14} rounded="rounded" />
            ))}
          </div>
        ))}
      </div>
      <div className="space-y-3 md:hidden">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-[6px] border border-card-border p-4">
            <div className="flex justify-between">
              <Shimmer width={110} height={16} rounded="rounded" />
              <Shimmer width={76} height={22} rounded="rounded-full" />
            </div>
            <div className="flex justify-between">
              <Shimmer width={150} height={13} rounded="rounded" />
              <Shimmer width={70} height={13} rounded="rounded" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** Footer of ListPager: summary on the left, per-page + arrows on the right (stacks on phones). */
function PagerSkeleton() {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-card-border pt-4">
      <Shimmer width={190} height={16} rounded="rounded" />
      <div className="flex w-full items-center justify-between gap-4 sm:w-auto">
        <Shimmer width={150} height={36} rounded="rounded-[4px]" />
        <Shimmer width={120} height={36} rounded="rounded-[4px]" />
      </div>
    </div>
  );
}

function AddressLinesSkeleton() {
  return (
    <div className="space-y-2">
      <Shimmer width="55%" height={15} rounded="rounded" />
      {[85, 70, 60, 45].map((w) => (
        <Shimmer key={w} width={`${w}%`} height={13} rounded="rounded" />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-w-0 space-y-5" aria-busy="true">
      <TitleSkeleton withDescription />
      <div className="overflow-hidden rounded-[6px] border border-card-border lg:hidden">
        <div className="flex items-center gap-3 p-4">
          <Shimmer width={48} height={48} rounded="rounded-full" className="shrink-0" />
          <div className="flex-1 space-y-2">
            <Shimmer width="55%" height={16} rounded="rounded" />
            <Shimmer width="80%" height={12} rounded="rounded" />
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-card-border px-4 py-3">
          <Shimmer width={130} height={20} rounded="rounded" />
          <Shimmer width={80} height={16} rounded="rounded" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 max-lg:hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-[6px] border border-card-border p-4">
            <Shimmer width="45%" height={24} rounded="rounded" />
            <Shimmer width="80%" height={12} rounded="rounded" />
          </div>
        ))}
      </div>
      <div className="lg:hidden">
        <Shimmer width={130} height={18} rounded="rounded" />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={`flex h-[60px] items-center gap-3 rounded-[6px] border border-card-border p-3 ${i === 8 ? "max-sm:col-span-2" : ""}`}>
              <Shimmer width={36} height={36} rounded="rounded-full" className="shrink-0" />
              <Shimmer width="60%" height={13} rounded="rounded" />
            </div>
          ))}
        </div>
      </div>
      <SectionSkeleton>
        <OrdersSkeleton />
      </SectionSkeleton>
      <div className="grid gap-5 md:grid-cols-2">
        <SectionSkeleton>
          <AddressLinesSkeleton />
        </SectionSkeleton>
        <SectionSkeleton>
          <AddressLinesSkeleton />
        </SectionSkeleton>
      </div>
    </div>
  );
}

export function OrdersPageSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <TitleSkeleton />
      <SectionSkeleton titleWidth={110}>
        <OrdersSkeleton rows={5} />
        <PagerSkeleton />
      </SectionSkeleton>
    </div>
  );
}

export function OrderDetailSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <TitleSkeleton withDescription />
      <Shimmer height={78} rounded="rounded-[6px]" />
      <SectionSkeleton>
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Shimmer width={64} height={64} rounded="rounded-[4px]" className="shrink-0" />
              <div className="flex-1 space-y-2">
                <Shimmer height={14} rounded="rounded" />
                <Shimmer width="50%" height={12} rounded="rounded" />
              </div>
              <Shimmer width={80} height={16} rounded="rounded" className="shrink-0" />
            </div>
          ))}
        </div>
      </SectionSkeleton>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SectionSkeleton key={i} titleWidth={120}>
            <AddressLinesSkeleton />
          </SectionSkeleton>
        ))}
      </div>
    </div>
  );
}

export function AddressesSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <div className="mb-5 flex items-end justify-between gap-3">
        <Shimmer width={200} height={24} rounded="rounded" />
        <Shimmer width={160} height={40} rounded="rounded-[4px]" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-[6px] border border-card-border p-4 sm:p-5">
            <Shimmer width={120} height={22} rounded="rounded-full" />
            <AddressLinesSkeleton />
            <div className="flex gap-4 border-t border-card-border pt-3">
              <Shimmer width={40} height={14} rounded="rounded" />
              <Shimmer width={50} height={14} rounded="rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AccountFormSkeleton({ fields = 6 }: { fields?: number }) {
  return (
    <div className="space-y-5" aria-busy="true">
      <TitleSkeleton />
      <SectionSkeleton>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: fields }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Shimmer width={90} height={13} rounded="rounded" />
              <Shimmer height={44} rounded="rounded-[4px]" />
            </div>
          ))}
        </div>
        <Shimmer width={150} height={44} rounded="rounded-[4px]" className="mt-5" />
      </SectionSkeleton>
    </div>
  );
}

export function WishlistSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <TitleSkeleton />
      <div className="grid grid-cols-2 gap-[11px] sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-[4px] border border-card-border p-3">
            <div className="aspect-square">
              <Shimmer rounded="rounded-[4px]" />
            </div>
            <Shimmer height={12} rounded="rounded" />
            <Shimmer width="70%" height={12} rounded="rounded" />
            <Shimmer width="50%" height={16} rounded="rounded" />
            <Shimmer height={40} rounded="rounded-[4px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Account extras ───────────── */

export function ReviewsPageSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <TitleSkeleton />
      <SectionSkeleton titleWidth={220}>
        <div className="hidden md:block">
          <Shimmer height={18} rounded="rounded" className="mb-2" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="grid grid-cols-[90px_minmax(0,1fr)_96px_minmax(0,0.6fr)_90px] items-center gap-4 border-t border-card-border py-3 first:border-t-0">
              <Shimmer height={14} rounded="rounded" />
              <div className="flex items-center gap-3">
                <Shimmer width={48} height={48} rounded="rounded-[4px]" className="shrink-0" />
                <Shimmer height={14} rounded="rounded" />
              </div>
              <Shimmer height={14} rounded="rounded" />
              <Shimmer height={14} rounded="rounded" />
              <Shimmer height={14} rounded="rounded" />
            </div>
          ))}
        </div>
        <div className="space-y-3 md:hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-[6px] border border-card-border p-4">
              <div className="flex items-center gap-3">
                <Shimmer width={56} height={56} rounded="rounded-[4px]" className="shrink-0" />
                <div className="w-full space-y-2">
                  <Shimmer height={14} rounded="rounded" />
                  <Shimmer width="60%" height={14} rounded="rounded" />
                </div>
              </div>
              <div className="flex justify-between">
                <Shimmer width={90} height={14} rounded="rounded" />
                <Shimmer width={80} height={13} rounded="rounded" />
              </div>
              <Shimmer width="70%" height={13} rounded="rounded" />
            </div>
          ))}
        </div>
        <PagerSkeleton />
      </SectionSkeleton>
    </div>
  );
}

export function RewardsPageSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <TitleSkeleton withDescription />
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Shimmer height={172} rounded="rounded-[8px]" />
        <div className="grid grid-cols-2 gap-4">
          <Shimmer height={86} rounded="rounded-[8px]" />
          <Shimmer height={86} rounded="rounded-[8px]" />
          <Shimmer height={86} rounded="rounded-[8px]" className="col-span-2" />
        </div>
      </div>
      <SectionSkeleton titleWidth={140}>
        <div className="space-y-3">
          <Shimmer height={18} rounded="rounded" className="hidden md:block" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 border-t border-card-border pt-3 first:border-t-0">
              <div className="w-full max-w-[420px] space-y-1.5">
                <Shimmer height={14} rounded="rounded" />
                <Shimmer width="45%" height={12} rounded="rounded" className="md:hidden" />
              </div>
              <Shimmer width={56} height={14} rounded="rounded" className="shrink-0" />
            </div>
          ))}
        </div>
        <PagerSkeleton />
      </SectionSkeleton>
    </div>
  );
}

export function NewsletterPageSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <TitleSkeleton />
      <SectionSkeleton titleWidth={180}>
        <div className="space-y-3 rounded-[6px] border border-card-border p-4 sm:p-5">
          <div className="flex items-start gap-2.5">
            <Shimmer width={18} height={18} rounded="rounded-[3px]" className="shrink-0" />
            <div className="w-full space-y-1.5">
              <Shimmer width={160} height={15} rounded="rounded" />
              <Shimmer width="80%" height={12} rounded="rounded" />
            </div>
          </div>
          <div className="space-y-2 border-t border-card-border pt-3 pl-7">
            {[60, 55, 70].map((w) => (
              <Shimmer key={w} width={`${w}%`} height={12} rounded="rounded" />
            ))}
          </div>
        </div>
        <Shimmer width={120} height={44} rounded="rounded-[4px]" className="mt-5" />
      </SectionSkeleton>
    </div>
  );
}

export function DownloadsPageSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <TitleSkeleton />
      <SectionSkeleton titleWidth={120}>
        <OrdersSkeleton rows={3} />
      </SectionSkeleton>
    </div>
  );
}

export function PaymentMethodsPageSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <TitleSkeleton />
      <SectionSkeleton titleWidth={120}>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-4 rounded-[8px] border border-card-border p-4">
              <div className="flex justify-between">
                <Shimmer width={48} height={36} rounded="rounded-[4px]" />
                <Shimmer width={70} height={14} rounded="rounded" />
              </div>
              <Shimmer width="75%" height={18} rounded="rounded" />
              <div className="flex justify-between">
                <Shimmer width={100} height={13} rounded="rounded" />
                <Shimmer width={56} height={13} rounded="rounded" />
              </div>
            </div>
          ))}
        </div>
      </SectionSkeleton>
    </div>
  );
}
