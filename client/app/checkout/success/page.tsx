"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function CheckoutSuccessPage() {
  const router = useRouter();

  // Limpiar el carrito si aún queda algo
  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="bg-white p-12 rounded-xl shadow text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-green-600">
          ¡Compra Exitosa!
        </h1>
        <p className="text-gray-700 mb-6">
          Gracias por tu compra. Tu pedido se está procesando y recibirás un
          correo con los detalles.
        </p>
        <Button
          variant="primary"
          onClick={() => router.push("/")}
          className="px-6 py-3"
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
}
