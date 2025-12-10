"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { ProductRepository } from "@/data-layer/repositories/ProductRepository";
import { CategoryRepository } from "@/data-layer/repositories/CategoryRepository";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const productRepo = new ProductRepository();
  const categoryRepo = new CategoryRepository();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // --------------------------
  //   Load initial data
  // --------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const p = await productRepo.getById(Number(id));
        const c = await categoryRepo.getAll();

        setProduct(p);
        setCategories(c);
      } catch (err) {
        console.error(err);
        alert("No se pudo cargar el producto.");
      }
    };

    load();
  }, [id]);

  // --------------------------
  //   Handle text + number inputs
  // --------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProduct((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "price" ? Number(value) : value,
          }
        : prev
    );
  };

  // --------------------------
  //  Handle select (categoryId)
  // --------------------------
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);

    setProduct((prev) => (prev ? { ...prev, categoryId: value } : prev));
  };

  // --------------------------
  //   Submit
  // --------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product) return;

    try {
      await productRepo.update(product.id, product);
      alert("Producto actualizado ✔️");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Error actualizando producto.");
    }
  };

  if (!product) return <p className="p-6">Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <div>
          <label className="block font-medium mb-1">Nombre</label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Precio</label>
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Descripción</label>
          <textarea
            name="description"
            value={product.description ?? ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={4}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">URL Imagen</label>
          <input
            name="imageUrl"
            value={product.imageUrl ?? ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Categoría</label>
          <select
            name="categoryId"
            value={product.categoryId}
            onChange={handleSelectChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
