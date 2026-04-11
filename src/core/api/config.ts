const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");
const ensureLeadingSlash = (value: string) => (value.startsWith("/") ? value : `/${value}`);

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() ?? "";

export const apiConfig = {
  baseUrl: trimTrailingSlash(rawBaseUrl),
  prefix: ensureLeadingSlash(import.meta.env.VITE_API_PREFIX?.trim() || "/api"),
  healthPath: ensureLeadingSlash(import.meta.env.VITE_API_HEALTH_PATH?.trim() || "/health"),
  timeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS ?? "10000"),
  credentials: (import.meta.env.VITE_API_CREDENTIALS ?? "include") as RequestCredentials,
};

export function buildApiUrl(path: string, options?: { useApiPrefix?: boolean }) {
  const normalizedPath = ensureLeadingSlash(path);
  const prefix = options?.useApiPrefix === false ? "" : apiConfig.prefix;
  return `${apiConfig.baseUrl}${prefix}${normalizedPath}`;
}
