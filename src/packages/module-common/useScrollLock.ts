"use client";

import { useEffect } from "react";

let locks = 0;
let saved = { overflow: "", paddingRight: "" };

/** Locks page scroll while `active`; pads the body so hiding the scrollbar doesn't shift layout. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { body, documentElement } = document;
    if (locks++ === 0) {
      saved = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
      /* Width the hidden scrollbar frees up: 0 on phones and overlay scrollbars, where padding would shift the page. */
      const width = documentElement.clientWidth;
      body.style.overflow = "hidden";
      const scrollbar = documentElement.clientWidth - width;
      if (scrollbar > 0) {
        const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
        body.style.paddingRight = `${padding + scrollbar}px`;
      }
    }
    return () => {
      if (--locks === 0) {
        body.style.overflow = saved.overflow;
        body.style.paddingRight = saved.paddingRight;
      }
    };
  }, [active]);
}
