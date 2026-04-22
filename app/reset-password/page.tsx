"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "@/lib/api/auth";

/* ─── SVG Components to match login design ─── */
function Gear({ size = 200, teeth = 12, color = "currentColor" }: { size?: number; teeth?: number; color?: string }) {
  const R = size / 2;
  const r = R * 0.72;
  const rh = R * 0.22;
  const toothW = (2 * Math.PI * r) / teeth * 0.38;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a0 = ((i * 2 * Math.PI) / teeth) - toothW / r / 2;
    const a1 = ((i * 2 * Math.PI) / teeth) + toothW / r / 2;
    const a2 = (((i + 0.5) * 2 * Math.PI) / teeth) - toothW / r / 2;
    const a3 = (((i + 0.5) * 2 * Math.PI) / teeth) + toothW / r / 2;
    const c = Math.cos, s = Math.sin;
    pts.push(`${R + r * c(a0)},${R + r * s(a0)}`);
    pts.push(`${R + R * c(a0)},${R + R * s(a0)}`);
    pts.push(`${R + R * c(a1)},${R + R * s(a1)}`);
    pts.push(`${R + r * c(a1)},${R + r * s(a1)}`);
    pts.push(`${R + r * c(a2)},${R + r * s(a2)}`);
    pts.push(`${R + r * c(a3)},${R + r * s(a3)}`);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <polygon points={pts.join(" ")} fill={color} />
      <circle cx={R} cy={R} r={rh} fill="white" />
    </svg>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Token de recuperación no válido.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      await resetPassword(token, newPassword);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "No se pudo restablecer la contraseña.");
    }
  };

  if (status === "success") {
    return (
      <div className="px-6 py-9 sm:px-9 text-center w-full">
        <h2 className="text-xl italic font-playfair mb-4" style={{ color: 'var(--ui-text-heading)' }}>
          ¡Todo listo!
        </h2>
        <p className="text-sm font-jetbrains mb-8" style={{ color: 'var(--ui-text-body)' }}>
          Tu contraseña ha sido actualizada correctamente. Ya puedes usarla para ingresar a tu cuenta.
        </p>
        <Link
          href="/login"
          className="futuristic-btn inline-flex items-center justify-center gap-3 px-8 h-12 text-white rounded-xl font-jetbrains"
          style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase" }}
        >
          Ir al Login
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-9 sm:px-9 w-full">
      <div className="text-center mb-8">
        <h2 className="text-xl italic font-playfair mb-2" style={{ color: 'var(--ui-text-heading)' }}>
          Nueva Contraseña
        </h2>
        <div className="mx-auto" style={{ height: 1, width: 52, background: "linear-gradient(90deg, transparent, #7dd3fc, transparent)" }} />
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] tracking-[1.2px] uppercase font-jetbrains" style={{ color: 'var(--ui-text-muted)' }}>
            Nueva Contraseña
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="futuristic-input w-full h-13 rounded-xl px-4 font-jetbrains"
            style={{ fontSize: 13 }}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] tracking-[1.2px] uppercase font-jetbrains" style={{ color: 'var(--ui-text-muted)' }}>
            Confirmar Contraseña
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="futuristic-input w-full h-13 rounded-xl px-4 font-jetbrains"
            style={{ fontSize: 13 }}
            required
          />
        </div>

        {error && (
          <p className="text-[11px] text-center font-jetbrains" style={{ color: "#f87171" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading" || !token}
          className="futuristic-btn w-full h-13 text-white rounded-xl flex items-center justify-center gap-3 mt-2 font-jetbrains"
          style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase" }}
        >
          {status === "loading" ? "Procesando..." : "Actualizar Contraseña"}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden login-bg">
      <div className="absolute pointer-events-none select-none animate-spin-gear" style={{ bottom: "-10%", right: "-5%", opacity: 0.07, color: "#1a365d" }} aria-hidden="true">
        <Gear size={340} teeth={16} color="currentColor" />
      </div>
      <div className="absolute pointer-events-none select-none animate-spin-gear-reverse" style={{ top: "-8%", left: "-4%", opacity: 0.055, color: "#0ea5e9" }} aria-hidden="true">
        <Gear size={230} teeth={12} color="currentColor" />
      </div>

      <div className="relative z-10 w-full max-w-105 px-4 py-8 animate-fade-in-up flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "#ffffff", border: "1px solid #bae6fd", boxShadow: "0 4px 14px rgba(14,165,233,0.12)" }}>
            <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
              <path d="M18 2C18 2 6 10 6 22C6 29.732 11.373 36.13 18 37.9C24.627 36.13 30 29.732 30 22C30 10 18 2 18 2Z" fill="#e0f2fe" />
              <path d="M18 4C18 4 7 12 7 22C7 30.284 11.925 37.08 18 38.75C24.075 37.08 29 30.284 29 22C29 12 18 4 18 4Z" stroke="#0ea5e9" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <h1 className="text-4xl tracking-widest text-center font-playfair" style={{ color: 'var(--ui-text-heading)' }}>RESET</h1>
          <p className="text-[11px] tracking-[3px] uppercase font-jetbrains text-sky-500 mt-1">Seguridad de Cuenta</p>
        </div>

        <div className="rounded-2xl overflow-hidden login-card w-full">
          <div aria-hidden="true" style={{ height: 2, background: "linear-gradient(90deg, transparent 0%, #7dd3fc 35%, #0ea5e9 50%, #7dd3fc 65%, transparent 100%)" }} />
          <Suspense fallback={null}>
            <ResetPasswordContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
