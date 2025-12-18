"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  Tag,
  AlignLeft,
  Loader2,
  Save,
  Power,
} from "lucide-react";
import Link from "next/link";
import { handleApiError } from "@/lib/error-handler";
import { useCategoryService } from "@/app/services/Admin/category-form.service";

function CategoryForm() {
  const { loadCategoryData, saveCategory } = useCategoryService();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryIdParam = searchParams.get("id");
  const categoryId = categoryIdParam ? parseInt(categoryIdParam) : null;
  const isEditing = categoryId !== null;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });

  const [status, setStatus] = useState({
    loading: false,
    fetching: isEditing,
    error: null as string | null,
  });

  useEffect(() => {
    if (!isEditing || !categoryId) return;

    const fetchCategory = async () => {
      try {
        const data = await loadCategoryData(categoryId);
        if (data) {
          setFormData({
            name: data.name || "",
            description: data.description || "",
            isActive: !!data.isActive,
          });
        }
      } catch (err: unknown) {
        setStatus((prev) => ({ ...prev, error: handleApiError(err) }));
      } finally {
        setStatus((prev) => ({ ...prev, fetching: false }));
      }
    };

    fetchCategory();
  }, [isEditing, categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setStatus((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await saveCategory(categoryId, formData);
      router.push("/admin/categories");
    } catch (err: unknown) {
      setStatus((prev) => ({
        ...prev,
        error: handleApiError(err),
        loading: false,
      }));
    }
  };

  if (status.fetching) {
    return (
      <div className="flex h-96 flex-col justify-center items-center text-primary">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="text-foreground/50 animate-pulse font-medium">
          Sincronizando categoría...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-lg mx-auto">
      <Link
        href="/admin/categories"
        className="flex items-center text-foreground/50 hover:text-primary transition-colors text-sm font-medium group"
      >
        <ChevronLeft
          size={18}
          className="mr-1 group-hover:-translate-x-1 transition-transform"
        />
        Volver a la lista
      </Link>

      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          {isEditing ? `Editar Categoría` : "Nueva Categoría"}
        </h1>
        {isEditing && (
          <p className="text-primary text-xs font-mono mt-1 tracking-widest uppercase opacity-80">
            ID Identificador: #{categoryId}
          </p>
        )}
      </header>

      {status.error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-sm animate-in fade-in slide-in-from-top-2">
          <p className="flex items-center gap-2 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            {status.error}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-foreground/[0.02] p-8 rounded-3xl border border-foreground/10 space-y-6 shadow-sm backdrop-blur-sm"
      >
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground/50 flex items-center">
            <Tag size={14} className="mr-2 text-primary" /> Nombre
          </label>
          <input
            type="text"
            className="w-full bg-background border border-foreground/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-foreground placeholder:text-foreground/20"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej: Muebles de Oficina"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground/50 flex items-center">
            <AlignLeft size={14} className="mr-2 text-primary" /> Descripción
          </label>
          <textarea
            rows={4}
            className="w-full bg-background border border-foreground/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-foreground resize-none placeholder:text-foreground/20"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Detalles opcionales..."
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-foreground/5 group hover:border-primary/20 transition-colors">
          <div className="flex items-center gap-3 text-sm font-semibold text-foreground/70">
            <Power
              size={18}
              className={
                formData.isActive ? "text-primary" : "text-foreground/20"
              }
            />
            Estado de Categoría
          </div>
          <button
            type="button"
            onClick={() =>
              setFormData({ ...formData, isActive: !formData.isActive })
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
              formData.isActive
                ? "bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]"
                : "bg-foreground/20"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                formData.isActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <button
          type="submit"
          disabled={status.loading}
          className="w-full py-4 bg-[#c6a974] text-white font-bold rounded-2xl shadow-lg shadow-[#c6a974]/20 hover:brightness-110 hover:-translate-y-0.5 active:scale-95 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:transform-none disabled:hover:brightness-100"
        >
          {status.loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          {status.loading
            ? "Procesando..."
            : isEditing
            ? "Actualizar Cambios"
            : "Crear Categoría"}
        </button>
      </form>
    </div>
  );
}

export default function CategoryFormPage() {
  return (
    <Suspense
      fallback={
        <div className="p-20 text-center animate-pulse text-foreground/30 font-medium">
          Cargando entorno de edición...
        </div>
      }
    >
      <CategoryForm />
    </Suspense>
  );
}
