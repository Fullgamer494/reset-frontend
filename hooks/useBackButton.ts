"use client";

/**
 * useBackButton.ts
 * ─────────────────────────────────────────────────────────────────
 * Hook central de navegación hacia atrás.
 *
 * INTEGRACIÓN CON CAPACITOR (App plugin):
 * ────────────────────────────────────────
 * Para conectar el botón físico de Android, añade esto en el componente
 * raíz de la app (por ejemplo, app/layout.tsx) o en un provider:
 *
 *   import { App } from '@capacitor/app';
 *   import { useEffect } from 'react';
 *   import { useRouter, usePathname } from 'next/navigation';
 *   import { isRootRoute, getParentRoute } from '@/lib/navigation';
 *
 *   useEffect(() => {
 *     const listener = App.addListener('backButton', () => {
 *       if (isRootRoute(pathname)) {
 *         App.exitApp();
 *       } else {
 *         const parent = getParentRoute(pathname);
 *         if (parent) router.push(parent);
 *         else router.back();
 *       }
 *     });
 *     return () => { listener.then(l => l.remove()); };
 *   }, [pathname]);
 *
 * ─────────────────────────────────────────────────────────────────
 */

import { useRouter, usePathname } from "next/navigation";
import { isRootRoute, getParentRoute } from "@/lib/navigation";

interface UseBackButtonReturn {
  /** Navega hacia atrás de forma predecible (ruta padre o router.back). */
  handleBack: () => void;
  /** True si la ruta actual es raíz (no debe mostrar botón atrás). */
  isRoot: boolean;
  /** Ruta padre explícita, o null si es raíz. */
  parentRoute: string | null;
}

export function useBackButton(): UseBackButtonReturn {
  const router = useRouter();
  const pathname = usePathname();

  const parentRoute = isRootRoute(pathname) ? null : getParentRoute(pathname);
  const isRoot = parentRoute === null;

  function handleBack() {
    if (parentRoute) {
      router.push(parentRoute);
    } else {
      // Fallback de seguridad — en Capacitor este caso llama App.exitApp()
      router.back();
    }
  }

  return { handleBack, isRoot, parentRoute };
}
