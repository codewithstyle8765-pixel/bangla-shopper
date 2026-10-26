import { NextResponse, type NextRequest } from "next/server";
import { InputError, type RawInput } from "@/utils/api/define";
import { isOperation, OPERATIONS } from "@/utils/api/operations";
import { GRAPHQL_DEBUG, withGraphqlLog } from "@/lib/graphql-debug";

/**
 * POST /api/graphql?op=AddToCart — runs one allowlisted operation.
 * Body: FormData (forms) or JSON variables. Token and cart id come from httpOnly cookies.
 */
const NO_STORE = { "Cache-Control": "private, no-store" };

const reply = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: NO_STORE });

/** Blocks cross-site form posts (CSRF): browsers always send Origin on POST. */
function isSameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function readInput(req: NextRequest): Promise<RawInput> {
  const type = req.headers.get("content-type") ?? "";
  if (type.includes("multipart/form-data") || type.includes("application/x-www-form-urlencoded")) return req.formData();
  const body = await req.json().catch(() => null);
  return body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : {};
}

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return reply({ ok: false, message: "Forbidden." }, 403);

  const name = req.nextUrl.searchParams.get("op");
  if (!isOperation(name)) return reply({ ok: false, message: "Unknown operation." }, 400);
  const operation = OPERATIONS[name] as { parse: (raw: RawInput) => unknown; run: (input: unknown) => Promise<unknown> };

  try {
    const input = operation.parse(await readInput(req));
    if (!GRAPHQL_DEBUG) return reply(await operation.run(input));
    /* Development only: the GraphQL sent to Magento, visible in the browser's Network tab. */
    const { result, log } = await withGraphqlLog(() => operation.run(input));
    for (const e of log) console.log(`[graphql] ${name} → ${e.operation} (${e.source}) ${e.ms}ms${e.error ? ` ✗ ${e.error}` : ""}`);
    return reply({ ...(result as object), _debug: log });
  } catch (error) {
    if (error instanceof InputError) return reply({ ok: false, message: error.message }, 400);
    return reply({ ok: false, message: "Something went wrong. Please try again." }, 500);
  }
}
