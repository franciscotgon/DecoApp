// client/components/products/ProductList.tsx
import { Product } from "@/data-layer/types/Product";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <section className="py-10 bg-[var(--background)] transition-colors">
      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl text-center mb-10">
        Catálogo de Productos
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          className="mt-12 flex flex-col items-center justify-center text-center p-10 
                        bg-[var(--secondary)] dark:bg-gray-800 rounded-lg shadow-md 
                        border border-gray-200 dark:border-gray-700 max-w-md mx-auto"
        >
          <div className="text-6xl text-[var(--primary)] mb-4">🛒</div>
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            No hay productos disponibles
          </h3>
          <p className="mt-2 text-[var(--foreground)] opacity-70">
            Parece que no hemos encontrado productos en este momento.
          </p>
        </div>
      )}
    </section>
  );
}
