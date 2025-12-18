// src/app/admin/categories/new/category-form.service.ts
import { CategoryRepository } from "@/data-layer/repositories/CategoryRepository";
import { CategoryPayload } from "@/data-layer/types/Category";
import { handleApiError } from "@/lib/error-handler";

export const useCategoryService = () => {
  const repo = new CategoryRepository();

  const loadCategoryData = async (id: number | null) => {
    if (!id) return null;
    try {
      const data = await repo.getById(id);
      if (!data) throw new Error("La categoría solicitada no existe.");
      return data;
    } catch (err) {
      throw new Error(handleApiError(err));
    }
  };

  const saveCategory = async (
    id: number | null,
    data: { name: string; description: string; isActive: boolean }
  ) => {
    try {
      const payload: CategoryPayload = {
        name: data.name.trim(),
        description: data.description.trim() || null,
      };

      if (id) {
        const updatePayload = { id, ...payload, isActive: data.isActive };
        return await repo.update(id, updatePayload);
      }
      return await repo.create(payload);
    } catch (err) {
      throw new Error(handleApiError(err));
    }
  };

  return { loadCategoryData, saveCategory };
};
