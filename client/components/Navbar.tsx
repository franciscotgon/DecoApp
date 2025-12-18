"use client";

import Link from "next/link";
import Image from "next/image";
import { Category } from "@/data-layer/types/Category";
import CartIcon from "@/components/ui/CartIcon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "./context/AuthContext";

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const { user, logout } = useAuth();
  console.log(user, "usuario en Navbar");

  return (
    <nav className="w-full bg-[var(--background)] border-b border-gray-200 fixed top-0 left-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between h-[70px]">
        <Link href="/" className="group flex items-center">
          <div className="relative overflow-hidden rounded-full border-2 border-transparent group-hover:border-[var(--primary)] group-hover:scale-105 transition-all duration-300 w-[50px] h-[50px]">
            <Image
              src="/images/logo/logo.jpg"
              alt="Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="ml-3 font-bold text-xl tracking-tight hidden lg:block group-hover:text-[var(--primary)]">
            DecoApp
          </span>
        </Link>

        {/* Columna Central: Navegación */}
        <div className="hidden md:flex items-center space-x-8 font-semibold text-[var(--foreground)]">
          <Link href="/" className="hover:text-[var(--primary)] transition">
            Inicio
          </Link>

          <div className="relative group">
            <Link
              href="/products"
              className="hover:text-[var(--primary)] transition flex items-center gap-1"
            >
              Productos <span className="text-sm">▾</span>
            </Link>
            <div className="absolute left-0 top-full mt-2 w-48 bg-[var(--background)] border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/products?categoryId=${category.id}`}
                      className="block px-4 py-2 text-sm hover:bg-[var(--secondary)]"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href="/about-us"
            className="hover:text-[var(--primary)] transition"
          >
            Sobre nosotros
          </Link>

          {/* Panel Admin condicional */}
          {user?.role === "Admin" && (
            <Link
              href="/admin"
              className="text-red-600 hover:text-red-400 font-bold"
            >
              Panel Admin
            </Link>
          )}
        </div>

        {/* Columna Derecha: Acciones y Usuario */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <CartIcon />

          <div className="hidden sm:flex items-center space-x-2 font-semibold">
            {user ? (
              /* ✅ ESTADO LOGUEADO: Usamos user.firstName normalizado */
              <div className="flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-gray-700">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 font-medium">
                    Bienvenido,
                  </span>
                  <span className="text-sm text-[var(--primary)] font-bold leading-tight">
                    {user.firstName || "Usuario"}
                  </span>
                  <button
                    onClick={logout}
                    className="text-[10px] uppercase tracking-tighter text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs shadow-sm">
                  {user.firstName?.charAt(0) || user.email?.charAt(0)}
                </div>
              </div>
            ) : (
              /* ESTADO NO LOGUEADO */
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm hover:text-[var(--primary)]"
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm bg-[var(--primary)] text-white rounded-lg hover:shadow-md transition"
                >
                  Registrarme
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
