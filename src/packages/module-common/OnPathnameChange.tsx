"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function Watch({ onChange }: { onChange: (pathname: string) => void }) {
  const pathname = usePathname();
  const latest = useRef(onChange);
  latest.current = onChange;
  useEffect(() => latest.current(pathname), [pathname]);
  return null;
}

/**
 * Runs `onChange` with the path on mount and after every navigation. Reads the path inside its own Suspense
 * boundary, because `usePathname()` outside one blocks prerendering of dynamic routes (Cache Components).
 */
export function OnPathnameChange({ onChange }: { onChange: (pathname: string) => void }) {
  return (
    <Suspense fallback={null}>
      <Watch onChange={onChange} />
    </Suspense>
  );
}
