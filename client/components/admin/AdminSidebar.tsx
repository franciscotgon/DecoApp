"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-lg transition ${
      pathname.startsWith(path)
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <nav className="space-y-2">
        <Link href="/admin" className={linkClass("/admin")}>
          Dashboard
        </Link>

        <Link href="/admin/products" className={linkClass("/admin/products")}>
          Productos
        </Link>

        <Link
          href="/admin/categories"
          className={linkClass("/admin/categories")}
        >
          Categorías
        </Link>
      </nav>
    </aside>
  );
}
