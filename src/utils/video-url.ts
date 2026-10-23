const ID = /^[\w-]{11}$/;

/** YouTube video ID from a watch, share, shorts or embed link (youtube.com, youtu.be, youtube-nocookie.com); null for anything else. */
export function youTubeId(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url.trim(), "https://www.youtube.com");
    const host = u.hostname.replace(/^(www|m)\./, "");
    const id =
      host === "youtu.be"
        ? u.pathname.slice(1)
        : host === "youtube.com" || host === "youtube-nocookie.com"
          ? u.searchParams.get("v") ?? u.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/)?.[1]
          : null;
    return id && ID.test(id) ? id : null;
  } catch {
    return null;
  }
}

export const youTubeThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/** Thumbnails served by YouTube itself skip the image optimizer (its host is not in `images.remotePatterns`). */
export const isYouTubeThumbnail = (src: string) => src.startsWith("https://i.ytimg.com/");
