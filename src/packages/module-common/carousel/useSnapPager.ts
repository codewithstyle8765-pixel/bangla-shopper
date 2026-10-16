"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

/** Pages of a horizontal scroll-snap row (one page = its visible width plus one gap), kept in sync with scrolling and resizing. */
const pageStep = (el: HTMLElement) => el.clientWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);

export function useSnapPager(ref: RefObject<HTMLElement | null>) {
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const step = pageStep(el) || 1;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const count = 1 + Math.max(0, Math.ceil((maxScroll - 2) / step));
      setPages(count);
      setPage(el.scrollLeft >= maxScroll - 2 ? count - 1 : Math.round(el.scrollLeft / step));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [ref]);

  const goTo = useCallback(
    (index: number) => {
      const el = ref.current;
      if (el) el.scrollTo({ left: Math.max(0, index) * pageStep(el), behavior: "smooth" });
    },
    [ref],
  );

  return {
    page,
    pages,
    goTo,
    prev: () => goTo(page - 1),
    next: () => goTo(page + 1),
    canPrev: page > 0,
    canNext: page < pages - 1,
  };
}
