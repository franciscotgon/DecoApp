import { ProductList } from "@/components/products/ProductList";
import { getProducts } from "@/app/services/product.service";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
  const allProducts = await getProducts();

  if (allProducts === null) {
    return (
      <main className="min-h-screen bg-[var(--background)] py-24 text-center text-[var(--foreground)] transition-colors">
        <div className="container mx-auto px-4 md:px-6 p-8 rounded-lg shadow-xl bg-gray-100 dark:bg-gray-800 border dark:border-gray-700">
          <TriangleAlert className="inline w-12 h-12 text-red-600 dark:text-red-400 mb-4" />
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">
            Error de Carga
          </h1>
          <p className="text-lg text-[var(--foreground)] opacity-90 mb-6">
            No pudimos conectar con el servidor para obtener el catálogo de
            productos. Inténtalo de nuevo más tarde.
          </p>
          <Link
            href="/"
            className="inline-block bg-[var(--primary)] text-white font-semibold px-6 py-2 rounded-full transition hover:bg-[var(--primary-hover)] shadow-md"
          >
            Volver a Inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] py-16 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        {allProducts.length === 0 ? (
          <div
            className="text-center p-12 border border-gray-200 dark:border-gray-700 rounded-lg 
                          bg-gray-50 dark:bg-gray-800 mt-10 shadow-sm"
          >
            <p className="text-xl text-[var(--foreground)]">
              El catálogo está vacío. Vuelve pronto para ver nuestras novedades.
            </p>
          </div>
        ) : (
          <ProductList products={allProducts} />
        )}
      </div>
    </main>
  );
}
