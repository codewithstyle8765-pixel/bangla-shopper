import type { ApiResult } from "@/types/storefront";

/** What `/api/graphql` receives: FormData from forms, a JSON object from everything else. */
export type RawInput = FormData | Record<string, unknown>;

/**
 * One allowlisted operation. `parse` turns untrusted input into `I` (throwing `InputError`),
 * `run` does the work. `I` and `O` are what the browser-side `callApi()` is typed against.
 */
export interface Operation<I, O> {
  parse: (raw: RawInput) => I;
  run: (input: I) => Promise<ApiResult<O>>;
}

export const defineOperation = <I, O>(operation: Operation<I, O>) => operation;

export class InputError extends Error {}

/* ───────────── Input parsers ───────────── */

export const noInput = (): void => undefined;

export function formInput(raw: RawInput): FormData {
  if (raw instanceof FormData) return raw;
  throw new InputError("This operation expects form data.");
}

function jsonObject(raw: RawInput): Record<string, unknown> {
  if (raw instanceof FormData) throw new InputError("This operation expects JSON.");
  return raw;
}

export function text(raw: RawInput, key: string, { optional = false } = {}): string {
  const value = jsonObject(raw)[key];
  if (typeof value === "string" && value.trim()) return value.trim();
  if (optional && (value === undefined || value === "")) return "";
  throw new InputError(`"${key}" must be a non-empty string.`);
}

export function integer(raw: RawInput, key: string, fallback?: number): number {
  const value = jsonObject(raw)[key];
  if (value === undefined && fallback !== undefined) return fallback;
  if (typeof value === "number" && Number.isFinite(value)) return Math.floor(value);
  throw new InputError(`"${key}" must be a number.`);
}

export function textList(raw: RawInput, key: string, { optional = false } = {}): string[] {
  const value = jsonObject(raw)[key];
  if (optional && value === undefined) return [];
  if (Array.isArray(value) && value.every((v) => typeof v === "string")) return value;
  throw new InputError(`"${key}" must be a list of strings.`);
}

export function object<T>(raw: RawInput, key: string): T {
  const value = jsonObject(raw)[key];
  if (value && typeof value === "object" && !Array.isArray(value)) return value as T;
  throw new InputError(`"${key}" must be an object.`);
}

/* ───────────── Shared helpers ───────────── */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const INVALID = "Please fix the highlighted fields.";

export const strongPassword = (value: string) => value.length >= 8 && /\d/.test(value) && /[a-z]/i.test(value);

export const field = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

export const errorMessage = (error: unknown) => (error instanceof Error ? error.message : "Something went wrong. Please try again.");

/** Submitted values (never passwords) so a form can restore them after an error. */
export function echo(data: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  data.forEach((value, key) => {
    if (typeof value === "string" && !/password/i.test(key)) values[key] = value;
  });
  return values;
}

/** Runs `work`, turning a thrown error into `{ ok: false, message }`. */
export async function attempt<T>(work: () => Promise<T>, extra: { message?: string; redirect?: string; refresh?: boolean } = {}): Promise<ApiResult<T>> {
  try {
    return { ok: true, data: await work(), ...extra };
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }
}

export function invalid(fieldErrors: Record<string, string>, data?: FormData): ApiResult<never> {
  return { ok: false, message: INVALID, fieldErrors, values: data ? echo(data) : undefined };
}

export const hasErrors = (errors: Record<string, string>) => Object.keys(errors).length > 0;
