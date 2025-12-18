// app/(store)/order-confirmation/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-screen">
      <div className="text-center bg-white p-10 rounded-xl shadow-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-green-500 mx-auto mb-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          ¡Tu Orden ha sido Procesada!
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          Gracias por tu compra. Te enviaremos un correo electrónico con los
          detalles de la orden y seguimiento.
        </p>

        {orderId && (
          <div className="bg-gray-100 p-4 rounded-lg inline-block mb-8">
            <p className="text-sm font-medium text-gray-500">
              Número de Orden:
            </p>
            <p className="text-2xl font-bold text-blue-600">{orderId}</p>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <Link
            href="/products"
            className="py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
          >
            Seguir Comprando
          </Link>
          <Link
            href={`/orders/${orderId}`}
            className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Ver Detalles de la Orden
          </Link>
        </div>
      </div>
    </div>
  );
}
