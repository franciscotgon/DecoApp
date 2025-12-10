"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
  canEdit: boolean; // Vendedor/Admin
  isBuyer: boolean; // Comprador
  cart: { [id: number]: number };
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductCard({
  product,
  canEdit,
  isBuyer,
  cart,
  addToCart,
  removeFromCart,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const router = useRouter();
  const quantity = cart[product.id] || 0;

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Imagen y nombre clickables para ir al detalle */}
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/products/${product.id}`)}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={300}
            className="object-cover h-56 w-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-56 w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Sin imagen</span>
          </div>
        )}
        <h2 className="text-lg font-semibold text-gray-800 mt-2">
          {product.name}
        </h2>
      </div>

      <p className="text-gray-600 mt-2">${product.price}</p>

      <div className="mt-4 flex items-center justify-between">
        {/* Botones de comprador */}
        {isBuyer && (
          <div className="flex items-center gap-2">
            <Button
              variant="success"
              onClick={() => addToCart(product.id)}
              className="flex items-center p-1"
            >
              <Image
                src="/images/payments/plus.svg"
                alt="Agregar"
                width={20}
                height={20}
              />
            </Button>

            <span className="px-2">{quantity}</span>

            <Button
              variant="danger"
              onClick={() => removeFromCart(product.id)}
              className="flex items-center p-1"
              disabled={quantity === 0}
            >
              <Image
                src="/images/payments/minus.svg"
                alt="Restar"
                width={20}
                height={20}
              />
            </Button>
          </div>
        )}

        {/* Botones de vendedor/admin */}
        {canEdit && (
          <div className="flex gap-2">
            <Button
              variant="warning"
              onClick={() => onEdit(product)}
              className="flex items-center gap-1"
            >
              <Image
                src="/images/payments/edit-pen.svg"
                alt="Editar"
                width={16}
                height={16}
              />
            </Button>
            <Button
              variant="danger"
              onClick={() => onDelete(product.id)}
              className="flex items-center gap-1"
            >
              <Image
                src="/images/payments/trash-can.svg"
                alt="Eliminar"
                width={16}
                height={16}
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
