"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollLock } from "@/packages/module-common/useScrollLock";
import { usePromoBanner } from "./usePromoBanner";

const SESSION_STORAGE_KEY = "bs_promo_banner_dismissed_session";

export function PromoPopupBanner() {
  const { banner, loading, isEnabled } = usePromoBanner();
  const [isOpen, setIsOpen] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Lock background scroll when popup is active
  useScrollLock(isOpen);

  // Check sessionStorage on client mount once banner data is available
  useEffect(() => {
    if (loading || !isEnabled || !banner) return;

    try {
      const isDismissedForSession = sessionStorage.getItem(SESSION_STORAGE_KEY);
      // Only show if not dismissed for this session
      if (!isDismissedForSession) {
        // Small delay so page renders first, creating a smooth entrance
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 400);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case sessionStorage is blocked/restricted in incognito
      setIsOpen(true);
    }
  }, [loading, isEnabled, banner]);

  // Trigger smooth animate-in transition after mounting
  useEffect(() => {
    if (!isOpen) {
      setAnimateIn(false);
      return;
    }
    const frame = requestAnimationFrame(() => setAnimateIn(true));
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  /**
   * Temporary Close (via Cross Icon, Escape, or Backdrop Click):
   * Closes the popup for this view, but does NOT write to sessionStorage.
   * On page reload, the banner will appear again.
   */
  const handleTemporaryClose = useCallback(() => {
    setAnimateIn(false);
    setTimeout(() => setIsOpen(false), 250);
  }, []);

  /**
   * Session Dismiss (via "Don't show this again for this session"):
   * Closes the popup AND saves the flag in sessionStorage.
   * For the entire browser session, this banner will not appear even after reloads.
   */
  const handleSessionDismiss = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, banner?.id || "true");
    } catch {
      // Handle private browsing or restricted quota
    }
    handleTemporaryClose();
  }, [banner?.id, handleTemporaryClose]);

  // Keyboard accessibility: ESC key to close temporarily
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleTemporaryClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleTemporaryClose]);

  if (!isOpen || !banner || !isEnabled) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={banner.title || "Special Promotion"}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
        animateIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Dimmed backdrop - clicking it temporarily closes the popup */}
      <div
        onClick={handleTemporaryClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity"
        aria-hidden="true"
      />

      {/* Main Banner Container */}
      <div
        className={`relative z-10 flex flex-col items-center w-full max-w-[390px] sm:max-w-[440px] transition-all duration-300 transform ${
          animateIn ? "scale-100 translate-y-0" : "scale-95 translate-y-2"
        }`}
      >
        {/* Top-right Circular Cross (Close) Button - NO countdown timer */}
        <button
          type="button"
          onClick={handleTemporaryClose}
          aria-label="Close promotion banner"
          className="absolute -top-3 -right-2 sm:-top-3.5 sm:-right-3 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/80 hover:bg-black text-white shadow-xl transition-transform hover:scale-110 active:scale-95 cursor-pointer border-2 border-white focus:outline-none"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Clickable Banner Image */}
        <Link
          href={banner.targetUrl}
          onClick={handleTemporaryClose}
          className="group block relative w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/20 transition-transform duration-300 hover:scale-[1.015] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
          <div className="relative aspect-[3/4] w-full bg-brand-surface overflow-hidden">
            <Image
              src={banner.imageUrl}
              alt={banner.altText}
              fill
              priority
              unoptimized
              sizes="(max-width: 640px) 90vw, 440px"
              className="object-cover"
            />
          </div>
        </Link>

        {/* "Don't show this again for this session" Action */}
        <div className="mt-3 sm:mt-4 text-center">
          <button
            type="button"
            onClick={handleSessionDismiss}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-[12px] sm:text-[13px] font-medium text-white/90 hover:text-white transition-all duration-200 cursor-pointer border border-white/10 hover:border-white/30 shadow-sm"
          >
            <span>{banner.sessionDismissLabel || "Don't show this again for this session"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
