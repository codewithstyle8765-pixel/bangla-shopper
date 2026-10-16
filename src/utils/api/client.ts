"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { ApiResult } from "@/types/storefront";
import type { FormOperationName, OperationInput, OperationName, OperationOutput } from "./operations";

/** Operations without input take no second argument. */
type InputArgs<N extends OperationName> = OperationInput<N> extends void ? [] : [input: OperationInput<N>];

/**
 * Calls an allowlisted operation: `callApi("AddToCart", { sku, quantity })`.
 * Input and result types come from the operation's definition.
 */
export async function callApi<N extends OperationName>(op: N, ...[input]: InputArgs<N>): Promise<ApiResult<OperationOutput<N>>> {
  const body = input instanceof FormData ? input : JSON.stringify(input ?? {});
  const headers: HeadersInit = input instanceof FormData ? {} : { "Content-Type": "application/json" };
  try {
    const res = await fetch(`/api/graphql?op=${op}`, { method: "POST", headers, body });
    return (await res.json()) as ApiResult<OperationOutput<N>>;
  } catch {
    return { ok: false, message: "Network error. Please check your connection and try again." };
  }
}

/** Applies the server's `redirect` / `refresh` hints after a change. */
export function useApiFollowUp() {
  const router = useRouter();
  return useCallback(
    <T,>(result: ApiResult<T>) => {
      if (result.redirect) router.push(result.redirect);
      else if (result.refresh) router.refresh();
      return result;
    },
    [router],
  );
}

/** `useActionState` handler that submits a form to an operation. */
export function useFormOperation<N extends FormOperationName>(op: N) {
  const followUp = useApiFollowUp();
  return useCallback(
    async (_prev: ApiResult<OperationOutput<N>> | null, formData: FormData) =>
      followUp(await callApi<N>(op, ...([formData] as InputArgs<N>))),
    [op, followUp],
  );
}
