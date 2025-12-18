"use client";

import { useState } from "react";
import { Mail, KeyRound, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-foreground/[0.03] dark:bg-foreground/[0.05] p-10 rounded-3xl border border-foreground/10 backdrop-blur-md relative overflow-hidden">
        {!submitted ? (
          <>
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[#c6a974]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#c6a974]">
                <KeyRound size={32} />
              </div>
              <h1 className="text-3xl font-bold">Recuperar Acceso</h1>
              <p className="text-foreground/50 mt-2">
                Te enviaremos un enlace para restablecer tu contraseña
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/50 flex items-center gap-2">
                  <Mail size={14} className="text-[#c6a974]" /> Email de tu
                  cuenta
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-background border border-foreground/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#c6a974]/20 focus:border-[#c6a974] outline-none transition-all"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#c6a974] text-white font-bold rounded-2xl shadow-lg shadow-[#c6a974]/20 hover:brightness-110 active:scale-95 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Enviar Instrucciones"
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl font-bold mb-2">¡Correo Enviado!</h2>
            <p className="text-foreground/50 mb-8">
              Si existe una cuenta asociada a <b>{email}</b>, recibirás un
              mensaje en unos instantes.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm text-[#c6a974] font-bold hover:underline"
            >
              Intentar con otro correo
            </button>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-foreground/5 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-[#c6a974] transition-colors"
          >
            <ArrowLeft size={14} />
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
