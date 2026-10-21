"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/** Fades in on load (priority images skip the fade so LCP is not delayed). */
export interface NextImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string;
  className?: string;
}

const DEFAULT_FALLBACK = "/assets/images/placeholder.svg";

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
  /* The square placeholder keeps the slot's own ratio, so h-auto banners don't grow to its 1:1 shape. */
  const fallbackStyle =
    finalSrc === fallbackSrc
      ? { objectFit: "contain" as const, backgroundColor: "var(--color-placeholder)", ...(width && height ? { aspectRatio: `${width} / ${height}` } : {}), ...style }
      : style;

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
      style={fallbackStyle}
      {...rest}
    />
  );
}

export default NextImage;
