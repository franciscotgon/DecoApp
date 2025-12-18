"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/lib/error-handler";
import { authService } from "@/app/services/Auth/auth.service";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      // Enviamos al backend (BFF)
      await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      router.push("/login");
    } catch (err) {
      alert(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--background)] px-4 py-12">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row">
        <div className="hidden md:flex md:w-1/3 bg-[var(--primary)] items-center justify-center p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Únete a DecoApp</h3>
            <p className="text-blue-100 text-sm">
              Crea tu cuenta para gestionar tus compras y favoritos.
            </p>
          </div>
        </div>

        <div className="p-8 md:w-2/3">
          <div className="flex justify-center mb-4 md:justify-start">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--primary)]">
              <Image
                src="/images/logo/logo.jpg"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Crear cuenta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                  Nombre
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[var(--primary)] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                  Apellido
                </label>
                <input
                  name="lastName"
                  type="text"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[var(--primary)] outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[var(--primary)] outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                  Contraseña
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[var(--primary)] outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
                  Confirmar
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[var(--primary)] outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold py-3 rounded-xl transition shadow-lg disabled:opacity-50 mt-4"
            >
              {loading ? "Procesando..." : "Registrarme ahora"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="text-[var(--primary)] font-bold hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
