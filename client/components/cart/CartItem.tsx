"use client";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { Product } from "@/data-layer/types/Product";
import { useMemo } from "react";

interface CartItemProps {
  product: Product;
  quantity: number;
  updateQuantity: (productId: number, newQuantity: number) => void;
  deleteItem: (productId: number) => void;
}

export default function CartItem({
  product,
  quantity,
  updateQuantity,
  deleteItem,
}: CartItemProps) {
  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(product.price * quantity);
  }, [product.price, quantity]);

  const handleUpdateQuantity = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      updateQuantity(product.id, newQuantity);
    }
  };

  const isMaxStock = quantity >= product.stock;

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-white shadow-sm">
      <div className="relative w-20 h-20 flex-shrink-0 border rounded-md overflow-hidden">
        {product.imageUrl && product.imageUrl.trim().length > 0 ? (
          <Image
            src={product.imageUrl as string}
            alt={product.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xs">
            No image
          </div>
        )}
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">
          Precio Unitario:
          {new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(product.price)}
        </p>
        <p className="text-xl font-bold mt-1 text-blue-600">
          Total: {formattedPrice}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleUpdateQuantity(-1)}
          disabled={quantity === 1}
          className="p-2 border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          aria-label="Disminuir cantidad"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="w-8 text-center font-medium">{quantity}</span>

        <button
          onClick={() => handleUpdateQuantity(1)}
          disabled={isMaxStock}
          className="p-2 border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          aria-label="Aumentar cantidad"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={() => deleteItem(product.id)}
        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition ml-4"
        aria-label={`Eliminar ${product.name} del carrito`}
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
