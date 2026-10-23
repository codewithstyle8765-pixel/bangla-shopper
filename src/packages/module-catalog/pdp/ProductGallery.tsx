"use client";

import { useEffect, useRef, useState } from "react";
import {
  loopSlides,
  useLoopSlider,
} from "@/packages/module-common/carousel/useLoopSlider";
import { NextImage } from "@/packages/module-common/NextImage";
import { NotchArrow } from "@/packages/module-common/icons/Shapes";
import { PlayBadge, YouTubeFrame } from "@/packages/module-common/YouTubeVideo";
import { isYouTubeThumbnail } from "@/utils/video-url";
import type { GalleryVideo } from "@/types/storefront";
import { GalleryLightbox } from "./GalleryLightbox";

export interface ProductGalleryProps {
  images?: string[];
  /** Slides that are YouTube videos; `images[index]` is the video's thumbnail. */
  videos?: GalleryVideo[];
  productName?: string;
  discountPercent?: number;
  className?: string;
}

const DEFAULT_GALLERY_IMAGES = [
  "/assets/images/pdp/primary_picture.png",
  "/assets/images/pdp/layer_3.jpg",
  "/assets/images/pdp/layer_2.jpg",
  "/assets/images/pdp/layer_4.jpg",
  "/assets/images/pdp/layer_2.jpg",
  "/assets/images/pdp/layer_4.jpg",
];

const AUTOPLAY_MS = 4000;
const VISIBLE_THUMBS = 5;
/** Thumbnail 88px + 15px gap. */
const THUMB_STEP = 103;
/** Hover zoom (desktop mouse): the panel covers the whole summary column and shows the area under the lens ZOOM× larger. */
const ZOOM = 2;
/** Gap between the gallery and the summary column (the page's gap-[13px]). */
const PANE_GAP = 13;
/** The summary's divider lines run a few px past the column; the panel covers them too. */
const PANE_BLEED = 4;

interface Lens {
  /** Lens box in image pixels. */
  left: number;
  top: number;
  width: number;
  height: number;
  /** Rendered image size (square) and panel width. */
  size: number;
  paneWidth: number;
  on: boolean;
}

const clamp = (v: number, max: number) => Math.min(max, Math.max(0, v));

export function ProductGallery({
  images = DEFAULT_GALLERY_IMAGES,
  videos = [],
  productName = "Absolute New York Supreme Slim Demi Matte Lipstick",
  discountPercent,
  className = "",
}: ProductGalleryProps) {
  const count = images.length;
  const videoAt = (index: number) => videos.find((v) => v.index === index);
  const [paused, setPaused] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  /* The slide whose video is playing; leaving that slide stops it. */
  const [playing, setPlaying] = useState<number | null>(null);
  const swiped = useRef(false);
  const touches = useRef(0);
  /* Endless loop like the hero: from the first image a swipe back shows the last one sliding in from the left. */
  const { active, goTo, next, prev, track } = useLoopSlider(count, {
    interval: AUTOPLAY_MS,
    slideMs: 500,
    paused: paused || viewerOpen || playing !== null,
  });
  if (playing !== null && playing !== active) setPlaying(null);
  const activeVideo = videoAt(active);
  const [thumbStart, setThumbStart] = useState(0);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const [zoomable, setZoomable] = useState(false);
  const [zoomLoaded, setZoomLoaded] = useState(false);
  const [lens, setLens] = useState<Lens | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem) and (hover: hover) and (pointer: fine)");
    const update = () => setZoomable(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const moveLens = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomable || activeVideo) return;
    const r = e.currentTarget.getBoundingClientRect();
    const summary = rootRef.current?.nextElementSibling?.getBoundingClientRect();
    const paneWidth = summary ? Math.max(r.width / 2, summary.right - r.right - PANE_GAP + PANE_BLEED) : r.width;
    const width = Math.min(r.width, paneWidth / ZOOM);
    const height = r.height / ZOOM;
    setZoomLoaded(true);
    setLens({
      left: clamp(e.clientX - r.left - width / 2, r.width - width),
      top: clamp(e.clientY - r.top - height / 2, r.height - height),
      width,
      height,
      size: r.width,
      paneWidth,
      on: true,
    });
  };

  /* Keep the active thumbnail inside the visible window. */
  useEffect(() => {
    setThumbStart((start) => {
      if (active < start) return active;
      if (active >= start + VISIBLE_THUMBS) return active - VISIBLE_THUMBS + 1;
      return start;
    });
  }, [active]);

  const onPointerDown = (e: React.PointerEvent) => {
    /* A second finger means a pinch zoom, never a swipe or a tap. */
    if (e.pointerType === "touch" && ++touches.current > 1) {
      dragStart.current = null;
      swiped.current = true;
      return;
    }
    /* With the zoom, a mouse hovers to inspect; thumbnails and arrows change the image. */
    if (zoomable && e.pointerType === "mouse") return;
    dragStart.current = { x: e.clientX, y: e.clientY };
    setPaused(true);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") touches.current = Math.max(0, touches.current - 1);
    const start = dragStart.current;
    dragStart.current = null;
    if (e.pointerType !== "mouse") setPaused(false);
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    swiped.current = Math.abs(dx) > 10 || Math.abs(dy) > 10;
    if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
  };

  return (
    <div
      ref={rootRef}
      className={`w-full lg:w-[50%] desk:w-[674px] flex flex-col sm:flex-row items-start shrink-0 ${className}`}
    >
      <div className="hidden sm:flex w-[88px] flex-col items-center justify-center shrink-0 mr-[15px]">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="w-[88px] pt-[2px] pb-[4px] bg-surface-gray hover:bg-divider rounded-[4px] flex items-center justify-center cursor-pointer transition-colors"
        >
          <NotchArrow
            direction="up"
            className="block w-[16px] h-[14px] text-brand-dark"
          />
        </button>

        <div
          className="mt-[16px] mb-[15px] overflow-hidden"
          style={{ height: VISIBLE_THUMBS * THUMB_STEP - 15 }}
        >
          <div
            className="flex flex-col gap-[15px] transition-transform duration-500 ease-(--ease-panel) motion-reduce:transition-none"
            style={{ transform: `translateY(-${thumbStart * THUMB_STEP}px)` }}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={videoAt(idx) ? "Show video" : `Show image ${idx + 1}`}
                aria-current={idx === active ? "true" : undefined}
                tabIndex={
                  idx >= thumbStart && idx < thumbStart + VISIBLE_THUMBS
                    ? 0
                    : -1
                }
                className={`relative w-[88px] h-[88px] overflow-hidden cursor-pointer shrink-0 transition-all after:pointer-events-none after:absolute after:inset-0 ${
                  idx === active
                    ? "after:ring-2 after:ring-inset after:ring-brand-coral"
                    : "hover:opacity-80"
                }`}
              >
                <NextImage
                  src={img}
                  alt=""
                  width={88}
                  height={88}
                  unoptimized={isYouTubeThumbnail(img)}
                  className={`w-full h-full object-cover ${videoAt(idx) ? "scale-[1.34]" : ""}`}
                />
                {videoAt(idx) && <PlayBadge small className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="w-[88px] pt-[4px] pb-[3px] bg-surface-gray hover:bg-divider rounded-[4px] flex items-center justify-center cursor-pointer transition-colors"
        >
          <NotchArrow
            direction="down"
            className="block w-[15px] h-[13px] text-brand-dark"
          />
        </button>
      </div>

      <div className="relative w-full flex-1 min-w-0 lg:max-w-[571px] flex flex-col items-start sm:items-center">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={`${productName} images`}
          onMouseEnter={() => setPaused(true)}
          onMouseMove={moveLens}
          onMouseLeave={() => {
            dragStart.current = null;
            setLens((l) => l && { ...l, on: false });
            setPaused(false);
          }}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={(e) => {
            if (e.pointerType === "touch") touches.current = Math.max(0, touches.current - 1);
            dragStart.current = null;
            setPaused(false);
          }}
          onClick={() => {
            if (swiped.current) swiped.current = false;
            else if (activeVideo) setPlaying(active);
            else setViewerOpen(true);
          }}
          className={`w-full aspect-square bg-white relative overflow-hidden group select-none touch-pan-y touch-pinch-zoom ${zoomable && !activeVideo ? "cursor-zoom-in" : "cursor-pointer"}`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setViewerOpen(true);
            }}
            aria-label="View images full screen"
            className="absolute right-2.5 top-2.5 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-brand-dark shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-colors hover:bg-brand-coral hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
          {playing !== null && count > 1 &&
            ([["prev", "Previous image", prev, "left-2.5"], ["next", "Next image", next, "right-2.5"]] as const).map(([key, label, go, side]) => (
              <button
                key={key}
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  go();
                }}
                aria-label={label}
                className={`absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-brand-dark shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-colors hover:bg-brand-coral hover:text-white ${side}`}
              >
                <svg viewBox="0 0 24 24" className="block h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={key === "prev" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
                </svg>
              </button>
            ))}
          {discountPercent ? (
            <span
              aria-label={`${discountPercent}% off`}
              className="pointer-events-none absolute left-2.5 top-2.5 z-10 rounded-[3px] bg-brand-coral px-2 py-[3px] text-[12px] font-bold uppercase leading-none tracking-wide text-white shadow-xs"
            >
              {discountPercent}% OFF
            </span>
          ) : null}

          <div
            className="flex w-full h-full transition-transform duration-500 ease-(--ease-panel) motion-reduce:transition-none"
            {...track}
          >
            {loopSlides(images).map((img, i) => {
              /* Copies at either end of the loop are decorative. */
              const copy = count > 1 && (i === 0 || i === count + 1);
              const idx = count > 1 ? (i - 1 + count) % count : i;
              const video = videoAt(idx);
              return (
                <div
                  key={i}
                  role={copy ? undefined : "group"}
                  aria-roledescription={copy ? undefined : "slide"}
                  aria-label={copy ? undefined : `${idx + 1} of ${count}`}
                  aria-hidden={copy || idx !== active}
                  className={`relative w-full h-full shrink-0 flex items-center justify-center overflow-hidden ${video ? "bg-brand-black" : ""}`}
                >
                  {video && !copy && playing === idx ? (
                    <YouTubeFrame id={video.youtubeId} title={video.title || `${productName} video`} />
                  ) : (
                    <>
                      <NextImage
                        src={img}
                        alt={
                          video
                            ? `${productName} video`
                            : idx === 0
                              ? productName
                              : `${productName} image ${idx + 1}`
                        }
                        width={571}
                        height={571}
                        quality={90}
                        sizes="(min-width: 768px) 571px, 100vw"
                        priority={!copy && idx === 0}
                        loading={idx === 0 ? undefined : "eager"}
                        draggable={false}
                        unoptimized={isYouTubeThumbnail(img)}
                        className="w-full h-full object-contain transition-transform duration-300 md:max-lg:group-hover:scale-105"
                      />
                      {video && (
                        <span className="pointer-events-none absolute inset-0 grid place-items-center">
                          <PlayBadge />
                          <span className="sr-only">Play video</span>
                        </span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {lens?.on && !activeVideo && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-10 border border-brand-dark/25 bg-white/35"
              style={{ width: lens.width, height: lens.height, left: lens.left, top: lens.top }}
            />
          )}
        </div>

        {zoomLoaded && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-[calc(100%+13px)] top-0 z-30 hidden aspect-square w-full overflow-hidden border border-card-border bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-opacity duration-150 lg:block ${
              lens?.on && !activeVideo ? "opacity-100" : "invisible opacity-0"
            }`}
            style={lens ? { width: lens.paneWidth, height: lens.size } : undefined}
          >
            <div
              className="absolute left-0 top-0"
              style={
                lens
                  ? { width: lens.size * ZOOM, height: lens.size * ZOOM, transform: `translate(${-lens.left * ZOOM}px, ${-lens.top * ZOOM}px)` }
                  : { width: `${ZOOM * 100}%`, height: `${ZOOM * 100}%` }
              }
            >
              <NextImage
                src={images[active] ?? images[0]}
                alt=""
                unoptimized={isYouTubeThumbnail(images[active] ?? images[0])}
                width={571 * ZOOM}
                height={571 * ZOOM}
                quality={90}
                sizes={`${571 * ZOOM}px`}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}

        <GalleryLightbox
          open={viewerOpen}
          images={images}
          videos={videos}
          index={active}
          productName={productName}
          onIndexChange={goTo}
          onClose={() => setViewerOpen(false)}
        />

        {count > 1 && (
          <div className="sm:hidden flex w-full items-center justify-center gap-1.5 mt-3 mb-2">
            {images.map((_, idx) =>
              videoAt(idx) ? (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={`grid h-3 w-3 cursor-pointer place-items-center transition-colors ${active === idx ? "text-brand-coral" : "text-neutral-400 hover:text-neutral-500"}`}
                  aria-label="Show video"
                >
                  <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
                    <path d="M2 1v8l7-4z" />
                  </svg>
                </button>
              ) : (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={`transition-all cursor-pointer ${
                    active === idx
                      ? "w-5 h-1.5 bg-black rounded-full"
                      : "w-1.5 h-1.5 bg-neutral-300 rounded-full hover:bg-neutral-400"
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductGallery;
