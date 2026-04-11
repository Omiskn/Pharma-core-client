import { apiConfig, buildApiUrl } from "@/core/api/config";

type Primitive = string | number | boolean;
type QueryValue = Primitive | null | undefined;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  query?: Record<string, QueryValue>;
  timeoutMs?: number;
  useApiPrefix?: boolean;
};

function buildUrl(path: string, query?: Record<string, QueryValue>, useApiPrefix = true) {
  const url = new URL(buildApiUrl(path, { useApiPrefix }), window.location.origin);

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    url.searchParams.set(key, String(value));
  }

  return url.toString();
}

async function parseResponse(res: Response) {
  const contentType = res.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return res.json();
  }

  const text = await res.text();
  return text || null;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? apiConfig.timeoutMs;
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers = new Headers(options.headers);
    let body = options.body;

    if (body !== undefined && !(body instanceof FormData) && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
      body = JSON.stringify(body);
    }

    const res = await fetch(buildUrl(path, options.query, options.useApiPrefix), {
      ...options,
      headers,
      body: body as BodyInit | null | undefined,
      credentials: options.credentials ?? apiConfig.credentials,
      signal: options.signal ?? controller.signal,
    });

    const payload = await parseResponse(res);

    if (!res.ok) {
      throw new ApiError(
        typeof payload === "string" && payload ? payload : res.statusText,
        res.status,
        payload,
      );
    }

    return payload as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(`Request timed out after ${timeoutMs}ms`, 408);
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "DELETE" }),
};
