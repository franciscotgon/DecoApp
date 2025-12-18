"use client";

import { useEffect, useState } from "react";
import { Category } from "@/data-layer/types/Category";
import Link from "next/link";
import { Plus, Loader2, AlertCircle, ChevronLeft } from "lucide-react";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";
import { handleApiError } from "@/lib/error-handler";
import { useCategoriesListService } from "@/app/services/Admin/category-list.service";

export default function CategoriesPage() {
  const { fetchCategories } = useCategoriesListService();

  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState({
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setStatus({ loading: false, error: null });
      } catch (err: unknown) {
        setStatus((prev) => ({
          ...prev,
          error: handleApiError(err),
          loading: false,
        }));
      }
    };
    load();
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto transition-colors duration-300">
      <Link
        href="/admin"
        className="flex items-center text-foreground/50 hover:text-primary mb-6 transition-colors text-sm font-medium group"
      >
        <ChevronLeft
          size={18}
          className="mr-1 group-hover:-translate-x-1 transition-transform"
        />
        Volver al panel de administración
      </Link>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categorías</h1>
          <p className="text-foreground/60 mt-1">
            Gestiona las secciones en las que se organiza tu catálogo.
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="bg-[#c6a974] text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-[#c6a974]/20 hover:brightness-110 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={20} />
          Nueva categoría
        </Link>
      </div>

      {status.error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3 animate-in fade-in">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{status.error}</p>
        </div>
      )}

      {status.loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-primary">
          <Loader2 className="animate-spin mb-2" size={32} />
          <span className="text-foreground/50 font-medium animate-pulse">
            Cargando categorías...
          </span>
        </div>
      ) : (
        <div className="bg-foreground/[0.02] border border-foreground/10 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
          <CategoriesTable initialCategories={categories} />
        </div>
      )}
    </div>
  );
}
