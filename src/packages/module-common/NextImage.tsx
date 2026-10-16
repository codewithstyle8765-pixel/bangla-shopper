"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/** Fades in on load (priority images skip the fade so LCP is not delayed). */
export interface NextImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string;
  className?: string;
}

/** Shopping-bag placeholder in brand-surface / muted-line colours. */
const DEFAULT_FALLBACK = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>" +
    "<rect width='400' height='400' fill='#f8fafc'/>" +
    "<g fill='none' stroke='#c2c2c2' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'>" +
    "<path d='M140 170h120l12 104a10 10 0 0 1-10 11H138a10 10 0 0 1-10-11z'/>" +
    "<path d='M170 170v-14a30 30 0 0 1 60 0v14'/>" +
    "</g></svg>",
)}`;

export function NextImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  fallbackSrc = DEFAULT_FALLBACK,
  unoptimized,
  style,
  ...rest
}: NextImageProps) {
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);
  const [loaded, setLoaded] = useState(false);
  const finalSrc = !src || failedSrc === src ? fallbackSrc : src;

  const isDataUrl = typeof finalSrc === "string" && finalSrc.startsWith("data:");

  return (
    <Image
      src={finalSrc}
      alt={alt || ""}
      width={width}
      height={height}
      priority={priority}
      onError={() => setFailedSrc(src)}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-300 ${loaded || priority ? "opacity-100" : "opacity-0"}`}
      unoptimized={unoptimized ?? isDataUrl}
      style={style}
      {...rest}
    />
  );
}

export default NextImage;
