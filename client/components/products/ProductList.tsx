"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types/Product";
import ProductFilters, { Filters } from "./ProductFilters";
import { Category } from "@/types/Category";
import Image from "next/image";

interface Props {
  products: Product[];
  categories: Category[];
  userRole: string;
}

export default function ProductList({ products, categories }: Props) {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    categoryId: null,
    minPrice: null,
    maxPrice: null,
    inStock: null,
  });

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (filters.search.trim()) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.categoryId !== null) {
      list = list.filter((p) => p.categoryId === filters.categoryId);
    }

    if (filters.minPrice !== null) {
      list = list.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== null) {
      list = list.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.inStock !== null) {
      list = list.filter((p) =>
        filters.inStock ? p.stock > 0 : p.stock === 0
      );
    }

    return list;
  }, [filters, products]);

  const clearFilters = () =>
    setFilters({
      search: "",
      categoryId: null,
      minPrice: null,
      maxPrice: null,
      inStock: null,
    });

  return (
    <div>
      {/* FILTROS */}
      <ProductFilters
        filters={filters}
        categories={categories}
        onChange={setFilters}
        onClear={clearFilters}
      />

      {/* LISTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white shadow rounded p-4">
            <Image
              src={p.imageUrl || "/placeholder.jpg"}
              alt={p.name}
              width={400} // requerido por next/image
              height={300} // requerido por next/image
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
            <p className="text-gray-600">{p.description}</p>

            <p className="mt-2 font-bold">${p.price}</p>

            <p className={p.stock > 0 ? "text-green-600" : "text-red-600"}>
              {p.stock > 0 ? "En stock" : "Sin stock"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
