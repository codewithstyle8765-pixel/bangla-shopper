"use client";

import { useState } from "react";
import clsx from "clsx";
import { copyText } from "@/utils/clipboard";

const COPIED_MS = 1800;

export function CopyButton({ text, label = "Copy", className }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (!(await copyText(text))) return;
        setCopied(true);
        window.setTimeout(() => setCopied(false), COPIED_MS);
      }}
      className={clsx(
        "inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[4px] px-5 text-[14px] font-semibold text-white transition-colors",
        copied ? "bg-success" : "bg-brand-dark hover:bg-brand-black",
        className,
      )}
    >
      {copied ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V6a2 2 0 0 1 2-2h8" />
        </svg>
      )}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}

/** Read-only value with a copy button beside it (stacked on narrow phones). */
export function CopyField({ value, label, mono = false }: { value: string; label: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-2 min-[420px]:flex-row">
      <input
        readOnly
        value={value}
        aria-label={label}
        onFocus={(e) => e.currentTarget.select()}
        className={clsx(
          "h-11 min-w-0 flex-1 rounded-[4px] border border-dashed border-brand-coral/60 bg-brand-coral/5 px-3 text-[14px] text-brand-dark outline-none focus:border-brand-coral",
          mono && "font-mono",
        )}
      />
      <CopyButton text={value} />
    </div>
  );
}

const SHARES = [
  {
    name: "WhatsApp",
    href: (url: string) => `https://wa.me/?text=${encodeURIComponent(url)}`,
    className: "hover:border-success hover:text-success",
    path: "M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm4.4 12.4c-.2.5-1.1 1-1.6 1.1-.4 0-.9.1-2.9-.7-2.4-1-4-3.4-4.1-3.6-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.3.5-.3.6-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z",
  },
  {
    name: "Facebook",
    href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    className: "hover:border-social-facebook hover:text-social-facebook",
    path: "M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4a20 20 0 0 0-2.2-.1c-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21z",
  },
  {
    name: "X",
    href: (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    className: "hover:border-brand-black hover:text-brand-black",
    path: "M17.8 3.5h3l-6.6 7.5 7.7 10h-6l-4.7-6.1-5.4 6.1h-3l7-8L2.3 3.5h6.2l4.3 5.6zm-1 15.7h1.7L7.3 5.2H5.5z",
  },
];

export function ShareButtons({ url }: { url: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[13px] font-medium text-footer-text">Share:</span>
      {SHARES.map((s) => (
        <a
          key={s.name}
          href={s.href(url)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${s.name}`}
          className={clsx("grid h-9 w-9 place-items-center rounded-full border border-card-border bg-white text-brand-dark transition-colors", s.className)}
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
