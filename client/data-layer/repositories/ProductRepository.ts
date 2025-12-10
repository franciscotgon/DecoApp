// data-layer/products/ProductRepository.ts
import { BaseRepository } from "./BaseRepository";
import { Product } from "@/types/Product";

export class ProductRepository extends BaseRepository {
  constructor() {
    super("https://localhost:7025/api");
  }

  getAll() {
    return this.get<Product[]>("/products");
  }

  getById(id: number) {
    return this.get<Product>(`/products/${id}`);
  }

  create(product: Product) {
    return this.post<Product, Product>("/products", product);
  }

  update(id: number, product: Partial<Product>) {
    return this.put<Partial<Product>, Product>(`/products/${id}`, product);
  }

  // 🔥 Método público con nombre propio
  deleteById(id: number) {
    return super.delete(`/products/${id}`);
  }
}
