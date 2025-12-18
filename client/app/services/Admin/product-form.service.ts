// src/app/admin/products/new/product-form.service.ts
import { ProductRepository } from "@/data-layer/repositories/ProductRepository";
import { CategoryRepository } from "@/data-layer/repositories/CategoryRepository";
import { ProductPayload } from "@/data-layer/types/Product";

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
  isActive: boolean;
  categoryId: number;
}

export const useProductService = () => {
  const productRepo = new ProductRepository();
  const categoryRepo = new CategoryRepository();

  const loadInitialData = async (productId: number | null) => {
    const categories = await categoryRepo.getAll();
    let product = null;

    if (productId) {
      product = await productRepo.getById(productId);
    }
    return { categories, product };
  };

  const saveProduct = async (id: number | null, data: ProductFormData) => {
    const payload: ProductPayload & { id?: number } = {
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
    };

    if (id) {
      payload.id = id;
      return await productRepo.update(id, payload as ProductPayload);
    }
    return await productRepo.create(payload);
  };

  return { loadInitialData, saveProduct };
};
