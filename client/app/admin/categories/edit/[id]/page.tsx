"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Category } from "@/types/Category";
import { CategoryRepository } from "@/data-layer/repositories/CategoryRepository";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const repo = new CategoryRepository();

  const [cat, setCat] = useState<Category | null>(null);

  useEffect(() => {
    const load = async () => {
      const c = await repo.getById(Number(id));
      setCat(c);
    };
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cat) return;

    try {
      await repo.update(cat.id, cat);
      alert("Categoría actualizada ✔️");
      router.push("/admin/categories");
    } catch (err) {
      console.error(err);
      alert("Error actualizando.");
    }
  };

  if (!cat) return <p className="p-6">Cargando...</p>;

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Editar Categoría</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={cat.name}
            onChange={(e) => setCat({ ...cat, name: e.target.value })}
            required
          />
        </div>

        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
