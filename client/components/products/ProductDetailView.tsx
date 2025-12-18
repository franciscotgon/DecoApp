"use client";
import { Product } from "@/data-layer/types/Product";
import { useCart } from "@/hooks/CartContext";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { addItemToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(product.price);

  const isOutOfStock = product.stock <= 0;
  const hasImageUrl = product.imageUrl && product.imageUrl.trim().length > 0;
  const maxStock = product.stock;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItemToCart(product, quantity);
    console.log(
      `Añadido ${quantity} de ${product.name} (ID: ${product.id}) al carrito.`
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 bg-white p-6 md:p-10 rounded-xl shadow-lg">
      <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl bg-gray-100 border border-gray-200">
        {hasImageUrl ? (
          <Image
            src={product.imageUrl as string}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 text-lg">
            Imagen no disponible
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
          {product.name}
        </h1>

        <p className="text-4xl font-light text-gray-900 mb-6 border-b pb-4">
          {formattedPrice}
        </p>

        <div className="mt-2 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Detalle del Producto
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {product.description ||
              "Este producto no tiene una descripción detallada en este momento."}
          </p>
        </div>

        <div className="mb-8">
          <span
            className={`inline-flex items-center rounded-full px-4 py-1.5 text-base font-medium ${
              isOutOfStock
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {isOutOfStock
              ? "Agotado (0 unidades)"
              : `Stock: ${product.stock} unidades disponibles`}
          </span>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Cantidad</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity === 1 || isOutOfStock}
              className="px-3 py-1 border border-gray-300 rounded-lg text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              -
            </button>
            <span className="w-12 text-center text-xl font-semibold">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity === maxStock || isOutOfStock}
              className="px-3 py-1 border border-gray-300 rounded-lg text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              +
            </button>
            {quantity === maxStock && maxStock > 0 && (
              <p className="text-sm text-yellow-600 ml-4">
                Stock máximo alcanzado.
              </p>
            )}
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <button
            onClick={handleAddToCart}
            type="button"
            disabled={isOutOfStock}
            className={`w-full py-4 px-8 rounded-xl text-white font-bold text-lg shadow-md transition-all ${
              isOutOfStock
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            }`}
          >
            {isOutOfStock ? "Sin Stock" : `Añadir ${quantity} al Carrito`}
          </button>
          <p className="mt-3 text-xs text-gray-500 text-center">
            Envío estimado en 2-3 días hábiles.
          </p>
        </div>
      </div>
    </div>
  );
}
