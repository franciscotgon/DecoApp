// src/app/admin/settings/page.tsx
import Link from "next/link";
import { Settings, Database, Users, Palette } from "lucide-react";

const SettingCard = ({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}) => (
  <Link
    href={href}
    className="bg-white shadow border border-gray-100 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.01] min-h-[180px] justify-center"
  >
    <Icon size={40} className="mb-4 text-black" />
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    <p className="text-gray-500 text-sm mt-2">{description}</p>
  </Link>
);

export default function AdminSettingsPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">
          Configuración del Sistema
        </h1>
        <p className="text-gray-600 mt-1">
          Panel central para gestionar los ajustes globales, la apariencia y el
          mantenimiento de Deco App.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <SettingCard
          icon={Settings}
          title="Ajustes Generales"
          description="Configuración de SEO, título del sitio, datos de contacto de la tienda, etc."
          href="/admin/settings/general"
        />

        <SettingCard
          icon={Database}
          title="Mantenimiento de Datos"
          description="Herramientas de importación/exportación, gestión de caché y re-indexación de la BDD."
          href="/admin/settings/data-maintenance"
        />

        <SettingCard
          icon={Palette}
          title="Apariencia Web"
          description="Gestión de logotipos, colores principales, tipografía y variables de tema público."
          href="/admin/settings/appearance"
        />

        <SettingCard
          icon={Users}
          title="Usuarios Administradores"
          description="CRUD de cuentas de administrador y gestión de permisos/roles (si aplica)."
          href="/admin/settings/admin-users"
        />
      </div>
    </div>
  );
}
