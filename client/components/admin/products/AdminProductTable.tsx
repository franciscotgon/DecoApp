"use client";

import { useState, useEffect } from "react";
import { Product } from "@/data-layer/types/Product";
import { Category } from "@/data-layer/types/Category";
import { ProductRepository } from "@/data-layer/repositories/ProductRepository";
import { handleApiError } from "@/lib/error-handler";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface ProductsTableProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ProductsTable({
  initialProducts,
  categories,
}: ProductsTableProps) {
  const repo = new ProductRepository();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const deleteProduct = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?"))
      return;

    setIsDeleting(id);
    try {
      await repo.deleteById(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      alert(handleApiError(err)); // 👈 Aplicamos handleApiError
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="bg-background rounded-xl border border-foreground/10 overflow-x-auto transition-colors duration-300">
      <table className="min-w-full divide-y divide-foreground/10">
        <thead className="bg-foreground/[0.03]">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-foreground/50 uppercase tracking-wider">
              Imagen
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-foreground/50 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-foreground/50 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-foreground/50 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-foreground/50 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-foreground/50 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-4 text-right text-xs font-bold text-foreground/50 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-foreground/5">
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-6 py-12 text-center text-foreground/40"
              >
                No hay productos registrados.
              </td>
            </tr>
          ) : (
            products.map((p) => {
              const cat = categories.find((c) => c.id === p.categoryId);
              const isItemDeleting = isDeleting === p.id;

              return (
                <tr
                  key={p.id}
                  className="hover:bg-foreground/[0.02] transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-12 h-12">
                      <Image
                        src={p.imageUrl || "/placeholder-product.png"}
                        alt={p.name}
                        fill
                        className="rounded-lg object-cover border border-foreground/10 shadow-sm"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-foreground">
                    {p.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/60">
                    <span className="bg-foreground/5 px-2 py-1 rounded-md text-xs">
                      {cat?.name || "Sin categoría"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">
                    ${p.price.toLocaleString("es-AR")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`font-mono font-bold ${
                        p.stock > 10
                          ? "text-green-500"
                          : p.stock > 0
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {p.isActive ? (
                      <CheckCircle size={18} className="text-green-500" />
                    ) : (
                      <XCircle size={18} className="text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/new?id=${p.id}`}
                        className="text-blue-500 hover:bg-blue-500/10 p-2 rounded-lg transition"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        disabled={isItemDeleting}
                        className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition disabled:opacity-30"
                        title="Eliminar"
                      >
                        {isItemDeleting ? (
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
