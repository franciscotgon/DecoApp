import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import { getCategories } from "@/app/services/category.service";
import { Category } from "@/data-layer/types/Category";
import AppWrapper from "@/components/AppWraper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DecoApp | Tu hogar, tu estilo",
  description: "Ecommerce premium de decoración para interiores y exteriores",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Cargamos las categorías en el servidor para SEO y carga rápida
  let categories: Category[] = [];

  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Error crítico cargando categorías en RootLayout:", error);
    // Podrías dejar 'categories' como array vacío para que el Navbar no rompa
  }

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-[var(--background)] text-[var(--foreground)] min-h-screen pt-20`}
      >
        <Providers>
          <AppWrapper categories={categories}>{children}</AppWrapper>
        </Providers>
      </body>
    </html>
  );
}
