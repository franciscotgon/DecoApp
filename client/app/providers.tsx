"use client";
import { ThemeProvider } from "next-themes";
import * as React from "react";
// 🔑 Importa tu AuthProvider (ajusta la ruta si es necesario)
import { AuthProvider } from "@/components/context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    /* 1. Envolvemos todo con AuthProvider para que useAuth() funcione */
    <AuthProvider>
      {/* 2. Luego el ThemeProvider para el modo oscuro/claro */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
