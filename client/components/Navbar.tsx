"use client";

import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  userRole?: "Admin" | "Customer";
}

export default function Navbar({ userRole = "Customer" }: NavbarProps) {
  return (
    <nav className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between h-[70px]">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/logo/logo.jpg"
            alt="Logo"
            width={100}
            height={50}
            loading="eager"
          />
        </div>

        {/* Menu principal */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-semibold">
          <Link href="/" className="hover:text-black transition">
            Inicio
          </Link>

          <Link href="/products" className="hover:text-black transition">
            Productos
          </Link>

          <Link href="/categories" className="hover:text-black transition">
            Categorías
          </Link>

          <Link href="/about-us" className="hover:text-black transition">
            Sobre nosotros
          </Link>

          {/* 🔥 Solo visible para Admin */}
          {userRole === "Admin" && (
            <Link
              href="/admin"
              className="text-red-600 hover:text-red-800 transition"
            >
              Panel Admin
            </Link>
          )}
        </div>

        {/* Right buttons */}
        <div className="flex space-x-4 font-semibold">
          <Link
            href="/login"
            className="px-4 py-2 text-gray-700 hover:text-black transition"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Registrarme
          </Link>
        </div>
      </div>
    </nav>
  );
}
