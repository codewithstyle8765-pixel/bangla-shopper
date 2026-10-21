"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { MailIcon } from "@/packages/module-common/icons/UiIcons";
import { Container } from "@/packages/module-common/Container";
import type { AnnouncementItem } from "./announcements.types";
import { MOCK_ANNOUNCEMENTS } from "@/mocks/announcements";

export interface HeaderTopBarProps {
  onDismiss: () => void;
  messages?: AnnouncementItem[];
}

export function HeaderTopBar({ onDismiss, messages }: HeaderTopBarProps) {
  const items = messages && messages.length > 0 ? messages : MOCK_ANNOUNCEMENTS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Pause rotation when browser tab is inactive to prevent desynchronized transitions
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Automatic message rotation (4.5s interval with 300ms smooth transition)
  useEffect(() => {
    if (items.length <= 1 || !isTabVisible) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setIsVisible(true);
      }, 300);
    }, 4500);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [items.length, isTabVisible]);

  const currentMessage = items[currentIndex % items.length];

  return (
    <aside
      aria-label="Announcement bar"
      className="w-full bg-brand-black py-[10px] sm:py-[12px] relative z-20"
    >
      <Container className="relative flex items-center justify-center font-sans text-[13px] leading-none sm:grid sm:grid-cols-[1fr_auto_1fr] sm:text-[14px]">
        <div className="hidden sm:flex sm:self-start items-center justify-start shrink-0">
          <MailIcon className="w-[18px] h-[13px] self-start mt-px text-brand-coral" />
          <Link
            href="mailto:support@banglashoppers.com"
            className="ml-[6px] text-white hover:underline whitespace-nowrap tracking-normal"
          >
            Email: support@banglashoppers.com
          </Link>
        </div>

        <div
          className="relative h-[13px] sm:h-[14px] overflow-hidden flex items-center justify-center w-full max-w-[calc(100%-60px)] sm:max-w-none mt-[1px]"
          role="region"
          aria-label="Promotional announcements"
          aria-live="polite"
          aria-atomic="true"
        >
          {currentMessage && (
            <div
              className={clsx(
                "w-full flex items-center justify-center transition-all duration-300 ease-in-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5"
              )}
            >
              {currentMessage.link ? (
                <Link
                  href={currentMessage.link}
                  className="text-brand-coral hover:underline font-medium tracking-[0.1em] text-center whitespace-nowrap truncate max-w-full"
                >
                  {currentMessage.text}
                </Link>
              ) : (
                <p className="text-brand-coral font-medium tracking-[0.1em] text-center whitespace-nowrap truncate max-w-full">
                  {currentMessage.text}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center justify-end gap-4 sm:static sm:translate-y-0">
          <p className="hidden md:block text-white whitespace-nowrap tracking-normal">
            Customer Support 24/7
          </p>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss announcement"
            className="-my-3 grid h-9 w-9 sm:-mr-2 cursor-pointer place-items-center text-white/50 transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>
      </Container>
    </aside>
  );
}

export default HeaderTopBar;
