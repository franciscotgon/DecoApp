import { RequestOptions } from "@/types/RequestOptions";

export interface HttpClient {
  get<T>(url: string, options?: RequestOptions): Promise<T>;
  post<T, B = unknown>(
    url: string,
    body?: B,
    options?: RequestOptions
  ): Promise<T>;
  put<T, B = unknown>(
    url: string,
    body?: B,
    options?: RequestOptions
  ): Promise<T>;
  delete(url: string, options?: RequestOptions): Promise<void>;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

function buildQuery(query?: Record<string, string | number | boolean>) {
  return query
    ? `?${new URLSearchParams(
        Object.fromEntries(
          Object.entries(query).map(([k, v]) => [k, String(v)])
        )
      ).toString()}`
    : "";
}

export const http: HttpClient = {
  async get(url, options) {
    const qs = buildQuery(options?.query);

    const res = await fetch(`${BASE_URL}${url}${qs}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
    return res.json();
  },

  async post(url, body, options) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) throw new Error(`POST ${url} failed: ${res.status}`);
    return res.json();
  },

  async put(url, body, options) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) throw new Error(`PUT ${url} failed: ${res.status}`);
    return res.json();
  },

  async delete(url, options) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    });

    if (!res.ok) throw new Error(`DELETE ${url} failed: ${res.status}`);
  },
};
