"use client";

import { useEffect, useState } from "react";
import { Product } from "@/data-layer/types/Product";
import { Category } from "@/data-layer/types/Category";
import AdminProductTable from "@/components/admin/products/AdminProductTable";
import Link from "next/link";
import { Plus, Loader2, AlertCircle, ChevronLeft } from "lucide-react";
import { handleApiError } from "@/lib/error-handler";
import { useProductsListService } from "@/app/services/Admin/product-list.service";

export default function AdminProductsPage() {
  const { loadAdminDashboardData } = useProductsListService();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [status, setStatus] = useState({
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadAdminDashboardData();
        setProducts(data.products);
        setCategories(data.categories);
        setStatus({ loading: false, error: null });
      } catch (err: unknown) {
        setStatus((prev) => ({
          ...prev,
          error: handleApiError(err),
          fetching: false,
        }));
      }
    };

    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 transition-colors duration-300">
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Administrar Productos
          </h1>
          <p className="text-foreground/60 mt-1">
            Visualiza y gestiona todo tu catálogo desde aquí.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="bg-[#c6a974] text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-[#c6a974]/20 hover:brightness-110 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo producto
        </Link>
      </div>

      {/* Alerta de Error si falla la carga */}
      {status.error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{status.error}</p>
        </div>
      )}

      {status.loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-primary">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p className="text-foreground/50 font-medium animate-pulse">
            Sincronizando catálogo...
          </p>
        </div>
      ) : (
        <div className="bg-foreground/[0.02] border border-foreground/10 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
          <AdminProductTable
            initialProducts={products}
            categories={categories}
          />
        </div>
      )}
    </div>
  );
}
