// src/app/admin/categories/categories-list.service.ts
import { CategoryRepository } from "@/data-layer/repositories/CategoryRepository";
import { Category } from "@/data-layer/types/Category";
import { handleApiError } from "@/lib/error-handler";

export const useCategoriesListService = () => {
  const repo = new CategoryRepository();

  const fetchCategories = async (): Promise<Category[]> => {
    try {
      const data = await repo.getAll();
      return data ?? [];
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  };

  return { fetchCategories };
};
