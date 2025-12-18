"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/error-handler";
import { useAuth } from "@/components/context/AuthContext";
import { authService } from "@/app/services/Auth/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login({ email, password });

      login(response.token, response.user);

      if (response.user.role === "Admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      alert(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--primary)] shadow-inner">
              <Image
                src="/images/logo/logo.jpg"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-2">
            Bienvenido
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Ingresa tus credenciales para continuar
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none transition"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg shadow-blue-500/30 disabled:opacity-50"
            >
              {loading ? "Iniciando sesión..." : "Entrar"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes cuenta?{" "}
              <Link
                href="/register"
                className="text-[var(--primary)] font-bold hover:underline"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
