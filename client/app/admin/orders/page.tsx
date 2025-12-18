"use client";

import { useEffect, useState } from "react";
import { Loader2, ShoppingBag, Eye, Calendar, User } from "lucide-react";
import Link from "next/link";
import { useOrdersService } from "@/app/services/Admin/orders-list.service";

interface Order {
  id: number;
  customerName: string;
  createdAt: string;
  totalAmount: number;
  status: "Pendiente" | "Completado" | "Cancelado";
}

export default function AdminOrdersPage() {
  const { getAdminOrders } = useOrdersService();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getAdminOrders();
      setOrders(data ?? []);
      setLoading(false);
    };
    load();
  }, [getAdminOrders]);

  if (loading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center text-primary">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="text-foreground/50 animate-pulse font-medium">
          Sincronizando pedidos...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 transition-colors duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <ShoppingBag className="text-primary" />
            Gestión de Pedidos
          </h1>
          <p className="text-foreground/60 mt-1">
            Monitorea las ventas y el flujo de caja.
          </p>
        </div>
      </div>

      <div className="bg-foreground/[0.02] dark:bg-foreground/[0.04] border border-foreground/10 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-foreground/5 bg-foreground/[0.02]">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">
                  ID
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">
                  Cliente
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">
                  Fecha
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">
                  Total
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">
                  Estado
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-foreground/[0.02] transition-colors group"
                >
                  <td className="px-6 py-4 font-mono text-sm text-foreground/70">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <User size={14} />
                      </div>
                      <span className="font-medium text-foreground">
                        {order.customerName || "Cliente Invitado"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/60">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-primary/50" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-foreground">
                    {Number(order.totalAmount).toLocaleString("es-MX", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === "Completado"
                          ? "bg-green-500/10 text-green-500"
                          : order.status === "Pendiente"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {order.status || "Pendiente"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex items-center gap-2 bg-[#c6a974] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-[#c6a974]/20 hover:brightness-110 transition-all active:scale-95"
                    >
                      <Eye size={16} />
                      Detalles
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="p-20 text-center">
            <ShoppingBag
              size={48}
              className="mx-auto text-foreground/10 mb-4"
            />
            <p className="text-foreground/40 font-medium">
              No hay órdenes para mostrar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
