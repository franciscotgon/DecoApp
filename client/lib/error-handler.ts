// lib/error-handler.ts

export class ApiError extends Error {
  constructor(public message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Normaliza cualquier error (unknown) a un objeto con mensaje
 */
export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  return "Ocurrió un error inesperado";
};
