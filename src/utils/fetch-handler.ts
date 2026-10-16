type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FetchHandlerOptions<TBody = unknown> {
  url: string;
  method?: Method;
  body?: TBody;
  headers?: Record<string, string>;
  contentType?: boolean;
}

export interface FetchHandlerResponse<T = unknown> {
  data: T | null;
  error?: { status?: number; message: string };
  [key: string]: any;
}

/**
 * Standardized typed client-side fetcher for browser calls to internal Next.js API routes (/api/...).
 * Modeled after bagisto-headless.
 */
export async function fetchHandler<T = unknown>({
  url,
  method = "GET",
  body,
  headers = {},
  contentType = true,
}: FetchHandlerOptions): Promise<FetchHandlerResponse<T>> {
  try {
    const defaultHeaders: Record<string, string> = {
      ...(contentType ? { "Content-Type": "application/json" } : {}),
      ...headers,
    };

    const response = await fetch(`/api/${url}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const result = (await response.json()) as Record<string, any>;
    if (!response.ok) {
      return {
        data: null,
        error: {
          status: response?.status,
          message: result?.error || "Something went wrong",
        },
      };
    }
    return {
      data: (result?.data ?? result) as T,
      ...result,
    };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";

    return {
      data: null,
      error: {
        message: error,
      },
    };
  }
}
