import type { ReactNode } from "react";
import { Shimmer } from "@/packages/module-common/Shimmer";

/** "-----" beside the title; "---" on phones so long titles keep to one line. */
function Dashes() {
  return (
    <span className="font-medium text-brand-coral" aria-hidden="true">
      <span className="sm:hidden">---</span>
      <span className="max-sm:hidden">-----</span>
    </span>
  );
}

/** Home section heading: "----- TITLE -----". */
export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-center text-[14px] font-bold tracking-[0.1em] text-brand-dark sm:text-[16px] ${className}`}>
      <Dashes /> {children} <Dashes />
    </h2>
  );
}

export default SectionTitle;

/** Placeholder with the same footprint as SectionTitle. */
export function SectionTitleSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Shimmer width={260} height={18} rounded="rounded" className="max-w-full" />
    </div>
  );
}
