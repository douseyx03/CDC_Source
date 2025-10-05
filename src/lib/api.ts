export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  token?: string | null;
  skipAuthHeader?: boolean;
};

const DEFAULT_API_URL = 'http://localhost:8000/api';

export async function apiFetch<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  const { body, token, headers, skipAuthHeader, ...rest } = options;

  const baseUrl = import.meta.env.VITE_API_URL ?? DEFAULT_API_URL;
  const requestHeaders = new Headers(headers ?? {});

  if (!requestHeaders.has('Accept')) {
    requestHeaders.set('Accept', 'application/json');
  }

  let requestBody: BodyInit | undefined;
  if (body !== undefined) {
    if (body instanceof FormData) {
      requestBody = body;
    } else if (typeof body === 'string' || body instanceof Blob || body instanceof ArrayBuffer) {
      requestBody = body as BodyInit;
    } else {
      requestHeaders.set('Content-Type', 'application/json');
      requestBody = JSON.stringify(body);
    }
  }

  if (!skipAuthHeader && token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    credentials: rest.credentials ?? 'omit',
    ...rest,
    headers: requestHeaders,
    body: requestBody,
  });

  const contentType = response.headers.get('Content-Type') ?? '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json().catch(() => null) : await response.text();

  if (!response.ok) {
    const error = new Error(
      (isJson && payload && typeof payload === 'object' && 'message' in payload)
        ? String((payload as { message?: string }).message)
        : 'Une erreur est survenue',
    ) as ApiError;
    error.status = response.status;
    error.data = payload;
    throw error;
  }

  return payload as TResponse;
}
