// src/app/admin/settings/admin-users/page.tsx
import { PlusCircle, Users, ChevronLeft } from "lucide-react";
import Link from "next/link";

/**
 * Componente de Tabla (Placeholder)
 * En una fase posterior, esto será un Client Component (e.g., AdminUserTable)
 * que contendrá el estado y la lógica de paginación/filtrado.
 */
const AdminUsersTablePlaceholder = () => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mt-6">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">
          Lista de Cuentas de Administrador
        </h3>
      </div>
      <div className="p-6 text-center text-gray-500 min-h-[300px] flex flex-col justify-center items-center">
        {/* Aquí iría la carga de datos del Repository (Server Side) */}
        <Users size={48} className="text-gray-300 mb-3" />
        <p className="mb-2">
          La tabla de usuarios administradores se cargará aquí.
        </p>
        <p className="text-sm">
          Implementaremos la lógica de fetching, paginación y las acciones de
          CRUD (Editar/Eliminar) en un componente de cliente dedicado.
        </p>
      </div>
    </div>
  );
};

export default function AdminUsersPage() {
  const createAdminUserHref = "/admin/settings/admin-users/new";

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <Link
        href="/admin/settings"
        className="flex items-center text-indigo-600 hover:text-indigo-800 transition text-sm font-medium"
      >
        <ChevronLeft size={18} className="mr-1" />
        Volver a Configuración
      </Link>

      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users size={32} className="mr-3 text-indigo-600" />
            Gestión de Admins
          </h1>
          <p className="text-gray-600 mt-1">
            Crea, edita o elimina usuarios con acceso al panel de administración
            de Deco App.
          </p>
        </div>

        {/* Botón de Creación */}
        <Link
          href={createAdminUserHref}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          <PlusCircle size={20} className="mr-2" />
          Nuevo Administrador
        </Link>
      </header>

      <section>
        <AdminUsersTablePlaceholder />
      </section>
    </div>
  );
}
