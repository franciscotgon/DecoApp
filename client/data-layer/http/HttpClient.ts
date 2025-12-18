import { RequestOptions } from "@/data-layer/types/RequestOptions";

// Tipado del cliente (no necesita cambios)
export interface HttpClient {
  get<T>(url: string, options?: RequestOptions): Promise<T | null>; // Ajuste: Puede devolver null
  post<T, B = unknown>(
    url: string,
    body?: B,
    options?: RequestOptions
  ): Promise<T | null>; // Ajuste: Puede devolver null
  put<T, B = unknown>(
    url: string,
    body?: B,
    options?: RequestOptions
  ): Promise<T | null>; // Ajuste: Puede devolver null
  delete(url: string, options?: RequestOptions): Promise<boolean>; // Ajuste: Devuelve boolean
}

// Asegúrate de que esta variable de entorno esté definida en .env.local con NEXT_PUBLIC_
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function buildQuery(query?: Record<string, string | number | boolean>) {
  // ... (función buildQuery sin cambios)
  return query
    ? `?${new URLSearchParams(
        Object.fromEntries(
          Object.entries(query).map(([k, v]) => [k, String(v)])
        )
      ).toString()}`
    : "";
}

export const http: HttpClient = {
  // === GET: Maneja 404 devolviendo null ===
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

    // Si la entidad no existe (404), devuelve null
    if (res.status === 404) {
      return null;
    }

    // Si hay otro error (500, 401, etc.), lanza la excepción
    if (!res.ok) {
      throw new Error(`GET ${url} failed: ${res.status} ${res.statusText}`);
    }

    // Devuelve el JSON si es 200 OK
    return res.json();
  },

  // === POST: Maneja 204 devolviendo null ===
  async post(url, body, options) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new Error(`POST ${url} failed: ${res.status} ${res.statusText}`);
    }

    // Si la respuesta es 204 (No Content), devuelve null
    if (
      res.status === 204 ||
      (res.status === 201 && res.headers.get("Content-Length") === "0")
    ) {
      return null;
    }

    return res.json();
  },

  // === PUT: Maneja 204 devolviendo null ===
  async put(url, body, options) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new Error(`PUT ${url} failed: ${res.status} ${res.statusText}`);
    }

    // Si la respuesta es 204 (No Content), devuelve null
    if (
      res.status === 204 ||
      (res.status === 200 && res.headers.get("Content-Length") === "0")
    ) {
      return null;
    }

    return res.json();
  },

  // === DELETE: Devuelve boolean en lugar de lanzar una excepción ===
  async delete(url, options) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    });

    // Si la respuesta es exitosa (200, 204), devuelve true
    if (res.ok) {
      return true;
    }

    // Si hay un error (ej. 404, 500), lanzamos el error
    throw new Error(`DELETE ${url} failed: ${res.status} ${res.statusText}`);
  },
};
