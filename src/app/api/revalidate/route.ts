import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Magento webhook: POST { type, key? } with header `x-revalidate-secret`.
 * Tags match src/utils/hooks/useCache.ts.
 */
type Payload = { type?: unknown; key?: unknown };

const TAGS: Record<string, (key: string) => string[]> = {
  product: (key) => [key ? `product-${key}` : "products", "categories", "search-results"],
  category: (key) => [key ? `category-${key}` : "categories"],
  cms: () => ["static-content", "home-page"],
  all: () => ["products", "categories", "search-results", "static-content", "home-page", "all-products"],
};

function validSecret(received: string | null) {
  const expected = process.env.REVALIDATION_SECRET;
  if (!expected || !received) return false;
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  if (!validSecret(req.headers.get("x-revalidate-secret"))) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as Payload;
  const type = typeof body.type === "string" ? body.type : "";
  const key = typeof body.key === "string" ? body.key.trim() : "";
  const tagsFor = Object.hasOwn(TAGS, type) ? TAGS[type] : undefined;
  if (!tagsFor) return NextResponse.json({ ok: false, message: `type must be one of: ${Object.keys(TAGS).join(", ")}.` }, { status: 400 });

  const tags = tagsFor(key);
  for (const tag of tags) revalidateTag(tag, "max");
  return NextResponse.json({ ok: true, revalidated: tags });
}
