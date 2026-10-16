import { type DocumentNode } from "graphql";
import { type OperationVariables } from "@apollo/client";
import makeClient from "./apollo-client";

export type CacheLifePreset =
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "max";

export type CacheLifeOption = number | CacheLifePreset;

/**
 * Resolves a CacheLifeOption to seconds (or false for "never revalidate").
 * Consumed by unstable_cache revalidate in cached-graphql.ts.
 */
export function getRevalidateTime(life?: CacheLifeOption): number | false {
  if (!life) return false;
  if (typeof life === "number") return life;

  switch (life) {
    case "seconds":
      return 10;
    case "minutes":
      return 60;
    case "hours":
      return 3600;
    case "days":
      return 86400;
    case "weeks":
      return 604800;
    case "max":
      return false;
    default:
      return false;
  }
}

export interface GraphQLRequestNoCacheOptions {
  context?: Record<string, unknown>;
  fetchPolicy?: "cache-first" | "network-only" | "no-cache" | "cache-only";
}

/**
 * Uncached GraphQL request. Use this for personalized / request-time data
 * (cart, checkout, customer account) that must never be shared across requests.
 */
export async function graphqlRequestNoCache<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode,
  variables?: TVariables,
  options?: GraphQLRequestNoCacheOptions,
): Promise<TData> {
  const client = makeClient();
  const result = await client.query({
    query,
    variables,
    context: options?.context,
    fetchPolicy: options?.fetchPolicy ?? "no-cache",
  });

  return result.data as TData;
}

/** Bearer header for personalized operations (customer token). */
export function authContext(token?: string | null) {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
}

/**
 * Uncached GraphQL mutation (cart, checkout, customer, newsletter).
 * Throws the first GraphQL error message so Server Actions can surface it.
 */
export async function graphqlMutate<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(mutation: DocumentNode, variables?: TVariables, token?: string | null): Promise<TData> {
  const client = makeClient();
  const result = await client.mutate<TData, TVariables>({
    mutation,
    variables: variables as TVariables,
    context: authContext(token),
    fetchPolicy: "no-cache",
  });
  if (result.error) throw result.error;
  return result.data as TData;
}
