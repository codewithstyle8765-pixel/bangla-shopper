"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "bs_cookie_consent";

/**
 * Bottom-anchored cookie consent banner.
 *
 * Consent state lives entirely in localStorage — no backend needed.
 * Once accepted the banner never renders again.  On mobile it sits
 * above the sticky bottom nav (pb-safe-area already handled by the
 * root layout); on desktop it floats as a centered card.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  /* two-phase mount: `mounted` puts the element in the DOM, then
     `animateIn` triggers the CSS transition one frame later.       */
  const [animateIn, setAnimateIn] = useState(false);

  /* ── check localStorage once on mount ────────────────────────── */
  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* SSR / incognito: show the banner to be safe */
      setVisible(true);
    }
  }, []);

  /* kick the enter animation after first paint */
  useEffect(() => {
    if (!visible) return;
    const frame = requestAnimationFrame(() => setAnimateIn(true));
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  /* ── handlers ────────────────────────────────────────────────── */
  function dismiss(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* quota / incognito – just hide the banner */
    }
    setAnimateIn(false);
    /* let the exit transition finish, then unmount */
    setTimeout(() => setVisible(false), 350);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className={[
        /* ── positioning ──────────────────────────────────────── */
        "fixed inset-x-0 bottom-0 z-[60] flex justify-center",
        /* sit above the mobile bottom-nav bar (4rem + border + safe-area) */
        "pb-[calc(4rem+1px+env(safe-area-inset-bottom))] lg:pb-0",
        /* pointer-events only on the card, not the full-width wrapper */
        "pointer-events-none",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-auto",
          /* ── surface ─────────────────────────────────────────── */
          "mx-(--gutter) lg:mx-auto mb-3 lg:mb-6",
          "w-full max-w-[720px]",
          "rounded-xl border border-card-border bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.10)]",
          "px-5 py-4 sm:px-6 sm:py-5",
          /* ── layout ─────────────────────────────────────────── */
          "flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5",
          /* ── animation ──────────────────────────────────────── */
          "transition-all duration-[350ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
          animateIn
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0",
        ].join(" ")}
      >
        {/* ── cookie icon ───────────────────────────────────── */}
        <div className="hidden sm:flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-brand-surface">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="11" stroke="var(--color-brand-coral)" strokeWidth="1.6" />
            <circle cx="8"  cy="9"  r="1.5" fill="var(--color-brand-coral)" />
            <circle cx="14" cy="7"  r="1.2" fill="var(--color-brand-coral)" />
            <circle cx="10" cy="14" r="1.3" fill="var(--color-brand-coral)" />
            <circle cx="16" cy="13" r="1.1" fill="var(--color-brand-coral)" />
            <circle cx="15" cy="17" r="1.4" fill="var(--color-brand-coral)" />
          </svg>
        </div>

        {/* ── text ──────────────────────────────────────────── */}
        <p className="flex-1 text-[13px] leading-[1.55] text-brand-ink sm:text-[14px]">
          We use cookies to improve your experience, analyze traffic, and
          personalize content.{" "}
          <Link
            href="/privacy-policy-cookie-restriction-mode"
            className="text-brand-link underline underline-offset-2 hover:text-brand-coral transition-colors"
          >
            Privacy&nbsp;Policy
          </Link>
        </p>

        {/* ── actions ───────────────────────────────────────── */}
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => dismiss("declined")}
            className="h-10 flex-1 sm:flex-none cursor-pointer rounded-[4px] border border-btn-dark-edge px-5 text-[13px] font-semibold tracking-wide text-brand-charcoal uppercase transition-colors duration-150 hover:bg-brand-charcoal hover:text-white active:scale-[0.97] active:transition-transform"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => dismiss("accepted")}
            className="h-10 flex-1 sm:flex-none cursor-pointer rounded-[4px] bg-brand-coral px-6 text-[13px] font-semibold tracking-wide text-white uppercase transition-colors duration-150 hover:bg-brand-coral-hover active:scale-[0.97] active:transition-transform"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
