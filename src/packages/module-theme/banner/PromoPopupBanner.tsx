"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import clsx from "clsx";
import { useScrollLock } from "@/packages/module-common/useScrollLock";
import { MailIcon } from "@/packages/module-theme/layout/footer/FooterIcons";
import { usePromoBanner } from "./usePromoBanner";
import { PromoNewsletterForm } from "./PromoNewsletterForm";
import type { PromoBannerData, PromoBannerPerkIcon } from "./promoBanner.types";

const SESSION_STORAGE_KEY = "bs_promo_banner_dismissed_session";
const SUBSCRIBED_CLOSE_MS = 1800;

const PERK_PATHS: Record<PromoBannerPerkIcon, React.ReactNode> = {
  authentic: (
    <>
      <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  offers: (
    <>
      <path d="M20 12 12 20 4 12V4h8z" />
      <circle cx="8" cy="8" r="1.5" />
    </>
  ),
  rewards: (
    <>
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M12 8v13M3 12h18M12 8c-2-4-6-4-6-1s6 1 6 1 6 2 6-1-4-3-6 1" />
    </>
  ),
};

/** The admin artwork; a separate phone image, when sent, replaces it below lg. */
function PromoArtwork({ banner }: { banner: PromoBannerData }) {
  const common = { alt: banner.altText, fill: true, priority: true, sizes: "(max-width: 1023px) 420px, 480px" };
  const { props } = getImageProps({ ...common, src: banner.imageUrl });
  const mobile = banner.mobileImageUrl ? getImageProps({ ...common, src: banner.mobileImageUrl }).props.srcSet : undefined;

  return (
    <picture>
      {mobile && <source media="(max-width: 1023px)" srcSet={mobile} />}
      <img {...props} alt={banner.altText} className="object-cover" />
    </picture>
  );
}

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

  const rememberForSession = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, banner?.id || "true");
    } catch {
      // Handle private browsing or restricted quota
    }
  }, [banner?.id]);

  /**
   * Session Dismiss (via "Don't show this again for this session"):
   * Closes the popup AND saves the flag in sessionStorage.
   * For the entire browser session, this banner will not appear even after reloads.
   */
  const handleSessionDismiss = useCallback(() => {
    rememberForSession();
    handleTemporaryClose();
  }, [rememberForSession, handleTemporaryClose]);

  /** After a successful subscribe: shown the thank-you, then gone for the session. */
  const handleSubscribed = useCallback(() => {
    rememberForSession();
    setTimeout(handleTemporaryClose, SUBSCRIBED_CLOSE_MS);
  }, [rememberForSession, handleTemporaryClose]);

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

  const withNewsletter = banner.showNewsletter !== false;
  const dismissLabel = banner.sessionDismissLabel || "Don't show this again for this session";
  const closeIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={banner.title || "Special Promotion"}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 transition-opacity duration-300 md:p-4 ${
        animateIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div onClick={handleTemporaryClose} className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" aria-hidden="true" />

      {!withNewsletter ? (
        <div
          className={clsx(
            "relative z-10 flex w-full max-w-[min(390px,calc(100dvh-110px))] flex-col items-center transition-all duration-300 sm:max-w-[min(440px,calc(100dvh-110px))]",
            animateIn ? "scale-100 translate-y-0" : "scale-95 translate-y-2",
          )}
        >
          <button
            type="button"
            onClick={handleTemporaryClose}
            aria-label="Close promotion banner"
            className="absolute -right-2 -top-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-black/80 text-white shadow-xl transition-transform hover:scale-110 hover:bg-black active:scale-95 sm:-right-3 sm:-top-3.5 sm:h-10 sm:w-10"
          >
            {closeIcon}
          </button>
          <Link
            href={banner.targetUrl}
            onClick={handleTemporaryClose}
            className="relative block aspect-square w-full overflow-hidden rounded-2xl border border-white/20 bg-placeholder shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-[1.015] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-coral"
          >
            <PromoArtwork banner={banner} />
          </Link>
          <button
            type="button"
            onClick={handleSessionDismiss}
            className="mt-3 inline-flex cursor-pointer items-center rounded-full border border-white/10 bg-black/40 px-4 py-1.5 text-[12px] font-medium text-white/90 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-black/60 hover:text-white sm:mt-4 sm:text-[13px]"
          >
            {dismissLabel}
          </button>
        </div>
      ) : (
        <div
          className={clsx(
            "relative z-10 grid w-full max-h-[calc(100dvh-24px)] max-w-[min(380px,calc(100dvh-316px))] overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-300 md:max-h-[calc(100dvh-32px)] md:max-w-[min(420px,calc(100dvh-364px))] lg:max-w-[900px] lg:grid-cols-[480px_1fr] lg:overflow-hidden",
            animateIn ? "scale-100 translate-y-0" : "scale-95 translate-y-2",
          )}
        >
          <button
            type="button"
            onClick={handleTemporaryClose}
            aria-label="Close promotion banner"
            className="absolute right-2 top-2 z-20 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white text-brand-dark shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-transform hover:scale-110 active:scale-95 lg:right-3 lg:top-3 lg:h-9 lg:w-9"
          >
            {closeIcon}
          </button>

          <Link
            href={banner.targetUrl}
            onClick={handleTemporaryClose}
            className="relative block aspect-square overflow-hidden bg-placeholder focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-coral lg:aspect-auto lg:min-h-[480px]"
          >
            <PromoArtwork banner={banner} />
          </Link>

          <div className="flex flex-col items-center justify-center px-[18px] pb-3 pt-4 text-center lg:px-11 lg:py-6">
            <span aria-hidden="true" className="hidden h-12 w-12 place-items-center rounded-full bg-brand-coral/10 text-brand-coral lg:grid">
              <MailIcon className="h-6 w-6" />
            </span>
            {banner.heading && (
              <h2 className="text-[21px] font-bold leading-[1.2] text-brand-dark lg:mt-3 lg:text-[26px]">
                {banner.heading} {banner.headingHighlight && <span className="text-brand-coral">{banner.headingHighlight}</span>}
              </h2>
            )}
            {banner.subheading && (
              <p className="mt-1 max-w-[320px] text-[13px] leading-[1.55] text-footer-text lg:mt-2.5 lg:text-[14px]">{banner.subheading}</p>
            )}
            {!!banner.perks?.length && (
              <ul className="mt-2.5 flex gap-3.5 lg:mt-[18px] lg:gap-[18px] [@media(max-width:1023px)_and_(max-height:700px)]:hidden">
                {banner.perks.map(({ icon, label }) => (
                  <li key={label} className="flex flex-col items-center gap-1.5 text-[11px] font-medium text-brand-dark lg:text-[11.5px]">
                    <span className="grid h-[30px] w-[30px] place-items-center rounded-full border border-card-border text-brand-coral lg:h-[34px] lg:w-[34px]">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {PERK_PATHS[icon]}
                      </svg>
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            )}
            <PromoNewsletterForm buttonLabel={banner.buttonLabel} privacyNote={banner.privacyNote} onSubscribed={handleSubscribed} />

            <button
              type="button"
              onClick={handleSessionDismiss}
              className="mt-2.5 w-full cursor-pointer border-t border-card-border pt-2.5 text-[12px] text-footer-text underline underline-offset-[3px] transition-colors hover:text-brand-coral lg:mt-[18px] lg:pt-3.5 lg:text-[12.5px]"
            >
              {dismissLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
