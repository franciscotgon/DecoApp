"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { ProductRepository } from "@/data-layer/repositories/ProductRepository";
import { useRouter } from "next/navigation";

interface ProductFormData {
  name: string;
  price: string;
  description: string;
  image: string;
  categoryId: string; // string en formulario → number antes de submit
}

interface Props {
  categories: Category[];
}

export default function ProductForm({ categories }: Props) {
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    price: "",
    description: "",
    image: "",
    categoryId: "",
  });

  const router = useRouter();
  const repo = new ProductRepository();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.categoryId) {
      alert("Por favor completa nombre, precio y categoría.");
      return;
    }

    try {
      const newProduct: Partial<Product> = {
        name: form.name,
        price: parseFloat(form.price),
        description: form.description || undefined,
        imageUrl: form.image || undefined,
        stock: 0,
        isActive: true,
        categoryId: parseInt(form.categoryId), // <-- Convertimos a número
      };

      await repo.create(newProduct as Product);

      alert("Producto creado correctamente ✨");

      router.push("/products/admin");
    } catch (err) {
      console.error("Error creando producto:", err);
      alert("Error al crear producto. Revisa la consola.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 space-y-4"
    >
      <div>
        <label className="block font-medium mb-1">Nombre</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Ej: Mesa Vintage"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Precio</label>
        <input
          type="number"
          step="0.01"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Ej: 120.50"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Categoría</label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Detalles del producto"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">URL de Imagen</label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="https://..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Crear Producto
      </button>
    </form>
  );
}
