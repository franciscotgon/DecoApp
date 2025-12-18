// src/types/Category.ts

export interface Category {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
}

export interface CategoryPayload {
  name: string;
  description: string | null;
}
