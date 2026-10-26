import { AsyncLocalStorage } from "node:async_hooks";
import { ApolloLink } from "@apollo/client";
import { print } from "graphql";
import { tap } from "rxjs";
import { FALLBACK_MODE } from "@/lib/config";

/**
 * Development aid: every GraphQL request an /api/graphql call makes to Magento (or the mocks) is recorded and
 * returned as `_debug` in that response, so the Network tab shows the real query. Never active in production.
 */
export const GRAPHQL_DEBUG = process.env.NODE_ENV === "development";

export interface GraphqlDebugEntry {
  operation: string;
  query: string;
  variables: Record<string, unknown>;
  ms: number;
  source: "mock" | "magento";
  error?: string;
}

const store = new AsyncLocalStorage<GraphqlDebugEntry[]>();

/** Runs `work` while collecting the GraphQL requests it makes. */
export async function withGraphqlLog<T>(work: () => Promise<T>): Promise<{ result: T; log: GraphqlDebugEntry[] }> {
  const log: GraphqlDebugEntry[] = [];
  const result = await store.run(log, work);
  return { result, log };
}

const SECRET = /password|token/i;

function masked(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(masked);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, SECRET.test(k) ? "•••" : masked(v)]));
  }
  return value;
}

/** Apollo link that records each request into the current log (passwords and tokens masked). */
export const graphqlDebugLink = new ApolloLink((operation, forward) => {
  const log = GRAPHQL_DEBUG ? store.getStore() : undefined;
  if (!log) return forward(operation);
  const started = performance.now();
  const entry = (error?: unknown): GraphqlDebugEntry => ({
    operation: operation.operationName ?? "anonymous",
    query: print(operation.query),
    variables: masked(operation.variables) as Record<string, unknown>,
    ms: Math.round(performance.now() - started),
    source: FALLBACK_MODE ? "mock" : "magento",
    ...(error !== undefined && { error: error instanceof Error ? error.message : String(error) }),
  });
  return forward(operation).pipe(
    tap({
      next: (result) => log.push(entry(result.errors?.[0]?.message)),
      error: (error) => log.push(entry(error)),
    }),
  );
});
