/**
 * Single GraphQL cache layer, built on `unstable_cache` (Next.js Data Cache).
 *
 * This is the ONE place caching happens for read queries. Cache Components
 * ('use cache') is off because it hangs on Cloudflare Workers.
 *
 * Use these helpers for deterministic, non-personalized data (catalog,
 * navigation, CMS content).
 */
import { unstable_cache } from "next/cache";
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
 * Core cached GraphQL request.
 *
 * The document is printed to a string so the query text and variables
 * form the cache key, then parsed back inside the cached function.
 */
export async function graphqlRequestCached<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode,
  variables: TVariables | undefined,
  options: { tags?: string[]; life?: CacheLifeOption },
): Promise<TData> {
  return cachedQuery<TData>(print(query), (variables ?? {}) as Record<string, unknown>, options);
}

async function cachedQuery<TData>(
  queryText: string,
  variables: Record<string, unknown>,
  options: { tags?: string[]; life?: CacheLifeOption },
): Promise<TData> {
  return unstable_cache(
    async () => {
      const client = makeClient();
      /* unstable_cache is the only cache layer — skip Apollo's normalized store. */
      const result = await client.query({
        query: parse(queryText),
        variables,
        fetchPolicy: "no-cache",
      });
      return result.data as TData;
    },
    ["graphql", queryText, JSON.stringify(variables)],
    { tags: options.tags, revalidate: getRevalidateTime(options.life) },
  )();
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
