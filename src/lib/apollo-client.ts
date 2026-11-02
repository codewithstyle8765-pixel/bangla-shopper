import { cache as reactCache } from "react";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
import { DEFAULT_STORE, MAGENTO_ENDPOINT } from "@/util/Constants";
import { FALLBACK_MODE, LIVE_OPERATIONS } from "@/lib/config";
import { createMockLink } from "@/mocks/link";
import { graphqlDebugLink } from "@/lib/graphql-debug";

/** Server only: the browser talks to /api/graphql, never to Apollo. */
function createApolloClient() {
  const cache = new InMemoryCache();

  const httpLink = new HttpLink({ uri: MAGENTO_ENDPOINT });

  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        "Content-Type": "application/json",
        "Store": DEFAULT_STORE,
      },
    };
  });

  /* FALLBACK_MODE: mocks answer everything not yet integrated (LIVE_OPERATIONS go to Magento). Remove with src/mocks/. */
  const terminal = FALLBACK_MODE ? ApolloLink.split((op) => LIVE_OPERATIONS.has(op.operationName ?? ""), httpLink, createMockLink()) : httpLink;
  /* Magento sometimes drops a connection: retry reads up to twice. Mutations are never retried (no double add-to-cart). */
  const retryLink = new RetryLink({
    delay: { initial: 300, max: 1500, jitter: true },
    attempts: (attempt, operation) =>
      attempt <= 3 && operation.query.definitions.some((d) => d.kind === "OperationDefinition" && d.operation === "query"),
  });
  const link = from([authLink, graphqlDebugLink, retryLink, terminal]);

  return new ApolloClient({
    ssrMode: true,
    link,
    cache,
    defaultOptions: {
      watchQuery: { fetchPolicy: "network-only", nextFetchPolicy: "network-only" },
      query: { fetchPolicy: "network-only" },
    },
  });
}

const getClient = reactCache(createApolloClient);

export default function makeClient() {
  return getClient();
}
