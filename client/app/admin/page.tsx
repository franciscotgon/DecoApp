"use client";

import Link from "next/link";
import { Settings, Tags, Package } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-10">Panel de Administración</h1>

      <p className="text-gray-600 mb-10">
        Selecciona una sección para gestionar el contenido de la tienda.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Productos */}
        <Link
          href="/admin/products"
          className="bg-white shadow border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
        >
          <Package size={40} className="mb-4 text-black" />
          <h2 className="text-xl font-semibold">Productos</h2>
          <p className="text-gray-500 text-sm mt-2">
            Crear, editar y gestionar productos.
          </p>
        </Link>

        {/* Categorías */}
        <Link
          href="/admin/categories"
          className="bg-white shadow border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
        >
          <Tags size={40} className="mb-4 text-black" />
          <h2 className="text-xl font-semibold">Categorías</h2>
          <p className="text-gray-500 text-sm mt-2">
            Organiza los productos en categorías.
          </p>
        </Link>

        {/* Configuración */}
        <Link
          href="/admin/settings"
          className="bg-white shadow border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
        >
          <Settings size={40} className="mb-4 text-black" />
          <h2 className="text-xl font-semibold">Configuración</h2>
          <p className="text-gray-500 text-sm mt-2">
            Ajustes generales del sistema.
          </p>
        </Link>
      </div>
    </div>
  );
}
