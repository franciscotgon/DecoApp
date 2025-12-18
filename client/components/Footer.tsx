"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";

import PaymentIcons from "@/components/ui/PaymentIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-100 text-gray-700 py-12 mt-20 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-8 border-b border-gray-300">
          <div className="flex flex-col space-y-4 items-center md:items-start text-center md:text-left">
            <Link href="/">
              <Image
                src="/images/logo/logo.jpg"
                alt="Deco-App Logo"
                width={120}
                height={120}
                className="rounded-md"
              />
            </Link>

            <p className="text-sm font-semibold mt-2">Deco-App</p>

            {/* Contacto */}
            <div className="text-sm space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-500" />
                <span>soporte@decoapp.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-green-500" />
                <span>+54 11 5555-5555</span>
              </div>
            </div>

            {/* Redes Sociales con Lucide */}
            <div className="flex gap-4 pt-3">
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-600 hover:text-pink-600 transition"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-600 hover:text-blue-700 transition"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                aria-label="Twitter/X"
                className="text-gray-600 hover:text-black transition"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Navegación</h3>
            <nav className="flex flex-col gap-2 text-base font-medium text-center md:text-left">
              <Link href="/" className="hover:text-black transition">
                Inicio
              </Link>
              <Link href="/products" className="hover:text-black transition">
                Productos
              </Link>
              <Link href="/about-us" className="hover:text-black transition">
                Sobre nosotros
              </Link>
              <Link href="/contacto" className="hover:text-black transition">
                Contacto
              </Link>
            </nav>
          </div>

          {/* COLUMNA 3: LEGAL E INFORMACIÓN */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Información y Ayuda
            </h3>
            <nav className="flex flex-col gap-2 text-base font-medium text-center md:text-left">
              <Link href="/faq" className="hover:text-black transition">
                FAQ
              </Link>
              <Link href="/envios" className="hover:text-black transition">
                Envíos y Devoluciones
              </Link>
              <Link href="/terminos" className="hover:text-black transition">
                Términos y Condiciones
              </Link>
              <Link href="/privacidad" className="hover:text-black transition">
                Política de Privacidad
              </Link>
            </nav>
          </div>
        </div>

        {/* 2. BARRA INFERIOR: COPYRIGHT Y PAGOS */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 space-y-4 sm:space-y-0 text-sm">
          <PaymentIcons />
          <div className="text-xs text-gray-500 tracking-wide">
            © {currentYear} Deco-App. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
