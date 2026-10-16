import { Container } from "@/packages/module-common/Container";
import { Shimmer } from "@/packages/module-common/Shimmer";
import { ProductCardSkeleton } from "@/packages/module-catalog/product/ProductCardSkeleton";

/** Also shown while filters, sort or page change. */
export function ProductGridPlaceholder({ count = 10 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-[11px] sm:grid-cols-3 xl:grid-cols-5 desk:grid-cols-[repeat(5,207px)] desk:justify-between desk:gap-x-0" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="flex min-w-0">
          <ProductCardSkeleton layout="fluid" />
        </li>
      ))}
    </ul>
  );
}

/** `titleAtEnd`: category pages, whose title sits below the products. */
export function ProductListingSkeleton({ titleAtEnd = false }: { titleAtEnd?: boolean }) {
  return (
    <Container className="pb-12" aria-busy="true" aria-label="Loading products">
      <Shimmer width={240} height={18} rounded="rounded" className="mb-[11px] mt-[11px] max-w-full" />
      {!titleAtEnd && (
        <div className="mb-5 space-y-2">
          <Shimmer width={200} height={24} rounded="rounded" className="max-w-full" />
          <Shimmer width={420} height={14} rounded="rounded" className="max-w-full" />
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-5 desk:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="mb-4 border-b-2 border-card-border pb-2">
            <Shimmer width={110} height={18} rounded="rounded" />
          </div>
          {Array.from({ length: 4 }).map((_, g) => (
            <div key={g} className="border-b border-card-border py-4">
              <Shimmer width={100} height={15} rounded="rounded" />
              <Shimmer width={30} height={2} rounded="rounded-none" className="mt-2" />
              <div className="mt-3 space-y-3">
                {Array.from({ length: g === 0 ? 5 : 3 }).map((__, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Shimmer width={16} height={16} rounded="rounded-[3px]" className="shrink-0" />
                    <Shimmer height={13} rounded="rounded" />
                    <Shimmer width={26} height={18} rounded="rounded-full" className="shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <div className="min-w-0">
          {titleAtEnd && (
            <div className="mb-4 aspect-[990/331] lg:mb-5">
              <Shimmer rounded="rounded-none" />
            </div>
          )}
          <div className="mb-3 flex items-center gap-2 lg:hidden">
            <Shimmer height={40} rounded="rounded-[4px]" className="flex-1 sm:max-w-[140px]" />
            <Shimmer height={40} rounded="rounded-[4px]" className="flex-1 sm:max-w-[220px]" />
          </div>
          <div className="mb-4 hidden items-center justify-between lg:flex">
            <Shimmer width={190} height={14} rounded="rounded" />
            <Shimmer width={260} height={40} rounded="rounded-[4px]" />
          </div>
          <Shimmer width={150} height={13} rounded="rounded" className="mb-3 lg:hidden" />
          <ProductGridPlaceholder />
        </div>
      </div>
    </Container>
  );
}

export default ProductListingSkeleton;
