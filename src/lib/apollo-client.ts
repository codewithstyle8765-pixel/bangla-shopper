import { cache as reactCache } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { DEFAULT_STORE, MAGENTO_ENDPOINT } from "@/util/Constants";
import { FALLBACK_MODE } from "@/lib/config";
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

  /* FALLBACK_MODE: answer from src/mocks. Remove this line together with src/mocks/. */
  const link = FALLBACK_MODE ? from([authLink, graphqlDebugLink, createMockLink()]) : from([authLink, graphqlDebugLink, httpLink]);

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
