"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import ProductCard from "@/components/products/ProductCard";

const carouselImages = [
  "https://plus.unsplash.com/premium_photo-1682259448848-90967eec2edb?q=80&w=703&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1683270244840-370bbe365419?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?q=80&w=688&auto=format&fit=crop",
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts)
      Promise.resolve().then(() => setProducts(JSON.parse(storedProducts)));
  }, []);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* --- CARRUSEL PRINCIPAL --- */}
      <section className="w-full h-[450px] relative overflow-hidden">
        {carouselImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={`Slide ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
            Deco-App: Dale estilo a tu hogar
          </h1>
        </div>
      </section>

      {/* --- SOBRE NOSOTROS / FILOSOFÍA --- */}
      <section className="max-w-6xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Nuestra filosofía
        </h2>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          En Deco-App creemos que cada espacio tiene su propia personalidad. Por
          eso ofrecemos productos de decoración cuidadosamente seleccionados,
          combinando estilo, funcionalidad y materiales de primera calidad para
          transformar tu hogar en un lugar único.
        </p>
      </section>

      {/* --- COLECCIONES DESTACADAS --- */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Colecciones Destacadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="relative h-60 rounded-xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1602526215675-ccbbbd89f71a?q=80&w=800"
                alt="Sillas"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white text-xl font-semibold bg-black bg-opacity-40 px-3 py-1 rounded">
                Sillas
              </div>
            </div>
            <div className="relative h-60 rounded-xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200"
                alt="Lámparas"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white text-xl font-semibold bg-black bg-opacity-40 px-3 py-1 rounded">
                Lámparas
              </div>
            </div>
            <div className="relative h-60 rounded-xl overflow-hidden shadow-lg cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1580540680023-2f17d0d0123e?q=80&w=1200"
                alt="Mesas"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white text-xl font-semibold bg-black bg-opacity-40 px-3 py-1 rounded">
                Mesas
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRODUCTOS DESTACADOS --- */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              canEdit={false} // Solo ver detalle
              isBuyer={false} // Sin botones de +/-
              cart={{}}
              addToCart={() => {}}
              removeFromCart={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      </section>

      {/* --- BENEFICIOS / CONFIANZA --- */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-xl font-semibold mb-2">
              🚚 Envíos a Todo el País
            </h3>
            <p className="text-gray-600 text-sm">
              Recibí tus productos estés donde estés.
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-xl font-semibold mb-2">
              💳 Cuotas sin Interés
            </h3>
            <p className="text-gray-600 text-sm">
              Pagá en hasta 6 cuotas sin recargo.
            </p>
          </div>
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-xl font-semibold mb-2">🔒 Compra Segura</h3>
            <p className="text-gray-600 text-sm">
              Protegemos tus datos con tecnología cifrada.
            </p>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER / CTA --- */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Suscribite a nuestro Newsletter
          </h2>
          <p className="text-gray-700 mb-6">
            Recibí ofertas y novedades exclusivas directamente en tu correo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="border p-3 rounded w-full sm:w-auto flex-1"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
