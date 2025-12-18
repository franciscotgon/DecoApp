"use client";

import { useState, useEffect } from "react";
import { Category } from "@/data-layer/types/Category";
import { CategoryRepository } from "@/data-layer/repositories/CategoryRepository";
import { handleApiError } from "@/lib/error-handler";
import Link from "next/link";
import { Pencil, Trash2, Loader2, FolderTree } from "lucide-react";

interface CategoriesTableProps {
  initialCategories: Category[];
}

export default function CategoriesTable({
  initialCategories,
}: CategoriesTableProps) {
  const repo = new CategoryRepository();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const deleteCategory = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta categoría?"))
      return;

    setIsDeletingId(id);
    try {
      await repo.deleteById(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err: unknown) {
      alert(handleApiError(err));
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="bg-background rounded-xl border border-foreground/10 overflow-hidden transition-colors duration-300 shadow-sm">
      <table className="min-w-full divide-y divide-foreground/10">
        <thead className="bg-foreground/[0.03]">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-foreground/50 uppercase tracking-wider">
              Nombre de Categoría
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-foreground/50 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-4 text-right text-xs font-bold text-foreground/50 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-foreground/5">
          {categories.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center gap-2 text-foreground/40">
                  <FolderTree size={40} strokeWidth={1} />
                  <span>No hay categorías registradas.</span>
                </div>
              </td>
            </tr>
          ) : (
            categories.map((cat) => {
              const isLoading = isDeletingId === cat.id;

              return (
                <tr
                  key={cat.id}
                  className="hover:bg-foreground/[0.02] transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-foreground">
                      {cat.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/60 max-w-xs md:max-w-md">
                    <p className="truncate" title={cat.description || ""}>
                      {cat.description || (
                        <span className="italic opacity-50">
                          Sin descripción
                        </span>
                      )}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/categories/new?id=${cat.id}`}
                        className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-all"
                        title="Editar categoría"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        disabled={isLoading}
                        className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all disabled:opacity-30"
                        title="Eliminar categoría"
                      >
                        {isLoading ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
