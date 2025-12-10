"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types/Product";
import Image from "next/image";

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params; // id del producto
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      const products: Product[] = JSON.parse(storedProducts);
      const found = products.find((p) => p.id === Number(id));

      // Hacer el setState asincrónico para evitar warning
      if (found) {
        Promise.resolve().then(() => setProduct(found));
        // o también: setTimeout(() => setProduct(found), 0);
      }
    }
  }, [id]);

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">{product.name}</h1>
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={400}
        className="object-cover rounded-lg mb-6"
      />
      <p className="text-xl font-semibold mb-4">${product.price}</p>
      <p className="text-gray-700">
        Descripción del producto aquí. Podés agregar más detalles.
      </p>
    </div>
  );
}
