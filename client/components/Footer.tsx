"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f5e9d3] text-gray-800 py-6 mt-20 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center space-y-4">
        {/* SINGLE ROW: LOGO + MENU + PAYMENTS */}
        <div className="w-full flex flex-wrap items-start justify-between gap-7">
          {/* LOGO + SOCIAL UNDER */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/images/logo/logo.jpg"
              alt="Deco-App Logo"
              width={120}
              height={120}
              className="rounded-md"
            />

            {/* Redes debajo del logo */}
            <div className="flex gap-4 opacity-90 mt-3">
              <Image
                src="/images/social/instagram.svg"
                alt="Instagram"
                width={20}
                height={20}
              />
              <Image
                src="/images/social/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
              />
              <Image
                src="/images/social/tiktok.svg"
                alt="TikTok"
                width={20}
                height={20}
              />
              <Image
                src="/images/social/pinterest.svg"
                alt="Pinterest"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* MENU */}
          <div className="flex flex-col items-center mx-auto">
            <h3 className="text-base font-bold mb-2">Explorar</h3>

            <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
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
              <Link href="/faq" className="hover:text-black transition">
                FAQ
              </Link>
              <Link href="/envios" className="hover:text-black transition">
                Envíos
              </Link>
            </nav>
          </div>

          {/* PAYMENT METHODS */}
          <div className="flex flex-col items-center md:items-end gap-3 opacity-90">
            <div className="flex gap-4">
              <Image
                src="/images/payments/visa.svg"
                alt="Visa"
                width={40}
                height={25}
              />
              <Image
                src="/images/payments/mastercard.svg"
                alt="Mastercard"
                width={40}
                height={25}
              />
              <Image
                src="/images/payments/americanexpress.svg"
                alt="American Express"
                width={40}
                height={25}
              />
              <Image
                src="/images/payments/mercadopago.svg"
                alt="MercadoPago"
                width={40}
                height={25}
              />
            </div>
          </div>
        </div>

        {/* CONTACTO */}
        <div className="text-center text-xs text-gray-600">
          soporte@decoapp.com · +54 11 5555-5555
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-gray-600 text-[10px] tracking-wide">
          © {new Date().getFullYear()} Deco-App · Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
