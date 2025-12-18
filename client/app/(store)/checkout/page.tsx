"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { useCart } from "@/hooks/CartContext";
import { handleApiError } from "@/lib/error-handler";
import { orderService } from "@/app/services/order.service";

export default function CheckoutPage() {
  const {
    cartItems,
    total,
    clearCart,
    userId = "36cacece-8f57-4766-b34f-e1d9e49d102d",
  } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState("");

  const formatPrice = useMemo(() => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  }, []);

  useEffect(() => {
    if (cartItems.length === 0 && !isLoading) {
      router.push("/cart");
    }
  }, [cartItems, router, isLoading]);

  const handlePlaceOrder = async () => {
    try {
      const result = await orderService.createOrder({
        userId: userId!,
        notes: notes,
      });

      if (result && result.id) {
        clearCart();
        setTimeout(() => {
          router.push(`/order-confirmation?id=${result.id}`);
        }, 100);
      }
    } catch (error: unknown) {
      alert(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4 text-gray-800">
        Finalizar Compra
      </h1>

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        <div className="lg:col-span-2 space-y-8">
          <section className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">
                1
              </span>
              Notas del Pedido
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Entrega en portería, preferencias de horario..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              rows={4}
            />
          </section>

          <section className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 opacity-60">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">
                2
              </span>
              Método de Pago
            </h2>
            <p className="text-sm text-gray-500 italic">
              Próximamente: Integración con Mercado Pago
            </p>
          </section>
        </div>

        <div className="lg:col-span-1">
          <section className="p-6 bg-gray-50 rounded-xl border border-gray-200 sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Resumen</h2>

            <div className="space-y-3 mb-6 border-b pb-4 max-h-48 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-medium">
                    {formatPrice.format(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-xl mb-6">
              <span>Total:</span>
              <span>{formatPrice.format(total)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700 active:scale-95"
              }`}
            >
              {isLoading ? "Procesando..." : "Confirmar Orden"}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
