"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types/Category";
import { CategoryRepository } from "@/data-layer/repositories/CategoryRepository";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function CategoriesPage() {
  const repo = new CategoryRepository();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await repo.getAll();
      setCategories(data);
    };
    load();
  }, []);

  const deleteCategory = async (id: number) => {
    if (!confirm("¿Eliminar categoría?")) return;

    try {
      await repo.deleteById(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categorías</h1>

        <Link
          href="/admin/categories/new"
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Nueva categoría
        </Link>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="pb-2">Nombre</th>
              <th className="pb-2 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b">
                <td className="py-3">{cat.name}</td>
                <td className="py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/categories/edit/${cat.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={20} />
                    </Link>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
