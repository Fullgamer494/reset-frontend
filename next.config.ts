import type { NextConfig } from "next";

/**
 * next.config.ts
 * ────────────────────────────────────────────────────────────────────────────
 * Para el deploy web (next start) NO se usa output:export.
 * Para Capacitor se usa el script `build:mobile` que define CAPACITOR=1,
 * lo que activa output:export y genera la carpeta `out/` estática.
 */
const isCapacitor = process.env.CAPACITOR === "1";

const apiOrigin = (() => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  try {
    return new URL(apiUrl).origin;
  } catch {
    return null;
  }
})();

const connectSrc = ["'self'"];
if (apiOrigin) {
  connectSrc.push(apiOrigin);
}

/**
 * Headers de seguridad para proteger contra ataques comunes (OWASP)
 * Solo aplicables en SSR (no en export/Capacitor)
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src ${connectSrc.join(' ')};`,
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  // Solo activo para build de Capacitor (CAPACITOR=1 next build)
  ...(isCapacitor && {
    output: "export",
    // Genera /ruta/index.html — requerido para el router de Capacitor
    trailingSlash: true,
  }),

  // next/image en modo export requiere sin optimización
  images: {
    unoptimized: true,
  },

  // Headers de seguridad (solo SSR, no aplica en export)
  ...((!isCapacitor) && {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: securityHeaders,
        },
      ];
    },
  }),
};

export default nextConfig;
