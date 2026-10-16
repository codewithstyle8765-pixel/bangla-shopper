"use client";

import { useRef, type MouseEvent, type PointerEvent, type RefObject } from "react";

const DRAG_THRESHOLD = 5;

/**
 * Mouse drag-to-scroll for a scroll-snap row. Touch and trackpads keep native scrolling.
 * Snap is suspended while dragging (1:1 with the pointer), then the row glides to the nearest card.
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const settle = (el: HTMLElement) => {
    const items = Array.from(el.children) as HTMLElement[];
    const nearest = items.reduce(
      (best, item) => {
        const distance = Math.abs(item.offsetLeft - el.offsetLeft - el.scrollLeft);
        return distance < best.distance ? { left: item.offsetLeft - el.offsetLeft, distance } : best;
      },
      { left: el.scrollLeft, distance: Infinity },
    );
    el.scrollTo({ left: nearest.left, behavior: "smooth" });
    /* Restore snapping once the glide has finished, so it does not cut the animation short. */
    window.setTimeout(() => (el.style.scrollSnapType = ""), 450);
  };

  const end = () => {
    const el = ref.current;
    const state = drag.current;
    drag.current = null;
    if (!el || !state) return;
    el.style.cursor = "";
    if (state.moved) settle(el);
    else el.style.scrollSnapType = "";
  };

  return {
    onPointerDown: (e: PointerEvent) => {
      const el = ref.current;
      if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
      drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };
      suppressClick.current = false;
    },
    onPointerMove: (e: PointerEvent) => {
      const el = ref.current;
      const state = drag.current;
      if (!el || !state) return;
      const dx = e.clientX - state.x;
      if (!state.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
      if (!state.moved) {
        state.moved = true;
        suppressClick.current = true;
        el.style.scrollSnapType = "none";
        el.style.cursor = "grabbing";
      }
      el.scrollLeft = state.left - dx;
    },
    onPointerUp: end,
    onPointerLeave: end,
    /* A drag should not open the card under the pointer. */
    onClickCapture: (e: MouseEvent) => {
      if (suppressClick.current) {
        e.preventDefault();
        e.stopPropagation();
        suppressClick.current = false;
      }
    },
    onDragStart: (e: MouseEvent) => e.preventDefault(),
  };
}
