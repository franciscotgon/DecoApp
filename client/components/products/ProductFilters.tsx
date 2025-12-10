"use client";

import { Category } from "@/types/Category";

export interface Filters {
  search: string;
  categoryId: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean | null;
}

interface Props {
  filters: Filters;
  categories: Category[];
  onChange: (newFilters: Filters) => void;
  onClear: () => void;
}

export default function ProductFilters({
  filters,
  categories,
  onChange,
  onClear,
}: Props) {
  return (
    <div className="mb-8 p-4 bg-white shadow rounded-lg grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        className="border rounded p-2 w-full"
      />

      {/* CATEGORÍA */}
      <select
        value={filters.categoryId ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            categoryId: e.target.value ? Number(e.target.value) : null,
          })
        }
        className="border rounded p-2 w-full"
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* PRECIO MÍNIMO */}
      <input
        type="number"
        placeholder="Precio mín."
        value={filters.minPrice ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            minPrice: e.target.value ? Number(e.target.value) : null,
          })
        }
        className="border rounded p-2 w-full"
      />

      {/* PRECIO MÁXIMO */}
      <input
        type="number"
        placeholder="Precio máx."
        value={filters.maxPrice ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            maxPrice: e.target.value ? Number(e.target.value) : null,
          })
        }
        className="border rounded p-2 w-full"
      />

      {/* STOCK */}
      <select
        value={filters.inStock === null ? "" : filters.inStock ? "1" : "0"}
        onChange={(e) =>
          onChange({
            ...filters,
            inStock: e.target.value === "" ? null : e.target.value === "1",
          })
        }
        className="border rounded p-2 w-full"
      >
        <option value="">Todo el stock</option>
        <option value="1">Con stock</option>
        <option value="0">Sin stock</option>
      </select>

      {/* LIMPIAR */}
      <button
        onClick={onClear}
        className="md:col-span-5 bg-gray-200 hover:bg-gray-300 p-2 rounded"
      >
        Limpiar filtros
      </button>
    </div>
  );
}
