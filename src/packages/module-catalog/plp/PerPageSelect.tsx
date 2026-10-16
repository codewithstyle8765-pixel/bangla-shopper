"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { PLP_PAGE_SIZE, usefulPageSizes } from "@/lib/config";
import { createUrl } from "@/utils/url";
import { Select } from "@/packages/module-common/form/Select";

/** Products per page (`?limit=`), offering only sizes that make sense for `total`; changing it returns to page 1 and keeps filters and sort. */
export function PerPageSelect({ id, pageSize, total, className }: { id: string; pageSize: number; total: number; className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const options = usefulPageSizes(total, pageSize).map((n) => ({ value: String(n), label: String(n) }));

  const onChange = (value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (Number(value) === PLP_PAGE_SIZE) next.delete("limit");
    else next.set("limit", value);
    next.delete("page");
    startTransition(() => router.replace(createUrl(pathname, next)));
  };

  if (options.length < 2) return null;

  return (
    <div className={clsx("flex items-center gap-2 text-[14px] text-brand-dark", className)} aria-busy={isPending}>
      <span id={`${id}-label`} className="whitespace-nowrap font-medium">
        Per page:
      </span>
      <div className="w-[76px]">
        <Select id={id} value={String(pageSize)} onChange={onChange} options={options} aria-label="Products per page" className="h-10" />
      </div>
    </div>
  );
}

export default PerPageSelect;
