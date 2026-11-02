/**
 * Single GraphQL cache layer, built on the `'use cache'` directive with `cacheLife()` and `cacheTag()`
 * (same approach as the Bagisto headless reference).
 *
 * This is the ONE place caching happens for read queries. Use it only for deterministic, non-personalized data
 * (catalog, navigation, CMS content): nothing inside a `'use cache'` scope may read `cookies()` or `headers()`.
 * Server-only: import it from Server Components / server modules, never from a Client Component.
 */
import { cacheLife, cacheTag } from "next/cache";
import { type DocumentNode, type OperationVariables } from "@apollo/client";
import { parse, print } from "graphql";
import { getRevalidateTime, type CacheLifeOption } from "@/lib/graphql-fetch";
import makeClient from "@/lib/apollo-client";
import {
  getCategoryCacheConfig,
  getPageCacheConfig,
  getProductCacheConfig,
  type PAGE_CACHE_CONFIG,
} from "@/utils/hooks/useCache";

/**
 * CacheLifeOption → a cacheLife profile shaped like Next's presets ("minutes": revalidate 1 min, expire 1 h).
 * `revalidate` is our refresh time; `expire` (how long a stale entry may still be served while it refreshes) is at
 * least an hour, because an entry that expires in under 5 minutes is left out of the prerendered page.
 * "Never revalidate" becomes one year.
 */
function applyCacheLife(life?: CacheLifeOption): void {
  const revalidate = getRevalidateTime(life);
  const seconds = revalidate === false ? 60 * 60 * 24 * 365 : revalidate;
  cacheLife({ stale: Math.min(300, seconds), revalidate: seconds, expire: Math.max(seconds * 24, 3600) });
}

/** A failed request comes out of the cache as a value, so it is kept only briefly and rethrown outside. */
type CachedResult<TData> = { data: TData } | { error: string };

/**
 * Core cached GraphQL request.
 *
 * The document is printed to a string so the cache key is the query text plus variables (a parsed `gql` document
 * holds class instances that cannot be cache-key arguments); it is parsed back inside the cached function.
 */
export async function graphqlRequestCached<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode,
  variables: TVariables | undefined,
  options: { tags?: string[]; life?: CacheLifeOption },
): Promise<TData> {
  const result = await cachedQuery<TData>(print(query), (variables ?? {}) as Record<string, unknown>, options);
  /* Thrown here, outside 'use cache': an error thrown inside it fails prerendering even when the caller catches it. */
  if ("error" in result) throw new Error(result.error);
  return result.data;
}

async function cachedQuery<TData>(
  queryText: string,
  variables: Record<string, unknown>,
  options: { tags?: string[]; life?: CacheLifeOption },
): Promise<CachedResult<TData>> {
  "use cache";
  for (const tag of options.tags ?? []) cacheTag(tag);

  try {
    const client = makeClient();
    /* 'use cache' is the only cache layer — skip Apollo's normalized store. */
    const result = await client.query({ query: parse(queryText), variables, fetchPolicy: "no-cache" });
    applyCacheLife(options.life);
    return { data: result.data as TData };
  } catch (error) {
    /* Keep a failure briefly: refreshed after 30 s; 5 min is the shortest expiry that still prerenders. */
    cacheLife({ stale: 30, revalidate: 30, expire: 300 });
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function cachedGraphQLRequest<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  page: keyof typeof PAGE_CACHE_CONFIG,
  query: DocumentNode,
  variables?: TVariables,
): Promise<TData> {
  const config = getPageCacheConfig(page);
  return graphqlRequestCached<TData, TVariables>(query, variables, config);
}

export async function cachedProductRequest<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  productId: string,
  query: DocumentNode,
  variables?: TVariables,
): Promise<TData> {
  const config = getProductCacheConfig(productId);
  return graphqlRequestCached<TData, TVariables>(query, variables, config);
}

export async function cachedCategoryRequest<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  categoryId: string,
  query: DocumentNode,
  variables?: TVariables,
): Promise<TData> {
  const config = getCategoryCacheConfig(categoryId);
  return graphqlRequestCached<TData, TVariables>(query, variables, config);
}
