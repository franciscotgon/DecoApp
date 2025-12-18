"use client";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react"; // 🔑 Importar el ícono de Lucide
import { useCart } from "@/hooks/CartContext";

export default function CartIcon() {
  // Obtenemos el conteo total de unidades del hook
  const { itemCount } = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push("/cart");
  };

  return (
    <button
      onClick={handleClick}
      className="relative p-2 rounded-full hover:bg-gray-100 transition"
      aria-label={`Ver carrito. Tienes ${itemCount} artículos.`}
    >
      {/* Ícono de Carrito de Lucide */}
      <ShoppingCart className="w-6 h-6 text-gray-700" />

      {/* Globo Contador */}
      {itemCount > 0 && (
        <span
          className="absolute top-0 right-0 inline-flex items-center justify-center 
                                 h-5 w-5 text-xs font-bold leading-none text-white 
                                 transform translate-x-1/3 -translate-y-1/3 
                                 bg-red-600 rounded-full border-2 border-white"
        >
          {/* Aseguramos que el conteo no sea demasiado grande para el globo */}
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
