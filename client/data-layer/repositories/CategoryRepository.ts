import { BaseRepository } from "./BaseRepository";
import { Category, CategoryPayload } from "@/data-layer/types/Category";

export class CategoryRepository extends BaseRepository {
  constructor() {
    super();
  }

  public async getAll(): Promise<Category[] | null> {
    return this.get<Category[]>("/categories");
  }

  public async getById(id: number | string): Promise<Category | null> {
    return this.get<Category>(`/categories/${id}`);
  }

  public async create(payload: CategoryPayload): Promise<Category | null> {
    return this.post<CategoryPayload, Category>(`/categories`, payload);
  }

  public async update(
    id: number | string,
    payload: Partial<Category>
  ): Promise<Category | null> {
    return this.put<Partial<Category>, Category>(`/categories/${id}`, payload);
  }

  public async deleteById(id: number | string): Promise<boolean> {
    try {
      await this.delete(`/categories/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar categoría con ID ${id}:`, error);
      return false;
    }
  }
}
