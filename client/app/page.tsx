import Link from "next/link";
import AutoCarousel from "@/components/ui/AutoCarousel";
import { Product } from "@/data-layer/types/Product";
import { getProducts } from "@/app/services/product.service";
import { ProductCard } from "@/components/products/ProductCard";
import {
  TriangleAlert,
  Sparkles,
  Package,
  Star,
  CreditCard,
  Banknote,
  Scan,
  HelpCircle,
} from "lucide-react";

export default async function HomePage() {
  let products: Product[] | null = null;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Error cargando productos destacados:", error);
  }

  const hasProducts = products && products.length > 0;
  const isError = products === null;

  return (
    <div className="w-full flex flex-col">
      {/* --- 1. CARRUSEL PRINCIPAL --- */}
      <AutoCarousel />

      {/* --- 2. BENEFICIOS --- */}
      <section className="bg-[var(--background)] py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/* Diseño Exclusivo */}
          <div className="p-4">
            <Sparkles
              size={40}
              className="text-[var(--primary)] mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Diseño Exclusivo
            </h3>
            <p className="text-sm text-gray-600">
              Piezas seleccionadas globalmente.
            </p>
          </div>

          {/* Envío Rápido */}
          <div className="p-4">
            <Package size={40} className="text-[var(--primary)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Envío Rápido
            </h3>
            <p className="text-sm text-gray-600">Despacho en 24 horas.</p>
          </div>

          {/* Máxima Calidad */}
          <div className="p-4">
            <Star size={40} className="text-[var(--primary)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Máxima Calidad
            </h3>
            <p className="text-sm text-gray-600">
              Materiales duraderos y premium.
            </p>
          </div>

          {/* Pago Flexible */}
          <div className="p-4">
            <CreditCard
              size={40}
              className="text-[var(--primary)] mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Pago Flexible
            </h3>
            <p className="text-sm text-gray-600">Hasta 6 cuotas sin interés.</p>
          </div>
        </div>
      </section>

      {/* --- 3. PRODUCTOS DESTACADOS --- */}
      <section className="bg-[var(--background)] py-16 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-12 text-center text-[var(--foreground)]">
            Nuestros Favoritos
          </h2>

          {/* --- Bloque de Carga/Error --- */}
          {!hasProducts ? (
            <div className="text-center p-8 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-inner">
              {/* 💡 Mejoramos la visibilidad del icono de alerta */}
              <TriangleAlert className="inline w-8 h-8 text-red-600 dark:text-red-400 mb-4" />
              <p className="text-lg font-medium text-[var(--foreground)]">
                {isError
                  ? "Error de conexión: No se pudo cargar el catálogo de productos destacados."
                  : "No hay productos destacados disponibles en este momento."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products!.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* --- BOTÓN DE CATÁLOGO CORREGIDO --- */}
          <div className="mt-16 text-center">
            <Link
              href="/products"
              className="inline-block bg-[var(--primary)] text-white text-xl 
                           px-10 py-3 rounded-full font-bold transition duration-300
                           shadow-md hover:shadow-xl
                           hover:bg-[var(--primary-hover)]
                           transform hover:scale-[1.05]" // Escala ligeramente mayor
            >
              Ver Todo el Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* --- 4. CONFIANZA / PAGOS --- */}
      <section className="py-16 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
            Métodos de Pago Seguros
          </h2>

          <p className="text-gray-600 mb-10">
            Aceptamos las principales tarjetas y ofrecemos financiación.
          </p>

          <div className="flex justify-center items-center flex-wrap gap-x-12 gap-y-6">
            {/* Mastercard/Tarjeta */}
            <div className="flex flex-col items-center">
              <CreditCard size={36} className="text-blue-600 mb-2" />
              <span className="text-gray-700 font-medium">
                Tarjeta de Crédito
              </span>
            </div>

            {/* Transferencia */}
            <div className="flex flex-col items-center">
              <Banknote size={36} className="text-green-700 mb-2" />
              <span className="text-gray-700 font-medium">
                Transferencia Bancaria
              </span>
            </div>

            {/* Mercado Pago */}
            <div className="flex flex-col items-center">
              <Scan size={36} className="text-indigo-600 mb-2" />
              <span className="text-gray-700 font-medium">Mercado Pago</span>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <HelpCircle
              size={30}
              className="text-[var(--primary)] mx-auto mb-3"
            />
            <h3 className="text-2xl font-semibold mb-3 text-[var(--foreground)]">
              ¿Necesitás ayuda?
            </h3>
            <Link
              href="/contact"
              className="text-[var(--primary)] hover:text-[#a15a49] font-medium transition"
            >
              Contáctanos aquí
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
