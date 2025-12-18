"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Category } from "@/data-layer/types/Category";
import React from "react";
import { CartProvider } from "@/hooks/CartContext";

interface AppWrapperProps {
  categories: Category[];
  children: React.ReactNode;
}

export default function AppWrapper({ categories, children }: AppWrapperProps) {
  return (
    <CartProvider>
      <Navbar categories={categories} />

      <main className="px-4 sm:px-8 py-8 min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>

      <Footer />
    </CartProvider>
  );
}
