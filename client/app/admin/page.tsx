"use client";

import { Settings, Tags, Package, ShoppingBag } from "lucide-react";
import AdminCard from "@/components/admin/AdminCard";

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-4 text-foreground">
        Panel de Administración
      </h1>

      <p className="text-foreground/60 mb-10 text-lg">
        Selecciona una sección para gestionar el contenido de la tienda.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminCard
          href="/admin/products"
          icon={<Package size={40} />}
          title="Productos"
          description="Crear, editar y gestionar productos."
        />

        <AdminCard
          href="/admin/categories"
          icon={<Tags size={40} />}
          title="Categorías"
          description="Organiza los productos en categorías."
        />

        <AdminCard
          href="/admin/orders"
          icon={<ShoppingBag size={40} />}
          title="Órdenes"
          description="Ver y gestionar pedidos de clientes."
        />

        <AdminCard
          href="/admin/settings"
          icon={<Settings size={40} />}
          title="Configuración"
          description="Ajustes generales del sistema."
        />
      </div>
    </div>
  );
}
