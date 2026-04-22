"use client";

import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Gear, Hexagon, Diamond, EyeIcon, EyeOffIcon } from "@/components/SVG";

/* ═══════════════════════════════════════════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function LoginPage() {
  const { 
    form, 
    otpCode, 
    setOtpCode, 
    mfaToken, 
    showPassword, 
    isLoading, 
    error, 
    setShowPassword, 
    handleChange, 
    handleSubmit,
    handleVerify2FA 
  } = useLogin();
  const router = useRouter();

  // ─── Easter Egg: Redirección a Admin ────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Alt + Shift + A
      if (e.ctrlKey && e.altKey && e.shiftKey && e.key === "A") {
        router.push("/admin/login");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden safe-top-padding login-bg"
    >
      <Link
        href="/"
        className="fixed top-4 left-4 z-20 flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
        aria-label="Volver al inicio"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span
          className="text-[11px] tracking-[1.5px] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Inicio
        </span>
      </Link>

      <div
        className="absolute pointer-events-none select-none animate-spin-gear hidden sm:block"
        style={{ bottom: "-10%", right: "-5%", opacity: 0.07, color: "#1a365d" }}
        aria-hidden="true"
      >
        <Gear size={340} teeth={16} color="currentColor" />
      </div>

      <div
        className="absolute pointer-events-none select-none animate-spin-gear-reverse hidden sm:block"
        style={{ top: "-8%", left: "-4%", opacity: 0.055, color: "#0ea5e9" }}
        aria-hidden="true"
      >
        <Gear size={230} teeth={12} color="currentColor" />
      </div>

      <div
        className="absolute pointer-events-none select-none animate-drift-1 hidden md:block"
        style={{ top: "16%", right: "8%", color: "rgba(14,165,233,0.25)" }}
        aria-hidden="true"
      >
        <Hexagon size={52} color="currentColor" />
      </div>
      <div
        className="absolute pointer-events-none select-none animate-drift-2 hidden md:block"
        style={{ bottom: "20%", left: "7%", color: "rgba(26,54,93,0.18)" }}
        aria-hidden="true"
      >
        <Diamond size={44} color="currentColor" />
      </div>
      <div
        className="absolute pointer-events-none select-none animate-drift-3 hidden lg:block"
        style={{ top: "56%", right: "13%", color: "rgba(13,148,136,0.22)" }}
        aria-hidden="true"
      >
        <Hexagon size={34} color="currentColor" />
      </div>
      <div
        className="absolute pointer-events-none select-none animate-drift-1 hidden lg:block"
        style={{ top: "28%", left: "11%", color: "rgba(14,165,233,0.18)", animationDelay: "-5s" }}
        aria-hidden="true"
      >
        <Diamond size={30} color="currentColor" />
      </div>

      <div className="relative z-10 w-full max-w-105 px-4 py-8 animate-fade-in-up">

        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{
              background: "#ffffff",
              border: "1px solid #bae6fd",
              boxShadow: "0 4px 14px rgba(14,165,233,0.12)",
            }}
          >
            <svg width="36" height="44" viewBox="0 0 36 44" fill="none" aria-hidden="true">
              <path d="M18 2C18 2 6 10 6 22C6 29.732 11.373 36.13 18 37.9C24.627 36.13 30 29.732 30 22C30 10 18 2 18 2Z" fill="#e0f2fe" />
              <path d="M18 4C18 4 7 12 7 22C7 30.284 11.925 37.08 18 38.75C24.075 37.08 29 30.284 29 22C29 12 18 4 18 4Z" stroke="#0ea5e9" strokeWidth="1.5" fill="none" />
              <path d="M18 12 L18 28 M12 20 L18 14 L24 20" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1
            className="text-4xl tracking-widest text-center leading-tight font-playfair"
            style={{ color: 'var(--ui-text-heading)' }}
          >
            RESET
          </h1>
          <p
            className="text-[11px] tracking-[3px] uppercase font-jetbrains text-center mt-1 text-sky-500"
          >
            Tu Oasis · Recuperación &amp; Paz
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden login-card">
          <div
            aria-hidden="true"
            style={{
              height: 2,
              background: "linear-gradient(90deg, transparent 0%, #7dd3fc 35%, #0ea5e9 50%, #7dd3fc 65%, transparent 100%)",
            }}
          />

          <div className="px-6 pt-8 pb-6 sm:px-9 sm:pt-9">

            <div className="text-center mb-7">
              <h2 className="text-xl italic font-playfair mb-2" style={{ color: 'var(--ui-text-heading)' }}>
                {mfaToken ? "Verificación de Seguridad" : "Bienvenido de nuevo"}
              </h2>
              <div
                className="mx-auto"
                style={{
                  height: 1,
                  width: 52,
                  background: "linear-gradient(90deg, transparent, #7dd3fc, transparent)",
                }}
              />
              {mfaToken && (
                <p className="text-[12px] font-jetbrains rs-text-muted mt-4 leading-relaxed">
                  Te hemos enviado un código de 6 dígitos a tu correo.
                </p>
              )}
            </div>

            {!mfaToken ? (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] tracking-[1.2px] uppercase font-jetbrains" style={{ color: 'var(--ui-text-muted)' }}>
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ui-text-caption)' }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@correo.com"
                      className="futuristic-input w-full h-13 rounded-xl pl-12 pr-4 font-jetbrains" style={{ fontSize: 13 }}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[12px] tracking-[1.2px] uppercase font-jetbrains" style={{ color: 'var(--ui-text-muted)' }}>
                      Contraseña
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-[11px] tracking-wide uppercase font-jetbrains text-sky-500 hover:text-sky-400 transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ui-text-caption)' }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="futuristic-input w-full h-13 rounded-xl pl-12 pr-12 font-jetbrains" style={{ fontSize: 13 }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-sky-500 transition-colors" style={{ color: 'var(--ui-text-caption)' }}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>


                {error && (
                  <p className="text-[11px] text-center font-jetbrains" style={{ color: "#f87171" }} role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="futuristic-btn w-full h-13 text-white rounded-xl flex items-center justify-center gap-3 mt-1 font-jetbrains"
                  style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase" }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" strokeLinecap="round" />
                      </svg>
                      Verificando...
                    </>
                  ) : (
                    <>
                      Iniciar Sesión
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleVerify2FA}>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] tracking-[1.2px] uppercase font-jetbrains text-center" style={{ color: 'var(--ui-text-muted)' }}>
                    Código de Seguridad
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000 000"
                    className="futuristic-input w-full h-15 rounded-xl text-center font-jetbrains tracking-[10px] text-lg"
                    style={{ fontSize: 20 }}
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-center gap-2 -mt-2">
                  <input
                    type="checkbox"
                    id="rememberMe2FA"
                    name="rememberMe"
                    checked={form.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500 cursor-pointer"
                  />
                  <label 
                    htmlFor="rememberMe2FA" 
                    className="text-[11px] uppercase tracking-wider font-jetbrains cursor-pointer select-none"
                    style={{ color: 'var(--ui-text-muted)' }}
                  >
                    Recordar en este dispositivo
                  </label>
                </div>

                {error && (
                  <p className="text-[11px] text-center font-jetbrains" style={{ color: "#f87171" }} role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading || otpCode.length < 6}
                  className="futuristic-btn w-full h-13 text-white rounded-xl flex items-center justify-center gap-3 font-jetbrains"
                  style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase" }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" strokeLinecap="round" />
                      </svg>
                      Validando...
                    </>
                  ) : (
                    <>
                      Verificar Código
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="text-[11px] uppercase tracking-wider font-jetbrains text-center rs-text-caption hover:rs-text-body transition-colors"
                >
                  Volver al inicio
                </button>
              </form>
            )}


          </div>

          <div className="px-6 py-5 sm:px-9 flex items-center justify-center gap-1 login-card-footer">
            <span className="text-sm font-jetbrains" style={{ color: 'var(--ui-text-body)' }}>
              ¿No tienes cuenta?{" "}
            </span>
            <Link
              href="/register"
              className="text-sm font-bold font-jetbrains text-sky-500 hover:text-sky-600 transition-colors"
            >
              Regístrate
            </Link>
          </div>
        </div>

        <p className="text-[11px] tracking-[1px] uppercase font-jetbrains text-center mt-6" style={{ color: 'var(--ui-text-caption)' }}>
          cada paso, un día a la paz.
        </p>
        <p className="text-[11px] tracking-[0.5px] font-jetbrains text-center mt-3" style={{ color: 'var(--ui-text-caption)' }}>
          Al usar ReSet aceptas nuestros{" "}
          <Link href="/terms" className="text-sky-500 hover:underline uppercase tracking-[0.5px]">
            Términos y Condiciones
          </Link>
        </p>
      </div>
    </div>
  );
}

