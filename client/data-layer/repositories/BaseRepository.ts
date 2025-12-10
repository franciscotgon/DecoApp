// data-layer/BaseRepository.ts
export abstract class BaseRepository {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`GET ${endpoint} failed`);
    return res.json() as Promise<T>;
  }

  protected async post<TBody, TResponse>(
    endpoint: string,
    body: TBody
  ): Promise<TResponse> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`POST ${endpoint} failed`);
    return res.json() as Promise<TResponse>;
  }

  protected async put<TBody, TResponse>(
    endpoint: string,
    body: TBody
  ): Promise<TResponse> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`PUT ${endpoint} failed`);
    return res.json() as Promise<TResponse>;
  }

  protected async delete(endpoint: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`DELETE ${endpoint} failed`);
  }

  protected async getPaged<T>(
    endpoint: string,
    page: number,
    pageSize: number
  ): Promise<{ items: T[]; totalCount: number }> {
    const res = await fetch(
      `${this.baseUrl}${endpoint}?page=${page}&pageSize=${pageSize}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error(`PAGED GET ${endpoint} failed`);
    return res.json();
  }
}
