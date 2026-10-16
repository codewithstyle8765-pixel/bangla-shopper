import type { ReactNode } from "react";

/** PDP heading: uppercase with the short coral rule. `h2` names a whole section (Description, Specs...), `h3` a block inside one. */
export function TabHeading({ children, aside, as: Tag = "h3", id }: { children: ReactNode; aside?: ReactNode; as?: "h2" | "h3"; id?: string }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <Tag id={id} className={`font-bold uppercase tracking-[0.1em] text-brand-dark ${Tag === "h2" ? "text-[16px] sm:text-[18px]" : "text-[14px] sm:text-[15px]"}`}>
        {children}
        <span aria-hidden="true" className="mt-1.5 block h-[2px] w-[30px] bg-brand-coral" />
      </Tag>
      {aside}
    </div>
  );
}

export default TabHeading;
