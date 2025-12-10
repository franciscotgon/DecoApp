"use client";

import { useState } from "react";
import { CategoryRepository } from "@/data-layer/repositories/CategoryRepository";
import { useRouter } from "next/navigation";

export default function NewCategoryPage() {
  const repo = new CategoryRepository();
  const router = useRouter();

  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await repo.create({ name });
      alert("Categoría creada ✔️");
      router.push("/admin/categories");
    } catch (err) {
      console.error(err);
      alert("No se pudo crear.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Nueva Categoría</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Crear
        </button>
      </form>
    </div>
  );
}
