import clsx from "clsx";
import type { ReactNode } from "react";

interface CollapseProps {
  open: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}

/** Height animation via grid-template-rows 0fr → 1fr (no content measuring). */
export function Collapse({ open, children, className, id }: CollapseProps) {
  return (
    <div
      id={id}
      aria-hidden={!open}
      inert={!open}
      className={clsx(
        "grid transition-[grid-template-rows,opacity] duration-(--duration-panel) ease-(--ease-panel)",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className={clsx("min-h-0 overflow-hidden", className)}>{children}</div>
    </div>
  );
}

export default Collapse;
