"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { verifyEmail } from "@/lib/api/auth";

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

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verificando tu cuenta...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token de verificación no encontrado.");
      return;
    }

    const performVerification = async () => {
      try {
        await verifyEmail(token);
        setStatus("success");
        setMessage("¡Cuenta verificada con éxito! Ya puedes iniciar sesión.");
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message || "Hubo un problema al verificar tu cuenta.");
      }
    };

    performVerification();
  }, [token]);

  return (
    <div className="relative z-10 w-full max-w-105 px-4 py-8 animate-fade-in-up flex flex-col items-center">
      {/* Logo Section */}
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
          </svg>
        </div>
        <h1 className="text-4xl tracking-widest text-center leading-tight font-playfair" style={{ color: 'var(--ui-text-heading)' }}>
          RESET
        </h1>
        <p className="text-[11px] tracking-[3px] uppercase font-jetbrains text-center mt-1 text-sky-500">
          Confirmación de Identidad
        </p>
      </div>

      {/* Card Section */}
      <div className="rounded-2xl overflow-hidden login-card w-full">
        <div aria-hidden="true" style={{ height: 2, background: "linear-gradient(90deg, transparent 0%, #7dd3fc 35%, #0ea5e9 50%, #7dd3fc 65%, transparent 100%)" }} />
        
        <div className="px-6 py-9 sm:px-9 text-center">
          <h2 className="text-xl italic font-playfair mb-4" style={{ color: 'var(--ui-text-heading)' }}>
            {status === "loading" ? "Procesando..." : status === "success" ? "¡Bienvenido!" : "Oops..."}
          </h2>
          
          <p className="text-sm font-jetbrains mb-8" style={{ color: 'var(--ui-text-body)' }}>
            {message}
          </p>

          {status === "success" && (
            <Link
              href="/login"
              className="futuristic-btn inline-flex items-center justify-center gap-3 px-8 h-12 text-white rounded-xl font-jetbrains"
              style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase" }}
            >
              Iniciar Sesión
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}

          {status === "error" && (
            <Link
              href="/register"
              className="futuristic-btn inline-flex items-center justify-center gap-3 px-8 h-12 text-white rounded-xl font-jetbrains"
              style={{ fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase" }}
            >
              Volver al registro
            </Link>
          )}

          {status === "loading" && (
            <div className="flex justify-center py-4">
              <svg className="animate-spin text-sky-500" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden login-bg">
      <div className="absolute pointer-events-none select-none animate-spin-gear" style={{ bottom: "-10%", right: "-5%", opacity: 0.07, color: "#1a365d" }} aria-hidden="true">
        <Gear size={340} teeth={16} color="currentColor" />
      </div>
      <div className="absolute pointer-events-none select-none animate-spin-gear-reverse" style={{ top: "-8%", left: "-4%", opacity: 0.055, color: "#0ea5e9" }} aria-hidden="true">
        <Gear size={230} teeth={12} color="currentColor" />
      </div>

      <Suspense fallback={null}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
