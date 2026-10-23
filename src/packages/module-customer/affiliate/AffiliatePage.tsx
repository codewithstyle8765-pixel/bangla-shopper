import type { ReactNode } from "react";
import { PageTitle } from "@/packages/module-common/PageTitle";
import { Shimmer } from "@/packages/module-common/Shimmer";

/** Page title for the affiliate area (the sidebar, or the dashboard tiles on phones, link the sections). */
export function AffiliateHeader({ title, description }: { title: string; description?: ReactNode }) {
  return (
    <PageTitle description={description} className="mb-0">
      {title}
    </PageTitle>
  );
}

/** Same outline as a loaded affiliate page (title, stat cards, a section), so switching pages does not jump. */
export function AffiliatePageSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true">
      <div className="space-y-2">
        <Shimmer height={26} width="45%" />
        <Shimmer height={18} width="70%" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {[0, 1, 2, 3].map((i) => (
          <Shimmer key={i} height={88} rounded="rounded-[8px]" />
        ))}
      </div>
      <Shimmer height={260} rounded="rounded-[6px]" />
    </div>
  );
}
