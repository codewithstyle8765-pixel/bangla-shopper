export type SearchParamsRecord = Record<string, string | string[] | undefined>;

export function toURLSearchParams(params: SearchParamsRecord): URLSearchParams {
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    usp.set(key, Array.isArray(value) ? value.join(",") : value);
  }
  return usp;
}

export function createUrl(pathname: string, params: URLSearchParams): string {
  const query = params.toString();
  return `${pathname}${query ? `?${query}` : ""}`;
}

/** Toggle one value of a comma-separated multi-value param; always resets pagination. */
export function toggleParamValue(params: URLSearchParams, key: string, value: string, single = false): URLSearchParams {
  const next = new URLSearchParams(params);
  const current = (next.get(key) ?? "").split(",").filter(Boolean);
  const exists = current.includes(value);
  const values = single ? (exists ? [] : [value]) : exists ? current.filter((v) => v !== value) : [...current, value];
  if (values.length) next.set(key, values.join(","));
  else next.delete(key);
  next.delete("page");
  return next;
}
