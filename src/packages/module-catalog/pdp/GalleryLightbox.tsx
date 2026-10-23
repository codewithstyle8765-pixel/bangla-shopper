"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { NextImage } from "@/packages/module-common/NextImage";
import { useScrollLock } from "@/packages/module-common/useScrollLock";
import { PlayBadge, YouTubeFrame } from "@/packages/module-common/YouTubeVideo";
import { isYouTubeThumbnail } from "@/utils/video-url";
import type { GalleryVideo } from "@/types/storefront";

interface GalleryLightboxProps {
  open: boolean;
  images: string[];
  /** Slides that are YouTube videos; they play on tap instead of zooming. */
  videos?: GalleryVideo[];
  index: number;
  productName: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** Replaces the product-name caption, e.g. the review a customer photo came from. */
  caption?: (index: number) => ReactNode;
  /** Shows "‹ All photos" in the header, e.g. back to the customer photo grid. */
  onBack?: () => void;
}

/** Closing is quicker than opening (200ms), so it never feels like it lingers. */
const FADE_MS = 150;
const MAX_ZOOM = 4;
const TAP_ZOOM = 2.5;
const DOUBLE_TAP_MS = 300;

/** Pan offset (px, from centre) and scale of the current image. */
interface Zoom {
  s: number;
  x: number;
  y: number;
}

const NO_ZOOM: Zoom = { s: 1, x: 0, y: 0 };
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

/** Full-screen image viewer: swipe or arrows to browse, pinch / double-tap / wheel to zoom, thumbnail strip below, Escape or × to close. */
export function GalleryLightbox({ open, images, videos, index, productName, onIndexChange, onClose, caption, onBack }: GalleryLightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  /* A tap that starts and ends on the dark area closes the viewer (a swipe off the photo does not). */
  const backdropDown = useRef(false);
  const onBackdrop = (target: EventTarget) => (target as HTMLElement).hasAttribute?.("data-backdrop");
  const stageRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; midX: number; midY: number; zoom: Zoom } | null>(null);
  const drag = useRef<{ x: number; y: number; zoom: Zoom; moved: boolean } | null>(null);
  const lastTap = useRef(0);
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const [zoom, setZoom] = useState(NO_ZOOM);
  const [zoomedIndex, setZoomedIndex] = useState(index);
  const [gesturing, setGesturing] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  if (open && !mounted) setMounted(true);
  if (zoomedIndex !== index || (!open && zoom !== NO_ZOOM)) {
    setZoomedIndex(index);
    setZoom(NO_ZOOM);
  }
  if (playing !== null && (playing !== index || !open)) setPlaying(null);
  const count = images.length;
  const zoomed = zoom.s > 1;
  const videoAt = (i: number) => videos?.find((v) => v.index === i);
  const onVideo = Boolean(videoAt(index));

  useScrollLock(mounted);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !mounted) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => {
      dialog.close();
      setMounted(false);
    }, FADE_MS);
    return () => window.clearTimeout(timer);
  }, [open, mounted]);

  useEffect(() => {
    thumbsRef.current?.children[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: visible ? "smooth" : "instant" });
  }, [index, visible]);

  const go = (step: number) => onIndexChange((index + step + count) % count);

  /* Keeps the scaled image covering the stage: no blank edges when panning. */
  const fit = (z: Zoom): Zoom => {
    const r = stageRef.current?.getBoundingClientRect();
    const s = clamp(z.s, 1, MAX_ZOOM);
    if (!r || s === 1) return NO_ZOOM;
    const mx = ((s - 1) * r.width) / 2;
    const my = ((s - 1) * r.height) / 2;
    return { s, x: clamp(z.x, -mx, mx), y: clamp(z.y, -my, my) };
  };

  /** Scales to `s` while the image point under (clientX, clientY) stays put. */
  const zoomAt = (z: Zoom, s: number, clientX: number, clientY: number): Zoom => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return z;
    const px = clientX - r.left - r.width / 2;
    const py = clientY - r.top - r.height / 2;
    const k = clamp(s, 1, MAX_ZOOM) / z.s;
    return fit({ s: z.s * k, x: px - (px - z.x) * k, y: py - (py - z.y) * k });
  };

  const startPinch = () => {
    const [a, b] = [...pointers.current.values()];
    pinch.current = { dist: distance(a, b) || 1, midX: (a.x + b.x) / 2, midY: (a.y + b.y) / 2, zoom: zoomRef.current };
    drag.current = null;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    /* A video slide only swipes: no capture, so the tap reaches its play button. */
    if (!onVideo) e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && !onVideo) startPinch();
    else if (pointers.current.size === 1) drag.current = { x: e.clientX, y: e.clientY, zoom: zoomRef.current, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const p = pinch.current;
    if (p && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()];
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;
      const scaled = zoomAt(p.zoom, (p.zoom.s * distance(a, b)) / p.dist, p.midX, p.midY);
      setZoom(fit({ ...scaled, x: scaled.x + midX - p.midX, y: scaled.y + midY - p.midY }));
      setGesturing(true);
      return;
    }
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) d.moved = true;
    if (d.zoom.s > 1) {
      setZoom(fit({ ...d.zoom, x: d.zoom.x + dx, y: d.zoom.y + dy }));
      setGesturing(true);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!pointers.current.delete(e.pointerId)) return;
    if (pinch.current) {
      if (pointers.current.size < 2) pinch.current = null;
      const [rest] = [...pointers.current.values()];
      if (rest) drag.current = { ...rest, zoom: zoomRef.current, moved: true };
      else setGesturing(false);
      return;
    }
    setGesturing(false);
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (d.zoom.s === 1 && count > 1 && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - d.y)) {
      go(dx < 0 ? 1 : -1);
      return;
    }
    if (d.moved || onVideo) return;
    const now = e.timeStamp;
    if (now - lastTap.current < DOUBLE_TAP_MS) {
      lastTap.current = 0;
      setZoom(zoomRef.current.s > 1 ? NO_ZOOM : zoomAt(zoomRef.current, TAP_ZOOM, e.clientX, e.clientY));
    } else lastTap.current = now;
  };

  /* Mouse wheel and trackpad pinch (ctrl + wheel); native listener so the page itself never zooms. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !mounted) return;
    const onWheel = (e: WheelEvent) => {
      if (onVideo) return;
      e.preventDefault();
      const z = zoomRef.current;
      setZoom(zoomAt(z, z.s * Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.002)), e.clientX, e.clientY));
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  });

  if (!mounted) return null;

  return (
    <dialog
      ref={ref}
      aria-label={`${productName} images`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      data-backdrop
      onPointerDown={(e) => (backdropDown.current = onBackdrop(e.target))}
      onClick={(e) => {
        if (backdropDown.current && onBackdrop(e.target)) onClose();
        backdropDown.current = false;
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        else if (e.key === "ArrowLeft") go(-1);
      }}
      className={clsx(
        "m-0 h-dvh max-h-none w-full max-w-none touch-manipulation overflow-hidden bg-brand-black/85 p-0 font-sans text-white backdrop-blur-md backdrop:bg-transparent transition-opacity motion-reduce:transition-none open:flex open:flex-col",
        visible ? "opacity-100 duration-200 ease-(--ease-panel)" : "opacity-0 duration-150 ease-in",
      )}
    >
      <div data-backdrop className="flex shrink-0 items-center justify-between px-(--gutter) py-2 sm:px-5 sm:py-3">
        {onBack ? (
          <button type="button" onClick={onBack} className="-ml-2 flex h-11 cursor-pointer items-center gap-1 rounded-full px-2 text-[14px] font-semibold text-white/90 hover:text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            All photos
          </button>
        ) : null}
        <p aria-live="polite" className={clsx("text-[14px] font-medium tabular-nums text-white/80", onBack && "ml-auto mr-3")}>
          {index + 1} / {count}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:border-brand-coral hover:bg-brand-coral"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div data-backdrop className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-(--gutter) sm:px-20">
        <div
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={clsx(
            "relative aspect-square w-full touch-none select-none overflow-hidden rounded-[8px] bg-white",
            caption ? "max-w-[min(100%,calc(100dvh-22rem),56rem)]" : "max-w-[min(100%,calc(100dvh-16rem),56rem)]",
            !onVideo && (zoomed ? (gesturing ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"),
          )}
        >
          <div
            className="flex h-full w-full transition-transform duration-300 ease-(--ease-panel) motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => {
              const video = videoAt(i);
              return (
                <div key={i} aria-hidden={i !== index} className={clsx("relative h-full w-full shrink-0 overflow-hidden", video && "bg-brand-black")}>
                  {video && playing === i ? (
                    <YouTubeFrame id={video.youtubeId} title={video.title || `${productName} video`} />
                  ) : (
                    <div
                      className={clsx("h-full w-full", !gesturing && "transition-transform duration-200 ease-(--ease-panel) motion-reduce:transition-none")}
                      style={i === index && zoomed ? { transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.s})` } : undefined}
                    >
                      <NextImage
                        src={img}
                        alt={i === index ? (video ? `${productName} video` : `${productName} image ${i + 1} of ${count}`) : ""}
                        width={1800}
                        height={1800}
                        quality={90}
                        sizes="(min-width: 64rem) 1800px, 200vw"
                        loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
                        draggable={false}
                        unoptimized={isYouTubeThumbnail(img)}
                        className="h-full w-full object-contain"
                      />
                      {video && (
                        <button
                          type="button"
                          onClick={() => setPlaying(i)}
                          aria-label="Play video"
                          tabIndex={i === index ? 0 : -1}
                          className="absolute inset-0 grid cursor-pointer place-items-center"
                        >
                          <PlayBadge />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {caption ? (
          <div className="mt-3 w-full max-w-[min(100%,56rem)]">{caption(index)}</div>
        ) : (
          <>
            <p className="mt-3 line-clamp-2 max-w-[56rem] text-center text-[14px] leading-[1.4] text-white/90 sm:text-[15px]">{productName}</p>
            <p className="mt-1 text-center text-[12px] text-white/55">
              {onVideo ? "Tap play to watch the video" : zoomed ? "Drag to move · double-tap to reset" : <><span className="lg:hidden">Pinch or double-tap to zoom</span><span className="max-lg:hidden">Scroll or double-click to zoom</span></>}
            </p>
          </>
        )}

        {count > 1 &&
          (["left", "right"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(dir === "left" ? -1 : 1)}
              aria-label={dir === "left" ? "Previous image" : "Next image"}
              className={clsx(
                "absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-brand-coral hover:bg-brand-coral sm:flex",
                dir === "left" ? "left-4" : "right-4",
              )}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
              </svg>
            </button>
          ))}
      </div>

      {count > 1 && (
        <div
          ref={thumbsRef}
          data-backdrop
          className="no-scrollbar mx-auto flex max-w-full shrink-0 gap-2 overflow-x-auto px-(--gutter) pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:gap-3 sm:pb-6"
        >
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={videoAt(i) ? "Show video" : `Show image ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={clsx(
                "relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-[6px] bg-white transition-opacity after:pointer-events-none after:absolute after:inset-0 after:rounded-[6px] sm:h-16 sm:w-16",
                i === index ? "after:ring-2 after:ring-inset after:ring-brand-coral" : "opacity-60 hover:opacity-100",
              )}
            >
              <NextImage src={img} alt="" width={64} height={64} unoptimized={isYouTubeThumbnail(img)} className={clsx("h-full w-full object-cover", videoAt(i) && "scale-[1.34]")} />
              {videoAt(i) && <PlayBadge small className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
            </button>
          ))}
        </div>
      )}
    </dialog>
  );
}

export default GalleryLightbox;
