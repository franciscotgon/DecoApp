"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeIcon() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true); // <--- Aquí silenciamos el warning del linter
  }, []);

  if (!mounted) {
    return <div className="w-5 h-5"></div>;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <>
      {isDark ? (
        <Sun size={20} className="text-yellow-500" />
      ) : (
        <Moon size={20} className="text-gray-800" />
      )}
    </>
  );
}
