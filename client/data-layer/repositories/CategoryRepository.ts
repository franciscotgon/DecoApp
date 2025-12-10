// data-layer/categories/CategoryRepository.ts
import { BaseRepository } from "./BaseRepository";
import { Category } from "@/types/Category";

export class CategoryRepository extends BaseRepository {
  constructor() {
    super("https://localhost:7025/api");
  }

  getAll() {
    return this.get<Category[]>("/categories");
  }

  getById(id: number) {
    return this.get<Category>(`/categories/${id}`);
  }

  create(category: Category) {
    return this.post<Category, Category>("/categories", category);
  }

  update(id: number, category: Partial<Category>) {
    return this.put<Partial<Category>, Category>(`/categories/${id}`, category);
  }

  deleteById(id: number) {
    return super.delete(`/categories/${id}`);
  }
}
