"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { ThemeIcon } from "./ThemeIcon"; // 🔑 Importamos el Icono de Tema

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleToggle = () => {
    // Usamos resolvedTheme para saber el estado actual
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      // El estilo del botón base, asegurando que el padding sea consistente
      className="p-2 rounded-full text-[var(--foreground)] hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {/* 🔑 Delegamos el renderizado del ícono a ThemeIcon */}
      <ThemeIcon />
    </button>
  );
}
