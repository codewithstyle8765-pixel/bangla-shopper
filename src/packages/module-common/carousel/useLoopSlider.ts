"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent, type MouseEvent, type PointerEvent } from "react";

const SWIPE_PX = 40;
/** A mouse that moves this far is dragging, so letting go must not open the slide's link. */
const MOUSE_DRAG_PX = 8;

interface LoopSliderOptions {
  /** Autoplay interval in ms; 0 turns autoplay off. */
  interval?: number;
  /** Slide transition length in ms (must match the track's CSS duration). */
  slideMs?: number;
  /** Extra pause from the caller (e.g. hover on the PDP gallery). */
  paused?: boolean;
}

/** Track order for an endless loop: a copy of the last slide before the first and of the first after the last. */
export function loopSlides<T>(slides: T[]): T[] {
  return slides.length > 1 ? [slides[slides.length - 1], ...slides, slides[0]] : slides;
}

/**
 * Endless carousel over `loopSlides(slides)`: always moves one step in the swiped direction
 * (first → back shows the last), then jumps from a copy to its real slide without animation.
 * Autoplay pauses while a keyboard user is inside it, in hidden tabs, for reduced motion and when `paused`.
 */
export function useLoopSlider(count: number, { interval = 5000, slideMs = 700, paused: externalPause = false }: LoopSliderOptions = {}) {
  const looped = count > 1;
  const [position, setPosition] = useState(looped ? 1 : 0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  /* Mouse button held on the slides: autoplay waits so it never moves under the cursor. */
  const [pressed, setPressed] = useState(false);
  /* Track offset in px from `position` while a mouse drag holds it; null when not dragging. */
  const [dragX, setDragX] = useState<number | null>(null);
  /* Where the track stood when the drag took hold (mid-slide when autoplay was moving), relative to `position`. */
  const dragBase = useRef(0);
  /* Slide the drag is measured from; always a real slide so a drag can carry on past either end. */
  const dragFrom = useRef(position);
  /* Latest drag offset; the release can arrive before React renders the last move. */
  const dragLatest = useRef<number | null>(null);
  const holding = useRef(false);
  /* Re-runs the settle step when a drag lets go on the slide it started from. */
  const [settle, setSettle] = useState(0);
  const moving = useRef(false);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const touches = useRef(0);

  const active = looped ? (position - 1 + count) % count : 0;

  const move = useCallback(
    (to: number) => {
      /* Going to the slide already shown would set the lock with no slide to release it. */
      if (!looped || moving.current || to === position) return;
      moving.current = true;
      setAnimate(true);
      setPosition(to);
    },
    [looped, position],
  );

  const next = useCallback(() => move(position + 1), [move, position]);
  const prev = useCallback(() => move(position - 1), [move, position]);
  const goTo = useCallback((index: number) => move(index + 1), [move]);

  /* After each slide: leave a copy for its real slide (no animation), then re-enable the transition. */
  useEffect(() => {
    if (!looped) return;
    const timer = window.setTimeout(() => {
      moving.current = false;
      if (holding.current) return;
      if (position === 0 || position === count + 1) {
        setAnimate(false);
        setPosition(position === 0 ? count : 1);
      }
    }, slideMs);
    return () => window.clearTimeout(timer);
  }, [position, settle, count, looped, slideMs]);

  useEffect(() => {
    if (animate) return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  useEffect(() => {
    if (paused || pressed || externalPause || !looped || !interval) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      if (document.visibilityState === "visible" && (window.visualViewport?.scale ?? 1) <= 1.01) next();
    }, interval);
    return () => window.clearTimeout(timer);
  }, [position, paused, pressed, externalPause, looped, interval, next]);

  /** Spread on the slide viewport. */
  const handlers = {
    onFocus: (e: FocusEvent) => setPaused((e.target as HTMLElement).matches(":focus-visible")),
    onBlur: () => setPaused(false),
    onPointerDown: (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      /* A second finger is a pinch zoom: never a swipe, and the lift must not open the slide's link. */
      if (e.pointerType === "touch" && ++touches.current > 1) {
        dragStart.current = null;
        dragged.current = true;
        return;
      }
      dragStart.current = e.clientX;
      dragged.current = false;
      if (e.pointerType === "mouse") setPressed(true);
    },
    /* Mouse only: the track follows the cursor, and the mouse is captured so letting go outside still counts. */
    onPointerMove: (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || dragStart.current === null || !looped) return;
      const dx = e.clientX - dragStart.current;
      if (!dragged.current && Math.abs(dx) <= MOUSE_DRAG_PX) return;
      const width = e.currentTarget.clientWidth;
      if (!dragged.current) {
        dragged.current = true;
        holding.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        /* Take over an autoplay slide where it is now instead of jumping to its end. */
        const shown = e.currentTarget.firstElementChild;
        let x = shown ? new DOMMatrix(getComputedStyle(shown).transform).m41 : -position * width;
        /* On or near an end copy, swap to the real slide it copies (same picture), so the loop goes on. */
        if (-x / width > count + 0.5) x += count * width;
        else if (-x / width < 0.5) x -= count * width;
        const from = Math.max(1, Math.min(count, Math.round(-x / width)));
        dragFrom.current = from;
        dragBase.current = x + from * width;
        if (from !== position) setPosition(from);
      }
      const from = dragFrom.current;
      const offset = dragBase.current + Math.max(-width, Math.min(width, dx));
      dragLatest.current = Math.max((from - count - 1) * width, Math.min(from * width, offset));
      setDragX(dragLatest.current);
    },
    onPointerCancel: (e: PointerEvent) => {
      if (e.pointerType === "touch") touches.current = Math.max(0, touches.current - 1);
      dragStart.current = null;
      holding.current = false;
      dragLatest.current = null;
      setPressed(false);
      setDragX(null);
      setSettle((n) => n + 1);
    },
    onPointerUp: (e: PointerEvent) => {
      if (e.pointerType === "touch") touches.current = Math.max(0, touches.current - 1);
      const start = dragStart.current;
      dragStart.current = null;
      holding.current = false;
      setPressed(false);
      const held = dragLatest.current;
      dragLatest.current = null;
      if (e.pointerType === "mouse" && held !== null) {
        /* Settle on the slide the drag points to, counted from where the track is shown, so autoplay and the drag never add up. */
        const dx = e.clientX - (start ?? e.clientX);
        const from = dragFrom.current;
        const shown = from - held / e.currentTarget.clientWidth;
        const to = Math.abs(dx) > SWIPE_PX ? (dx < 0 ? Math.floor(shown) + 1 : Math.ceil(shown) - 1) : Math.round(shown);
        const target = Math.max(0, Math.min(count + 1, to));
        setDragX(null);
        setAnimate(true);
        moving.current = true;
        if (target !== from) setPosition(target);
        else setSettle((n) => n + 1);
        return;
      }
      setDragX(null);
      if (start !== null && Math.abs(e.clientX - start) > SWIPE_PX) {
        dragged.current = true;
        if (e.clientX < start) next();
        else prev();
      }
    },
    /* A swipe should change the slide, not open its link. */
    onClickCapture: (e: MouseEvent) => {
      if (dragged.current) e.preventDefault();
    },
  };

  /** Spread on the sliding track. */
  const track = {
    style: {
      transform: dragX === null ? `translateX(-${position * 100}%)` : `translateX(calc(-${position * 100}% + ${dragX}px))`,
      transition: animate && dragX === null ? undefined : "none",
    },
  };

  return { active, goTo, next, prev, handlers, track };
}
