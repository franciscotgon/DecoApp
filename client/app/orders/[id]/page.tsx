"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { handleApiError } from "@/lib/error-handler";
import { orderService } from "@/app/services/order.service";
import { OrderDto } from "@/data-layer/types/OrderDto";
import { OrderItemDto } from "@/data-layer/types/OrderItemDto";

export default function OrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState<OrderDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getOrderById(id as string);
        setOrder(data);
      } catch (err) {
        alert(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading)
    return <div className="p-20 text-center">Cargando detalles...</div>;

  if (!order)
    return <div className="p-20 text-center">Orden no encontrada.</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-8 text-white text-center">
          <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
          <p className="opacity-90 mt-1">Orden #{order.id}</p>
          <p className="text-sm opacity-75">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="p-8">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">
            Resumen de Productos
          </h2>

          <div className="space-y-4">
            {order.items.map((item: OrderItemDto) => (
              <div
                key={item.productId}
                className="flex justify-between items-center text-gray-700"
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {item.productName || "Producto"}
                  </span>
                  <span className="text-xs text-gray-500">
                    Cantidad: {item.quantity}
                  </span>
                </div>
                <span className="font-semibold">
                  {(item.unitPrice * item.quantity).toLocaleString("es-AR")}
                </span>
              </div>
            ))}
          </div>

          <hr className="my-6 border-dashed" />

          <div className="space-y-2">
            <div className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total pagado</span>
              <span>${order.totalAmount.toLocaleString("es-AR")}</span>
            </div>
          </div>

          {order.notes && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase">
                Notas:
              </h3>
              <p className="text-gray-700 italic">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
