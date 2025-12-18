"use client";

import { useMemo } from "react";

interface CartTotalProps {
  total: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

export default function CartTotal({
  total,
  onCheckout,
  isLoading = false,
}: CartTotalProps) {
  // Formateo de precio
  const formattedTotal = useMemo(() => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(total);
  }, [total]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 p-4 bg-gray-100 rounded-lg gap-4 border-t border-gray-300">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 uppercase tracking-wide">
          Subtotal
        </span>
        <span className="font-bold text-2xl text-gray-800">
          {formattedTotal}
        </span>
      </div>

      {/* Botón de Checkout con lógica de carga */}
      <button
        onClick={onCheckout}
        disabled={isLoading} // 👈 Deshabilitamos si está cargando
        className={`
          w-full md:w-auto px-8 py-3 font-semibold rounded-lg shadow-md 
          transition duration-200 ease-in-out focus:outline-none focus:ring-4 
          flex items-center justify-center gap-2
          ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed text-gray-200"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
          }
        `}
      >
        {isLoading ? (
          <>
            {/* Spinner simple de CSS */}
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Procesando...
          </>
        ) : (
          "Ir al Checkout"
        )}
      </button>
    </div>
  );
}
