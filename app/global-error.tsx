"use client";

import { useEffect } from "react";

/* ─── global-error.tsx — cubre errores del layout raíz ─────────────────────
   DEBE renderizar su propio <html> y <body> porque el layout no está disponible
   cuando este componente se activa.
────────────────────────────────────────────────────────────────────────────── */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ReSet GlobalError]", error);
  }, [error]);

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e6edf5",
          fontFamily: "'Courier New', monospace",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            textAlign: "center",
            maxWidth: 420,
          }}
        >
          {/* Planta SVG inline */}
          <svg width="120" height="160" viewBox="0 0 160 200" fill="none" aria-hidden="true">
            <path d="M52 148 L56 172 Q80 180 104 172 L108 148 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M48 144 Q80 152 112 144" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="80" cy="145" rx="32" ry="6" fill="#d4a96b" opacity="0.4" />
            <path d="M80 144 Q80 110 80 70" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M80 120 Q60 108 52 92 Q68 90 78 112" fill="#0d9488" opacity="0.65" />
            <path d="M80 112 Q100 100 108 84 Q92 84 80 108" fill="#0d9488" opacity="0.65" />
            <path d="M80 90 Q64 80 58 66 Q72 64 80 84" fill="#0d9488" opacity="0.8" />
            <path d="M80 84 Q96 74 102 60 Q88 60 80 80" fill="#0d9488" opacity="0.8" />
            <circle cx="80" cy="24" r="16" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
            <path d="M80 16 L80 25" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="80" cy="29" r="1.5" fill="#ef4444" />
          </svg>

          <div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#ef4444",
                marginBottom: 8,
                fontFamily: "inherit",
              }}
            >
              Error crítico
            </p>
            <h1
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(40px, 10vw, 72px)",
                lineHeight: 1,
                color: "#0f172a",
                margin: 0,
              }}
            >
              Error
            </h1>
          </div>

          <p
            style={{
              fontSize: 15,
              color: "#64748b",
              lineHeight: 1.6,
              fontFamily: "Inter, sans-serif",
              fontWeight: 300,
              margin: 0,
            }}
          >
            Ocurrió un error crítico en la aplicación. Tu progreso está a salvo — puedes intentarlo de nuevo.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                fontFamily: "inherit",
                fontSize: 11,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "14px 28px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                color: "white",
                background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
                boxShadow: "0 4px 14px rgba(13,148,136,0.25)",
              }}
            >
              Reintentar
            </button>
            <a
              href="/"
              style={{
                fontFamily: "inherit",
                fontSize: 11,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "14px 28px",
                borderRadius: 4,
                border: "1px solid #e2e8f0",
                cursor: "pointer",
                color: "#64748b",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Volver al inicio
            </a>
          </div>

          <p
            style={{
              fontSize: 10,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontStyle: "italic",
              color: "#94a3b8",
              margin: 0,
            }}
          >
            cada paso, un día a la paz.
          </p>
        </div>
      </body>
    </html>
  );
}
