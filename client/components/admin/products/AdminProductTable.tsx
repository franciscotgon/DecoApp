"use client";

import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { ProductRepository } from "@/data-layer/repositories/ProductRepository";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface Props {
  products: Product[];
  categories: Category[];
  onProductsChange: (updated: Product[]) => void;
}

export default function AdminProductTable({
  products,
  categories,
  onProductsChange,
}: Props) {
  const repo = new ProductRepository();

  const deleteProduct = async (id: number) => {
    if (!confirm("¿Seguro que querés eliminar este producto?")) return;

    try {
      await repo.deleteById(id);

      onProductsChange(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error eliminando producto:", err);
      alert("No se pudo eliminar.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="pb-2">Imagen</th>
            <th className="pb-2">Nombre</th>
            <th className="pb-2">Categoría</th>
            <th className="pb-2">Precio</th>
            <th className="pb-2">Stock</th>
            <th className="pb-2 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => {
            const cat = categories.find((c) => c.id === p.categoryId);

            return (
              <tr key={p.id} className="border-b">
                <td className="py-3">
                  <Image
                    src={p.imageUrl || "/placeholder.jpg"}
                    alt={p.name}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                </td>

                <td>{p.name}</td>
                <td>{cat?.name || "Sin categoría"}</td>

                <td className="font-semibold">${p.price}</td>

                <td className={p.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {p.stock}
                </td>

                <td className="text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/products/edit/${p.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={20} />
                    </Link>

                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
