"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent, type MouseEvent, type PointerEvent } from "react";

const SWIPE_PX = 40;

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
  const moving = useRef(false);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const touches = useRef(0);

  const active = looped ? (position - 1 + count) % count : 0;

  const move = useCallback(
    (to: number) => {
      if (!looped || moving.current) return;
      moving.current = true;
      setAnimate(true);
      setPosition(to);
    },
    [looped],
  );

  const next = useCallback(() => move(position + 1), [move, position]);
  const prev = useCallback(() => move(position - 1), [move, position]);
  const goTo = useCallback((index: number) => move(index + 1), [move]);

  /* After each slide: leave a copy for its real slide (no animation), then re-enable the transition. */
  useEffect(() => {
    if (!looped) return;
    const timer = window.setTimeout(() => {
      moving.current = false;
      if (position === 0 || position === count + 1) {
        setAnimate(false);
        setPosition(position === 0 ? count : 1);
      }
    }, slideMs);
    return () => window.clearTimeout(timer);
  }, [position, count, looped, slideMs]);

  useEffect(() => {
    if (animate) return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  useEffect(() => {
    if (paused || externalPause || !looped || !interval) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      if (document.visibilityState === "visible" && (window.visualViewport?.scale ?? 1) <= 1.01) next();
    }, interval);
    return () => window.clearTimeout(timer);
  }, [position, paused, externalPause, looped, interval, next]);

  /** Spread on the slide viewport. */
  const handlers = {
    onFocus: (e: FocusEvent) => setPaused((e.target as HTMLElement).matches(":focus-visible")),
    onBlur: () => setPaused(false),
    onPointerDown: (e: PointerEvent) => {
      /* A second finger is a pinch zoom: never a swipe, and the lift must not open the slide's link. */
      if (e.pointerType === "touch" && ++touches.current > 1) {
        dragStart.current = null;
        dragged.current = true;
        return;
      }
      dragStart.current = e.clientX;
      dragged.current = false;
    },
    onPointerCancel: (e: PointerEvent) => {
      if (e.pointerType === "touch") touches.current = Math.max(0, touches.current - 1);
      dragStart.current = null;
    },
    onPointerUp: (e: PointerEvent) => {
      if (e.pointerType === "touch") touches.current = Math.max(0, touches.current - 1);
      const start = dragStart.current;
      dragStart.current = null;
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
    style: { transform: `translateX(-${position * 100}%)`, transition: animate ? undefined : "none" },
  };

  return { active, goTo, next, prev, handlers, track };
}
