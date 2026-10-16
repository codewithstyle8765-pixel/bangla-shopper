"use client";

import { useEffect } from "react";

/**
 * Flags the page as pinch-zoomed (`<html data-zoomed>`). Phones redraw pinned bars every frame while a zoomed page
 * scrolls, so they shake; `[data-pin]` elements let go of the screen until the page is back at normal size.
 */
export function PinchZoomWatcher() {
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const root = document.documentElement;
    const update = () => root.toggleAttribute("data-zoomed", viewport.scale > 1.02);
    update();
    viewport.addEventListener("resize", update);
    return () => {
      viewport.removeEventListener("resize", update);
      root.removeAttribute("data-zoomed");
    };
  }, []);
  return null;
}

export default PinchZoomWatcher;
