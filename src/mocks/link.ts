import { ApolloLink } from "@apollo/client";
import { Observable } from "rxjs";
import { mockResolver } from "./index";

/**
 * Terminating Apollo link used when FALLBACK_MODE=true: every operation is
 * answered by `src/mocks` (by operation name) instead of the Magento endpoint.
 */
export function createMockLink() {
  return new ApolloLink(
    (operation) =>
      new Observable((observer) => {
        const headers = (operation.getContext().headers ?? {}) as Record<string, string>;
        const token = headers.Authorization?.replace(/^Bearer\s+/i, "") ?? null;

        mockResolver(operation.operationName ?? "anonymous", operation.variables, token)
          .then((data) => {
            observer.next({ data: data as Record<string, unknown> });
            observer.complete();
          })
          .catch((error) => observer.error(error));
      }),
  );
}
