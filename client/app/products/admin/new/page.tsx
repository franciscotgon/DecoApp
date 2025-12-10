import ProductForm from "@/components/products/forms/ProductForm";
import { CategoryRepository } from "@/data-layer/repositories/CategoryRepository";

export default async function NewProductPage() {
  const categoryRepo = new CategoryRepository();

  // 🔥 Cargamos las categorías en el servidor
  const categories = await categoryRepo.getAll();

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Agregar Producto</h1>

      {/* Pasamos las categorías al form */}
      <ProductForm categories={categories} />
    </div>
  );
}
