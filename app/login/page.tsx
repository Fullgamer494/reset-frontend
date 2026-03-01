"use client";

import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const { form, showPassword, isLoading, error, setShowPassword, handleChange, handleSubmit, fillDemo } = useLogin();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)",
      }}
    >
      {/* Decorative background elements — ocultos en móvil para no obstruir */}
      <div
        className="absolute left-[12%] top-[8%] opacity-5 pointer-events-none select-none hidden sm:block"
        style={{ width: 350, height: 420 }}
      >
        <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="#1a365d" strokeWidth="2"/>
          <path d="M100 40 L100 160 M60 80 L140 80 M60 120 L140 120" stroke="#1a365d" strokeWidth="1.5"/>
          <circle cx="100" cy="100" r="20" stroke="#1a365d" strokeWidth="2"/>
        </svg>
      </div>
      <div
        className="absolute right-[8%] top-[2%] opacity-5 pointer-events-none select-none hidden sm:block"
        style={{ width: 400, height: 480 }}
      >
        <svg viewBox="0 0 200 230" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 20 C130 40 160 70 160 100 C160 130 130 160 100 180 C70 160 40 130 40 100 C40 70 70 40 100 20Z" stroke="#1a365d" strokeWidth="1.5"/>
          <circle cx="100" cy="100" r="30" stroke="#1a365d" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Main Container — padding horizontal m\u00ednimo en m\u00f3vil */}
      <div className="relative w-full max-w-[448px] px-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-16 h-16 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-4 animate-breathe"
          >
            <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2C18 2 6 10 6 22C6 29.732 11.373 36.13 18 37.9C24.627 36.13 30 29.732 30 22C30 10 18 2 18 2Z" fill="#0ea5e9" opacity="0.2"/>
              <path d="M18 4C18 4 7 12 7 22C7 30.284 11.925 37.08 18 38.75C24.075 37.08 29 30.284 29 22C29 12 18 4 18 4Z" stroke="#0ea5e9" strokeWidth="1.5" fill="none"/>
              <path d="M18 12 L18 28 M12 20 L18 14 L24 20" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1
            className="text-[36px] tracking-[1px] text-slate-800 text-center leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            RESET
          </h1>
          <p
            className="text-[10px] tracking-[3px] uppercase text-slate-400 italic text-center mt-1"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Tu OASIS, un espacio de recuperación y paz
          </p>
        </div>

        {/* Card \u2014 padding responsivo en m\u00f3vil */}
        <div
          className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
          style={{ boxShadow: "0px 20px 50px -15px rgba(0,0,0,0.1)" }}
        >
          <div className="px-6 pt-8 pb-4 sm:px-10 sm:pt-10">
            <h2
              className="text-[24px] italic text-slate-700 text-center leading-tight mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Bienvenido de nuevo
            </h2>
            <div className="flex justify-center mb-8">
              <div className="w-8 h-px bg-sky-300 opacity-60" />
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-[10px] tracking-[1px] uppercase text-slate-400"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@correo.com"
                    className="w-full h-[50px] rounded-xl border border-slate-200 bg-slate-50/30 pl-12 pr-4 text-slate-700 placeholder-slate-400 outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100 transition-all"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    className="text-[10px] tracking-[1px] uppercase text-slate-400"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Contraseña
                  </label>
                  <a
                    href="#"
                    className="text-[9px] tracking-[-0.45px] uppercase text-sky-500 hover:text-sky-600 transition-colors"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full h-[50px] rounded-xl border border-slate-200 bg-slate-50/30 pl-12 pr-12 text-slate-700 placeholder-slate-400 outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100 transition-all"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-[11px] text-red-400 text-center" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {error}
                </p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[52px] bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white rounded-xl flex items-center justify-center gap-3 transition-colors mt-2"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  letterSpacing: "2.4px",
                  textTransform: "uppercase",
                  boxShadow: "0px 10px 15px -3px rgba(30,41,59,0.1), 0px 4px 6px -4px rgba(30,41,59,0.1)",
                }}
              >
                Iniciar Sesión
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-5 p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <p
                className="text-[9px] tracking-[1.5px] uppercase text-slate-400 mb-3 text-center"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Accesos demo — haz clic para rellenar
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => fillDemo("user")}
                  className="flex-1 py-2.5 px-3 border border-sky-200 bg-sky-50 hover:bg-sky-100 rounded-lg text-left transition-colors"
                >
                  <p
                    className="text-[9px] tracking-[1px] uppercase text-sky-600 mb-0.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Adicto
                  </p>
                  <p
                    className="text-[10px] italic text-slate-500"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    alex@correo.com
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo("companion")}
                  className="flex-1 py-2.5 px-3 border border-teal-200 bg-teal-50 hover:bg-teal-100 rounded-lg text-left transition-colors"
                >
                  <p
                    className="text-[9px] tracking-[1px] uppercase text-teal-600 mb-0.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Padrino
                  </p>
                  <p
                    className="text-[10px] italic text-slate-500"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    padrino@correo.com
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Register link */}
          <div className="px-6 py-6 sm:px-10 border-t border-slate-100 flex items-center justify-center gap-1">
            <span
              className="text-[14px] italic text-slate-600"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ¿No tienes cuenta?{" "}
            </span>
            <Link
              href="/register"
              className="text-[14px] italic font-bold text-sky-500 hover:text-sky-600 transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Regístrate
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <p
            className="text-[9px] tracking-[0.9px] uppercase text-slate-400 text-center italic"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            cada paso, un día a la paz.
          </p>
        </div>
      </div>
    </div>
  );
}
