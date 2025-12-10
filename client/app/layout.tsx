import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Panel de administración de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-[var(--background)] text-[var(--foreground)] pt-20 min-h-screen`}
      >
        <Navbar />

        {/* Contenido principal */}
        <main className="px-4 sm:px-8 py-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
