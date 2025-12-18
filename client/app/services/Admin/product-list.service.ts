// src/app/admin/products/products-list.service.ts
import { ProductRepository } from "@/data-layer/repositories/ProductRepository";
import { CategoryRepository } from "@/data-layer/repositories/CategoryRepository";
import { handleApiError } from "@/lib/error-handler";

export const useProductsListService = () => {
  const productRepo = new ProductRepository();
  const categoryRepo = new CategoryRepository();

  const loadAdminDashboardData = async () => {
    try {
      const [products, categories] = await Promise.all([
        productRepo.getAllForAdmin(),
        categoryRepo.getAll(),
      ]);

      return {
        products: products ?? [],
        categories: categories ?? [],
      };
    } catch (err) {
      throw new Error(handleApiError(err));
    }
  };

  return { loadAdminDashboardData };
};
