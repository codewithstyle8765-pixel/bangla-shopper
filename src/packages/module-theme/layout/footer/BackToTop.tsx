"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { ArrowUpIcon } from "./FooterIcons";

const toTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });

/** Round "back to top" in the copyright bar. */
export function FooterTopButton() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={toTop}
      className="hidden h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full lg:grid bg-white/10 text-white transition-colors hover:bg-brand-coral"
    >
      <ArrowUpIcon className="h-4 w-4" />
    </button>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  /* Hidden near the top, and once the copyright bar (with its own button) is on screen. */
  useEffect(() => {
    const bar = document.querySelector("[data-footer-bar]");
    let barVisible = false;
    const onScroll = () => setVisible(window.scrollY > 600 && !barVisible);
    const observer = new IntersectionObserver(([entry]) => {
      barVisible = entry.isIntersecting;
      onScroll();
    });
    if (bar) observer.observe(bar);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={toTop}
      data-pin="hide"
      className={clsx(
        "fixed bottom-5 right-5 z-30 hidden h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] bg-brand-dark/70 text-white transition-opacity hover:bg-brand-dark lg:flex",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
        <path d="m7 11 5-5 5 5M7 18l5-5 5 5" />
      </svg>
    </button>
  );
}

export default BackToTop;
