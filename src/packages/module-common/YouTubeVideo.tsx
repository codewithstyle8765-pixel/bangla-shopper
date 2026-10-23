"use client";

import { useState } from "react";
import clsx from "clsx";
import { youTubeThumbnail } from "@/utils/video-url";
import { NextImage } from "./NextImage";

/** Round play button drawn over a video's thumbnail. */
export function PlayBadge({ small = false, className = "" }: { small?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "grid place-items-center rounded-full bg-brand-coral text-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] ring-white/80",
        small ? "h-7 w-7 ring-2" : "h-14 w-14 ring-4 sm:h-16 sm:w-16",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className={small ? "h-3 w-3" : "h-6 w-6 sm:h-7 sm:w-7"} fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinejoin="round">
        <path d="M8.5 5.5v13L19 12z" />
      </svg>
    </span>
  );
}

/** The YouTube player itself (privacy-enhanced domain), filling its positioned parent; starts playing. */
export function YouTubeFrame({ id, title }: { id: string; title: string }) {
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="absolute inset-0 h-full w-full border-0 bg-brand-black"
    />
  );
}

/** 16:9 YouTube video that loads the player only when clicked, so pages never pay for YouTube's scripts up front. */
export function YouTubeVideo({ id, title, className = "" }: { id: string; title: string; className?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={clsx("relative aspect-video w-full overflow-hidden rounded-[8px] bg-brand-black", className)}>
      {playing ? (
        <YouTubeFrame id={id} title={title} />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`} className="group absolute inset-0 cursor-pointer">
          <NextImage src={youTubeThumbnail(id)} alt="" fill unoptimized sizes="(max-width: 1023px) 100vw, 900px" className="object-cover" />
          <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
          <PlayBadge className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-110" />
        </button>
      )}
    </div>
  );
}
