import { BaseRepository } from "./BaseRepository";
import { Product, ProductPayload } from "@/data-layer/types/Product";

export class ProductRepository extends BaseRepository {
  constructor() {
    super();
  }

  public async getAllForAdmin(): Promise<Product[] | null> {
    return this.get<Product[]>("/products");
  }

  public async getById(id: number | string): Promise<Product | null> {
    return this.get<Product>(`/products/${id}`);
  }

  public async create(payload: ProductPayload): Promise<Product | null> {
    return this.post<ProductPayload, Product>(`/products`, payload);
  }

  public async update(
    id: number | string,
    payload: ProductPayload
  ): Promise<Product | null> {
    return this.put<ProductPayload, Product>(`/products/${id}`, payload);
  }

  public async deleteById(id: number | string): Promise<boolean> {
    try {
      await this.delete(`/products/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar producto con ID ${id}:`, error);
      return false;
    }
  }
}
