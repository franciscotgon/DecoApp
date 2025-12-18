import { RequestOptions } from "@/data-layer/types/RequestOptions";
import { http, HttpClient } from "../http/HttpClient";

export abstract class BaseRepository {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = http;

    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
      throw new Error(
        "La URL base de la API (NEXT_PUBLIC_API_BASE_URL) no está definida."
      );
    }
  }

  protected async get<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T | null> {
    return this.httpClient.get<T>(endpoint, options);
  }

  protected async post<TBody, TResponse>(
    endpoint: string,
    body: TBody,
    options?: RequestOptions
  ): Promise<TResponse | null> {
    return this.httpClient.post<TResponse, TBody>(endpoint, body, options);
  }

  protected async put<TBody, TResponse>(
    endpoint: string,
    body: TBody,
    options?: RequestOptions
  ): Promise<TResponse | null> {
    return this.httpClient.put<TResponse, TBody>(endpoint, body, options);
  }

  protected async delete(
    endpoint: string,
    options?: RequestOptions
  ): Promise<boolean> {
    try {
      await this.httpClient.delete(endpoint, options);
      return true;
    } catch (error) {
      console.error(`Error al intentar DELETE ${endpoint}:`, error);
      return false;
    }
  }
}
