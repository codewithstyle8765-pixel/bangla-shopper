"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

/** Tracks whether a horizontal scroller can move back/forward (drives arrow active state). */
export function useScrollEdges(ref: RefObject<HTMLElement | null>) {
  const [edges, setEdges] = useState({ canPrev: false, canNext: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const canPrev = el.scrollLeft > 2;
    const canNext = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
    setEdges((prev) => (prev.canPrev === canPrev && prev.canNext === canNext ? prev : { canPrev, canNext }));
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [ref, update]);

  return edges;
}
