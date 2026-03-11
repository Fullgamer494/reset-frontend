"use client";

import Link from "next/link";
import { useEffect } from "react";

/* ─── Planta de error (reutilizada del 404) ─────────────────────────────── */
function PlantIllustration() {
  return (
    <svg
      width="160"
      height="200"
      viewBox="0 0 160 200"
      fill="none"
      aria-hidden="true"
      className="animate-float"
    >
      <path d="M52 148 L56 172 Q80 180 104 172 L108 148 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
      <path d="M48 144 Q80 152 112 144" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
      <ellipse cx="80" cy="145" rx="32" ry="6" fill="#d4a96b" opacity="0.4" />
      <path d="M80 144 Q80 120 80 80" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M80 120 Q60 108 52 92 Q68 90 78 112" fill="#0d9488" opacity="0.65" />
      <path d="M80 112 Q100 100 108 84 Q92 84 80 108" fill="#0d9488" opacity="0.65" />
      <path d="M80 96 Q64 86 58 72 Q72 70 80 90" fill="#0d9488" opacity="0.8" />
      <path d="M80 90 Q96 80 102 66 Q88 66 80 86" fill="#0d9488" opacity="0.8" />
      <path d="M80 80 Q80 68 80 58" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M80 58 Q76 52 74 46 Q80 48 80 58" fill="#0d9488" opacity="0.9" />
      <path d="M80 58 Q84 52 86 46 Q80 48 80 58" fill="#0d9488" opacity="0.9" />
      {/* Signo de alerta */}
      <circle cx="80" cy="24" r="16" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <path d="M80 16 L80 25" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="80" cy="29" r="1.5" fill="#ef4444" />
    </svg>
  );
}

function GearDeco({ size = 200, teeth = 12, color = "currentColor" }: { size?: number; teeth?: number; color?: string }) {
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

/* ─── Error Page ─────────────────────────────────────────────────────────── */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Loguear el error (sin exponerlo al usuario)
    console.error("[ReSet Error]", error);
  }, [error]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden login-bg"
      style={{ padding: "2rem" }}
    >
      {/* Decoración fondo */}
      <div
        className="absolute pointer-events-none select-none animate-spin-gear hidden sm:block"
        style={{ bottom: "-8%", right: "-4%", opacity: 0.06, color: "#1a365d" }}
      >
        <GearDeco size={300} teeth={16} color="currentColor" />
      </div>
      <div
        className="absolute pointer-events-none select-none animate-spin-gear-reverse hidden sm:block"
        style={{ top: "-6%", left: "-3%", opacity: 0.05, color: "#0ea5e9" }}
      >
        <GearDeco size={200} teeth={12} color="currentColor" />
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-md">
        <PlantIllustration />

        <div>
          <p
            className="font-jetbrains text-[11px] uppercase tracking-[4px] mb-2"
            style={{ color: "#ef4444" }}
          >
            Algo salió mal
          </p>
          <h1
            className="font-playfair text-[clamp(36px,8vw,64px)] leading-none text-[#0f172a]"
            style={{ letterSpacing: "-0.5px" }}
          >
            Error
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-playfair text-[20px] italic text-[#0f172a]">
            El camino se interrumpió
          </h2>
          <p
            className="text-[15px] text-[#64748b] leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 300 }}
          >
            Ocurrió un error inesperado. Tu progreso está a salvo — puedes intentarlo de nuevo o regresar al inicio.
          </p>
        </div>

        <div
          style={{
            height: 1,
            width: 64,
            background: "linear-gradient(90deg, transparent, #fca5a5, transparent)",
          }}
        />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="font-jetbrains text-[11px] uppercase tracking-[1.5px] px-7 py-3.5 rounded-sm text-white transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
              boxShadow: "0 4px 14px rgba(13,148,136,0.25)",
            }}
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="font-jetbrains text-[11px] uppercase tracking-[1.5px] px-7 py-3.5 rounded-sm border border-[#e2e8f0] text-[#64748b] hover:border-[#0d9488] hover:text-[#0d9488] transition-colors"
          >
            Volver al inicio
          </Link>
        </div>

        <p
          className="font-jetbrains text-[10px] uppercase tracking-[1px] italic mt-2"
          style={{ color: "#94a3b8" }}
        >
          cada paso, un día a la paz.
        </p>
      </div>
    </div>
  );
}
