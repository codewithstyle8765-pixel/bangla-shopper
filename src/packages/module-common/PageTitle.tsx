import clsx from "clsx";
import type { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function PageTitle({ children, description, action, className }: PageTitleProps) {
  return (
    <div className={clsx("mb-5 flex flex-wrap items-end justify-between gap-3", className)}>
      <div className="min-w-0">
        <h1 className="text-[18px] font-black uppercase leading-tight tracking-[0.1em] text-brand-dark sm:text-[22px]">{children}</h1>
        {description && <div className="mt-1 max-w-[760px] text-[14px] leading-[1.4] text-footer-text">{description}</div>}
      </div>
      {action}
    </div>
  );
}

export default PageTitle;
