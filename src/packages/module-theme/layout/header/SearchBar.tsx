"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

/** Pill search field used in the mobile and desktop header. */
export function SearchBar({ id, className }: { id: string; className?: string }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  /* The results page shows its query; any other page starts with an empty field. */
  useEffect(() => {
    setQuery(pathname === "/search" ? (new URLSearchParams(window.location.search).get("q") ?? "") : "");
  }, [pathname]);

  /* Phones: dragging the page closes the keyboard. While the field keeps focus, Android keeps scrolling it back into
     view, which fights the customer's scroll and shakes the page. */
  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      const input = inputRef.current;
      if (input && document.activeElement === input && !input.closest("header")?.contains(e.target as Node)) input.blur();
    };
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => document.removeEventListener("touchmove", onTouchMove);
  }, []);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (!query.trim()) return;
        inputRef.current?.blur();
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }}
      className={clsx(
        "flex w-full items-center gap-1 rounded-full bg-white py-1 pl-2 pr-1.5 ring-1 ring-brand-black/25 transition-shadow focus-within:ring-2 focus-within:ring-brand-coral/50",
        className,
      )}
    >
      <label htmlFor={id} className="sr-only">
        Search products, brands and categories
      </label>
      <input
        ref={inputRef}
        id={id}
        type="search"
        enterKeyHint="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search BanglaShoppers..."
        className="h-9 min-w-0 flex-1 rounded-full bg-transparent px-3 text-[16px] text-brand-dark outline-none placeholder:text-footer-text lg:text-[14.5px] [&::-webkit-search-cancel-button]:hidden"
      />
      {query ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          className="-mr-1 grid h-9 w-7 shrink-0 cursor-pointer place-items-center text-brand-black/60 transition-colors hover:text-brand-black"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
      <button
        type="button"
        aria-label="Search by image"
        className="grid h-9 w-8 shrink-0 cursor-pointer place-items-center text-brand-black/70 lg:w-9 lg:place-items-start lg:p-2 transition-colors hover:text-brand-black"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3.2 8.4V5.6a2.4 2.4 0 0 1 2.4-2.4h2.8M15.6 3.2h2.8a2.4 2.4 0 0 1 2.4 2.4v2.8M20.8 15.6v2.8a2.4 2.4 0 0 1-2.4 2.4h-2.8M8.4 20.8H5.6a2.4 2.4 0 0 1-2.4-2.4v-2.8"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="3.1" stroke="currentColor" strokeWidth="1.9" />
        </svg>
      </button>
      <button
        type="submit"
        aria-label="Search"
        className="grid h-9 w-12 shrink-0 cursor-pointer place-items-center rounded-full bg-brand-coral text-white transition-colors hover:bg-brand-coral-hover"
      >
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12.8 12.8 17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;
