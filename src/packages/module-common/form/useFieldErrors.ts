"use client";

import { useEffect, useState, type RefObject } from "react";
import type { ApiResult } from "@/types/storefront";

/**
 * Field errors of the last submit, as checkout shows them: the first invalid field gets focus,
 * and each error disappears as soon as the customer edits that field.
 */
export function useFieldErrors(formRef: RefObject<HTMLFormElement | null>, state: ApiResult<unknown> | null): Record<string, string> {
  const [edited, setEdited] = useState<{ state: typeof state; names: ReadonlySet<string> }>({ state, names: new Set() });
  /* A new submit result starts with every error showing again. */
  const names = edited.state === state ? edited.names : new Set<string>();
  if (edited.state !== state) setEdited({ state, names });

  useEffect(() => {
    if (!state || state.ok) return;
    const first = Object.keys(state.fieldErrors ?? {})[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${CSS.escape(first)}"]`)?.focus();
  }, [formRef, state]);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const onEdit = (e: Event) => {
      const name = (e.target as HTMLInputElement | null)?.name;
      if (name) setEdited((prev) => (prev.names.has(name) ? prev : { state: prev.state, names: new Set(prev.names).add(name) }));
    };
    form.addEventListener("input", onEdit);
    form.addEventListener("change", onEdit);
    return () => {
      form.removeEventListener("input", onEdit);
      form.removeEventListener("change", onEdit);
    };
  }, [formRef]);

  if (!state || state.ok || !state.fieldErrors) return {};
  return Object.fromEntries(Object.entries(state.fieldErrors).filter(([name]) => !names.has(name)));
}
