// src/components/ui/AutoCarousel.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const carouselImages = [
  {
    src: "https://plus.unsplash.com/premium_photo-1682259448848-90967eec2edb?q=80&w=1200&auto=format&fit=crop",
    alt: "Elegancia minimalista en el living",
    title: "Elegancia que Inspira",
  },
  {
    src: "https://images.unsplash.com/photo-1616047021743-30c197170a41?q=80&w=1200&auto=format&fit=crop",
    alt: "Rincón de lectura acogedor con muebles de madera",
    title: "Tu Rincón Favorito",
  },
  {
    src: "https://images.unsplash.com/photo-1544026366-b3a60a7d5b12?q=80&w=1200&auto=format&fit=crop",
    alt: "Accesorios y detalles de decoración",
    title: "Detalles que Hacen la Diferencia",
  },
];

export default function AutoCarousel() {
  const [current, setCurrent] = useState(0);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // 4 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full h-[500px] relative overflow-hidden">
      {carouselImages.map((item, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover"
            priority={idx === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}
      {/* 🔑 Filtro de oscurecimiento suave para el texto */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-8">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold text-center tracking-tight drop-shadow-lg">
          {carouselImages[current].title}
        </h1>
        <p className="text-white text-lg md:text-xl mt-4 max-w-2xl text-center drop-shadow-md">
          Transforma tu espacio con piezas únicas de diseño.
        </p>

        {/* 🔑 Botón CTA usando el color primario rústico */}
        <Link
          href="/products"
          className="mt-8 bg-[var(--primary)] text-white text-lg font-bold px-8 py-3 rounded-full hover:opacity-90 transition shadow-xl transform hover:scale-105"
        >
          Ver Catálogo
        </Link>
      </div>
    </section>
  );
}
