import { sanitizeHtml } from "@/utils/product-description";

/**
 * Magento CMS page HTML (Page Builder or the old theme's markup) cleaned up for our CMS styles:
 * leftovers removed and the old theme's bold "titles" turned into real headings.
 */
export function normalizeCmsHtml(raw: string): string {
  return sanitizeHtml(raw)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/(^|>)\s*```\s*(?=<|$)/g, "$1")
    .replace(/<(div|p|span)[^>]*>(?:\s|&nbsp;)*<\/\1>/gi, "")
    .replace(/(<div class="bonus-title">)\s*<strong>([\s\S]*?)<\/strong>/gi, "$1<h2>$2</h2>")
    .replace(/<div class="card-header">\s*<strong>([\s\S]*?)<\/strong>\s*<\/div>/gi, '<h3 class="card-header">$1</h3>')
    .replace(/<h([1-6])([^>]*)>\s*<strong>([\s\S]*?)<\/strong>\s*<\/h\1>/gi, "<h$1$2>$3</h$1>")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Plain-text summary for meta descriptions. */
export function cmsSummary(html: string, max = 160): string {
  const text = html.replace(/<(h[1-6])[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…` : text;
}
