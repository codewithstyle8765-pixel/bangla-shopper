"use client";

import { startTransition, useEffect, type FormEvent, type RefObject } from "react";
import type { ApiResult } from "@/types/storefront";

/**
 * Submit handler for `<form onSubmit>` that runs a `useActionState` action without React's automatic
 * form reset: after a failed submit everything the customer typed stays, including passwords (which the
 * server never echoes back). The form is cleared only after a successful submit.
 */
export function useSubmitWithoutReset(
  formRef: RefObject<HTMLFormElement | null>,
  action: (formData: FormData) => void,
  state: ApiResult<unknown> | null,
) {
  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [formRef, state]);

  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => action(formData));
  };
}
