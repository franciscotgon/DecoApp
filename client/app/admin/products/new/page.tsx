"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Tag,
  AlignLeft,
  DollarSign,
  Package,
  Image as ImageIcon,
  Loader2,
  List,
  Save,
  AlertCircle,
} from "lucide-react";
import { Category } from "@/data-layer/types/Category";
import { useProductService } from "@/app/services/Admin/product-form.service";
import { handleApiError } from "@/lib/error-handler";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
  isActive: boolean;
  categoryId: string;
}

function ProductForm() {
  const { loadInitialData, saveProduct } = useProductService();
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("id")
    ? parseInt(searchParams.get("id")!)
    : null;
  const isEditing = !!productId;

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    isActive: true,
    categoryId: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [status, setStatus] = useState({
    loading: false,
    fetching: true,
    error: null as string | null,
  });

  const fields: Array<{
    label: string;
    icon: typeof Tag;
    key: keyof ProductFormData;
    type: string;
    full?: boolean;
    placeholder?: string;
    step?: string;
  }> = [
    {
      label: "Nombre",
      icon: Tag,
      key: "name",
      type: "text",
      full: true,
      placeholder: "Ej: Silla Ergonómica",
    },
    {
      label: "Precio",
      icon: DollarSign,
      key: "price",
      type: "number",
      step: "0.01",
      placeholder: "0.00",
    },
    {
      label: "Stock",
      icon: Package,
      key: "stock",
      type: "number",
      placeholder: "0",
    },
    {
      label: "URL Imagen",
      icon: ImageIcon,
      key: "imageUrl",
      type: "text",
      full: true,
      placeholder: "https://...",
    },
  ];

  useEffect(() => {
    const init = async () => {
      try {
        const { categories, product } = await loadInitialData(productId);
        setCategories(categories ?? []);

        if (product) {
          setFormData({
            name: product.name,
            description: product.description || "",
            price: product.price.toString(),
            stock: product.stock.toString(),
            imageUrl: product.imageUrl || "",
            isActive: product.isActive,
            categoryId: product.categoryId.toString(),
          });
        }
        setStatus((prev) => ({ ...prev, fetching: false }));
      } catch (err: unknown) {
        setStatus((prev) => ({
          ...prev,
          error: handleApiError(err),
          fetching: false,
        }));
      }
    };
    init();
  }, [productId, loadInitialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await saveProduct(productId, {
        ...formData,
        categoryId: parseInt(formData.categoryId),
      });
      router.push("/admin/products");
    } catch (err: unknown) {
      setStatus((prev) => ({
        ...prev,
        error: handleApiError(err),
        loading: false,
      }));
    }
  };

  if (status.fetching)
    return (
      <div className="flex h-96 flex-col items-center justify-center text-primary">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="text-foreground/50 animate-pulse font-medium">
          Sincronizando catálogo...
        </p>
      </div>
    );

  return (
    <div className="p-8 max-w-3xl mx-auto transition-colors duration-500">
      <Link
        href="/admin/products"
        className="flex items-center text-foreground/50 hover:text-primary mb-6 transition-colors text-sm font-medium group"
      >
        <ChevronLeft
          size={18}
          className="mr-1 group-hover:-translate-x-1 transition-transform"
        />
        Volver al catálogo
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-8">
        {isEditing ? "Editar Producto" : "Nuevo Producto"}
      </h1>

      {status.error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{status.error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-foreground/[0.03] dark:bg-foreground/[0.05] p-8 rounded-2xl border border-foreground/10 shadow-sm backdrop-blur-sm"
      >
        {fields.map((field) => (
          <div
            key={field.key}
            className={`${field.full ? "md:col-span-2" : ""} space-y-2`}
          >
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/50 flex items-center">
              <field.icon size={14} className="mr-2 text-primary" />{" "}
              {field.label}
            </label>
            <input
              type={field.type}
              step={field.step}
              className="w-full bg-background border border-foreground/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-foreground placeholder:text-foreground/20"
              // Acceso seguro a la propiedad mediante casting controlado
              value={formData[field.key] as string}
              onChange={(e) =>
                setFormData({ ...formData, [field.key]: e.target.value })
              }
              placeholder={field.placeholder}
              required={field.key !== "imageUrl"}
            />
          </div>
        ))}

        {/* Categoría */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground/50 flex items-center">
            <List size={14} className="mr-2 text-primary" /> Categoría
          </label>
          <select
            className="w-full bg-background border border-foreground/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer text-foreground"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            required
          >
            <option value="" className="bg-background">
              Seleccionar...
            </option>
            {categories.map((c) => (
              <option
                key={c.id}
                value={c.id}
                className="bg-background text-foreground"
              >
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle Switch Activo */}
        <div className="flex items-center justify-between p-4 bg-background/50 border border-foreground/5 rounded-2xl self-end">
          <span className="text-sm font-semibold text-foreground/70">
            Estado Activo
          </span>
          <button
            type="button"
            onClick={() =>
              setFormData({ ...formData, isActive: !formData.isActive })
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.isActive ? "bg-primary" : "bg-foreground/20"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.isActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Descripción */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground/50 flex items-center">
            <AlignLeft size={14} className="mr-2 text-primary" /> Descripción
          </label>
          <textarea
            rows={4}
            className="w-full bg-background border border-foreground/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-foreground placeholder:text-foreground/20"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Escribe detalles del producto aquí..."
          />
        </div>

        {/* Botón Guardar - Adaptable a Dark/Light por bg-primary */}
        <button
          type="submit"
          disabled={status.loading}
          className="md:col-span-2 w-full py-4 bg-[#c6a974] text-white font-bold rounded-2xl shadow-lg shadow-[#c6a974]/20 hover:brightness-110 hover:-translate-y-0.5 active:scale-95 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:transform-none disabled:hover:brightness-100"
        >
          {status.loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          {status.loading
            ? "Guardando..."
            : isEditing
            ? "Actualizar Producto"
            : "Registrar Producto"}
        </button>
      </form>
    </div>
  );
}

export default function ProductFormPage() {
  return (
    <Suspense
      fallback={
        <div className="p-20 text-center animate-pulse text-foreground/30 font-medium">
          Preparando formulario...
        </div>
      }
    >
      <ProductForm />
    </Suspense>
  );
}
