/**
 * Turns Magento product `description.html` (admin content) into sections the PDP can lay out:
 * intro, then one section per h2/h3/h4, typed by its title ("Features", "How To Use", "Ingredients"...).
 */

export type DescriptionSectionKind = "features" | "steps" | "ingredients" | "notes" | "content";

export interface DescriptionSection {
  title: string;
  kind: DescriptionSectionKind;
  /** List items (features, steps, notes) or the plain ingredient text. */
  items: string[];
  /** Sanitised HTML for free-form sections, without its images. */
  html: string;
  images: DescriptionImage[];
}

export interface DescriptionImage {
  src: string;
  alt: string;
}

export interface ParsedDescription {
  introHtml: string;
  introImages: DescriptionImage[];
  sections: DescriptionSection[];
}

const KINDS: Array<[RegExp, DescriptionSectionKind]> = [
  [/how to use|direction|application|usage/i, "steps"],
  [/ingredient/i, "ingredients"],
  [/feature|benefit|highlight|key /i, "features"],
  [/good to know|caution|warning|note|storage|precaution/i, "notes"],
];

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&rsquo;/g, "’");

export const stripTags = (html: string) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/** Admin content is trusted, but scripts, frames and inline handlers are dropped anyway. */
export function sanitizeHtml(html: string) {
  return html
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, "$1=$2#$2");
}

/** Images are pulled out so the page renders them with next/image. */
function takeImages(html: string): { html: string; images: DescriptionImage[] } {
  const images: DescriptionImage[] = [];
  const rest = html.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = tag.match(/\ssrc\s*=\s*["']([^"']+)["']/i)?.[1];
    if (src && !src.startsWith("data:")) images.push({ src, alt: decode(tag.match(/\salt\s*=\s*["']([^"']*)["']/i)?.[1] ?? "") });
    return "";
  });
  return { html: rest.replace(/<p[^>]*>\s*<\/p>/gi, "").trim(), images };
}

const listItems = (html: string) => [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => stripTags(m[1])).filter(Boolean);
const paragraphs = (html: string) => [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => stripTags(m[1])).filter(Boolean);

export function parseDescription(raw: string): ParsedDescription {
  const html = sanitizeHtml(raw ?? "").trim();
  const headings = [...html.matchAll(/<h([2-4])[^>]*>([\s\S]*?)<\/h\1>/gi)];
  const intro = takeImages(headings.length ? html.slice(0, headings[0].index) : html);

  const sections = headings.map((h, i) => {
    const title = stripTags(h[2]);
    const body = html.slice(h.index! + h[0].length, headings[i + 1]?.index ?? html.length).trim();
    const kind = KINDS.find(([re]) => re.test(title))?.[1] ?? "content";
    const items =
      kind === "ingredients" ? [stripTags(body)] : kind === "content" ? [] : listItems(body).length ? listItems(body) : paragraphs(body);
    const content = kind === "content" ? takeImages(body) : { html: "", images: [] };
    return { title, kind, items: items.filter(Boolean), ...content };
  });

  return { introHtml: intro.html, introImages: intro.images, sections: sections.filter((s) => s.items.length || s.html || s.images.length) };
}

/** Plain-text summary for meta tags and Product JSON-LD. */
export function descriptionSummary(raw: string, max = 300): string {
  const { introHtml } = parseDescription(raw);
  const text = stripTags(introHtml || raw || "");
  return text.length > max ? `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…` : text;
}
